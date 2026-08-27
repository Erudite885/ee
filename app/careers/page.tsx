import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { OpenRoles } from "@/components/open-roles";

export const metadata: Metadata = {
  title: "Careers | Company Name",
  description:
    "Join a remote-first team building infrastructure that ambitious software teams rely on. Open roles in engineering, design, security, and customer success.",
};

export default function CareersPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Careers"
        title="Build with us"
        description="We're a remote-first team of engineers, designers, and operators who believe great software shouldn't require great pain to build."
      />

      {/* Culture / values — Session 22: condensed from a full section with
          four h3+p blocks into a single compact glass banner of short
          labeled pills. The role feed below is now the page's main focus
          per Session 22 scope; this still carries the same four values,
          just as supporting context instead of competing real estate. */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 backdrop-blur-xl sm:p-8">
          <p className="text-sm text-muted">
            We don&apos;t do ping-pong tables or mandatory fun. We do trust,
            autonomy, and a shared obsession with making things that work.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Remote-first, not remote-only",
              "Deep work, shallow meetings",
              "Own the outcome",
              "Grow in public",
            ].map((value) => (
              <span
                key={value}
                className="rounded-full border border-[var(--glass-border)] bg-[var(--background)] px-3 py-1.5 text-xs font-medium text-foreground"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Open roles
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Current openings
          </h2>
          <p className="mt-4 text-muted">
            Don&apos;t see a perfect fit? We&apos;re always open to exceptional
            people.
            {" "}
            <a
              href="/contact"
              className="text-accent transition-colors hover:text-accent-2"
            >
              Get in touch
            </a>
            {" "}
            and tell us what you&apos;d build here.
          </p>
        </div>
        <OpenRoles />
      </section>
    </main>
  );
}
