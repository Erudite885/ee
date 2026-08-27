"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/glass-card";
import { cn } from "@/lib/utils";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";

const FIELDS: {
  name: keyof Omit<ContactFormValues, "website" | "phone">;
  label: string;
  type?: string;
  as?: "textarea";
  placeholder?: string;
}[] = [
  { name: "name", label: "Name", placeholder: "Ada Lovelace" },
  {
    name: "email",
    label: "Work email",
    type: "email",
    placeholder: "ada@company.com",
  },
  {
    name: "companyName",
    label: "Company",
    placeholder: "Analytical Engines Inc.",
  },
  {
    name: "message",
    label: "Message",
    as: "textarea",
    placeholder: "What are you trying to build or fix?",
  },
];

/**
 * Contact form UI. Submits to /api/contact (Session 14), which re-validates
 * server-side with the same `contactFormSchema` and applies the honeypot +
 * minimum-submit-delay checks. `startedAt` captures the mount time and rides
 * along in the request body (not part of `ContactFormValues` — it's
 * anti-spam metadata, not form content, so it stays out of the shared
 * client/server validation schema and gets composed in on the API route).
 * Captured via a lazy `useState(() => Date.now())` initializer rather than
 * a ref or an effect: a ref read inside the `handleSubmit` callback trips
 * the strict `react-hooks/refs` rule (it can't prove the ref is only read
 * inside the submit event, not during render), and assigning it via
 * `useEffect` trips `react-hooks/set-state-in-effect`. A lazy `useState`
 * initializer runs exactly once, satisfies both rules, and is the
 * React-documented way to compute expensive/impure initial state.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [startedAt] = useState(() => Date.now());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      companyName: "",
      phone: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startedAt }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <GlassCard className="flex flex-col items-center gap-3 py-16 text-center">
        <CheckCircle2 className="text-accent" size={32} />
        <h3 className="text-lg font-medium">Message sent</h3>
        <p className="max-w-sm text-sm text-muted">
          We usually reply within one business day. In the meantime, feel
          free to browse our{" "}
          <Link href="/case-studies" className="text-accent hover:underline">
            case studies
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-accent hover:underline"
        >
          Send another message
        </button>
      </GlassCard>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <GlassCard flare={false} className="flex flex-col gap-5">
        {FIELDS.map((field) => (
          <div key={field.name} className="flex flex-col gap-1.5">
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
            </label>
            {field.as === "textarea" ? (
              <textarea
                id={field.name}
                rows={5}
                placeholder={field.placeholder}
                aria-invalid={!!errors[field.name]}
                className={cn(
                  "resize-none rounded-xl border bg-[var(--glass-bg)] px-4 py-3 text-sm outline-none transition-colors",
                  "border-[var(--glass-border)] focus:border-accent",
                  errors[field.name] && "border-red-500"
                )}
                {...register(field.name)}
              />
            ) : (
              <input
                id={field.name}
                type={field.type ?? "text"}
                placeholder={field.placeholder}
                aria-invalid={!!errors[field.name]}
                className={cn(
                  "rounded-xl border bg-[var(--glass-bg)] px-4 py-3 text-sm outline-none transition-colors",
                  "border-[var(--glass-border)] focus:border-accent",
                  errors[field.name] && "border-red-500"
                )}
                {...register(field.name)}
              />
            )}
            {errors[field.name] && (
              <p className="text-xs text-red-500">{errors[field.name]?.message}</p>
            )}
          </div>
        ))}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone <span className="text-muted">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
            {...register("phone")}
          />
        </div>

        {/* Honeypot — visually hidden (not display:none/type=hidden, both of
            which unsophisticated bots specifically skip), never seen or
            reachable by a real user tabbing through the form. */}
        <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" && <Loader2 size={16} className="animate-spin" />}
          {status === "submitting" ? "Sending..." : "Send message"}
        </button>

        {status === "error" && (
          <p className="text-sm text-red-500">
            Something went wrong. Please try again or email us directly.
          </p>
        )}
      </GlassCard>
    </form>
  );
}
