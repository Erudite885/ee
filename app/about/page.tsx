import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Timeline } from "@/components/timeline";
import { TeamGrid } from "@/components/team-grid";

export const metadata: Metadata = {
  title: "About | Company Name",
  description: "Our story, mission, and the team building the platform.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="About us"
        title="Building the infrastructure ambitious teams run on"
        description="We started with a simple frustration: shipping software took too long. Everything we build traces back to fixing that."
      />

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-2xl font-semibold tracking-tight">Our mission</h2>
        <p className="mt-4 text-muted">
          We believe great software shouldn&apos;t require great pain to
          build. Our mission is to give engineering teams infrastructure that
          gets out of their way — secure by default, fast to adopt, and
          built to scale without a rewrite.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="text-2xl font-semibold tracking-tight">Our story</h2>
        <div className="mt-8">
          <Timeline />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="text-2xl font-semibold tracking-tight text-center">
          Leadership
        </h2>
        <div className="mt-10">
          <TeamGrid />
        </div>
      </section>
    </main>
  );
}
