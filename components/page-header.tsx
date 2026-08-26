interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

/**
 * Shared hero-style banner for interior pages (About, Services, Pricing,
 * etc). Deliberately lighter-weight than the home page Hero — no BubbleField,
 * no CTA buttons — this is a page title, not a landing moment. Every
 * interior-page session from here on (8+) should use this instead of
 * hand-rolling its own page title block.
 */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="border-b border-[var(--glass-border)] px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          {eyebrow}
        </span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-lg text-muted text-balance">{description}</p>
        )}
      </div>
    </section>
  );
}
