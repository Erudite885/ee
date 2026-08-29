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
 *
 * Session 28: fixed mobile responsiveness. The table already had
 * `overflow-x-auto` + `min-w-[640px]`, so it technically scrolled — but on
 * a narrow viewport that let the row-label column ("Engineers",
 * "Architecture review cadence", etc.) scroll away along with everything
 * else. Swipe right to see the Enterprise column and you'd lose track of
 * which row you were even looking at. Fix: the label column (both the
 * header corner cell and each row's `<th scope="row">`) is now
 * `sticky left-0` with an opaque `var(--background)` fill and a fixed
 * width, so it stays pinned in view while the tier columns scroll
 * underneath it. A `z-index` ladder (label column above body cells, header
 * row above body rows) keeps the sticky corner cell correctly on top where
 * the sticky column and the header row overlap. A subtle gradient fade on
 * the trailing edge hints that the table scrolls, since a plain cut-off
 * edge otherwise gives no visual cue there's more to the right.
 */
export function PricingComparisonTable() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--glass-border)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="relative z-20 border-b border-[var(--glass-border)]">
              <th
                scope="col"
                className="sticky left-0 z-30 w-[140px] bg-[var(--background)] p-5 text-sm font-medium text-muted sm:w-[220px]"
              >
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
                  className="sticky left-0 z-10 w-[140px] bg-[var(--background)] p-5 text-sm font-normal text-muted sm:w-[220px]"
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[var(--background)] to-transparent"
      />
    </div>
  );
}
