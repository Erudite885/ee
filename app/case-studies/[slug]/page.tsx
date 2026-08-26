import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { GlassCard } from "@/components/glass-card";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return { title: "Case Study | Company Name" };
  }

  return {
    title: `${study.client} | Case Studies | Company Name`,
    description: study.summary,
  };
}

function CopyBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="flex flex-col gap-4 text-muted">
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  );
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return (
    <main>
      <section className="border-b border-[var(--glass-border)] px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} aria-hidden />
            All case studies
          </Link>

          <div className="mt-6 flex items-center gap-3 text-xs">
            <span className="font-mono uppercase tracking-widest text-accent">
              {study.client}
            </span>
            <span className="text-muted" aria-hidden>
              &middot;
            </span>
            <span className="text-muted">{study.industry}</span>
          </div>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {study.title}
          </h1>
          <p className="mt-5 text-lg text-muted text-balance">
            {study.summary}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <GlassCard flare={false} className="grid grid-cols-3 gap-4 text-center">
          {study.metrics.map((metric) => (
            <div key={metric.label}>
              <div className="text-2xl font-semibold text-accent sm:text-3xl">
                {metric.value}
              </div>
              <div className="mt-1 text-xs text-muted">{metric.label}</div>
            </div>
          ))}
        </GlassCard>

        <div className="mt-16 flex flex-col gap-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              The challenge
            </h2>
            <div className="mt-4">
              <CopyBlock paragraphs={study.challenge} />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Our approach
            </h2>
            <div className="mt-4">
              <CopyBlock paragraphs={study.approach} />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              The results
            </h2>
            <div className="mt-4">
              <CopyBlock paragraphs={study.results} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
