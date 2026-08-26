import {
  Boxes,
  Cloud,
  Database,
  LifeBuoy,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { GlassCard } from "@/components/glass-card";

const SERVICES = [
  {
    icon: Wrench,
    title: "Product Engineering",
    description:
      "End-to-end build teams that take a product from first prototype to a maintainable, production-grade codebase.",
    includes: [
      "Full-stack web & API development",
      "Design systems & component libraries",
      "Technical architecture reviews",
    ],
  },
  {
    icon: Boxes,
    title: "Platform & DevOps",
    description:
      "CI/CD pipelines, infrastructure-as-code, and observability so releases are routine instead of an event.",
    includes: [
      "CI/CD pipeline design",
      "Infrastructure as code (Terraform)",
      "Monitoring, logging & alerting",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Migration",
    description:
      "Move off legacy infrastructure without downtime, with a rollback plan for every step of the way.",
    includes: [
      "Legacy system assessment",
      "Phased, zero-downtime migration",
      "Cost & performance tuning post-migration",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    description:
      "Get to SOC 2 or ISO 27001 readiness with security built into the pipeline, not bolted on after an audit.",
    includes: [
      "Security audits & threat modeling",
      "SOC 2 / ISO 27001 readiness",
      "Encryption, access control & secrets management",
    ],
  },
  {
    icon: Database,
    title: "Data & Analytics",
    description:
      "Turn scattered logs and tables into a data platform your team actually trusts and queries daily.",
    includes: [
      "Data pipeline & warehouse design",
      "Dashboarding & reporting",
      "Data quality & governance",
    ],
  },
  {
    icon: LifeBuoy,
    title: "Managed Support",
    description:
      "An on-call team that knows your stack, so incidents get resolved in minutes, not escalated for days.",
    includes: [
      "24/7 on-call incident response",
      "SLA-backed uptime guarantees",
      "Quarterly architecture check-ins",
    ],
  },
];

/**
 * Services page offering grid. One GlassCard per offering, per Session 8
 * scope — heavier than FeatureGrid's cards (adds an "includes" bullet list),
 * so this is its own component rather than reusing FeatureGrid directly.
 */
export function ServicesGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map(({ icon: Icon, title, description, includes }) => (
        <GlassCard key={title} className="flex flex-col gap-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Icon size={20} />
          </span>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-muted">{description}</p>
          <ul className="mt-auto flex flex-col gap-2 border-t border-[var(--glass-border)] pt-4 text-sm text-muted">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                />
                {item}
              </li>
            ))}
          </ul>
        </GlassCard>
      ))}
    </div>
  );
}
