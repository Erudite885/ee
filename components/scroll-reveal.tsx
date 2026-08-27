"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Session 23: small reusable client wrapper for fading/rising content into
 * view — built for `/blog/[slug]`'s header block, but generic enough for
 * any other session that wants the same effect without hand-rolling
 * variants each time.
 *
 * Deliberately a standalone wrapper rather than adding motion directly to
 * `PageHeader`: `PageHeader` is a plain Server Component used on every
 * interior page, and `motion.div` requires a Client Component boundary.
 * Wrapping the *call site* (`<ScrollReveal><PageHeader .../></ScrollReveal>`)
 * keeps that boundary local to the one page that wants it instead of
 * forcing every `PageHeader` usage site-wide to hydrate as a client
 * component for an effect only this page asked for.
 *
 * Uses `whileInView` rather than a plain on-mount `animate` so the same
 * component still behaves correctly if used further down a page (not just
 * above-the-fold headers) in a later session.
 */
export function ScrollReveal({ children, className }: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px", amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
