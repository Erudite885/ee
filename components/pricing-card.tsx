import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass-card";

interface PricingCardProps {
  name: string;
  tagline: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  billingPeriod: "monthly" | "annual";
  features: readonly string[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
}

/**
 * Single pricing tier card.
 *
 * Session 21 redesign — this is now two structurally different treatments,
 * not one shared style with a highlight modifier:
 *  - `highlighted` (the recommended/middle tier) renders on `GlassCard`,
 *    scaled up slightly and lifted with a negative margin on large screens
 *    (`lg:-my-6 lg:scale-[1.05]`) so it visually pops in front of its
 *    neighbors, plus a stronger accent shadow/glow than any other GlassCard
 *    on the site uses. `flare` stays off — the accent border, badge, and
 *    scale already draw the eye; a cursor spotlight on top would compete
 *    with that instead of adding to it (same reasoning Session 10 used,
 *    just now the only card this applies to).
 *  - Every other tier is **intentionally not glass**: a plain flat
 *    surface (`bg-[var(--background)]`, simple hairline border, no
 *    backdrop-blur, no hover scale). This is the opposite of every other
 *    card grid on the site (ServicesGrid, FeatureGrid, CaseStudyCard all
 *    give every card equal glass treatment) — here the flatness is what
 *    makes the recommended tier read as obviously different by contrast,
 *    per Session 21's scope. Only interaction on hover is a subtle border
 *    tint toward the accent color — deliberately calm, no scale/shadow
 *    pop, consistent with this page's "no playful motion" rule.
 *
 * The "Most popular" badge is rendered in the *outer* wrapper, not inside
 * `GlassCard` — `GlassCard` is `overflow-hidden`, which would clip a
 * badge positioned at a negative top offset the way the pre-redesign
 * version did it.
 *
 * Price is null for the "Enterprise"-style tier (custom pricing, no number
 * to toggle) — renders "Custom" instead and ignores billingPeriod.
 */
export function PricingCard({
  name,
  tagline,
  monthlyPrice,
  annualPrice,
  billingPeriod,
  features,
  ctaLabel,
  ctaHref,
  highlighted = false,
}: PricingCardProps) {
  const isCustom = monthlyPrice === null || annualPrice === null;
  const price = billingPeriod === "monthly" ? monthlyPrice : annualPrice;

  const body = (
    <>
      <div>
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="mt-1 text-sm text-muted">{tagline}</p>
      </div>

      <div className="flex items-baseline gap-1">
        {isCustom ? (
          <span className="text-4xl font-semibold tracking-tight">Custom</span>
        ) : (
          <>
            <span className="text-4xl font-semibold tracking-tight">
              ${price?.toLocaleString()}
            </span>
            <span className="text-sm text-muted">
              /mo{billingPeriod === "annual" && ", billed annually"}
            </span>
          </>
        )}
      </div>

      <Link
        href={ctaHref}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors",
          highlighted
            ? "bg-accent text-white hover:bg-accent/90"
            : "border border-[var(--glass-border)] text-foreground hover:border-accent/50 hover:text-accent"
        )}
      >
        {ctaLabel}
      </Link>

      <ul className="flex flex-col gap-3 border-t border-[var(--glass-border)] pt-6 text-sm text-muted">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check
              size={16}
              className="mt-0.5 shrink-0 text-accent"
              aria-hidden
            />
            {feature}
          </li>
        ))}
      </ul>
    </>
  );

  if (highlighted) {
    return (
      <div className="relative lg:-my-6 lg:scale-[1.05]">
        <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white shadow-[0_4px_14px_var(--glass-shadow)]">
          Most popular
        </span>
        <GlassCard
          flare={false}
          className="flex h-full flex-col gap-6 border-accent p-8 shadow-[0_30px_80px_-20px_var(--accent)]"
        >
          {body}
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--background)] p-6 transition-colors duration-300 hover:border-accent/40">
      {body}
    </div>
  );
}
