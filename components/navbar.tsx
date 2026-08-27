"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/pricing", label: "Pricing" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
];

/**
 * Sticky glass navbar. Uses the same --glass-bg/--glass-border tokens as
 * GlassCard but applied directly here (not via GlassCard itself) since a
 * full-width sticky bar has different layout needs than a card. Mobile menu
 * is a simple show/hide panel — no animation library dependency needed for
 * this, keeps it lightweight and accessible.
 *
 * Session 19: the "Contact us" button now has an ambient pulse (see the
 * `.contact-pulse` keyframes in app/globals.css — CSS-native, following the
 * same precedent Session 16 set for ambient effects that don't need Framer
 * Motion's orchestration) and fades toward transparent on hover instead of
 * the old opacity-90 fade, with its border and text switching to accent so
 * it stays legible against the blurred navbar behind it.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b [backdrop-filter:blur(var(--blur-glass))]",
        "bg-[var(--glass-bg)] border-[var(--glass-border)]"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Company<span className="text-accent">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
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

        <Link
          href="/contact"
          className="contact-pulse hidden rounded-full border border-transparent bg-accent px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:border-accent hover:bg-accent/15 hover:text-accent md:inline-block"
        >
          Contact us
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-[var(--glass-border)] px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full bg-accent px-4 py-2 text-sm font-medium text-white"
              >
                Contact us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
