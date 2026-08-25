# BLUEPRINT — Corporate Software Company Landing Site

> **Note:** This file is background reference only, frozen at planning time.
> **`HANDOVER.md` is the single source of truth for all sessions.** Every session
> reads only `HANDOVER.md` to know what to do — it contains the full stack,
> design-system spec, and each session's complete scope inline, so no session needs
> to open this file or explore the rest of the repo to get oriented. This file exists
> purely as the original design rationale for human reference.

## 1. Project Summary

A marketing/corporate site for a software company, built to a 2026 "techy" aesthetic:
glassmorphism cards, ambient floating bubbles, hover-triggered pop-up flare/glow effects,
and full light/dark mode driven by the user's OS `prefers-color-scheme` (no manual toggle
required, though one may be layered on later as a progressive enhancement).

The site is multi-page (not a single scroll), with a Hero-led homepage and the standard
set of corporate pages needed to showcase a software company.

## 2. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | React Server Components by default |
| Language | TypeScript | strict mode on |
| Styling | Tailwind CSS v4 | + CSS variables for theme tokens |
| Animation | Framer Motion (motion/react) | hover pop, flare, bubble drift |
| Forms | React Hook Form + Zod | client validation |
| Form backend | Next.js Route Handler (`/api/contact`) → email provider (Resend or similar) | swappable, session decides |
| Icons | lucide-react | |
| Fonts | next/font (variable font, techy sans e.g. Geist / Inter) | |
| Deployment target | Vercel-compatible | no vendor lock-in in code |
| Theme mode | CSS `prefers-color-scheme` media query + Tailwind `dark:` class synced via `color-scheme` | no client JS required for initial paint (no flash) |

## 3. Site Map / Pages

1. `/` — Home (Hero, feature grid, logo strip, stats band, testimonials, CTA banner)
2. `/about` — Company story, mission, timeline, leadership grid
3. `/services` — What the company builds, glass card per offering
4. `/case-studies` (index) + `/case-studies/[slug]` — proof of work
5. `/pricing` — tiered glass pricing cards
6. `/careers` — culture blurb + open roles list
7. `/blog` (index) + `/blog/[slug]` — thought leadership (MDX-based)
8. `/contact` — Contact form, office info
9. `/legal/privacy`, `/legal/terms` — footer legal pages
10. `404` / `500` — custom, on-brand error pages

Shared chrome: sticky glass navbar (blurred, translucent), mega-footer with sitemap,
social links, newsletter mini-form.

## 4. Visual System

- **Glassmorphism**: `backdrop-blur-xl`, translucent surface (`bg-white/5` dark /
  `bg-white/60` light), 1px hairline border with gradient, soft shadow, rounded-2xl.
- **Bubbles**: decorative absolutely-positioned blurred circles (radial gradient),
  slow drift/parallax via Framer Motion, respects `prefers-reduced-motion`.
- **Hover flare**: cursor-following radial gradient "spotlight" on cards
  (mousemove → CSS custom properties `--x`/`--y`), scale-up pop (`hover:scale-[1.02]`),
  glow ring on hover.
- **Theme tokens**: all colors as CSS variables in `globals.css` under `:root` and
  `@media (prefers-color-scheme: dark)`; Tailwind config maps to these variables so
  components never hardcode light/dark colors directly.
- **Typography**: large, confident display type for hero; techy monospace accents
  for labels/eyebrows (e.g. `font-mono text-xs tracking-widest uppercase`).

## 5. Delivery Convention (every session)

1. Read `HANDOVER.md` only. Do the work listed for your session number, nothing more.
2. `git add -A`
3. `git commit -m "session N: <short summary>"`
4. `git format-patch -1 HEAD --stdout > session-N.patch`
5. Update `HANDOVER.md` — mark your session `DONE`, fill "What changed" / "Repo
   state" / "Next session starts at", and confirm the next session's scope text is
   already present in full in its entry (it should be, since this file is the
   pre-written master plan — copy nothing from `BLUEPRINT.md`).
6. Hand back **only** the `.patch` file.

See `HANDOVER.md` for the authoritative 15-session breakdown and current status.
