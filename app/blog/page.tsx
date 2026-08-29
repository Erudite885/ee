import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ScrollReveal } from "@/components/scroll-reveal";
import { BlogCard, FeaturedBlogCard } from "@/components/blog-card";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Company Name",
  description:
    "Notes from the engineers and operators building deployment, security, and platform tooling in production.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featuredPost, ...restPosts] = posts;

  return (
    <main>
      <ScrollReveal>
        <PageHeader
          eyebrow="Blog"
          title="Notes from production"
          description="What we've learned building and operating infrastructure software, written by the people who did the work."
        />
      </ScrollReveal>

      <section className="mx-auto max-w-6xl px-6 py-20">
        {featuredPost && (
          <div className="mb-10">
            <FeaturedBlogCard post={featuredPost} />
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
