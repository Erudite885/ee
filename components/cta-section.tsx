import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BubbleField } from "@/components/bubble-field";

/**
 * Closing CTA banner — reuses BubbleField (Session 2) the same way Hero
 * (Session 4) does: relative isolate section, absolute BubbleField behind,
 * z-10 content on top. Kept as its own glass-bordered band rather than a
 * GlassCard so it can span full width edge-to-edge inside the max-width
 * container, matching StatsBand's treatment from Session 5.
 */
export function CTASection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="relative isolate overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-8 py-16 text-center backdrop-blur-xl">
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
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Get in touch
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
