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
  { href: "mailto:hello@company.com", label: "Email", icon: Mail },
];

/**
 * Mega-footer: sitemap columns + social links + a newsletter signup UI.
 * The newsletter form is UI only for this session — no submit handler wired
 * up yet. Whichever session ends up owning a real newsletter backend should
 * wire onSubmit here rather than building a second form component.
 */
export function Footer() {
  return (
    <footer
      className={cn(
        "mt-auto border-t backdrop-blur-xl",
        "bg-[var(--glass-bg)] border-[var(--glass-border)]"
      )}
    >
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Company<span className="text-accent">.</span>
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

          <div className="col-span-2 md:col-span-1">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-muted">
              Product updates, no spam.
            </p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="you@company.com"
                className="w-full rounded-full border border-[var(--glass-border)] bg-transparent px-4 py-2 text-sm outline-none placeholder:text-muted focus:border-accent"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--glass-border)] pt-6 text-xs text-muted">
          © {new Date().getFullYear()} Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
