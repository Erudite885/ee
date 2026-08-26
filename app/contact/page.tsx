import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { OfficeInfo } from "@/components/office-info";

export const metadata: Metadata = {
  title: "Contact | Company Name",
  description:
    "Tell us what you're trying to build or fix. We reply to every message within one business day.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about what you're building"
        description="Whether it's a rewrite, a migration, or an audit — tell us where you're stuck and we'll tell you honestly whether we're a fit."
      />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <ContactForm />
          <OfficeInfo />
        </div>
      </section>
    </main>
  );
}
