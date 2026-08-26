import Link from "next/link";
import { GlassCard } from "@/components/glass-card";
import { formatPostDate, type BlogPostMeta } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPostMeta;
}

/**
 * Blog index card. Same stretched-link pattern as CaseStudyCard (Session 9)
 * — the whole GlassCard is clickable via an absolutely-positioned Link
 * covering it, rather than only an inline "Read more" affordance.
 */
export function BlogCard({ post }: BlogCardProps) {
  return (
    <GlassCard className="relative flex flex-col gap-3">
      <Link href={`/blog/${post.slug}`} className="absolute inset-0" aria-label={post.title}>
        <span className="sr-only">Read {post.title}</span>
      </Link>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="text-lg font-medium text-balance">{post.title}</h3>
      <p className="text-sm text-muted">{post.excerpt}</p>

      <div className="mt-auto flex items-center justify-between border-t border-[var(--glass-border)] pt-4 text-xs text-muted">
        <span>{formatPostDate(post.date)}</span>
        <span>{post.readingTime}</span>
      </div>
    </GlassCard>
  );
}
