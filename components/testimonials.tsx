import { Quote } from "lucide-react";
import { GlassCard } from "@/components/glass-card";

const TESTIMONIALS = [
  {
    quote:
      "We cut our deployment time from days to minutes without changing how our team works.",
    name: "Dana Whitfield",
    role: "VP Engineering, Northwind",
  },
  {
    quote:
      "The migration was the smoothest infrastructure change we've ever made — zero downtime, zero surprises.",
    name: "Marcus Iyer",
    role: "CTO, Globex",
  },
  {
    quote:
      "Support response time alone would justify the switch. The platform itself is just a bonus.",
    name: "Priya Ramachandran",
    role: "Head of Platform, Vertex Labs",
  },
];

/**
 * Testimonial section — one GlassCard per quote. Names/roles/companies are
 * placeholder (paired with the placeholder LogoStrip companies from Session
 * 5 where it made sense) — swap for real customer quotes before launch.
 */
export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          What customers say
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Loved by teams who ship
        </h2>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map(({ quote, name, role }) => (
          <GlassCard key={name} className="flex flex-col gap-4">
            <Quote size={22} className="text-accent" />
            <p className="text-sm text-foreground">&ldquo;{quote}&rdquo;</p>
            <div className="mt-auto pt-2">
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-muted">{role}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
