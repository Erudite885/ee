"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  /** Only starts counting once this becomes true (drive it from
   * useInView). Never restarts once it has run, even if this toggles back
   * to false — a stat counter that re-triggers every scroll is annoying. */
  start: boolean;
  duration?: number; // ms
  decimals?: number;
}

/**
 * Hand-rolled requestAnimationFrame counter, 0 -> target, ease-out cubic.
 * Chosen over a dedicated counting library (e.g. react-countup) per Session
 * 17's "decide and log" — this is small enough that a tiny hook avoids an
 * extra dependency for something this size. See Decision Log in
 * HANDOVER.md.
 *
 * Callers are responsible for reduced-motion handling: pass
 * `start: false` and render the target value directly when
 * useReducedMotion() is true, rather than relying on this hook to detect
 * it (see components/stats-band.tsx for the pattern).
 */
export function useCountUp(target: number, { start, duration = 2600, decimals = 0 }: UseCountUpOptions) {
  const [value, setValue] = useState(0);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!start || hasRunRef.current) return;
    hasRunRef.current = true;

    let raf: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Number((target * eased).toFixed(decimals)));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, decimals]);

  return value;
}
