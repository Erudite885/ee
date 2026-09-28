import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/lib/validation";

/**
 * Server-side submission schema. Extends the exact `contactFormSchema` from
 * lib/validation.ts (imported unmodified, per Session 13's handover note —
 * client and server never validate different rules) with `startedAt`, a
 * client-set timestamp used for the minimum-submit-delay spam check below.
 * `startedAt` isn't user-facing content, so it doesn't belong in the shared
 * form schema — it's composed on here instead.
 */
const submissionSchema = contactFormSchema.extend({
  startedAt: z.number(),
});

const MIN_SUBMIT_MS = 3000; // faster than this and it's a bot filling the form instantly
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

/**
 * Naive in-memory rate limiter, keyed by IP. This resets whenever the
 * server process restarts/cold-starts, and doesn't share state across
 * multiple instances — fine for a single small deployment, but swap for
 * Redis/Upstash (or a platform-level rate limit) before scaling past one
 * instance. Logged here explicitly so a future session doesn't mistake
 * this for a durable solution.
 */
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

const REQUIRED_SMTP_ENV_VARS = ["SMTP_HOST", "SMTP_USER", "SMTP_PASSWORD"] as const;

/**
 * Checks that the SMTP env vars this route depends on are actually set,
 * without ever logging their values. Deliberately separate from
 * getTransporter()/sendMail() below: nodemailer will happily attempt a
 * connection with `undefined` host/user/pass and fail deep inside its own
 * socket/auth logic, which surfaces as the same generic error as a real
 * outage. Checking up front means a missing-env-var deployment logs
 * "SMTP is not configured" instead of an opaque connection or auth
 * stack trace that looks identical to a genuine provider-side failure.
 */
function missingSmtpEnvVars(): string[] {
  return REQUIRED_SMTP_ENV_VARS.filter((key) => !process.env[key]);
}

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission.", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { name, email, companyName, phone, message, website, startedAt } =
    parsed.data;

  // Honeypot tripped, or submitted faster than a human could fill the form.
  // Respond as if it succeeded either way — never tip a bot off that it was
  // caught, that just teaches it to adapt.
  if (website || Date.now() - startedAt < MIN_SUBMIT_MS) {
    return NextResponse.json({ ok: true });
  }

  const missingEnvVars = missingSmtpEnvVars();
  if (missingEnvVars.length > 0) {
    // Not a send failure — the transporter was never going to work. Logged
    // as its own case (500, not 502) so this is unmistakable in Vercel's
    // function logs vs. a genuine SMTP-provider outage below.
    console.error(
      `Contact form misconfigured: missing env var(s) ${missingEnvVars.join(", ")}. ` +
        "See .env.example for what's required."
    );
    return NextResponse.json(
      { error: "Failed to send message. Please email us directly." },
      { status: 500 }
    );
  }

  try {
    const transporter = getTransporter();
    const toAddress = process.env.CONTACT_TO_EMAIL ?? "contact@edgesenterprise.com";

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? `"Website Contact Form" <${process.env.SMTP_USER}>`,
      to: toAddress,
      replyTo: email,
      subject: `New contact form submission from ${name}${companyName ? ` (${companyName})` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${companyName}`,
        phone ? `Phone: ${phone}` : null,
        "",
        "Message:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    // Best-effort — the submission has already succeeded at this point (the
    // notification above is what actually gets you the lead). A failure
    // here (e.g. visitor mistyped their address) shouldn't turn a
    // successful submission into an error response.
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM ?? `"Edges Enterprise" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "We've received your message",
        text: [
          `Hi ${name},`,
          "",
          "Thanks for reaching out to Edges Enterprise — we've received your message and will reply within one business day.",
        ].join("\n"),
        html: `
          <p>Hi ${name},</p>
          <p>Thanks for reaching out to Edges Enterprise — we've received your message and will reply within one business day.</p>
        `,
      });
    } catch (err) {
      console.error("Contact form visitor confirmation email failed:", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form email send failed:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please email us directly." },
      { status: 502 }
    );
  }
}
