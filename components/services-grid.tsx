"use client";

import {
  Boxes,
  Cloud,
  Database,
  LifeBuoy,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { GlassCard } from "@/components/glass-card";

const SERVICES = [
  {
    icon: Wrench,
    title: "Product Engineering",
    description:
      "End-to-end build teams that take a product from first prototype to a maintainable, production-grade codebase.",
    includes: [
      "Full-stack web & API development",
      "Design systems & component libraries",
      "Technical architecture reviews",
    ],
  },
  {
    icon: Boxes,
    title: "Platform & DevOps",
    description:
      "CI/CD pipelines, infrastructure-as-code, and observability so releases are routine instead of an event.",
    includes: [
      "CI/CD pipeline design",
      "Infrastructure as code (Terraform)",
      "Monitoring, logging & alerting",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Migration",
    description:
      "Move off legacy infrastructure without downtime, with a rollback plan for every step of the way.",
    includes: [
      "Legacy system assessment",
      "Phased, zero-downtime migration",
      "Cost & performance tuning post-migration",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    description:
      "Get to SOC 2 or ISO 27001 readiness with security built into the pipeline, not bolted on after an audit.",
    includes: [
      "Security audits & threat modeling",
      "SOC 2 / ISO 27001 readiness",
      "Encryption, access control & secrets management",
    ],
  },
  {
    icon: Database,
    title: "Data & Analytics",
    description:
      "Turn scattered logs and tables into a data platform your team actually trusts and queries daily.",
    includes: [
      "Data pipeline & warehouse design",
      "Dashboarding & reporting",
      "Data quality & governance",
    ],
  },
  {
    icon: LifeBuoy,
    title: "Managed Support",
    description:
      "An on-call team that knows your stack, so incidents get resolved in minutes, not escalated for days.",
    includes: [
      "24/7 on-call incident response",
      "SLA-backed uptime guarantees",
      "Quarterly architecture check-ins",
    ],
  },
];

// Explicitly typed as Variants — inferred object literals widen `ease` to
// `string`, which fails Framer Motion's stricter Easing type (see Session
// 16's note in HANDOVER.md, reused here per Session 17's FeatureGrid
// precedent).
const cardLift: Variants = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.25, ease: "easeOut" } },
};

// Staggered scroll-reveal container/item pair. `container` fires
// `staggerChildren` once each card's parent enters the viewport;
// `item` is the actual fade/rise each card animates through. Split from
// `cardLift` (hover) since both animate the same element via separate
// `motion.div` wrappers — see the nested-motion note below.
const revealContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * Services page offering grid. One GlassCard per offering, per Session 8
 * scope — heavier than FeatureGrid's cards (adds an "includes" bullet list),
 * so this is its own component rather than reusing FeatureGrid directly.
 *
 * Session 20: brought up to the Session 17 FeatureGrid card standard (icon
 * badge in the accent-tinted rounded-xl treatment instead of a bare
 * rounded-full, a Framer Motion `whileHover` lift + border glow layered on
 * top of GlassCard with hoverScale disabled so it doesn't fight the lift,
 * stronger title hierarchy) plus a staggered scroll-reveal on the grid
 * itself, entering once via `whileInView`.
 *
 * Two separate `motion.div` wrappers per card (outer for scroll-reveal,
 * inner for hover-lift) rather than merging both animations into one set of
 * variants — `initial`/`whileInView` and `initial`/`whileHover` need
 * different trigger props on the same element, and Framer Motion resolves
 * exactly one `variants` prop per component, so nesting keeps the two
 * independent instead of one clobbering the other.
 */
export function ServicesGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      variants={shouldReduceMotion ? undefined : revealContainer}
    >
      {SERVICES.map(({ icon: Icon, title, description, includes }) => (
        <motion.div
          key={title}
          variants={shouldReduceMotion ? undefined : revealItem}
        >
          <motion.div
            initial="rest"
            whileHover={shouldReduceMotion ? undefined : "hover"}
            animate="rest"
            variants={shouldReduceMotion ? undefined : cardLift}
          >
            <GlassCard
              hoverScale={false}
              className="flex h-full flex-col gap-4 transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_20px_60px_-15px_var(--accent)]"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                <Icon size={22} />
              </span>
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              <p className="text-sm text-muted">{description}</p>
              <ul className="mt-auto flex flex-col gap-2 border-t border-[var(--glass-border)] pt-4 text-sm text-muted">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
