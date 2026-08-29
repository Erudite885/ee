import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CaseStudyCard } from "@/components/case-study-card";
import { CASE_STUDIES } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case Studies | Company Name",
  description:
    "Real engagements, real numbers — how we've migrated infrastructure, shipped compliance, and rebuilt data platforms for our clients.",
};

export default function CaseStudiesPage() {
  return (
    <main>
      <ScrollReveal>
        <PageHeader
          eyebrow="Case studies"
          title="Results, not just process"
          description="A few of the engagements we're proudest of, with the numbers to back them up."
        />
      </ScrollReveal>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>
    </main>
  );
}
