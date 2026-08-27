"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { BubbleField } from "@/components/bubble-field";

/**
 * Home page Hero. Client component now (Session 16) — Framer Motion needs
 * it. Layout unchanged from Session 4: BubbleField sits absolutely behind
 * the content, content wrapped with z-10.
 *
 * Entrance sequence: eyebrow → headline → subheading → CTAs, staggered via
 * a parent `variants` container so each child's `transition` only needs a
 * relative delay, not an absolute one — reordering children later doesn't
 * require re-tuning every delay by hand.
 */
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden px-6">
      <BubbleField />

      <motion.div
        variants={shouldReduceMotion ? undefined : container}
        initial={shouldReduceMotion ? undefined : "hidden"}
        animate={shouldReduceMotion ? undefined : "show"}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.span
          variants={shouldReduceMotion ? undefined : item}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-muted backdrop-blur-xl"
        >
          <Sparkles size={14} className="text-accent" />
          Now building for 2026
        </motion.span>

        <motion.h1
          variants={shouldReduceMotion ? undefined : item}
          className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
        >
          <span className="flare-text">
            Software that moves as fast as your team
          </span>
        </motion.h1>

        <motion.p
          variants={shouldReduceMotion ? undefined : item}
          className="mt-6 max-w-xl text-lg text-muted text-balance"
        >
          We design and build the infrastructure ambitious companies run on —
          from first prototype to global scale.
        </motion.p>

        <motion.div
          variants={shouldReduceMotion ? undefined : item}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Get in touch
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-6 py-3 text-sm font-medium backdrop-blur-xl transition-colors hover:bg-[var(--glass-border)]"
          >
            Explore services
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
