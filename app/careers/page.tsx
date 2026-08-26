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

      {/* Culture / values */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-2xl font-semibold tracking-tight">
          How we work
        </h2>
        <p className="mt-4 text-muted">
          We don&apos;t do ping-pong tables or mandatory fun. We do trust,
          autonomy, and a shared obsession with making things that work. Every
          decision traces back to one question: does this help our customers
          ship better software, faster?
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-base font-medium">Remote-first, not remote-only</h3>
            <p className="mt-2 text-sm text-muted">
              We hire across time zones, not zip codes. Async by default,
              synchronous when it matters. Results over hours.
            </p>
          </div>
          <div>
            <h3 className="text-base font-medium">Deep work, shallow meetings</h3>
            <p className="mt-2 text-sm text-muted">
              Most weeks have two standing meetings. Everything else is
              written, reviewed, and decided in docs — not conference rooms.
            </p>
          </div>
          <div>
            <h3 className="text-base font-medium">Own the outcome</h3>
            <p className="mt-2 text-sm text-muted">
              Small teams, clear ownership. You&apos;ll know exactly what
              you&apos;re responsible for and have the authority to ship it.
            </p>
          </div>
          <div>
            <h3 className="text-base font-medium">Grow in public</h3>
            <p className="mt-2 text-sm text-muted">
              We write, speak, and open-source what we learn. Your growth
              here is documented and shareable, not locked inside a
              private wiki.
            </p>
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
