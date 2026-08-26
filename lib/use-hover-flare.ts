"use client";

import { useCallback, useRef } from "react";

/**
 * Tracks pointer position over an element and writes it to CSS custom
 * properties (--x, --y, as percentages) so a radial-gradient "flare" can
 * follow the cursor in pure CSS. No re-renders — values are written
 * directly to the DOM via ref.
 *
 * Usage:
 *   const flareRef = useHoverFlare<HTMLDivElement>();
 *   <div ref={flareRef} className="glass-flare" />
 *
 * Consumers should read var(--x) / var(--y) in a background-image
 * radial-gradient(circle at var(--x) var(--y), ...). Do nothing on touch
 * devices or when prefers-reduced-motion is set — the flare is a decorative
 * enhancement, not a functional affordance.
 */
export function useHoverFlare<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  const handlePointerMove = useCallback((event: React.PointerEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    if (event.pointerType !== "mouse") return; // skip touch/pen "hover" quirks

    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    el.style.setProperty("--x", `${x}%`);
    el.style.setProperty("--y", `${y}%`);
  }, []);

  const handlePointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--x", "50%");
    el.style.setProperty("--y", "50%");
  }, []);

  return { ref, onPointerMove: handlePointerMove, onPointerLeave: handlePointerLeave };
}
