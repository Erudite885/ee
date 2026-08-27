"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PricingCard } from "@/components/pricing-card";
import { PricingComparisonTable } from "@/components/pricing-comparison-table";

type BillingPeriod = "monthly" | "annual";

/**
 * Session 21 decision (see Decision Log in HANDOVER.md): kept the
 * Starter / Growth / Enterprise naming — it already read as professional
 * and consistent with a services company, so the redesign is the numbers,
 * the feature lists, and the card treatment, not the names. Prices bumped
 * from the Session 10 placeholders to figures that read as a real
 * mid-market engineering services company rather than a SaaS seat price
 * (this is bodies/scope, not per-seat software). Annual prices remain
 * precomputed per-tier (~20% off, rounded to a clean number) rather than
 * derived from a shared percentage at render time.
 */
const TIERS = [
  {
    name: "Starter",
    tagline: "For small teams shipping their first product.",
    monthlyPrice: 1200,
    annualPrice: 960,
    features: [
      "Up to 5 engineers",
      "Core product engineering",
      "CI/CD pipeline setup",
      "Email support, 2 business-day response",
      "Quarterly architecture review",
    ],
    ctaLabel: "Get started",
    ctaHref: "/contact",
    highlighted: false,
  },
  {
    name: "Growth",
    tagline: "For scaling teams that need a dedicated partner.",
    monthlyPrice: 3500,
    annualPrice: 2800,
    features: [
      "Up to 20 engineers",
      "Everything in Starter",
      "Dedicated engagement lead",
      "Cloud migration & DevOps support",
      "24/5 on-call incident response",
      "Monthly architecture review",
    ],
    ctaLabel: "Get started",
    ctaHref: "/contact",
    highlighted: true,
  },
  {
    name: "Enterprise",
    tagline: "For organizations with complex, large-scale needs.",
    monthlyPrice: null,
    annualPrice: null,
    features: [
      "Unlimited engineers",
      "Everything in Growth",
      "Security & compliance readiness (SOC 2 / ISO 27001)",
      "24/7 on-call incident response",
      "Custom SLAs",
      "Dedicated data & analytics support",
    ],
    ctaLabel: "Talk to sales",
    ctaHref: "/contact",
    highlighted: false,
  },
] as const;

/**
 * Pricing page tier grid + monthly/annual toggle (Session 10 decision:
 * toggle added — see Decision Log in HANDOVER.md). State lives here rather
 * than in the page component so the page itself can stay a plain server
 * component; this is the only client boundary the pricing page needs.
 *
 * Session 21: `items-center` added to the grid so the Growth card's
 * `lg:scale-[1.05] lg:-my-6` (see PricingCard) pops out symmetrically
 * against its two flat, unscaled neighbors instead of stretching them to
 * match its height. `pt-3` added above the grid so the "Most popular"
 * badge — now positioned in PricingCard's outer wrapper instead of inside
 * the clipped GlassCard — has room to sit above the card without being cut
 * off by the section boundary.
 */
export function PricingGrid() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  return (
    <div>
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] p-1 backdrop-blur-xl">
          {(["monthly", "annual"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setPeriod(option)}
              aria-pressed={period === option}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors",
                period === option
                  ? "bg-accent text-white"
                  : "text-muted hover:text-foreground"
              )}
            >
              {option}
              {option === "annual" && (
                <span
                  className={cn(
                    "ml-1.5 text-xs",
                    period === option ? "text-white/80" : "text-accent"
                  )}
                >
                  Save 20%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid items-center gap-6 pt-3 lg:grid-cols-3">
        {TIERS.map((tier) => (
          <PricingCard key={tier.name} billingPeriod={period} {...tier} />
        ))}
      </div>

      <div className="mt-24">
        <h2 className="text-center text-2xl font-semibold tracking-tight">
          Compare plans in detail
        </h2>
        <div className="mt-8">
          <PricingComparisonTable />
        </div>
      </div>
    </div>
  );
}
