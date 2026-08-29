import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

/**
 * Local MDX content source — decided in Session 12, logged per the scope
 * note: local MDX files, not a headless CMS. Posts live in content/blog/*.mdx
 * with frontmatter (title, excerpt, date, author, tags). Slug is derived
 * from the filename, so filenames double as the [slug] route param.
 *
 * Reads the filesystem directly (fs/path, no bundler magic) — fine as long
 * as every export here only ever runs in Server Components /
 * generateStaticParams, never in a Client Component. Session 25: this
 * broke in a production (Turbopack) build because `formatPostDate` used to
 * live in this file with no fs dependency of its own, and a Client
 * Component imported just that one function — but importing *any* value
 * from this module pulls the whole module, `node:fs` included, into the
 * client bundle. `formatPostDate` now lives in `lib/format.ts` instead.
 * Don't add another fs-free helper here for a Client Component to import —
 * put it in `lib/format.ts` (or a similar fs-free module) instead.
 */
function getSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readPost(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    author: data.author,
    tags: data.tags ?? [],
    readingTime: stats.text,
    content,
  };
}

/** All posts, newest first. Used by the /blog index. */
export function getAllPosts(): BlogPostMeta[] {
  return getSlugs()
    .map((slug) => readPost(slug))
    .filter((post): post is BlogPost => Boolean(post))
    .map(({ content: _content, ...meta }) => meta) // eslint-disable-line @typescript-eslint/no-unused-vars
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Single post with full MDX content, for /blog/[slug]. */
export function getPost(slug: string): BlogPost | undefined {
  return readPost(slug);
}

export function getAllSlugs(): string[] {
  return getSlugs();
}
