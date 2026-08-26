"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Bubble {
  size: number; // px
  top: string; // % or css value
  left: string;
  color: "var(--bubble-1)" | "var(--bubble-2)";
  duration: number; // seconds, one full drift cycle
  delay: number;
}

const DEFAULT_BUBBLES: Bubble[] = [
  { size: 420, top: "-10%", left: "-8%", color: "var(--bubble-1)", duration: 22, delay: 0 },
  { size: 320, top: "40%", left: "70%", color: "var(--bubble-2)", duration: 26, delay: 2 },
  { size: 260, top: "70%", left: "10%", color: "var(--bubble-2)", duration: 18, delay: 1 },
  { size: 200, top: "5%", left: "55%", color: "var(--bubble-1)", duration: 20, delay: 4 },
];

interface BubbleFieldProps {
  className?: string;
  bubbles?: Bubble[];
}

/**
 * Ambient decorative background: soft blurred gradient circles that slowly
 * drift. Purely decorative (aria-hidden), absolutely positioned, meant to sit
 * behind content with a relatively-positioned parent (e.g. Hero section).
 *
 * Respects prefers-reduced-motion by disabling drift entirely and rendering
 * the bubbles static — framer-motion's useReducedMotion() plus the global
 * CSS reduced-motion block in globals.css both contribute belt-and-braces
 * coverage here.
 */
export function BubbleField({ className, bubbles = DEFAULT_BUBBLES }: BubbleFieldProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: bubble.size,
            height: bubble.size,
            top: bubble.top,
            left: bubble.left,
            background: `radial-gradient(circle at 30% 30%, ${bubble.color}, transparent 70%)`,
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -30, 0, 30, 0],
                  x: [0, 20, 0, -20, 0],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: bubble.duration,
                  delay: bubble.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
}
