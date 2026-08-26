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
 * Single pricing tier card. Built on GlassCard like every other card in the
 * site (ServicesGrid, CaseStudyCard), with flare disabled on the highlighted
 * tier — it already stands out via the accent border/badge, and the cursor
 * spotlight competes with that rather than adding to it.
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

  return (
    <GlassCard
      flare={!highlighted}
      className={cn(
        "relative flex flex-col gap-6",
        highlighted && "border-accent shadow-[0_12px_40px_var(--glass-shadow)]"
      )}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
          Most popular
        </span>
      )}

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
          "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90",
          highlighted
            ? "bg-accent text-white"
            : "border border-[var(--glass-border)] text-foreground"
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
    </GlassCard>
  );
}
