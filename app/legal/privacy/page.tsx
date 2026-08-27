import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy | Company Name",
  description: "How Company Name collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: August 2026"
      />

      <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl px-6 py-16 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
        <h2>What we collect</h2>
        <p>
          When you use our contact form, we collect the information you
          submit directly: your name, work email, company name, optional
          phone number, and message. We also log standard technical data
          (IP address, timestamp) for spam prevention and security purposes.
        </p>

        <h2>How we use it</h2>
        <p>
          We use the information you submit solely to respond to your
          inquiry. We do not sell, rent, or share your information with
          third parties for marketing purposes.
        </p>

        <h2>Data retention</h2>
        <p>
          We retain contact form submissions for as long as necessary to
          respond to your inquiry and maintain business records, typically
          no longer than 24 months.
        </p>

        <h2>Your rights</h2>
        <p>
          You may request access to, correction of, or deletion of any
          personal data we hold about you by emailing{" "}
          <a href="mailto:hello@company.com">hello@company.com</a>.
        </p>

        <h2>Cookies</h2>
        <p>
          This site does not use tracking or advertising cookies. Any
          cookies set are strictly necessary for the site to function.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be directed to{" "}
          <a href="mailto:hello@company.com">hello@company.com</a>.
        </p>
      </article>
    </main>
  );
}
