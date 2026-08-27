import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const TIER_NAMES = ["Starter", "Growth", "Enterprise"] as const;

type CellValue = boolean | string;

interface ComparisonRow {
  label: string;
  values: readonly [CellValue, CellValue, CellValue];
}

const ROWS: readonly ComparisonRow[] = [
  { label: "Engineers", values: ["Up to 5", "Up to 20", "Unlimited"] },
  {
    label: "Architecture review cadence",
    values: ["Quarterly", "Monthly", "Custom cadence"],
  },
  {
    label: "Incident response",
    values: ["Email, 2 business days", "24/5 on-call", "24/7 on-call"],
  },
  { label: "Dedicated engagement lead", values: [false, true, true] },
  { label: "Cloud migration & DevOps support", values: [false, true, true] },
  {
    label: "Security & compliance readiness (SOC 2 / ISO 27001)",
    values: [false, false, true],
  },
  { label: "Custom SLAs", values: [false, false, true] },
  { label: "Dedicated data & analytics support", values: [false, false, true] },
];

function Cell({ value }: { value: CellValue }) {
  if (typeof value === "string") {
    return <span className="text-sm text-foreground">{value}</span>;
  }
  return value ? (
    <Check size={18} className="mx-auto text-accent" aria-label="Included" />
  ) : (
    <Minus
      size={18}
      className="mx-auto text-muted/50"
      aria-label="Not included"
    />
  );
}

/**
 * Session 21: new component — despite HANDOVER's Session 21 scope
 * referring to restyling "the comparison table," no such table existed in
 * the repo (Session 10, which built the pricing page, only ever added the
 * monthly/annual toggle — see its own entry above). Flagging this the same
 * way Session 19 flagged its footer mismatch, so nobody goes looking for a
 * pre-existing table that was never built. Built fresh here instead of
 * treating "restyled to match" as optional.
 *
 * Deliberately flat/plain, same as the two non-highlighted PricingCards:
 * no backdrop-blur, no ambient motion — this page's "calm, not playful"
 * rule (Session 21 scope) isn't scoped to just the cards, so the table
 * follows the same restraint. The Growth column gets a subtle
 * `bg-accent/5` tint (no blur, no scale) to echo the popped-out middle
 * card above without reintroducing glass or motion here.
 */
export function PricingComparisonTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--glass-border)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--glass-border)]">
              <th scope="col" className="p-5 text-sm font-medium text-muted">
                Compare plans
              </th>
              {TIER_NAMES.map((name) => (
                <th
                  key={name}
                  scope="col"
                  className={cn(
                    "p-5 text-center text-sm font-semibold tracking-tight",
                    name === "Growth" && "bg-accent/5"
                  )}
                >
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr
                key={row.label}
                className="border-b border-[var(--glass-border)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="p-5 text-sm font-normal text-muted"
                >
                  {row.label}
                </th>
                {row.values.map((value, index) => (
                  <td
                    key={TIER_NAMES[index]}
                    className={cn(
                      "p-5 text-center",
                      TIER_NAMES[index] === "Growth" && "bg-accent/5"
                    )}
                  >
                    <Cell value={value} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
