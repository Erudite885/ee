const STATS = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "40M+", label: "Requests served daily" },
  { value: "120+", label: "Countries with active users" },
  { value: "<50ms", label: "Median API response time" },
];

/**
 * Metrics band. Plain section (not a GlassCard grid) — a solid/subtle band
 * reads better here than four separate glass cards, since these are meant to
 * feel like one continuous stat bar rather than discrete content pieces.
 */
export function StatsBand() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <dl className="grid grid-cols-2 gap-8 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-10 backdrop-blur-xl sm:grid-cols-4">
        {STATS.map(({ value, label }) => (
          <div key={label} className="text-center">
            <dt className="sr-only">{label}</dt>
            <dd className="text-3xl font-semibold tracking-tight text-accent sm:text-4xl">
              {value}
            </dd>
            <p className="mt-2 text-sm text-muted">{label}</p>
          </div>
        ))}
      </dl>
    </section>
  );
}
