import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PageHeader } from "@/components/page-header";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getAllSlugs, getPost } from "@/lib/blog";
import { formatPostDate } from "@/lib/format";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} | Blog | Company Name`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main>
      <ScrollReveal>
        <PageHeader
          eyebrow={`${formatPostDate(post.date)} · ${post.readingTime}`}
          title={post.title}
          description={post.excerpt}
        />
      </ScrollReveal>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} />
          All posts
        </Link>

        <p className="mt-8 text-sm text-muted">By {post.author}</p>

        <div
          className={[
            "prose prose-neutral dark:prose-invert prose-lg mt-6 max-w-none",
            // Session 23: editorial pass over Session 12's base prose
            // treatment — larger type scale (prose-lg) and looser
            // paragraph leading for a more premium reading rhythm, plus
            // explicit pull-quote styling for blockquotes (a left accent
            // rule, larger italic-free serif-weight text, no default
            // quotation glyph) since none of the three Session 12 posts
            // had one to style against before now.
            "prose-headings:font-semibold prose-headings:tracking-tight",
            "prose-p:leading-relaxed",
            "prose-a:text-accent prose-a:no-underline hover:prose-a:underline",
            "prose-blockquote:border-l-4 prose-blockquote:border-accent",
            "prose-blockquote:pl-6 prose-blockquote:not-italic",
            "prose-blockquote:font-medium prose-blockquote:text-foreground",
            "prose-blockquote:text-xl prose-blockquote:tracking-tight",
          ].join(" ")}
        >
          <MDXRemote source={post.content} />
        </div>

        <div className="mt-14 flex flex-wrap gap-2 border-t border-[var(--glass-border)] pt-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </main>
  );
}
