import Link from "next/link";
import { GlassCard } from "@/components/glass-card";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <GlassCard className="flex flex-col items-center gap-4 py-16">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          404
        </span>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Nothing deployed at this route
        </h1>
        <p className="max-w-sm text-muted">
          The page you&apos;re looking for doesn&apos;t exist, moved, or was
          never shipped. Check the URL, or head back to somewhere that works.
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
      </GlassCard>
    </main>
  );
}
