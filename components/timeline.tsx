interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

const TIMELINE: TimelineEntry[] = [
  {
    year: "2021",
    title: "Founded",
    description: "Started by three engineers frustrated with slow deploys.",
  },
  {
    year: "2022",
    title: "First 100 customers",
    description: "Grew entirely through word of mouth in our first year.",
  },
  {
    year: "2024",
    title: "Series A",
    description: "Raised funding to expand the platform and the team.",
  },
  {
    year: "2026",
    title: "Global infrastructure",
    description: "Now serving customers across 120+ countries.",
  },
];

/**
 * Vertical timeline for the company story. Left rail with a dot per entry,
 * connected by a line — pure CSS (border + absolute-positioned dots), no
 * animation library needed since this isn't meant to be flashy, just
 * readable. Content is placeholder company history.
 */
export function Timeline() {
  return (
    <ol className="relative border-l border-[var(--glass-border)] pl-8">
      {TIMELINE.map((entry) => (
        <li key={entry.year} className="mb-10 last:mb-0">
          <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            {entry.year}
          </span>
          <h3 className="mt-1 text-lg font-medium">{entry.title}</h3>
          <p className="mt-1 text-sm text-muted">{entry.description}</p>
        </li>
      ))}
    </ol>
  );
}
