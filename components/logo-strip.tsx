const TRUSTED_BY = [
  "Northwind",
  "Initech",
  "Globex",
  "Umbra",
  "Vertex Labs",
  "Fabrikam",
];

/**
 * Trust/logo strip. No actual client logo image assets exist yet, so this
 * renders wordmarks (muted, monospace) rather than <Image> placeholders —
 * swap in real logo SVGs here once the company has real clients to name, no
 * structural change needed.
 */
export function LogoStrip() {
  return (
    <section className="border-y border-[var(--glass-border)] py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-muted">
          Trusted by teams at
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {TRUSTED_BY.map((name) => (
            <li
              key={name}
              className="text-sm font-medium tracking-wide text-muted opacity-70 transition-opacity hover:opacity-100"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
