"use client";

import Link from "next/link";
import { Globe, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const SITEMAP_COLUMNS = [
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    heading: "Product",
    links: [
      { href: "/services", label: "Services" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy Policy" },
      { href: "/legal/terms", label: "Terms of Service" },
    ],
  },
];

const SOCIAL_LINKS = [
  { href: "https://example.com", label: "Website", icon: Globe },
  { href: "https://example.com/community", label: "Community", icon: MessageCircle },
  { href: "mailto:contact@edgesenterprise.com", label: "Email", icon: Mail },
];

/**
 * Mega-footer: sitemap columns + social links.
 *
 * Session 19: was already using --glass-bg/--glass-border + a blur filter
 * (built correctly back in Session 3) — confirmed it already reads as one
 * continuous glass surface consistent with the navbar. Only change here is
 * swapping the hardcoded `backdrop-blur-xl` utility for the same
 * `--blur-glass` design token the navbar now explicitly references, so
 * both pieces of chrome stay in lockstep if that token's value ever changes.
 *
 * Session 28: removed the newsletter signup column (no backend ever
 * existed for it — Session 19's comment above already flagged it as
 * UI-only). The remaining grid — logo block (col-span-2) + 3 sitemap
 * columns (1 each) — totals exactly 5, matching `md:grid-cols-5` below,
 * so no column-count change was needed once the newsletter block was
 * removed.
 */
export function Footer() {
  return (
    <footer
      className={cn(
        "mt-auto border-t [backdrop-filter:blur(var(--blur-glass))]",
        "bg-[var(--glass-bg)] border-[var(--glass-border)]"
      )}
    >
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Edges Enterprise<span className="text-accent">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Building modern software for teams that move fast.
            </p>
            <div className="mt-5 flex gap-4">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-muted transition-colors hover:text-foreground"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {SITEMAP_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
                {column.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[var(--glass-border)] pt-6 text-xs text-muted">
          © {new Date().getFullYear()} Edges Enterprise. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
