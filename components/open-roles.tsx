import Link from "next/link";
import { Building2, MapPin, Clock, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/glass-card";
import { OPEN_ROLES } from "@/lib/careers";

/**
 * Careers page open-roles list. 2-column grid of GlassCards, one per role.
 * Requirements use the same bulleted-dot pattern as ServicesGrid (Session 8)
 * for visual consistency across interior pages.
 */
export function OpenRoles() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {OPEN_ROLES.map((role) => (
        <GlassCard key={role.title} className="flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-medium">{role.title}</h3>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Building2 size={14} />
                {role.department}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} />
                {role.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} />
                {role.type}
              </span>
            </div>
          </div>

          <p className="text-sm text-muted">{role.description}</p>

          <ul className="flex flex-col gap-2 border-t border-[var(--glass-border)] pt-4 text-sm text-muted">
            {role.requirements.map((req) => (
              <li key={req} className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                />
                {req}
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-2"
          >
            Apply for this role
            <ArrowRight size={14} />
          </Link>
        </GlassCard>
      ))}
    </div>
  );
}
