"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { GlassCard } from "@/components/glass-card";

const TEAM = [
  { name: "Alex Rivera", role: "CEO & Co-founder" },
  { name: "Sam Okafor", role: "CTO & Co-founder" },
  { name: "Jordan Lee", role: "VP of Product" },
  { name: "Taylor Brooks", role: "VP of Engineering" },
];

// Same lift shape as FeatureGrid/ServicesGrid/BlogCard/CaseStudyCard
// (Sessions 17/20/23/24) — explicitly typed as Variants for the same
// reason noted in those files: an inferred object literal widens `ease`
// to `string`, which fails Framer Motion's stricter Easing type.
const cardLift: Variants = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.25, ease: "easeOut" } },
};

/**
 * Leadership grid. No headshot images exist yet, so each card uses an
 * initials avatar (accent-tinted circle) rather than an <Image> placeholder
 * — swap for real photos when available, no structural change needed.
 * Names/roles are placeholder.
 *
 * Session 24: brought up to the same hover standard as every other card
 * grid on the site — a Framer Motion `whileHover` lift + accent
 * border/glow, GlassCard's CSS hover scale disabled so it doesn't fight
 * the lift. Previously the only remaining grid (alongside CaseStudyCard)
 * still on the pre-revamp flat CSS scale hover.
 */
export function TeamGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {TEAM.map(({ name, role }) => {
        const initials = name
          .split(" ")
          .map((part) => part[0])
          .join("");

        return (
          <motion.div
            key={name}
            initial="rest"
            whileHover={shouldReduceMotion ? undefined : "hover"}
            animate="rest"
            variants={shouldReduceMotion ? undefined : cardLift}
          >
            <GlassCard
              hoverScale={false}
              className="flex flex-col items-center text-center transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_20px_60px_-15px_var(--accent)]"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-lg font-semibold text-accent">
                {initials}
              </span>
              <h3 className="mt-4 text-base font-medium">{name}</h3>
              <p className="mt-1 text-sm text-muted">{role}</p>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}
