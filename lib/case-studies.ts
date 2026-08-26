export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  /** Short paragraphs, rendered in order on the detail page. */
  challenge: string[];
  approach: string[];
  results: string[];
  metrics: CaseStudyMetric[];
}

/**
 * Static case study data source for Session 9. No CMS — a local TS array is
 * sufficient per the session scope. If a real CMS is ever wanted, that's a
 * decision to log in HANDOVER.md's Decision Log, not something to silently
 * swap in here.
 *
 * Placeholder client names deliberately match the LogoStrip (Session 5) and
 * Testimonials (Session 6) placeholder companies (Northwind, Globex, Vertex
 * Labs) for narrative consistency across the site — swap all three together
 * before launch.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "northwind-cloud-migration",
    client: "Northwind",
    industry: "Logistics",
    title: "Migrating a 12-year-old logistics platform off bare metal",
    summary:
      "A phased, zero-downtime migration off self-hosted infrastructure onto a modern cloud platform, cutting incident response time from hours to minutes.",
    challenge: [
      "Northwind's core dispatch platform had run on the same self-hosted racks for over a decade. Every hardware failure meant a multi-hour outage, and the on-call rotation had grown to dread pager alerts.",
      "A previous attempt at migration had been abandoned after six months when the team discovered undocumented dependencies between the dispatch service and a scheduling job that only one former employee understood.",
    ],
    approach: [
      "We started with a full dependency audit, mapping every service-to-service call before writing a single line of infrastructure code. This surfaced the scheduling job dependency that had stalled the earlier attempt.",
      "Migration ran in five phases over ten weeks, moving one service at a time behind a traffic-shifting proxy so any phase could be rolled back independently without affecting the rest of the platform.",
      "Infrastructure was rebuilt as code from day one, replacing years of manual server configuration with a reproducible, version-controlled setup.",
    ],
    results: [
      "The full migration completed with zero unplanned downtime across all five phases.",
      "Incident response time dropped sharply once the on-call team had proper observability and could roll back a single service instead of an entire deployment.",
      "Northwind's infrastructure costs came down as unused legacy capacity was decommissioned.",
    ],
    metrics: [
      { label: "Unplanned downtime", value: "0 hrs" },
      { label: "Incident response time", value: "-82%" },
      { label: "Infra cost", value: "-34%" },
    ],
  },
  {
    slug: "globex-platform-rebuild",
    client: "Globex",
    industry: "Fintech",
    title: "Rebuilding Globex's compliance pipeline for SOC 2 readiness",
    summary:
      "A ground-up rebuild of the data pipeline and access-control layer that took Globex from a failed audit to SOC 2 Type II certification in one cycle.",
    challenge: [
      "Globex had failed a SOC 2 readiness assessment the prior year. Access controls were inconsistent across services, and audit logging was incomplete for several of the systems handling customer financial data.",
      "The engineering team needed the fixes to ship without freezing feature development for the two other product lines sharing the same platform.",
    ],
    approach: [
      "We ran a full threat model and access audit first, then implemented centralized, role-based access control across every service touching customer data, replacing a patchwork of service-specific permission checks.",
      "Audit logging was rebuilt as a shared library so every team got compliant logging automatically rather than needing to implement it service by service.",
      "Work was scoped and shipped incrementally alongside the existing roadmap, with compliance-critical changes prioritized first and reviewed by Globex's security lead at each milestone.",
    ],
    results: [
      "Globex passed its SOC 2 Type II audit on the next cycle with zero major findings.",
      "The centralized access-control layer is now the default for every new service Globex ships, rather than something bolted on after the fact.",
      "Feature velocity on the two unrelated product lines was unaffected during the six-month engagement.",
    ],
    metrics: [
      { label: "Audit findings", value: "0 major" },
      { label: "Time to certification", value: "6 mo" },
      { label: "Feature velocity impact", value: "0%" },
    ],
  },
  {
    slug: "vertex-labs-data-platform",
    client: "Vertex Labs",
    industry: "Healthtech",
    title: "Turning a decade of scattered logs into a trusted data platform",
    summary:
      "Consolidating years of disconnected logs and spreadsheets into a single governed data warehouse that product and clinical teams both rely on daily.",
    challenge: [
      "Vertex Labs' analytics lived across a dozen disconnected sources: raw application logs, manually exported spreadsheets, and a handful of one-off dashboards nobody fully trusted anymore.",
      "Clinical and product teams were making decisions from different numbers for the same metric, and nobody could say with confidence which source was correct.",
    ],
    approach: [
      "We designed a single warehouse schema as the source of truth, then built ingestion pipelines to pull every existing data source into it on a consistent, documented schedule.",
      "A data governance layer was added on top — clear ownership per table, documented definitions for every metric, and automated data-quality checks that flag anomalies before they reach a dashboard.",
      "Dashboards were rebuilt on the new warehouse and rolled out team by team, retiring the old spreadsheet exports only once each team had confirmed the new numbers matched.",
    ],
    results: [
      "Vertex Labs now runs all reporting — clinical and product — from a single warehouse with documented, agreed-upon metric definitions.",
      "Manual spreadsheet exports were fully retired, removing a recurring source of reporting errors.",
      "New dashboards ship in days instead of weeks, since teams build on an existing governed schema rather than sourcing their own data each time.",
    ],
    metrics: [
      { label: "Data sources unified", value: "12 → 1" },
      { label: "Manual exports", value: "0" },
      { label: "New dashboard turnaround", value: "days" },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
