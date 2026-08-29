"use client";

import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, Sparkles } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { GlassCard } from "@/components/glass-card";
import type { BlogPostMeta } from "@/lib/blog";
import { formatPostDate } from "@/lib/format";

interface BlogCardProps {
  post: BlogPostMeta;
}

// Same hover-lift precedent as FeatureGrid (Session 17) / ServicesGrid
// (Session 20) — explicitly typed as Variants for the same reason (an
// inferred literal widens `ease` to `string`, which fails Framer Motion's
// stricter Easing type).
const cardLift: Variants = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.25, ease: "easeOut" } },
};

/**
 * Blog index card. Session 23: brought up to the same hover-lift + border
 * glow standard as FeatureGrid/ServicesGrid (GlassCard's own CSS hover
 * scale disabled via `hoverScale={false}` so it doesn't fight the Framer
 * Motion lift), stronger tag styling (ring instead of a flat tint), and an
 * explicit date/reading-time row with icons instead of bare text.
 *
 * Still the same stretched-link pattern as CaseStudyCard (Session 9): an
 * absolutely-positioned `<Link>` makes the whole card clickable. It's
 * declared before the rest of the content so later siblings still receive
 * pointer events for anything that needs its own interaction — not needed
 * here today, but keeps the precedent consistent with CaseStudyCard.
 */
export function BlogCard({ post }: BlogCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="rest"
      whileHover={shouldReduceMotion ? undefined : "hover"}
      animate="rest"
      variants={shouldReduceMotion ? undefined : cardLift}
    >
      <GlassCard
        hoverScale={false}
        className="relative flex h-full flex-col gap-3 transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_20px_60px_-15px_var(--accent)]"
      >
        <Link href={`/blog/${post.slug}`} className="absolute inset-0" aria-label={post.title}>
          <span className="sr-only">Read {post.title}</span>
        </Link>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent ring-1 ring-accent/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-medium text-balance">{post.title}</h3>
        <p className="text-sm text-muted">{post.excerpt}</p>

        <div className="mt-auto flex items-center gap-4 border-t border-[var(--glass-border)] pt-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={13} aria-hidden />
            {formatPostDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} aria-hidden />
            {post.readingTime}
          </span>
        </div>
      </GlassCard>
    </motion.div>
  );
}

/**
 * Featured post treatment for the most recent post — Session 23.
 * Deliberately its own component rather than a `featured` boolean on
 * `BlogCard`: the layout genuinely diverges (two-column row with a
 * decorative accent panel vs. a vertical card), not just sizing, so
 * branching one component would mean two unrelated render paths sharing a
 * name. Reuses the same `cardLift` hover and stretched-link pattern for
 * consistency.
 *
 * No post has a cover image (Session 12 shipped MDX-only, no image field
 * in frontmatter), so the right-hand panel is a decorative accent gradient
 * with a centered icon rather than a broken/missing `<Image>` — gives the
 * "bigger card" visual weight the scope asks for without inventing an
 * image pipeline this session isn't scoped to build.
 */
export function FeaturedBlogCard({ post }: BlogCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="rest"
      whileHover={shouldReduceMotion ? undefined : "hover"}
      animate="rest"
      variants={shouldReduceMotion ? undefined : cardLift}
    >
      <GlassCard
        hoverScale={false}
        className="relative grid gap-8 overflow-hidden border-accent/40 p-8 shadow-[0_20px_60px_-15px_var(--accent)] transition-shadow duration-300 hover:shadow-[0_28px_80px_-15px_var(--accent)] sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center"
      >
        <Link href={`/blog/${post.slug}`} className="absolute inset-0" aria-label={post.title}>
          <span className="sr-only">Read {post.title}</span>
        </Link>

        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-accent ring-1 ring-accent/20">
            <Sparkles size={12} aria-hidden />
            Featured
          </span>

          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {post.title}
          </h2>
          <p className="text-muted">{post.excerpt}</p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent ring-1 ring-accent/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-2 flex items-center gap-4 border-t border-[var(--glass-border)] pt-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} aria-hidden />
              {formatPostDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} aria-hidden />
              {post.readingTime}
            </span>
            <span className="ml-auto inline-flex items-center gap-1 font-medium text-accent">
              Read post
              <ArrowUpRight size={14} aria-hidden />
            </span>
          </div>
        </div>

        <div
          aria-hidden
          className="hidden h-full min-h-[220px] items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-20 lg:flex"
        >
          <Sparkles size={72} className="text-accent" strokeWidth={1} />
        </div>
      </GlassCard>
    </motion.div>
  );
}
