export interface Role {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

/**
 * Static open-roles data. Plain TS array — no ATS integration per Session 11
 * scope. "Apply" links route to /contact until a real ATS is wired up.
 */
export const OPEN_ROLES: Role[] = [
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Own the component architecture behind our customer-facing dashboards, working closely with design on motion and accessibility.",
    requirements: [
      "5+ years building production React applications",
      "Strong eye for interaction detail and accessibility",
      "Comfortable owning a feature from design handoff to release",
    ],
  },
  {
    title: "Platform Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Build and operate the CI/CD and infrastructure-as-code tooling our client teams deploy through every day.",
    requirements: [
      "Experience with Terraform or equivalent IaC tooling",
      "Deep familiarity with Kubernetes and container orchestration",
      "On-call rotation experience in a production environment",
    ],
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description:
      "Shape the interfaces for our internal tooling and client-facing products, from early concept through shipped feature.",
    requirements: [
      "Portfolio showing end-to-end product design work",
      "Fluency in Figma and collaborative design systems",
      "Comfortable presenting and defending design decisions",
    ],
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote (US/EU overlap)",
    type: "Full-time",
    description:
      "Be the primary point of contact for a portfolio of enterprise accounts, from onboarding through renewal.",
    requirements: [
      "3+ years in B2B SaaS customer success or account management",
      "Comfortable reading technical documentation and escalating clearly",
      "Track record of driving renewals and expansion",
    ],
  },
  {
    title: "Security Engineer",
    department: "Security",
    location: "Remote",
    type: "Full-time",
    description:
      "Lead security audits and threat modeling for client engagements, and harden our own internal systems.",
    requirements: [
      "Experience with SOC 2 or ISO 27001 audit preparation",
      "Strong grasp of access control and secrets management",
      "Comfortable communicating risk to non-technical stakeholders",
    ],
  },
  {
    title: "Technical Writer",
    department: "Marketing",
    location: "Remote",
    type: "Contract",
    description:
      "Turn engineering work into case studies, documentation, and long-form technical content that engineers actually want to read.",
    requirements: [
      "Portfolio of technical writing for a developer audience",
      "Able to interview engineers and extract a clear narrative",
      "Comfortable working async with a distributed team",
    ],
  },
];
