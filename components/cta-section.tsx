"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BubbleField } from "@/components/bubble-field";

const reveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/**
 * Closing CTA banner, redesigned in Session 18. Still uses BubbleField
 * (Session 2) the same way Hero (Session 4) does — relative isolate
 * section, BubbleField absolute behind, content at z-10 — but layers a
 * radial accent gradient underneath it for a bolder, less flat background
 * than the plain --glass-bg surface used before. Whole banner fades/slides
 * in via whileInView (once) rather than being static. The CTA button gets
 * a glow ring and an arrow that nudges right on hover, so it reads as the
 * single most important click on the page rather than a default link.
 *
 * Reduced motion: whileInView/variants omitted entirely — banner renders at
 * final state immediately, no scroll-triggered motion at all.
 */
export function CTASection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <motion.div
        className="relative isolate overflow-hidden rounded-2xl border border-[var(--glass-border)] px-8 py-20 text-center backdrop-blur-xl"
        style={{
          backgroundColor: "var(--glass-bg)",
          backgroundImage:
            "radial-gradient(120% 140% at 50% 0%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 60%)",
        }}
        initial={shouldReduceMotion ? undefined : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.4 }}
        variants={shouldReduceMotion ? undefined : reveal}
      >
        <BubbleField />
        <div className="relative z-10">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to build something faster?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Talk to our team and see how quickly you could be shipping on our
            platform.
          </p>
          <Link
            href="/contact"
            className="group mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_color-mix(in_oklab,var(--accent)_60%,transparent),0_20px_60px_-15px_var(--accent)] transition-transform duration-300 hover:scale-[1.03]"
          >
            Get in touch
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
