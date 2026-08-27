"use client";

import { useEffect } from "react";
import { GlassCard } from "@/components/glass-card";

/**
 * Root error boundary. Must be a Client Component — this is a Next.js App
 * Router requirement for error.tsx, not a stylistic choice. Logs to the
 * console for now; swap the useEffect body for real error reporting
 * (Sentry, etc.) when that's wired up in a later session.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <GlassCard className="flex flex-col items-center gap-4 py-16">
        <span className="font-mono text-xs uppercase tracking-widest text-red-500">
          Something broke
        </span>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          An unexpected error occurred
        </h1>
        <p className="max-w-sm text-muted">
          Our team has been notified. Try again, or email us directly if it
          keeps happening.
        </p>
        <div className="mt-2 flex gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="mailto:hello@company.com"
            className="inline-flex items-center justify-center rounded-full border border-[var(--glass-border)] px-6 py-3 text-sm font-medium transition-colors hover:border-accent"
          >
            Email us
          </a>
        </div>
      </GlassCard>
    </main>
  );
}
