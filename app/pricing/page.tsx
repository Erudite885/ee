import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PricingGrid } from "@/components/pricing-grid";

export const metadata: Metadata = {
  title: "Pricing | Company Name",
  description:
    "Simple, transparent pricing for teams of every size — from a first product build to enterprise-scale engagements.",
};

export default function PricingPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Pricing"
        title="Straightforward pricing, no surprises"
        description="Pick the tier that matches your team's size. Every plan includes the same senior engineers — you're paying for scope, not access."
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <PricingGrid />
      </section>
    </main>
  );
}
