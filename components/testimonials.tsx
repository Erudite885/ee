"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Quote } from "lucide-react";
import { GlassCard } from "@/components/glass-card";

const TESTIMONIALS = [
  {
    quote:
      "We cut our deployment time from days to minutes without changing how our team works.",
    name: "Dana Whitfield",
    role: "VP Engineering",
    company: "Northwind",
  },
  {
    quote:
      "The migration was the smoothest infrastructure change we've ever made — zero downtime, zero surprises.",
    name: "Marcus Iyer",
    role: "CTO",
    company: "Globex",
  },
  {
    quote:
      "Support response time alone would justify the switch. The platform itself is just a bonus.",
    name: "Priya Ramachandran",
    role: "Head of Platform",
    company: "Vertex Labs",
  },
];

// Explicitly typed as Variants — see Session 16's note in HANDOVER.md on why
// inferred variant objects fail tsc's Easing type.
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * Testimonial section, redesigned in Session 18 for a more corporate-grade
 * feel: an oversized faded quote glyph behind serif-italic quote text
 * (font-serif — Tailwind's default system serif stack, no new font
 * dependency), an initials avatar (same treatment as TeamGrid from Session
 * 7), and name/role/company laid out with distinct weight per level rather
 * than one flat line. Cards reveal with a staggered whileInView animation
 * instead of appearing all at once.
 *
 * Reduced motion: when useReducedMotion() is true, the whileInView/variants
 * props are all omitted so every card renders at its final, visible state
 * immediately — no reliance on scroll position at all.
 */
export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          What customers say
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Loved by teams who ship
        </h2>
      </div>

      <motion.div
        className="mt-14 grid gap-6 md:grid-cols-3"
        initial={shouldReduceMotion ? undefined : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.3 }}
        variants={shouldReduceMotion ? undefined : container}
      >
        {TESTIMONIALS.map(({ quote, name, role, company }) => {
          const initials = name
            .split(" ")
            .map((part) => part[0])
            .join("");

          return (
            <motion.div
              key={name}
              variants={shouldReduceMotion ? undefined : item}
            >
              <GlassCard className="relative flex h-full flex-col gap-6 overflow-hidden">
                <Quote
                  size={72}
                  className="pointer-events-none absolute -top-3 -right-3 text-accent/10"
                  aria-hidden="true"
                />
                <p className="relative font-serif text-lg italic leading-relaxed text-foreground">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="relative mt-auto flex items-center gap-3 pt-2">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                    {initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-xs text-muted">
                      {role} <span className="text-accent">· {company}</span>
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
