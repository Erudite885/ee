"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  Building2,
  Clock,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { OPEN_ROLES } from "@/lib/careers";

const DEPARTMENTS = ["All departments", ...new Set(OPEN_ROLES.map((r) => r.department))];
const LOCATIONS = ["All locations", ...new Set(OPEN_ROLES.map((r) => r.location))];

/**
 * Feed-style filter bar above the role list. Session 22 scope explicitly
 * allows this to be non-functional UI-only chrome if wiring real filtering
 * isn't in scope — it isn't here: the `<select>`s below are uncontrolled
 * and don't touch `OPEN_ROLES`. Real filtering (controlled selects +
 * derived list) would be a natural follow-up session, not bundled in here
 * to keep this session's diff focused on the feed layout itself.
 */
function RoleFilterBar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-3 backdrop-blur-xl sm:flex-row sm:items-center">
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--background)] px-3 py-2">
        <Search size={16} className="shrink-0 text-muted" aria-hidden />
        <input
          type="text"
          placeholder="Search open roles"
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
        />
      </div>
      <div className="flex gap-3">
        <select
          className="rounded-xl border border-[var(--glass-border)] bg-[var(--background)] px-3 py-2 text-sm text-foreground outline-none"
          defaultValue={DEPARTMENTS[0]}
          aria-label="Filter by department"
        >
          {DEPARTMENTS.map((department) => (
            <option key={department}>{department}</option>
          ))}
        </select>
        <select
          className="rounded-xl border border-[var(--glass-border)] bg-[var(--background)] px-3 py-2 text-sm text-foreground outline-none"
          defaultValue={LOCATIONS[0]}
          aria-label="Filter by location"
        >
          {LOCATIONS.map((location) => (
            <option key={location}>{location}</option>
          ))}
        </select>
        <span className="hidden items-center gap-1.5 text-xs text-muted sm:inline-flex">
          <SlidersHorizontal size={14} aria-hidden />
          {OPEN_ROLES.length} open roles
        </span>
      </div>
    </div>
  );
}

function RoleRow({ role }: { role: (typeof OPEN_ROLES)[number] }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col gap-4 border-b border-[var(--glass-border)] py-6 last:border-b-0 sm:flex-row sm:items-start">
      {/* Company mark placeholder — same posting company across every row,
          so this is a fixed mark rather than per-role logo art. */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 font-mono text-sm font-semibold text-accent ring-1 ring-accent/20">
        CN
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Link
            href="/contact"
            className="text-base font-medium tracking-tight text-foreground transition-colors hover:text-accent"
          >
            {role.title}
          </Link>
          <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            Actively hiring
          </span>
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Building2 size={14} aria-hidden />
            {role.department}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} aria-hidden />
            {role.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} aria-hidden />
            {role.type}
          </span>
          <span className="text-muted/70">{role.postedLabel}</span>
        </div>

        <p className="mt-3 text-sm text-muted">{role.description}</p>

        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-muted">
          {role.requirements.map((req) => (
            <li key={req} className="flex items-start gap-1.5">
              <span
                aria-hidden
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
              />
              {req}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Apply now
        </Link>
        <button
          type="button"
          onClick={() => setSaved((prev) => !prev)}
          aria-pressed={saved}
          aria-label={saved ? "Remove from saved roles" : "Save this role"}
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--glass-border)] transition-colors",
            saved ? "text-accent" : "text-muted hover:text-foreground"
          )}
        >
          <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}

/**
 * Careers page open-roles list. Session 22 redesign: replaced the 2-column
 * grid-of-GlassCards from Session 11 with a job-board-feed layout — each
 * role is a single-column row (logo mark, title as primary click target,
 * metadata line, description, requirement tags) instead of an isolated
 * card, plus a non-functional search/filter bar above the list and a
 * per-role save/bookmark toggle (see RoleFilterBar and RoleRow above for
 * what is and isn't wired up).
 *
 * Deliberately not built on GlassCard per-row — a feed reads as one
 * continuous list, not a grid of isolated surfaces, so the whole list sits
 * inside one flat bordered container with row dividers instead of six
 * separate glass cards competing for attention.
 */
export function OpenRoles() {
  return (
    <div className="flex flex-col gap-6">
      <RoleFilterBar />
      <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--background)] px-6">
        {OPEN_ROLES.map((role) => (
          <RoleRow key={role.title} role={role} />
        ))}
      </div>
    </div>
  );
}
