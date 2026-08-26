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

- **Status:** DONE
- **Scope:** Build `GlassCard` base component, `BubbleField` decorative
  component, and a reusable hover-flare hook/utility (mousemove → `--x`/`--y` CSS
  vars). Extend Tailwind theme (colors, blur, radius, shadow tokens) to match
  Design system rules. Verify light/dark mode has no flash-of-wrong-theme on
  load. Implement `prefers-reduced-motion` handling for bubbles/flare.
- **What changed:**
  - Ran `npm install` (restoring `node_modules`) then `npm run build` as
    instructed by Session 1's handoff. **Build still fails in this sandbox** —
    same cause as Session 1: no network route to `fonts.googleapis.com` for
    `next/font/google` (Inter, JetBrains Mono). `tsc --noEmit` and `eslint .`
    both pass clean, so this is confirmed to be a sandbox network restriction,
    not a code defect. **Whoever runs Session 3 should do the first real
    `npm run build` on a machine with normal internet access** and record the
    result — if it fails there too for a *different* reason, that's a real bug
    to fix, not this known font-fetch issue.
  - Fixed `package.json` `"name"` — it had leaked `"scaffold_tmp"` from how
    Session 1 was scaffolded in a temp dir before being copied in. Now `"ee"`.
  - Added `framer-motion` as a dependency (was listed in the stack in Session 0
    but not yet installed).
  - `lib/use-hover-flare.ts` — new `useHoverFlare<T>()` hook. Writes `--x`/`--y`
    (percentages) directly to the DOM via ref on `pointermove`, resets to
    center (`50%/50%`) on `pointerleave`. Skips non-mouse pointer types (touch/
    pen) since a cursor-following spotlight doesn't make sense there. No
    re-renders — this is intentionally imperative for performance.
  - `components/glass-card.tsx` — new `GlassCard` component. Reads
    `--glass-bg` / `--glass-border` / `--glass-shadow` from `globals.css`
    (never hardcodes colors), applies `backdrop-blur-xl`, `rounded-2xl`, hover
    scale-pop, and wires `useHoverFlare` for the spotlight effect. Takes a
    `flare?: boolean` prop (default `true`) so a later session can disable it
    for dense card grids if it reads as too busy. **All future sessions that
    render a glass surface should use this component, not hand-roll their own
    `backdrop-blur` div.**
  - `components/bubble-field.tsx` — new `BubbleField` component. Renders 4
    default blurred radial-gradient circles (using `--bubble-1`/`--bubble-2`
    tokens) with a slow Framer Motion drift loop. Accepts an optional
    `bubbles` prop to override the set/positions per-page. Uses
    `useReducedMotion()` from Framer Motion to fully disable drift (static
    bubbles) when the user has reduced-motion set — on top of the global CSS
    reduced-motion block from Session 1. `aria-hidden="true"`, decorative only.
  - `app/globals.css` extended:
    - `@theme inline` gained `--radius-glass`, `--blur-glass`, `--shadow-glass`
      tokens so future components can reference consistent Tailwind values
      instead of ad-hoc numbers.
    - New `.glass-card` / `.glass-card::before` rules implement the actual
      cursor-following flare (radial-gradient positioned at `var(--x) var(--y)`,
      `mix-blend-mode: soft-light`, fades in on hover). Wrapped in its own
      `prefers-reduced-motion` block that hides the flare entirely.
  - `app/page.tsx` updated (still a placeholder, not real Hero content) to
    render `BubbleField` + one `GlassCard` so Session 2's primitives are
    visibly exercised, not just sitting unused in the tree. **Session 4 will
    still replace this file's contents wholesale — this is not the real
    homepage.**
  - No-flash light/dark verification: `color-scheme: light dark` (set in
    Session 1) plus every new color here going through CSS variables means
    there's no client-side theme-detection JS and thus no flash-of-wrong-theme
    possible by construction — nothing further was needed for this item.
- **Repo state:** `app/globals.css`, `app/page.tsx` modified.
  `lib/use-hover-flare.ts`, `components/glass-card.tsx`,
  `components/bubble-field.tsx` added. `package.json` name fixed,
  `framer-motion` added as a dependency (see `package-lock.json`).
  `node_modules/` still git-ignored — not part of the patch.
- **Next session starts at:** Session 3 below. Run `npm install` first (new
  `framer-motion` dependency). Then attempt `npm run build` on real internet
  access per the note above and record the result before writing any code.

---

## Session 3 — Shared Chrome (Navbar + Footer)

- **Status:** DONE
- **Scope:** Build sticky glass `Navbar` (blurred, translucent, responsive/mobile
  menu) and mega-`Footer` (sitemap links, social links, newsletter mini-form UI
  only — no backend yet). Wire both into root `layout.tsx`.
- **What changed:**
  - Ran `npm install` + `npm run build` per Session 2's handoff. **Build still
    fails in this sandbox** — identical cause as Sessions 1–2 (no network route
    to `fonts.googleapis.com`). `tsc --noEmit` and `eslint .` both pass clean.
    This is now a confirmed, recurring, sandbox-only limitation — **future
    sessions do not need to re-flag this every time**; keep verifying with
    `tsc`/`eslint` in-sandbox and trust the user to confirm real builds on
    their machine when they apply patches. Only flag it again if a *build*
    failure appears for a genuinely different reason.
  - Installed `lucide-react` (v1.34.0). **Note for future sessions:** this
    version of `lucide-react` has **removed all brand/logo icons**
    (`Github`, `Linkedin`, `Twitter`, `Instagram`, `Facebook`, etc. do not
    exist in the package). Only generic UI icons are available. `Footer`
    below was written around this — don't re-attempt brand icon imports from
    `lucide-react` in later sessions; either use a generic icon + accurate
    label, or add a dedicated brand-icon package if real social branding
    becomes a hard requirement (log that decision here if it happens).
  - `components/navbar.tsx` — new sticky `Navbar`. Same glass tokens as
    `GlassCard` (`--glass-bg`/`--glass-border`) applied directly rather than
    wrapping `GlassCard` itself, since a full-bleed sticky bar has different
    layout needs than a card. Desktop link row + "Contact us" CTA button,
    hamburger/X toggle (via `lucide-react`) driving a simple show/hide mobile
    panel below `md` breakpoint — no animation library used for the mobile
    menu, kept intentionally simple/accessible (`aria-expanded`,
    `aria-label`). Links point to the full sitemap from Project Reference
    above; several of these routes don't exist yet (e.g. `/services`,
    `/pricing`) and will 404 until their sessions build them — that's
    expected at this stage.
  - `components/footer.tsx` — new mega-`Footer`. Three sitemap columns
    (Company / Product / Legal) matching the site map, a social-links row
    (see lucide-react note above — labelled "Website" / "Community" / "Email"
    with generic icons and placeholder `href`s; whichever session owns real
    social presence should update both label and href together), and a
    newsletter signup form. **The newsletter form is UI only** —
    `onSubmit={(e) => e.preventDefault()}` is a placeholder; no session has
    been assigned a newsletter backend in the current 15-session plan, so if
    one is wanted later it needs a decision logged in the Decision Log below
    and likely folds into whichever session is closest (Session 14, contact
    backend, is the natural place if it happens).
  - `app/layout.tsx` — `Navbar` and `Footer` imported and wired around
    `{children}` inside `<body>`.
  - No changes to `app/page.tsx` — the placeholder home page from Session 2
    is untouched; Session 4 replaces it.
- **Repo state:** `components/navbar.tsx`, `components/footer.tsx` added.
  `app/layout.tsx` modified. `package.json` / `package-lock.json` updated
  (added `lucide-react`). `node_modules/` still git-ignored, not in the patch.
- **Next session starts at:** Session 4 below. Run `npm install` first
  (new `lucide-react` dependency).

---

## Session 4 — Hero Section

- **Status:** DONE
- **Scope:** Build `Hero` component for `/` — headline, subheadline, CTA
  button(s), animated `BubbleField` background, glass badge/eyebrow. Assemble
  into `app/page.tsx` as the first section.
- **What changed:**
  - Ran `npm install` (no new deps this session, just restoring
    `node_modules`) then `npm run build` — same known sandbox limitation as
    Sessions 1–3 (no network route to `fonts.googleapis.com`), nothing new.
    `tsc --noEmit` and `eslint .` both clean.
  - `components/hero.tsx` — new `Hero` component. Server component (no
    interactivity of its own — `BubbleField` is a client component but
    composes fine as a child). Structure: glass eyebrow/badge (uses
    `--glass-bg`/`--glass-border` directly, not via `GlassCard`, since it's a
    small pill not a card), large headline, subheadline, two CTAs — one solid
    accent button to `/contact`, one glass-outline button to `/services`.
    `BubbleField` is absolutely positioned behind the content (`relative
    isolate` on the section, `z-10` on the content wrapper) — this is the
    reference pattern for any future section that wants a bubble backdrop.
  - `app/page.tsx` — **replaced wholesale** per the Session 1/2/3 handoff
    notes (not edited around). Now renders only `<Hero />` inside `<main>`.
    The old "Scaffold ready" placeholder text and standalone `GlassCard` demo
    from Session 2 are gone — Session 2's `GlassCard` component itself is
    untouched and still used elsewhere (Navbar/Footer don't use it directly,
    but it remains available for Session 5 onward).
  - No changes to `lib/`, `components/glass-card.tsx`, `components/bubble-
    field.tsx`, `components/navbar.tsx`, `components/footer.tsx`, or
    `app/globals.css` — all consumed as-is from prior sessions, nothing about
    the design system needed to change for the Hero.
- **Repo state:** `components/hero.tsx` added. `app/page.tsx` replaced.
  No dependency changes — `package.json`/`package-lock.json` untouched this
  session.
- **Next session starts at:** Session 5 below. `npm install` is a no-op this
  time (no new deps were added in Session 4) but run it anyway for
  consistency before writing code.

---

## Session 5 — Home Page: Features + Logo Strip + Stats

- **Status:** DONE
- **Scope:** Build `FeatureGrid` (glass-card grid of product/feature highlights),
  `LogoStrip` (trust/client logos band), `StatsBand` (metrics band). Add all
  three to `app/page.tsx` below the Hero.
- **What changed:**
  - Ran `npm install` (no-op, no new deps from Session 4) then `npm run build`
    — same known sandbox font-fetch limitation as every prior session, nothing
    new. `tsc --noEmit` and `eslint .` both clean.
  - `components/feature-grid.tsx` — new `FeatureGrid`. Four `GlassCard`s
    (flare left on, default) each with a `lucide-react` icon in an accent-
    tinted circle, title, description. Placeholder copy — whichever session
    or human owns final marketing copy should treat this as a first draft,
    not final content.
  - `components/logo-strip.tsx` — new `LogoStrip`. **No real client logo
    image assets exist in this project**, so it renders muted text wordmarks
    for six placeholder company names rather than `<Image>` placeholders.
    When real client logos exist, swap the `<li>` text for an `<Image>` —
    no structural change needed, the layout (flex-wrap, centered) already
    accommodates it.
  - `components/stats-band.tsx` — new `StatsBand`. Deliberately **not** built
    from `GlassCard` — a single glass band with a `<dl>` grid inside reads
    better as one continuous stat bar than four separate cards would. Stat
    values (uptime, requests/day, etc.) are placeholder numbers — flag for
    real content before launch, not before any remaining session.
  - `app/page.tsx` — extended (not replaced) to add `LogoStrip`,
    `FeatureGrid`, `StatsBand` below `Hero`, in that order (logos right after
    hero for immediate trust signal, then features, then stats). Testimonials
    + CTA banner are still to come in Session 6, which will extend this file
    further rather than replace it.
- **Repo state:** `components/feature-grid.tsx`, `components/logo-strip.tsx`,
  `components/stats-band.tsx` added. `app/page.tsx` modified (extended). No
  dependency changes — `package.json`/`package-lock.json` untouched.
- **Next session starts at:** Session 6 below. `npm install` is a no-op again
  but run it anyway for consistency.

---

## Session 6 — Home Page: Testimonials + CTA Banner

- **Status:** DONE
- **Scope:** Build `TestimonialCard`/testimonial section (glass cards) and
  `CTASection` banner. Complete `app/page.tsx` — home page is now fully
  assembled end to end.
- **What changed:**
  - Ran `npm install` (no-op) then `npm run build` — same known sandbox
    font-fetch limitation as every prior session, nothing new. `tsc --noEmit`
    and `eslint .` both clean.
  - `components/testimonials.tsx` — new `Testimonials` section. Three
    `GlassCard`s, each with a quote icon, quote text, and name/role. Two of
    the three names are paired with company names from Session 5's
    `LogoStrip` placeholder list (Northwind, Globex) for narrative
    consistency — the third (Vertex Labs) also matches. All content is
    **placeholder** — swap for real customer quotes before launch.
  - `components/cta-section.tsx` — new `CTASection` closing banner. Reuses
    `BubbleField` the same way `Hero` (Session 4) does: `relative isolate`
    wrapper, `BubbleField` absolutely positioned behind, content at `z-10`.
    Rendered as its own glass-bordered rounded band (not a `GlassCard`) so it
    can span full width inside the max-width container — same treatment as
    `StatsBand` from Session 5. Single CTA button to `/contact`.
  - `app/page.tsx` — extended (not replaced) with `Testimonials` then
    `CTASection` as the final two sections. **Home page is now fully
    assembled end to end**: Hero → LogoStrip → FeatureGrid → StatsBand →
    Testimonials → CTASection. No further sessions are scoped to touch this
    file's section order — Sessions 7+ build separate interior pages.
- **Repo state:** `components/testimonials.tsx`, `components/cta-section.tsx`
  added. `app/page.tsx` modified (extended, now complete). No dependency
  changes.
- **Next session starts at:** Session 7 below (About page). This is the first
  interior page — it introduces the shared `PageHeader` component that
  Sessions 8+ will also depend on, so Session 7 should treat `PageHeader` as
  a reusable primitive from the start, not something specific to `/about`.

---

## Session 7 — About Page

- **Status:** DONE
- **Scope:** Build `/about`: company story/mission copy block, `Timeline`
  component, `TeamGrid` (leadership grid). Build shared `PageHeader` component
  (reusable hero-style banner for all interior pages) and use it here.
- **What changed:**
  - Ran `npm install` (no-op) then `npm run build` — same known sandbox
    font-fetch limitation as every prior session, nothing new. `tsc --noEmit`
    and `eslint .` both clean.
  - `components/page-header.tsx` — new **shared** `PageHeader` component:
    eyebrow, title, optional description, centered, bottom border. Deliberately
    lighter than the home page `Hero` — no `BubbleField`, no CTA buttons; this
    is a page title, not a landing moment. **Sessions 8–14 (every remaining
    page-building session) should use this instead of hand-rolling a page
    title block.** Props: `eyebrow: string`, `title: string`,
    `description?: string`.
  - `components/timeline.tsx` — new `Timeline`. Vertical rail (border-left +
    absolutely-positioned dot per entry), pure CSS, no animation library.
    Placeholder company history (founded 2021 → global infra 2026) — swap for
    real milestones before launch.
  - `components/team-grid.tsx` — new `TeamGrid`. Uses `GlassCard` per person.
    **No headshot images exist in this project**, so each card shows an
    initials avatar in an accent-tinted circle instead of an `<Image>`
    placeholder — swap for real photos later, no structural change needed.
    Names/roles are placeholder.
  - `app/about/page.tsx` — new route. Structure: `PageHeader` → mission copy
    block (prose) → "Our story" heading + `Timeline` → "Leadership" heading +
    `TeamGrid`. Has its own `metadata` export (title/description) — this is
    the pattern later page sessions should follow rather than relying on the
    root layout's generic metadata.
- **Repo state:** `components/page-header.tsx`, `components/timeline.tsx`,
  `components/team-grid.tsx`, `app/about/page.tsx` added. No dependency
  changes. Home page (`app/page.tsx`) untouched — Session 6 finished it.
- **Next session starts at:** Session 8 below (Services page). Use the new
  `PageHeader` component — do not build another page-title block from
  scratch.

---

## Session 8 — Services Page

- **Status:** DONE
- **Scope:** Build `/services`: one `GlassCard`-based entry per offering, using
  `PageHeader` from Session 7. Placeholder/realistic copy for a software company.
- **What changed:**
  - Ran `npm install` (no-op) then `npm run build` — same known sandbox
    font-fetch limitation as every prior session (no network route to
    `fonts.googleapis.com` for Inter/JetBrains Mono in this sandbox), nothing
    new introduced. Verified instead with `npx tsc --noEmit` and
    `npx eslint .` — both clean.
  - `components/services-grid.tsx` — new `ServicesGrid`. Six offerings
    (Product Engineering, Platform & DevOps, Cloud Migration, Security &
    Compliance, Data & Analytics, Managed Support), each a `GlassCard` with
    an icon, description, and a bulleted "includes" list pinned to the
    bottom of the card (`mt-auto` + top border) so cards with shorter
    descriptions still align. Deliberately its own component rather than
    reusing `FeatureGrid` (Session 5) — the bullet list makes these cards
    heavier, and `FeatureGrid` is the home-page pattern, this is the
    interior-page pattern. Realistic (non-lorem-ipsum) copy for a software
    company — swap for the client's actual service lines before launch.
  - `app/services/page.tsx` — new route. `PageHeader` (per Session 7's
    directive to reuse it, not hand-roll another title block) → `ServicesGrid`
    inside a standard `max-w-6xl` container. Own `metadata` export, same
    pattern as `app/about/page.tsx`.
  - No changes to `components/navbar.tsx` or `components/footer.tsx` — both
    already linked to `/services` since Session 3, so the route now resolves
    instead of 404ing. No dependency changes.
- **Repo state:** `components/services-grid.tsx`, `app/services/page.tsx`
  added. No other files touched.
- **Next session starts at:** Session 9 below (Case Studies). It needs a
  `CaseStudyCard` component and a static data source (local JSON/TS array) —
  follow the same "own component, own route, own metadata" pattern used here
  and in Session 7, and use `PageHeader` for the index page's title block.

---

## Session 9 — Case Studies

- **Status:** DONE
- **Scope:** Build `/case-studies` index (grid of `CaseStudyCard`) and
  `/case-studies/[slug]` dynamic detail page. Static data source (local
  JSON/TS array) is fine — no CMS.
- **What changed:**
  - Ran `npm install` (no-op, no new deps) then attempted `npm run build` —
    same known sandbox font-fetch limitation as every prior session (no
    network route to `fonts.googleapis.com` for Inter/JetBrains Mono),
    nothing new. Verified instead with `npx tsc --noEmit` and `npx eslint .`
    — both clean. Note: a bare `tsc --noEmit` before any build/dev run will
    fail on `app/layout.tsx` with `Cannot find name 'LayoutProps'` — that's
    Next 16's route-typegen (`.next/types`) not having been generated yet,
    not a real defect. It resolves itself once `next build`/`next dev` has
    run once (even a build that later fails on the font-fetch step still
    generates `.next/types` first). Future sessions hitting that specific
    error should not treat it as a regression.
  - `lib/case-studies.ts` — new static data source (local TS array, no CMS,
    per session scope). Exports a `CaseStudy` interface (slug, client,
    industry, title, summary, `challenge`/`approach`/`results` as paragraph
    arrays, and a small `metrics` array) plus `CASE_STUDIES` and a
    `getCaseStudy(slug)` lookup helper. Three case studies, deliberately
    reusing the Northwind / Globex / Vertex Labs placeholder client names
    from Session 5's `LogoStrip` and Session 6's `Testimonials` for
    narrative consistency across the site — swap all three together before
    launch, not just this file.
  - `components/case-study-card.tsx` — new `CaseStudyCard`. Built on
    `GlassCard` per the established pattern. Uses a stretched-link (`<Link>`
    with `absolute inset-0` span) so the whole card is clickable, not just
    the "Read case study" text, while keeping a single accessible link per
    card. Shows the top two metrics inline as a preview of the detail page.
  - `app/case-studies/page.tsx` — new index route. `PageHeader` (reused per
    Session 7/8 convention) → responsive grid of `CaseStudyCard`. Own
    `metadata` export.
  - `app/case-studies/[slug]/page.tsx` — new dynamic detail route. Next 16
    App Router: `params` is a `Promise<{ slug: string }>`, awaited in both
    `generateMetadata` and the page component — this is the reference
    pattern for any later dynamic route (Session 12's `/blog/[slug]` should
    follow the same shape). `generateStaticParams` pre-renders all three
    known slugs; an unknown slug calls `notFound()` from `next/navigation`.
    Layout: back-link → header block (client/industry/title/summary,
    styled consistently with `PageHeader` but not reusing it directly since
    it needs the back-link and eyebrow row above the title) → a
    `GlassCard`-based metrics strip (`flare={false}`, dense stat grid reads
    better without the hover pop) → challenge/approach/results sections as
    paragraph copy.
  - No changes to `components/navbar.tsx` or `components/footer.tsx` — both
    already linked to `/case-studies` since Session 3, so the route now
    resolves instead of 404ing. No dependency changes.
- **Repo state:** `lib/case-studies.ts`, `components/case-study-card.tsx`,
  `app/case-studies/page.tsx`, `app/case-studies/[slug]/page.tsx` added. No
  other files touched, no dependency changes.
- **Next session starts at:** Session 10 below (Pricing page). Use
  `PageHeader` for the title block per the established convention, and log
  the monthly/annual toggle decision (yes/no) in the Decision Log below
  regardless of which way it goes.

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
  with chosen email provider — SMTP - send to contact@edgesenterprise.com).
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
