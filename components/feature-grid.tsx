import { Layers, Lock, Rocket, Workflow } from "lucide-react";
import { GlassCard } from "@/components/glass-card";

const FEATURES = [
  {
    icon: Rocket,
    title: "Ship faster",
    description:
      "Automated pipelines and sane defaults get new features to production in hours, not weeks.",
  },
  {
    icon: Lock,
    title: "Enterprise-grade security",
    description:
      "SOC 2-aligned infrastructure with encryption at rest and in transit, by default.",
  },
  {
    icon: Layers,
    title: "Built to scale",
    description:
      "From ten users to ten million — the same architecture, no rewrite required.",
  },
  {
    icon: Workflow,
    title: "Fits your workflow",
    description:
      "Integrates with the tools your team already uses instead of forcing a new one.",
  },
];

/**
 * Product/feature highlight grid — one GlassCard per feature. flare stays on
 * (the default) since a 4-up grid isn't dense enough for the spotlight
 * effect to feel noisy.
 */
export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Why teams choose us
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything you need, nothing you don&apos;t
        </h2>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <GlassCard key={title} className="flex flex-col gap-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Icon size={20} />
            </span>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-sm text-muted">{description}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
