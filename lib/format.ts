/**
 * Session 25 fix: `formatPostDate` used to live in `lib/blog.ts`, which
 * also does `import fs from "node:fs"` / `import path from "node:path"` at
 * module scope to read local MDX files. `lib/blog.ts`'s own comment said
 * that file is "fine here because this only ever runs in Server
 * Components / generateStaticParams, never in a Client Component" — true
 * when it was written, but Session 23 made `components/blog-card.tsx` a
 * `"use client"` component that still did
 * `import { formatPostDate } from "@/lib/blog"`. A plain (non-`type`)
 * import pulls in the *whole* module for the client bundle, `node:fs`
 * included, which Turbopack cannot bundle for the browser — this built
 * fine locally (Next.js's dev/webpack path tolerates it) but failed on
 * Vercel's Turbopack production build with "the chunking context does not
 * support external modules (request: node:fs)".
 *
 * Fix: `formatPostDate` has no filesystem dependency at all, so it moves
 * to its own client-safe module. `lib/blog.ts` no longer exports it;
 * every call site (Server or Client Component) imports it from here
 * instead.
 */
export function formatPostDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
