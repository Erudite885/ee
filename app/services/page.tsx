import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ServicesGrid } from "@/components/services-grid";

export const metadata: Metadata = {
  title: "Services | Company Name",
  description:
    "Product engineering, platform & DevOps, cloud migration, security, data, and managed support for ambitious software teams.",
};

export default function ServicesPage() {
  return (
    <main>
      <ScrollReveal>
        <PageHeader
          eyebrow="What we do"
          title="Services built for the whole software lifecycle"
          description="From first prototype to production incident response — pick one engagement or all six, engineered by the same team."
        />
      </ScrollReveal>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <ServicesGrid />
      </section>
    </main>
  );
}
