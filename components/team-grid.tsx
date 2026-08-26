import { GlassCard } from "@/components/glass-card";

const TEAM = [
  { name: "Alex Rivera", role: "CEO & Co-founder" },
  { name: "Sam Okafor", role: "CTO & Co-founder" },
  { name: "Jordan Lee", role: "VP of Product" },
  { name: "Taylor Brooks", role: "VP of Engineering" },
];

/**
 * Leadership grid. No headshot images exist yet, so each card uses an
 * initials avatar (accent-tinted circle) rather than an <Image> placeholder
 * — swap for real photos when available, no structural change needed.
 * Names/roles are placeholder.
 */
export function TeamGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {TEAM.map(({ name, role }) => {
        const initials = name
          .split(" ")
          .map((part) => part[0])
          .join("");

        return (
          <GlassCard key={name} className="flex flex-col items-center text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-lg font-semibold text-accent">
              {initials}
            </span>
            <h3 className="mt-4 text-base font-medium">{name}</h3>
            <p className="mt-1 text-sm text-muted">{role}</p>
          </GlassCard>
        );
      })}
    </div>
  );
}
