import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/glass-card";
import type { CaseStudy } from "@/lib/case-studies";

interface CaseStudyCardProps {
  study: CaseStudy;
}

/**
 * Case studies index card. Whole card links to the detail route via a
 * stretched-link pattern (invisible full-card <Link>) so the entire
 * GlassCard is clickable, not just the "Read case study" affordance text.
 */
export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <GlassCard className="relative flex flex-col gap-4">
      <div className="flex items-center gap-3 text-xs">
        <span className="font-mono uppercase tracking-widest text-accent">
          {study.client}
        </span>
        <span className="text-muted" aria-hidden>
          &middot;
        </span>
        <span className="text-muted">{study.industry}</span>
      </div>

      <h3 className="text-lg font-medium">
        <Link href={`/case-studies/${study.slug}`} className="static">
          <span className="absolute inset-0" aria-hidden />
          {study.title}
        </Link>
      </h3>

      <p className="text-sm text-muted">{study.summary}</p>

      <div className="mt-auto flex flex-wrap gap-4 border-t border-[var(--glass-border)] pt-4 text-sm">
        {study.metrics.slice(0, 2).map((metric) => (
          <div key={metric.label}>
            <div className="font-semibold text-accent">{metric.value}</div>
            <div className="text-xs text-muted">{metric.label}</div>
          </div>
        ))}
      </div>

      <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
        Read case study
        <ArrowUpRight size={14} aria-hidden />
      </span>
    </GlassCard>
  );
}
