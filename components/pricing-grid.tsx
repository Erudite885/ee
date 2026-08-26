"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PricingCard } from "@/components/pricing-card";

type BillingPeriod = "monthly" | "annual";

const TIERS = [
  {
    name: "Starter",
    tagline: "For small teams shipping their first product.",
    monthlyPrice: 490,
    annualPrice: 392, // ~20% off, billed annually
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
    monthlyPrice: 1490,
    annualPrice: 1192,
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
 * Annual prices are precomputed per-tier (not derived with a shared
 * percentage at render time) so each tier can round to a clean number
 * instead of showing awkward cents.
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

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {TIERS.map((tier) => (
          <PricingCard key={tier.name} billingPeriod={period} {...tier} />
        ))}
      </div>
    </div>
  );
}
