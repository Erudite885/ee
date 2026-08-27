const TRUSTED_BY = [
  { name: "Northwind", color: "#6366f1" },
  { name: "Globex", color: "#22d3ee" },
  { name: "Vertex Labs", color: "#a855f7" },
  { name: "Initech", color: "#f97316" },
  { name: "Umbra", color: "#ec4899" },
  { name: "Fabrikam", color: "#14b8a6" },
  { name: "Solstice Data", color: "#eab308" },
  { name: "Ironclad Systems", color: "#3b82f6" },
  { name: "Meridian Cloud", color: "#f43f5e" },
  { name: "Pinnacle Labs", color: "#10b981" },
];

function LogoBadge({
  name,
  color,
  decorative = false,
}: {
  name: string;
  color: string;
  decorative?: boolean;
}) {
  return (
    <li
      className="flex shrink-0 items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-5 py-2.5 backdrop-blur-xl"
      aria-hidden={decorative || undefined}
    >
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 12px 1px ${color}` }}
      />
      <span className="text-sm font-medium tracking-wide whitespace-nowrap">
        {name}
      </span>
    </li>
  );
}

/**
 * Trust/logo strip. Session 16 revamp: seamless infinite horizontal
 * marquee (CSS keyframe, see .marquee-track in globals.css) instead of a
 * static wrapped row. No real client logo assets exist, so each entry is a
 * colored dot + wordmark badge — vibrant and distinct per company rather
 * than uniform muted text, so the strip reads as lively. The track list is
 * rendered twice back to back so the -50% scroll loops with an invisible
 * seam; screen readers only see one real list (aria-hidden duplicate).
 */
export function LogoStrip() {
  return (
    <section className="overflow-hidden">
      {/* <div className="mx-auto max-w-6xl px-6">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-muted">
          Trusted by teams at
        </p>
      </div> */}

      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="marquee-track flex w-max items-center gap-4">
          {TRUSTED_BY.map((company) => (
            <LogoBadge key={`a-${company.name}`} {...company} />
          ))}
          {TRUSTED_BY.map((company) => (
            <LogoBadge key={`b-${company.name}`} {...company} decorative />
          ))}
        </ul>
      </div>
    </section>
  );
}
