"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useCountUp } from "@/lib/use-count-up";

const STATS = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "40M+", label: "Requests served daily" },
  { value: "120+", label: "Countries with active users" },
  { value: "<50ms", label: "Median API response time" },
];

/**
 * Splits a display string like "40M+", "99.99%", or "<50ms" into a
 * non-numeric prefix, the numeric value to animate, its decimal precision,
 * and a non-numeric suffix — so the counter only animates the number while
 * everything around it (%, M+, <, ms) stays fixed.
 */
function parseStat(raw: string) {
  const match = raw.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) {
    return { prefix: "", target: 0, decimals: 0, suffix: raw };
  }
  const [, prefix, numberPart, suffix] = match;
  const decimals = numberPart.includes(".") ? numberPart.split(".")[1].length : 0;
  return { prefix, target: parseFloat(numberPart), decimals, suffix };
}

function StatItem({
  value,
  label,
  start,
}: {
  value: string;
  label: string;
  start: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const { prefix, target, decimals, suffix } = parseStat(value);

  // Under reduced motion, skip the RAF loop entirely and show the final
  // value immediately rather than animating from 0.
  const animated = useCountUp(target, {
    start: start && !shouldReduceMotion,
    decimals,
  });
  const displayNumber = shouldReduceMotion ? target : animated;

  return (
    <div className="text-center">
      <dt className="sr-only">{label}</dt>
      <dd className="text-3xl font-semibold tracking-tight text-accent sm:text-4xl">
        {prefix}
        {displayNumber.toFixed(decimals)}
        {suffix}
      </dd>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  );
}

/**
 * Metrics band. Plain glass band (not individual GlassCards) — reads as one
 * continuous stat bar. Session 17 added animated counting: each number
 * counts up from 0 to its target once the band scrolls into view (via
 * Framer Motion's useInView, triggered once), using the hand-rolled
 * useCountUp hook rather than a counting library (see Decision Log).
 */
export function StatsBand() {
  const containerRef = useRef<HTMLDListElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <dl
        ref={containerRef}
        className="grid grid-cols-2 gap-8 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-10 backdrop-blur-xl sm:grid-cols-4"
      >
        {STATS.map((stat) => (
          <StatItem key={stat.label} {...stat} start={isInView} />
        ))}
      </dl>
    </section>
  );
}
