import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Terms of Service | Company Name",
  description: "The terms governing your use of Company Name's website and services.",
};

export default function TermsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="Last updated: August 2026"
      />

      <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl px-6 py-16 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
        <h2>Acceptance of terms</h2>
        <p>
          By accessing this website, you agree to be bound by these terms.
          If you do not agree, please do not use this site.
        </p>

        <h2>Use of the site</h2>
        <p>
          This website is provided for informational purposes about Company
          Name&apos;s products and services. You agree not to use the site in
          any way that could damage, disable, or impair it.
        </p>

        <h2>Intellectual property</h2>
        <p>
          All content on this site — including text, graphics, logos, and
          code — is the property of Company Name unless otherwise stated,
          and may not be reproduced without permission.
        </p>

        <h2>No warranty</h2>
        <p>
          This site and its content are provided &quot;as is&quot; without
          warranties of any kind, express or implied.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          Company Name is not liable for any damages arising from your use
          of, or inability to use, this website.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the
          site after changes constitutes acceptance of the revised terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be directed to{" "}
          <a href="mailto:hello@company.com">hello@company.com</a>.
        </p>
      </article>
    </main>
  );
}
