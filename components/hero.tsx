import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { BubbleField } from "@/components/bubble-field";

/**
 * Home page Hero. Server component (no client interactivity needed here) —
 * BubbleField itself is a client component but composes fine as a child.
 * Layout: relatively-positioned section so BubbleField (absolute inset-0)
 * sits behind the content, content wrapped with z-10 to stay above it.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden px-6">
      <BubbleField />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-muted backdrop-blur-xl">
          <Sparkles size={14} className="text-accent" />
          Now building for 2026
        </span>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Software that moves as fast as your team
        </h1>

        <p className="mt-6 max-w-xl text-lg text-muted text-balance">
          We design and build the infrastructure ambitious companies run on —
          from first prototype to global scale.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
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
        </div>
      </div>
    </section>
  );
}
