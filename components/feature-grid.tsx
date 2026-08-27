"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Layers, Lock, Rocket, Workflow } from "lucide-react";
import { GlassCard } from "@/components/glass-card";

const FEATURES = [
  {
    icon: Rocket,
    title: "Ship faster",
    description:
      "Automated pipelines and sane defaults get new features to production in hours, not weeks.",
  },
  {
    icon: Lock,
    title: "Enterprise-grade security",
    description:
      "SOC 2-aligned infrastructure with encryption at rest and in transit, by default.",
  },
  {
    icon: Layers,
    title: "Built to scale",
    description:
      "From ten users to ten million — the same architecture, no rewrite required.",
  },
  {
    icon: Workflow,
    title: "Fits your workflow",
    description:
      "Integrates with the tools your team already uses instead of forcing a new one.",
  },
];

// Explicitly typed as Variants — inferred object literals widen `ease` to
// `string`, which fails Framer Motion's stricter Easing type (see Session
// 16's note in HANDOVER.md).
const cardLift: Variants = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.25, ease: "easeOut" } },
};

/**
 * Product/feature highlight grid — one GlassCard per feature, redesigned in
 * Session 17 with real visual weight: numbered eyebrow, an accent icon
 * badge (not a bare icon), and a Framer Motion `whileHover` lift + border
 * glow layered on top of GlassCard. GlassCard's own CSS hover scale is
 * disabled here (hoverScale={false}) so it doesn't fight the Framer Motion
 * lift — the cursor-flare spotlight (flare, default true) is left on.
 */
export function FeatureGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Why teams choose us
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything you need, nothing you don&apos;t
        </h2>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, description }, index) => (
          <motion.div
            key={title}
            initial="rest"
            whileHover={shouldReduceMotion ? undefined : "hover"}
            animate="rest"
            variants={shouldReduceMotion ? undefined : cardLift}
          >
            <GlassCard
              hoverScale={false}
              className="flex h-full flex-col gap-4 transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_20px_60px_-15px_var(--accent)]"
            >
              <span className="font-mono text-xs tracking-widest text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                <Icon size={22} />
              </span>
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              <p className="text-sm text-muted">{description}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
