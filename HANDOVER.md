# HANDOVER LOG — SOLE SOURCE OF TRUTH

**This file is the only thing any session needs to read.** It contains the full
tech stack, design system, sitemap, and the complete scope of every session
written out in full below. Do not open `BLUEPRINT.md` or explore the rest of the
repo to "figure out" what to do — everything required is here. `BLUEPRINT.md` is
a frozen human-readable rationale doc only; if it ever conflicts with this file,
this file wins.

## How to use this file

1. Scroll to find the most recent entry marked `DONE`. Read its "Next session
   starts at" pointer.
2. **Do not start a session until the previous session's entry is `DONE`.** If the
   latest entry is `IN PROGRESS` or `NOT STARTED`, stop.
3. Find your session's numbered entry below. Its "Scope" is everything you need —
   don't expand it, don't borrow from a later session, don't skip ahead.
4. When finished:
   - `git add -A && git commit -m "session N: <summary>"`
   - `git format-patch -1 HEAD --stdout > session-N.patch`
   - Fill in your entry's "What changed" / "Repo state" / "Next session starts at".
   - Set your entry's status to `DONE`.
   - Deliver only `session-N.patch` — no inline code, no extra files.

---

## User Environment (applies to every session — patch delivery)

- **Repo path (local machine):**
  `C:\Users\USER\Desktop\projects\edges_smm_logs_growth\eee`
- **Downloads path (where patch files land when downloaded):**
  `C:\Users\USER\Downloads`
- Every `.patch` file this project produces is downloaded into the Downloads path
  above, **not** the repo path. It must be copied into the repo directory before
  `git am` will work. The user runs these exact commands in PowerShell for every
  session's patch (replace `session-N.patch` with the actual filename, e.g.
  `session-1.patch`):

  ```powershell
  Copy-Item "C:\Users\USER\Downloads\session-N.patch" -Destination "C:\Users\USER\Desktop\projects\edges_smm_logs_growth\eee\"
  cd "C:\Users\USER\Desktop\projects\edges_smm_logs_growth\eee"
  git am session-N.patch
  ```

  Do not shorten, alter, or reorder these three lines, and do not substitute
  `git apply` for `git am` — `git am` is required so the commit (with message and
  author) is preserved on the user's machine.

## Project Reference (read once, applies to every session)

**Project:** Marketing/corporate site for a software company. 2026 "techy"
aesthetic: glassmorphism cards, ambient floating bubbles, hover-triggered
pop-up/flare effects, full light/dark mode driven by the OS
`prefers-color-scheme` (no manual toggle unless a later session logs a decision
to add one).

**Stack:**
- Next.js 16, App Router, TypeScript (strict)
- Tailwind CSS v4 + CSS variables for theme tokens
- Framer Motion (`motion/react`) for hover pop, flare, bubble drift
- React Hook Form + Zod for forms
- Contact form backend: Next.js Route Handler (`/api/contact`) → email provider
  (Resend or similar — session 14 finalizes)
- lucide-react for icons
- next/font, variable font (e.g. Geist / Inter)
- Deployment target: Vercel-compatible, no vendor lock-in in code

**Design system rules:**
- Glass cards: `backdrop-blur-xl`, translucent surface (`bg-white/5` dark /
  `bg-white/60` light), 1px hairline gradient border, soft shadow, `rounded-2xl`.
- Bubbles: absolutely-positioned blurred radial-gradient circles, slow
  drift/parallax via Framer Motion, must respect `prefers-reduced-motion`.
- Hover flare: cursor-following radial gradient spotlight via mousemove → CSS
  custom properties `--x`/`--y`; scale-up pop (`hover:scale-[1.02]`); glow ring.
- All colors as CSS variables in `globals.css` (`:root` + dark media query);
  Tailwind config maps to these variables — components never hardcode colors.
- Typography: large confident display type for hero; techy monospace accents for
  eyebrows/labels (`font-mono text-xs tracking-widest uppercase`).

**Full site map:**
`/` (home), `/about`, `/services`, `/case-studies` + `/case-studies/[slug]`,
`/pricing`, `/careers`, `/blog` + `/blog/[slug]`, `/contact`,
`/legal/privacy`, `/legal/terms`, custom `404`/`500`.
Shared chrome: sticky glass navbar, mega-footer with sitemap/social/newsletter.

---

## Session 0 — Planning

- **Status:** DONE
- **What changed:** Created `BLUEPRINT.md` (frozen rationale doc) and this
  `HANDOVER.md` (sole source of truth, 15-session plan with full scope inline).
  Added "User Environment" section with repo path, Downloads path, and the exact
  patch-apply command sequence. No application code exists yet.
- **Repo state:** `BLUEPRINT.md`, `HANDOVER.md` only.
- **Next session starts at:** Session 1 below.

---

## Session 1 — Project Scaffold

- **Status:** DONE
- **Scope:** Run `npx create-next-app@latest` for Next.js 16 + TypeScript +
  Tailwind CSS v4 + App Router. Set up folder structure (`app/`, `components/`,
  `lib/`), ESLint/Prettier config, base `globals.css` with theme CSS variables
  (light + dark, per Design system rules above), root `layout.tsx` shell with
  font setup (next/font, variable sans font). No components or pages beyond the
  default shell yet.
- **What changed:**
  - Scaffolded with `create-next-app@latest` → Next.js **16.3.3**, TypeScript,
    Tailwind CSS v4, App Router, ESLint, no `src/` dir, `@/*` import alias.
  - Removed generator cruft not needed for this project: `README.md`,
    `CLAUDE.md`, `AGENTS.md`.
  - `app/globals.css` rewritten with the full theme token set: `--background`,
    `--foreground`, `--muted`, `--accent`, `--accent-2`, plus **glass tokens**
    (`--glass-bg`, `--glass-border`, `--glass-shadow`) and **bubble tokens**
    (`--bubble-1`, `--bubble-2`) for both light `:root` and
    `@media (prefers-color-scheme: dark)` — Session 2 should consume these
    directly rather than inventing new color values. `color-scheme: light dark`
    set on `:root` for native no-flash form control theming. Added a global
    `prefers-reduced-motion` block that collapses animation/transition duration
    — later sessions doing bubble drift / hover flare must not fight this.
  - `app/layout.tsx`: swapped Geist for **Inter** (sans, var `--font-body`) and
    **JetBrains Mono** (mono, var `--font-body-mono`) via `next/font/google`,
    mapped into Tailwind's `--font-sans` / `--font-mono` theme tokens in
    `globals.css`. `suppressHydrationWarning` added on `<html>` (standard
    practice for system-theme-driven sites). Metadata title/description are
    placeholders — Session 4+ (Hero) or whichever session owns SEO copy should
    replace them, not before.
  - `app/page.tsx` replaced with a minimal placeholder confirming the shell
    renders — **not** the real home page. Session 4 (Hero) starts by replacing
    this file's contents, not editing around it.
  - `lib/utils.ts` added: a `cn()` classname helper (using `clsx`, added as a
    dependency). No `tailwind-merge` yet — add it in a later session only if
    class-conflict bugs actually appear.
  - `components/` created (empty, `.gitkeep` only) — Session 2 is the first to
    put files here.
  - Verified with `npx tsc --noEmit` (clean) and `npx eslint .` (clean).
    **`npm run build` was not run to completion in the sandbox** — the sandbox
    has no network route to `fonts.googleapis.com`, so `next/font/google`
    cannot fetch Inter/JetBrains Mono here. This is a sandbox restriction only;
    it will build normally on a machine with normal internet access. Session 2
    should run `npm run build` for the first real build verification and
    report the result in its own entry.
- **Repo state:** Full Next.js 16 app scaffold at repo root (`app/`,
  `components/`, `lib/`, `public/`, config files, `package.json` +
  `package-lock.json`). `node_modules/` git-ignored (not part of the patch —
  next session must run `npm install` after applying this patch, before doing
  anything else). `BLUEPRINT.md` and `HANDOVER.md` unchanged in location, this
  entry updated in place.
- **Next session starts at:** Session 2 below. Before writing any code, Session 2
  must run `npm install` (to restore `node_modules`, which is not in the patch)
  then `npm run build` once to confirm the scaffold builds clean end-to-end on
  a machine with real network access, and record that result at the top of its
  own "What changed."

---

## Session 2 — Design System Primitives

- **Status:** NOT STARTED
- **Scope:** Build `GlassCard` base component, `BubbleField` decorative
  component, and a reusable hover-flare hook/utility (mousemove → `--x`/`--y` CSS
  vars). Extend Tailwind theme (colors, blur, radius, shadow tokens) to match
  Design system rules. Verify light/dark mode has no flash-of-wrong-theme on
  load. Implement `prefers-reduced-motion` handling for bubbles/flare.
- **What changed:**
- **Repo state:**
- **Next session starts at:**

---

## Session 3 — Shared Chrome (Navbar + Footer)

- **Status:** NOT STARTED
- **Scope:** Build sticky glass `Navbar` (blurred, translucent, responsive/mobile
  menu) and mega-`Footer` (sitemap links, social links, newsletter mini-form UI
  only — no backend yet). Wire both into root `layout.tsx`.
- **What changed:**
- **Repo state:**
- **Next session starts at:**

---

## Session 4 — Hero Section

- **Status:** NOT STARTED
- **Scope:** Build `Hero` component for `/` — headline, subheadline, CTA
  button(s), animated `BubbleField` background, glass badge/eyebrow. Assemble
  into `app/page.tsx` as the first section.
- **What changed:**
- **Repo state:**
- **Next session starts at:**

---

## Session 5 — Home Page: Features + Logo Strip + Stats

- **Status:** NOT STARTED
- **Scope:** Build `FeatureGrid` (glass-card grid of product/feature highlights),
  `LogoStrip` (trust/client logos band), `StatsBand` (metrics band). Add all
  three to `app/page.tsx` below the Hero.
- **What changed:**
- **Repo state:**
- **Next session starts at:**

---

## Session 6 — Home Page: Testimonials + CTA Banner

- **Status:** NOT STARTED
- **Scope:** Build `TestimonialCard`/testimonial section (glass cards) and
  `CTASection` banner. Complete `app/page.tsx` — home page is now fully
  assembled end to end.
- **What changed:**
- **Repo state:**
- **Next session starts at:**

---

## Session 7 — About Page

- **Status:** NOT STARTED
- **Scope:** Build `/about`: company story/mission copy block, `Timeline`
  component, `TeamGrid` (leadership grid). Build shared `PageHeader` component
  (reusable hero-style banner for all interior pages) and use it here.
- **What changed:**
- **Repo state:**
- **Next session starts at:**

---

## Session 8 — Services Page

- **Status:** NOT STARTED
- **Scope:** Build `/services`: one `GlassCard`-based entry per offering, using
  `PageHeader` from Session 7. Placeholder/realistic copy for a software company.
- **What changed:**
- **Repo state:**
- **Next session starts at:**

---

## Session 9 — Case Studies

- **Status:** NOT STARTED
- **Scope:** Build `/case-studies` index (grid of `CaseStudyCard`) and
  `/case-studies/[slug]` dynamic detail page. Static data source (local
  JSON/TS array) is fine — no CMS.
- **What changed:**
- **Repo state:**
- **Next session starts at:**

---

## Session 10 — Pricing Page

- **Status:** NOT STARTED
- **Scope:** Build `/pricing`: tiered `PricingCard` glass cards, optional
  monthly/annual toggle (session decides and logs the decision below if added).
- **What changed:**
- **Repo state:**
- **Next session starts at:**

---

## Session 11 — Careers Page

- **Status:** NOT STARTED
- **Scope:** Build `/careers`: culture/values blurb section, open-roles list
  (static data source, no ATS integration).
- **What changed:**
- **Repo state:**
- **Next session starts at:**

---

## Session 12 — Blog

- **Status:** NOT STARTED
- **Scope:** Build `/blog` index and `/blog/[slug]` via MDX. `BlogCard`
  component, reading-time and date-formatting utilities. Decide and log below:
  local MDX files vs headless CMS (default: local MDX unless logged otherwise).
- **What changed:**
- **Repo state:**
- **Next session starts at:**

---

## Session 13 — Contact Page (UI only)

- **Status:** NOT STARTED
- **Scope:** Build `/contact` page UI: `ContactForm` component (Name, Work
  Email, Company, Message, optional Phone, honeypot field), Zod validation
  schema, React Hook Form wiring, inline field errors, disabled+spinner submit
  state. Office info block. No backend route yet — form submit can be stubbed.
- **What changed:**
- **Repo state:**
- **Next session starts at:**

---

## Session 14 — Contact Backend + Legal/Error Pages

- **Status:** NOT STARTED
- **Scope:** Build `/api/contact` route handler (server-side Zod validation,
  rate-limit/spam protection via honeypot + minimum submit delay, integration
  with chosen email provider — decide and log below: Resend/Postmark/SMTP).
  Wire `ContactForm` submit to the real endpoint with animated success/error
  state. Build `/legal/privacy`, `/legal/terms`, custom `not-found.tsx` and
  `error.tsx` (on-brand, reusing `GlassCard`/`PageHeader`).
- **What changed:**
- **Repo state:**
- **Next session starts at:**

---

## Session 15 — Polish & QA

- **Status:** NOT STARTED
- **Scope:** Full-site pass: accessibility audit (contrast in both light/dark,
  focus states, reduced-motion compliance), responsive audit (mobile/tablet/
  desktop for every page), Lighthouse pass, meta tags/OpenGraph, `sitemap.xml`,
  `robots.txt`. This is the final session — site is considered complete after
  this entry is marked `DONE`.
- **What changed:**
- **Repo state:**
- **Next session starts at:** None — project complete.

---

## Decision Log

(Sessions append one line here whenever the scope above tells them to "decide and
log" something, so later sessions don't need to dig through commits to find out.)

- _(none yet)_
