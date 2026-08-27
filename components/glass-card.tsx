"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useHoverFlare } from "@/lib/use-hover-flare";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Disable the cursor-following flare spotlight (e.g. inside a list where
   * it would be too busy, or on very small cards). Default: enabled. */
  flare?: boolean;
  /** Disable the built-in CSS hover scale/shadow pop — set false when a
   * parent is driving its own Framer Motion hover animation (e.g. a lift +
   * border glow) and the two would otherwise fight each other. Independent
   * of `flare`, which still controls the spotlight. Default: enabled. */
  hoverScale?: boolean;
}

/**
 * Base glass-morphism surface used across the site. Reads the --glass-bg /
 * --glass-border / --glass-shadow tokens from globals.css so it themes
 * automatically with light/dark — never hardcode colors on top of this.
 *
 * Hover behavior (when flare=true, the default):
 *  - a radial-gradient spotlight that follows the cursor, via --x/--y set by
 *    useHoverFlare and consumed in globals.css (.glass-card::before)
 *
 * Hover behavior (when hoverScale=true, the default):
 *  - subtle scale-up pop + soft glow ring, via CSS transition
 *
 * Set hoverScale={false} when a consumer wants to drive its own Framer
 * Motion hover animation instead (see components/feature-grid.tsx for an
 * example) — flare can still be left on independently.
 *
 * All of the above respects prefers-reduced-motion globally (see
 * app/globals.css) — no per-component opt-out needed.
 */
export function GlassCard({
  children,
  flare = true,
  hoverScale = true,
  className,
  ...props
}: GlassCardProps) {
  const { ref, onPointerMove, onPointerLeave } = useHoverFlare<HTMLDivElement>();

  return (
    <div
      ref={flare ? ref : undefined}
      onPointerMove={flare ? onPointerMove : undefined}
      onPointerLeave={flare ? onPointerLeave : undefined}
      className={cn(
        "glass-card relative overflow-hidden rounded-2xl border p-6",
        "bg-[var(--glass-bg)] border-[var(--glass-border)]",
        "shadow-[0_8px_30px_var(--glass-shadow)]",
        "backdrop-blur-xl",
        hoverScale &&
          "transition-transform duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_12px_40px_var(--glass-shadow)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
