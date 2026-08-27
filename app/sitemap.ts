import type { MetadataRoute } from "next";
import { getAllSlugs as getBlogSlugs } from "@/lib/blog";
import { CASE_STUDIES } from "@/lib/case-studies";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.company.com";

const STATIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/case-studies",
  "/pricing",
  "/careers",
  "/blog",
  "/contact",
  "/legal/privacy",
  "/legal/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = getBlogSlugs().map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = CASE_STUDIES.map((study) => ({
    url: `${SITE_URL}/case-studies/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries, ...caseStudyEntries];
}
