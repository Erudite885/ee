import { Mail, MapPin, Clock } from "lucide-react";
import { GlassCard } from "@/components/glass-card";

const OFFICES = [
  { city: "San Francisco, CA", label: "HQ" },
  { city: "Berlin, Germany", label: "Engineering hub" },
  { city: "Remote", label: "Everywhere else" },
];

/**
 * Static office/contact info sidebar, sits next to ContactForm on /contact.
 * Reuses hello@company.com — the same placeholder address already used in
 * the footer's email link, kept consistent rather than inventing a second one.
 */
export function OfficeInfo() {
  return (
    <GlassCard flare={false} className="flex flex-col gap-8">
      <div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Mail size={18} />
        </span>
        <h3 className="mt-4 text-base font-medium">Email us directly</h3>
        <a
          href="mailto:hello@company.com"
          className="mt-1 block text-sm text-accent hover:underline"
        >
          hello@company.com
        </a>
      </div>

      <div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Clock size={18} />
        </span>
        <h3 className="mt-4 text-base font-medium">Response time</h3>
        <p className="mt-1 text-sm text-muted">
          We reply to every message within one business day.
        </p>
      </div>

      <div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
          <MapPin size={18} />
        </span>
        <h3 className="mt-4 text-base font-medium">Offices</h3>
        <ul className="mt-2 flex flex-col gap-1.5">
          {OFFICES.map((office) => (
            <li key={office.city} className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-muted">{office.city}</span>
              <span className="text-xs text-muted/70">{office.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  );
}
