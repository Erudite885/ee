import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PageHeader } from "@/components/page-header";
import { getAllSlugs, getPost, formatPostDate } from "@/lib/blog";

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
      <PageHeader
        eyebrow={`${formatPostDate(post.date)} · ${post.readingTime}`}
        title={post.title}
        description={post.excerpt}
      />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} />
          All posts
        </Link>

        <p className="mt-8 text-sm text-muted">By {post.author}</p>

        <div className="prose prose-neutral dark:prose-invert mt-6 max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
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
