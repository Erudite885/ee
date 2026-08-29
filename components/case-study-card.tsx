"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/glass-card";
import type { CaseStudy } from "@/lib/case-studies";

interface CaseStudyCardProps {
  study: CaseStudy;
}

// Same lift shape as FeatureGrid/ServicesGrid/BlogCard (Sessions 17/20/23) —
// explicitly typed as Variants for the same reason noted in those files:
// an inferred object literal widens `ease` to `string`, which fails Framer
// Motion's stricter Easing type.
const cardLift: Variants = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.25, ease: "easeOut" } },
};

/**
 * Case studies index card. Whole card links to the detail route via a
 * stretched-link pattern (invisible full-card <Link>) so the entire
 * GlassCard is clickable, not just the "Read case study" affordance text.
 *
 * Session 24: brought up to the FeatureGrid/ServicesGrid/BlogCard hover
 * standard — a Framer Motion `whileHover` lift + accent border/glow layered
 * on top of GlassCard, with GlassCard's own CSS hover scale disabled so the
 * two don't fight. This was the one remaining card grid still on the old
 * CSS-only scale-up hover from before the Phase 2 revamp; the cursor-flare
 * spotlight (flare, default true) stays on since nothing here conflicts
 * with it the way the lift's own hover shadow would with hoverScale.
 */
export function CaseStudyCard({ study }: CaseStudyCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="rest"
      whileHover={shouldReduceMotion ? undefined : "hover"}
      animate="rest"
      variants={shouldReduceMotion ? undefined : cardLift}
    >
      <GlassCard
        hoverScale={false}
        className="relative flex h-full flex-col gap-4 transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_20px_60px_-15px_var(--accent)]"
      >
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
    </motion.div>
  );
}
