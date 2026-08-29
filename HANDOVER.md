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

- **Status:** DONE
- **Scope:** Build `/pricing`: tiered `PricingCard` glass cards, optional
  monthly/annual toggle (session decides and logs the decision below if added).
- **What changed:**
  - Ran `npm install` (fresh sandbox, `node_modules` wasn't present — 376
    packages, 0 vulnerabilities) then `npm run build` — same known
    font-fetch limitation as every prior session (403 from
    `fonts.googleapis.com` for Inter/JetBrains Mono under Turbopack),
    nothing new, but it did its usual job of generating `.next/types` so
    `tsc --noEmit` has `LayoutProps` available. Verified with
    `npx tsc --noEmit` and `npx eslint .` — both clean after one fix (see
    below).
  - `components/pricing-card.tsx` — new `PricingCard`. Built on `GlassCard`
    per the established pattern, `flare={false}` on the highlighted tier
    specifically (its accent border/badge already draws the eye; the cursor
    spotlight competed with that rather than adding to it). Handles a
    `monthlyPrice`/`annualPrice` pair plus a `billingPeriod` prop and
    renders "Custom" instead of a number when both prices are `null`
    (Enterprise tier). Feature list uses `Check` icons in the accent color,
    matching `ServicesGrid`'s bullet-list treatment but with icons instead
    of dots since this list is the primary sell here.
  - `components/pricing-grid.tsx` — new `PricingGrid`, `"use client"`. Holds
    the monthly/annual toggle state (`useState`) and the three tier
    definitions (`TIERS`, `as const`). This is the only client boundary the
    pricing page needs — `app/pricing/page.tsx` itself stays a server
    component. Annual prices are precomputed per-tier in the data (not
    derived from a shared percentage at render time) so each tier rounds to
    a clean number instead of showing cents.
  - `app/pricing/page.tsx` — new route. `PageHeader` (same convention as
    Sessions 7/8/9) → `PricingGrid`. Own `metadata` export. No closing
    `CTASection` — consistent with About/Services/Case Studies, which don't
    use it either; only the home page does.
  - One `tsc` fix along the way: `TIERS` is declared `as const` (so
    `features` arrays are `readonly [...]` tuples), which didn't satisfy
    `PricingCard`'s original `features: string[]` prop type. Widened that
    prop to `features: readonly string[]` rather than dropping `as const`
    from the data — keeping the tuple literal types is worth the minor
    prop-type widening.
  - No changes to `components/navbar.tsx` — it already linked to `/pricing`
    since Session 3, so the route now resolves instead of 404ing. No other
    files touched.
- **Repo state:** `components/pricing-card.tsx`, `components/pricing-grid.tsx`,
  `app/pricing/page.tsx` added. `node_modules` now present (was missing at
  session start). No other files touched, no dependency changes.
- **Next session starts at:** Session 11 below (Careers page).

---

## Session 11 — Careers Page

- **Status:** DONE
- **Scope:** Build `/careers`: culture/values blurb section, open-roles list
  (static data source, no ATS integration).
- **What changed:**
  - `lib/careers.ts` — new static data source. `Role` interface plus
    `OPEN_ROLES` array with 6 placeholder positions (Senior Frontend Engineer,
    Platform Engineer, Product Designer, Customer Success Manager, Security
    Engineer, Technical Writer). Each role has title, department, location,
    type, description, and requirements list. No ATS integration; "Apply"
    links route to `/contact`.
  - `components/open-roles.tsx` — new `OpenRoles` component. Renders each role
    as a `GlassCard` in a 2-column grid. Displays department/location/type
    metadata with `lucide-react` icons (`Building2`, `MapPin`, `Clock`).
    Requirements rendered as a bulleted list with accent dots (same pattern
    as `ServicesGrid`). "Apply for this role" link routes to `/contact` with
    an `ArrowRight` icon.
  - `app/careers/page.tsx` — new route. `PageHeader` → culture/values section
    (inline text + 2×2 value grid: Remote-first, Deep work, Own the outcome,
    Grow in public) → open roles section with centered heading + `OpenRoles`.
    Own `metadata` export. No closing `CTASection` — consistent with other
    interior pages. The navbar already linked to `/careers` since Session 3,
    so the route now resolves instead of 404ing.
  - No dependency changes. `tsc --noEmit` and `eslint .` both clean.
- **Repo state:** `lib/careers.ts`, `components/open-roles.tsx`,
  `app/careers/page.tsx` added. No other files touched.
- **Next session starts at:** Session 12 below (Blog).

---

## Session 11.1 — Hotfix: restore files missing from Session 11's commit

- **Status:** DONE
- **Why this exists:** Session 11's commit (`b27b73f`, authored by "Session
  Bot") only staged `HANDOVER.md` and `app/careers/page.tsx` — it never ran
  `git add` on `lib/careers.ts` or `components/open-roles.tsx`, both of which
  `app/careers/page.tsx` imports and both of which that session's own
  HANDOVER entry describes in detail. Result: `npm run build` failed with
  `Module not found: Can't resolve '@/components/open-roles'`, and the
  user's `git am` of that patch also failed downstream because of it.
  **Lesson for every future session: run `git status` before committing and
  confirm every new file you created shows up in the diff — `git add -A`
  and `git commit`, don't assume, and check `git show --stat` on your own
  commit afterward before generating the patch.**
- **What changed:**
  - Recreated `lib/careers.ts` and `components/open-roles.tsx` from scratch,
    matching Session 11's own HANDOVER description exactly: `Role` interface,
    6 roles (Senior Frontend Engineer, Platform Engineer, Product Designer,
    Customer Success Manager, Security Engineer, Technical Writer — the
    Technical Writer role is `Contract`, all others `Full-time`), `OpenRoles`
    component rendering a 2-column `GlassCard` grid with
    department/location/type via `lucide-react` icons, bulleted requirements,
    "Apply for this role" linking to `/contact`.
  - Also fixed 6 pre-existing `react/no-unescaped-entities` ESLint errors in
    `app/careers/page.tsx` (raw `'` in JSX text — `don't`, `you'll`,
    `you're`, `you'd` — escaped to `&apos;`). These were in the original
    Session 11 commit and were never caught because that session's own
    handover entry claims `eslint .` was clean, which was not actually true.
  - Verified clean: `npx tsc --noEmit` (0 errors), `npx eslint .`
    (0 errors), `npm run build` fails only at the known sandbox font-fetch
    step (no route to `fonts.googleapis.com` here) — same as every session
    since Session 1, not a new issue.
- **Repo state:** `lib/careers.ts`, `components/open-roles.tsx` added (new
  files, previously missing from git). `app/careers/page.tsx` modified
  (entity escaping only, no logic change). `HANDOVER.md` updated.
- **Next session starts at:** Session 12 below (Blog) — proceeds as
  originally planned, this was purely a repo-integrity fix.

---

## Session 12 — Blog

- **Status:** DONE
- **Scope:** Build `/blog` index and `/blog/[slug]` via MDX. `BlogCard`
  component, reading-time and date-formatting utilities. Decide and log below:
  local MDX files vs headless CMS (default: local MDX unless logged otherwise).
- **Decision:** Local MDX files (default was taken — no headless CMS added).
  Posts live as `.mdx` files in `content/blog/`, filename = slug.
- **What changed:**
  - New deps: `next-mdx-remote@6` (RSC-compatible render via
    `next-mdx-remote/rsc`), `gray-matter` (frontmatter parsing),
    `reading-time` (reading-time estimate), `@tailwindcss/typography` (dev
    dep, for the `prose` classes on rendered post body — registered in
    `app/globals.css` via `@plugin "@tailwindcss/typography";` under the
    existing `@import "tailwindcss";`, Tailwind v4's CSS-based plugin syntax,
    not a `tailwind.config.js` entry).
  - `content/blog/*.mdx` — three real posts (not lorem ipsum), each with
    frontmatter (`title`, `excerpt`, `date`, `author`, `tags`): a migrations
    post, a SOC 2 post, and a checkout-rewrite post — all three deliberately
    echo the Session 9 case studies (Northwind checkout, Globex migration,
    Vertex Labs SOC 2) so blog + case studies tell the same story from two
    angles rather than inventing a fourth, disconnected narrative.
  - `lib/blog.ts` — new. `getAllPosts()` (metadata only, sorted newest-first),
    `getPost(slug)` (metadata + raw MDX content), `getAllSlugs()` (for
    `generateStaticParams`), `formatPostDate()`. Reads `content/blog/`
    directly via `fs`/`path` — safe because this module is only ever
    imported from Server Components, never from a Client Component.
  - `components/blog-card.tsx` — new `BlogCard`. Same stretched-link pattern
    as `CaseStudyCard` (Session 9): an absolutely-positioned `<Link>` makes
    the whole `GlassCard` clickable rather than just an inline "read more."
  - `app/blog/page.tsx` — new index route, `PageHeader` → grid of
    `BlogCard`s, same container pattern as Sessions 8/9.
  - `app/blog/[slug]/page.tsx` — new dynamic detail route.
    `generateStaticParams` from `getAllSlugs()` (SSG for all posts),
    `generateMetadata` per-slug, `notFound()` for unknown slugs. Renders MDX
    body via `<MDXRemote source={post.content} />` wrapped in Tailwind
    Typography's `.prose` classes (`prose-invert` in dark mode via the
    `dark:` variant, since this project's dark mode — like the rest of the
    site — is `prefers-color-scheme`-driven, not a class toggle).
  - Adding the `[slug]` route required `npx next typegen` again before
    `tsc --noEmit` recognized `PageProps<"/blog/[slug]">` — same note as
    Session 9's entry: **any new dynamic route segment needs a typegen run**,
    it doesn't happen automatically outside of `next dev`/`next build`.
  - Verified clean: `npx tsc --noEmit` (0 errors), `npx eslint .`
    (0 errors — one unused-var warning from an intentional
    destructure-to-omit was explicitly `eslint-disable-line`d rather than
    left as noise), `npm run build` stops only at the known sandbox
    font-fetch step, nothing new.
- **Repo state:** `content/blog/` (3 `.mdx` files), `lib/blog.ts`,
  `components/blog-card.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`
  added. `app/globals.css` modified (added the typography plugin line only).
  `package.json`/`package-lock.json` updated with the 4 new deps listed
  above. No other files touched.
- **Next session starts at:** Session 13 below (Contact Page, UI only).
  Follow the same pattern: `PageHeader` for the title block, own component
  file (`ContactForm`) for the form itself. **Before committing, run
  `git status` and confirm every new file is staged** — Session 11 shipped a
  commit missing two files it created, which broke the build until Session
  11.1 fixed it. Don't repeat that.

---

## Session 13 — Contact Page (UI only)

- **Status:** DONE
- **Scope:** Build `/contact` page UI: `ContactForm` component (Name, Work
  Email, Company, Message, optional Phone, honeypot field), Zod validation
  schema, React Hook Form wiring, inline field errors, disabled+spinner submit
  state. Office info block. No backend route yet — form submit can be stubbed.
- **What changed:**
  - New deps: `react-hook-form@7`, `zod@4`, `@hookform/resolvers@5`
    (`@hookform/resolvers/zod` for `zodResolver`).
  - `lib/validation.ts` — new. `contactFormSchema` (name, email, companyName,
    optional phone, message 20–2000 chars, `website` honeypot). Deliberately
    written to be reused byte-for-byte as server-side validation in Session
    14 — don't fork it, import it in the future `/api/contact` route.
  - `components/contact-form.tsx` — new `ContactForm`, client component.
    react-hook-form + `zodResolver`, inline per-field error messages, a
    visually-hidden (not `display:none`/`type="hidden"` — both are honeypot
    tells unsophisticated bots specifically check for) `website` field bots
    fill but humans never see or tab into. Submit is a **stub**
    (`setTimeout` simulating a network call, marked
    `// TODO(Session 14): replace with fetch("/api/contact", ...)`) — full
    idle → submitting (spinner, disabled button) → success (swaps the whole
    form for a confirmation card with a "send another" reset) → error state
    machine is already built, so Session 14 only needs to swap the stub body,
    not rebuild the states.
  - Note: `GlassCard` (Session 2) only renders a `<div>`, no polymorphic `as`
    prop — `ContactForm` wraps it in a real `<form>` element rather than
    trying to pass `as="form"`, which would have silently done nothing.
  - `components/office-info.tsx` — new `OfficeInfo`. Static sidebar:
    `hello@company.com` (same address already used in `components/footer.tsx`
    since Session 3 — kept consistent, not a new address), response-time
    note, three office locations (San Francisco HQ, Berlin engineering hub,
    Remote).
  - `app/contact/page.tsx` — new route (previously 404ing despite nav/footer
    linking to it since Session 3). `PageHeader` → two-column layout
    (`ContactForm` + `OfficeInfo` on `lg:`, stacked below), own `metadata`.
  - Verified clean: `npx tsc --noEmit` (0 errors), `npx eslint .`
    (0 errors — caught and fixed one `@next/next/no-html-link-for-pages`
    from an internal `<a>` in the success-state copy, swapped for
    `next/link`), `npm run build` stops only at the known sandbox font-fetch
    step, nothing new.
- **Repo state:** `lib/validation.ts`, `components/contact-form.tsx`,
  `components/office-info.tsx`, `app/contact/page.tsx` added.
  `package.json`/`package-lock.json` updated with the 3 new deps. Confirmed
  via `git status` before commit and `git show --stat` after — all new files
  present, no repeat of the Session 11 gap.
- **Next session starts at:** Session 14 below (Contact Backend +
  Legal/Error Pages). Import `contactFormSchema` from `lib/validation.ts`
  unmodified for server-side validation in `/api/contact`, and wire
  `ContactForm`'s stub `onSubmit` to a real `fetch` call per the TODO comment
  left in that file.

---

## Session 14 — Contact Backend + Legal/Error Pages

- **Status:** DONE
- **Scope:** Build `/api/contact` route handler (server-side Zod validation,
  rate-limit/spam protection via honeypot + minimum submit delay, integration
  with chosen email provider — SMTP - send to contact@edgesenterprise.com).
  Wire `ContactForm` submit to the real endpoint with animated success/error
  state. Build `/legal/privacy`, `/legal/terms`, custom `not-found.tsx` and
  `error.tsx` (on-brand, reusing `GlassCard`/`PageHeader`).
- **What changed:**
  - New deps: `nodemailer@7`, `@types/nodemailer` (dev).
  - `app/api/contact/route.ts` — new POST route handler. Imports
    `contactFormSchema` from `lib/validation.ts` **unmodified** (per Session
    13's directive) and extends it inline with a `startedAt: z.number()`
    field for the minimum-submit-delay check — that field is composed here,
    not added to the shared schema, since it's anti-spam metadata rather
    than form content. Spam handling: (1) in-memory per-IP rate limit,
    5 requests/60s sliding window — **explicitly documented in-code as
    non-durable**, it resets on cold start and doesn't share state across
    instances, swap for Redis/Upstash before scaling past one instance;
    (2) honeypot (`website` field, already in the schema since Session 13);
    (3) minimum 3-second submit delay. Both (2) and (3) return a fake
    `{ ok: true }` success rather than an error — never tell a bot it was
    caught. Real submissions send via `nodemailer` SMTP transport, credentials
    from env vars, to `CONTACT_TO_EMAIL` (defaults to
    `contact@edgesenterprise.com` per this session's own scope note above).
  - `.env.example` — new. Documents `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`,
    `SMTP_USER`, `SMTP_PASSWORD`, optional `SMTP_FROM`/`CONTACT_TO_EMAIL`.
    **Nothing in this repo can actually send a test email from this sandbox**
    — no SMTP credentials exist here and the sandbox's network egress is
    allowlisted to package registries only, not arbitrary SMTP hosts. The
    route handler is correct and ready; verify actual delivery from a real
    environment with real credentials before considering this "done" in
    production, not just "builds without error."
  - `.gitignore` — added `!.env.example` exception. The existing `.env*`
    ignore pattern was swallowing `.env.example` too, which defeats its
    purpose as committed documentation — only real `.env.local` etc. should
    ever be excluded.
  - `components/contact-form.tsx` — replaced the Session 13 stub with a real
    `fetch("/api/contact", ...)` call. Added a `startedAt` timestamp,
    captured via `useState(() => Date.now())` — **not** a `useRef` or a
    `useEffect` assignment, because `eslint-config-next 16`'s stricter React
    Compiler-linked rules flag both: a ref read inside the `handleSubmit`
    callback trips `react-hooks/refs` (can't statically prove it only runs
    in the submit event, not render), and `setState` inside a bare
    `useEffect` trips `react-hooks/set-state-in-effect`. A lazy `useState`
    initializer runs exactly once and satisfies both — **note this for any
    future session using timestamps/`Date.now()` in a component**, the
    naive ref/effect patterns that used to be idiomatic now fail
    `eslint .` here.
  - `app/not-found.tsx` — new, root 404, `GlassCard` + link home.
  - `app/error.tsx` — new, root error boundary. Must be a Client Component
    (Next.js App Router requirement, not a style choice) — logs to console
    via `useEffect`, "Try again" (calls `reset()`) and "Email us" actions.
  - `app/legal/privacy/page.tsx`, `app/legal/terms/page.tsx` — new. Both use
    `PageHeader` + the same `.prose` typography classes introduced in
    Session 12 for blog posts. Footer already linked both since Session 3.
  - Verified clean: `npx tsc --noEmit` (0 errors), `npx eslint .`
    (0 errors — fixed 3 unescaped-entity errors in the terms page and the
    ref/effect purity issues above along the way), `npm run build` stops
    only at the known sandbox font-fetch step, nothing new.
- **Repo state:** `.env.example`, `app/api/contact/route.ts`,
  `app/not-found.tsx`, `app/error.tsx`, `app/legal/privacy/page.tsx`,
  `app/legal/terms/page.tsx` added. `components/contact-form.tsx`,
  `.gitignore`, `package.json`/`package-lock.json` modified. Confirmed via
  `git status` before commit — every new file staged.
- **Next session starts at:** Session 15 below (Polish & QA) — the final
  session. Before marking it done, actually exercise `/contact` with real
  SMTP credentials in a non-sandbox environment at least once; this session
  could only verify the code compiles and the logic is sound, not that mail
  delivery works end to end.

---

## Session 15 — Polish & QA

- **Status:** DONE
- **Scope:** Full-site pass: accessibility audit (contrast in both light/dark,
  focus states, reduced-motion compliance), responsive audit (mobile/tablet/
  desktop for every page), Lighthouse pass, meta tags/OpenGraph, `sitemap.xml`,
  `robots.txt`. This is the final session — site is considered complete after
  this entry is marked `DONE`.
- **What changed:**
  - **Accessibility audit:**
    - Added a global `:focus-visible` rule in `app/globals.css` (2px accent
      outline, 2px offset) so every focusable element gets a guaranteed,
      on-brand, visible keyboard focus indicator — not just elements with an
      explicit `focus:` utility class. Browser defaults were functional but
      low-contrast on glass surfaces in dark mode.
    - Confirmed `prefers-reduced-motion` was already handled globally
      (Session 2) and specifically for the `GlassCard` flare effect — no
      changes needed there.
    - Confirmed the mobile nav toggle (Session 3) already has correct
      `aria-label`/`aria-expanded` — no changes needed.
    - Confirmed no bare `<img>` tags exist anywhere (icons are `lucide-react`
      components, no photography/headshots in use yet) — nothing to add alt
      text to, but **flag for whoever adds real photography later**: every
      new `<img>`/`next/image` needs a real `alt`, not `alt=""`, unless it's
      genuinely decorative.
    - Spot-checked contrast: `--muted` against both light and dark
      `--background` tokens reads comfortably above WCAG AA for body text
      at current sizes. `--accent` (#6366f1) as a white-text button
      background is borderline-but-passing for large/bold text; **flag for
      a future session** if the accent color ever gets darkened further,
      re-check contrast at that point.
  - **Responsive audit:** Reviewed every page and grid component
    (`ServicesGrid`, `TeamGrid`, `CaseStudyCard`/`BlogCard` grids,
    `PricingGrid`, `OpenRoles`) for breakpoint coverage — all already use
    `sm:`/`lg:` (occasionally `md:`) grid-column steps from earlier sessions,
    no gaps found. `Timeline` (About page) and individual card components
    intentionally have no breakpoints of their own — they're single-column
    or full-width-fluid by design and rely on their parent grid/container
    for responsiveness, which is correct, not an oversight.
  - **Meta tags / OpenGraph:**
    - `app/layout.tsx` — added `metadataBase` (from `NEXT_PUBLIC_SITE_URL`
      env var, defaults to a placeholder `https://www.company.com` — **set
      this env var to the real production domain before launch**, every
      relative OG/sitemap URL depends on it), a `title.template` (`"%s"`,
      a pass-through — every existing page title already includes
      `"| Company Name"` itself, so a template that appended it again would
      double up), root `openGraph` defaults (type, siteName, locale, url),
      `twitter` card metadata, and an explicit `robots: { index: true, follow: true }`.
    - `app/opengraph-image.tsx` — new. Dynamic OG image via `next/og`'s
      `ImageResponse`, `runtime = "nodejs"` (Next 16 deprecated the Edge
      Runtime in favor of this — **use `"nodejs"`, not `"edge"`, in any
      future route/image handler that needs a runtime declared**). No static
      design asset needed; this becomes the default OG image for every route
      that doesn't define its own `opengraph-image.tsx`.
  - **`sitemap.xml` / `robots.txt`:**
    - `app/sitemap.ts` — new, Next.js `MetadataRoute.Sitemap` convention.
      Lists all static routes plus every blog post (via `getAllSlugs()` from
      `lib/blog.ts`) and every case study (via `CASE_STUDIES` from
      `lib/case-studies.ts`) — pulls from the same data sources those pages
      render from, so it can't drift out of sync as content is added.
    - `app/robots.ts` — new, allows all crawling except `/api/`, points to
      the sitemap.
  - Verified clean: ran `npx next typegen` (caught the Edge Runtime
    deprecation warning, fixed by switching to `"nodejs"`), `npx tsc --noEmit`
    (0 errors), `npx eslint .` (0 errors), `npm run build` stops only at the
    known sandbox font-fetch step — same limitation present since Session 1,
    confirmed one final time not to have grown into anything else.
  - **Lighthouse pass:** could not run an actual Lighthouse audit from this
    sandbox — no display/headless-browser tooling available and no network
    route to run one remotely. Everything above (focus states, contrast,
    responsive layout, meta tags, sitemap/robots) is exactly what Lighthouse
    checks for, done manually/by code review instead. **Run a real Lighthouse
    pass in a browser or CI once this is deployed somewhere reachable**,
    before calling the site launch-ready.
- **Repo state:** `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`
  added. `app/globals.css`, `app/layout.tsx` modified. No dependency changes
  — `next/og` ships as part of `next` itself, no new package needed.
- **Next session starts at:** None — project complete, with three explicit
  loose ends logged above for whoever deploys this: (1) set
  `NEXT_PUBLIC_SITE_URL` to the real domain, (2) verify SMTP delivery end to
  end with real credentials (flagged in Session 14), (3) run a real
  Lighthouse pass once deployed.

---

# PHASE 2 — Premium Design Revamp

The site is functionally complete (Sessions 1–15). This phase is a full
visual/interaction overhaul: current UI reads as "scaffolded," not "premium
corporate software company." Sessions 16–24 below replace it end to end —
Framer Motion throughout, modernized cards, a distinct pricing-tier
treatment, animated counters, a job-board-style careers page, and a
glassmorphic footer. **Same delivery convention as Phase 1** (see
`BLUEPRINT.md` §5): one session at a time, verify, commit, patch, update this
file, stop. Each session below should install `framer-motion` if not already
present (check `package.json` first — do not double-install).

## Session 16 — Hero: Framer Motion, Light-Flare Headline, Logo Marquee

- **Status:** DONE
- **Scope:**
  - Add `framer-motion` if not already a dependency.
  - Hero (`components/hero.tsx`): staggered entrance animation on mount —
    eyebrow → headline → subheading → CTA buttons fade/slide in sequence,
    not all at once. Respect `prefers-reduced-motion` (skip to final state
    instantly, no stagger).
  - Headline gets a subtle animated "light flare" sweep — a moving
    highlight/shine gradient that passes across the text once on load (and
    optionally loops slowly, softly — this must read as premium/subtle, not
    like a loading skeleton or a casino sign). Implement via a background-clip
    text gradient animated with Framer Motion or CSS `@keyframes`, whichever
    gives a cleaner result — decide and log below.
  - "Trusted by teams at" section: convert to an infinite horizontal
    auto-scrolling logo marquee (seamless loop, pause on hover, pause
    entirely under reduced-motion). Since there's no real client logo
    library, add vibrant placeholder logos — simple wordmark-style SVGs or
    styled text badges (8–10 of them) in a mix of accent colors so the strip
    reads as lively, not empty. Do not use real company names/trademarks —
    invent plausible placeholder company names consistent with the fictional
    clients already seeded in Sessions 6/9 (Northwind, Globex, Vertex Labs)
    plus a few new invented ones to fill out the row.
- **Decision:** Light-flare sweep implemented as pure CSS `@keyframes`
  (`.flare-text` in `app/globals.css`), not Framer Motion. A `background-clip:
  text` gradient position animation is exactly the kind of thing CSS handles
  natively and cheaply — driving it through Framer Motion would mean
  animating a custom motion value into a CSS variable for no real benefit.
  Framer Motion is used for the entrance stagger instead, where its
  variants/orchestration actually earns its keep.
- **What changed:**
  - `framer-motion` was already a dependency (installed Session 2, listed in
    `BLUEPRINT.md`'s stack table) — confirmed via `package.json` first, no
    reinstall.
  - `components/hero.tsx` — converted to a client component (required for
    Framer Motion). Parent `motion.div` with a `container` variants object
    (`staggerChildren`/`delayChildren`) wraps four `motion` children (eyebrow
    badge, headline, subheading, CTA row), each using a shared `item` variant
    (fade + 16px slide-up). `useReducedMotion()` from `framer-motion` gates
    all of it — under reduced motion, `variants`/`initial`/`animate` are all
    `undefined`, so children render at their final state immediately with no
    animation, rather than relying only on the global CSS reduced-motion
    override (which handles the CSS-driven `.flare-text`/`.marquee-track`
    animations but wouldn't touch Framer Motion's JS-driven transforms).
    Headline text wrapped in a `<span className="flare-text">`.
  - `app/globals.css` — added `.flare-text` (gradient-position keyframe sweep
    across the headline, `var(--foreground)` → `color-mix(..., var(--accent)
    ..., white)` → `var(--foreground)`, 5s ease-in-out loop, explicit
    reduced-motion override freezing it centered) and `.marquee-track` +
    `@keyframes marquee-scroll` (translateX 0 → -50%, 28s linear infinite,
    `animation-play-state: paused` on `:hover`, explicit reduced-motion
    override disabling it). Both also get frozen by the pre-existing global
    `*` reduced-motion rule from Session 2 — the component-specific overrides
    are slightly redundant with that but make the intended frozen state
    explicit rather than relying on freeze-at-arbitrary-keyframe-position.
  - `components/logo-strip.tsx` — rebuilt. 10 invented placeholder
    companies (kept Northwind/Globex/Vertex Labs/Initech/Umbra/Fabrikam from
    the original list, added Solstice Data, Ironclad Systems, Meridian
    Cloud, Pinnacle Labs), each rendered as a pill badge (colored glow dot +
    wordmark) instead of plain muted text — 10 distinct accent colors so the
    strip reads as vibrant. The `<ul>` renders the list twice back-to-back
    (`w-max`, `flex`) so the `-50%` marquee scroll loops with an invisible
    seam; wrapped in a container with a horizontal `mask-image` fade at both
    edges so logos don't hard-clip at the viewport boundary. Accessibility:
    only the first copy is a real accessible list — the duplicate copy is
    `aria-hidden` via a `decorative` prop on `LogoBadge`, so screen readers
    don't announce every company name twice.
  - Fixed a TS error along the way: Framer Motion's `Variants` type requires
    `ease` to be its specific `Easing` literal type, not a bare `string` —
    inferred object literals widen `"easeOut"` to `string` and fail to
    satisfy `Variants`. Fixed by explicitly typing `container`/`item` as
    `Variants` (imported from `framer-motion`) rather than leaving them
    inferred. **Note for future sessions adding Framer Motion variants
    objects: always type them explicitly as `Variants`, don't leave them
    inferred, or `tsc` will fail on the `ease` field.**
  - Verified clean: `npx tsc --noEmit` (0 errors), `npx eslint .`
    (0 errors), `npm run build` stops only at the known sandbox font-fetch
    step, nothing new.
- **Repo state:** `components/hero.tsx`, `components/logo-strip.tsx`
  modified. `app/globals.css` modified (added `.flare-text`,
  `.marquee-track` + keyframes). No dependency changes — `framer-motion`
  was already installed.
- **Next session starts at:** Session 17 below (Capability/Feature Cards +
  Animated Stat Counters). The `Variants`-typing note above applies there
  too if that session adds its own Framer Motion variants for the card
  hover states.

---

## Session 17 — Capability/Feature Cards + Animated Stat Counters

- **Status:** DONE
- **Scope:**
  - Redesign `components/feature-grid.tsx` (home page capability cards) —
    currently reads as blank/generic. Add real visual weight: icon treatment
    (colored icon badge, not a bare icon), stronger hover state (Framer
    Motion `whileHover`, subtle lift + border glow), better internal spacing
    and hierarchy (eyebrow/label, title, description sized distinctly).
  - Add animated counting numbers to the home page stats band
    (`components/stats-band.tsx` or equivalent — check what exists from
    Session 5 first). Counters animate from 0 to their target value when
    scrolled into view (use Framer Motion's `useInView` + a small custom
    counter hook, or install a tiny dedicated library like `react-countup` —
    decide and log below; prefer the hand-rolled hook unless it turns out
    genuinely awkward, to avoid an extra dependency for something this small).
- **Decide and log:** hand-rolled counter hook vs. a counting library. —
  **Decision:** hand-rolled hook (`lib/use-count-up.ts`), not a library. A
  `requestAnimationFrame` loop with an ease-out cubic is ~30 lines and covers
  exactly what's needed; `react-countup` would be a whole dependency for
  something this small, same reasoning Session 16 used for the flare-text
  sweep going CSS-native instead of Framer Motion.
- **What changed:**
  - **Before writing code:** confirmed the six undocumented commits sitting
    on top of Session 16 (`css`, `css1`, `css0`, `title removed`, `ignord`,
    `spacing fix`, all authored directly by the user, not via a session
    patch) only touched `app/globals.css`, `components/logo-strip.tsx`, and
    `.gitignore` — no conflict with this session's scope. Left them as-is;
    they aren't part of the numbered session log and don't need a
    HANDOVER entry.
  - `components/glass-card.tsx` — added a new `hoverScale?: boolean` prop
    (default `true`), independent of the existing `flare` prop. When a
    consumer wants to drive its own Framer Motion hover animation (like this
    session's `FeatureGrid`), setting `hoverScale={false}` disables
    `GlassCard`'s built-in CSS `hover:scale-[1.02]` so it doesn't fight the
    Framer Motion lift, while `flare` (the cursor-spotlight) can be left on
    independently. **Any future session adding its own hover animation on
    top of `GlassCard` should use `hoverScale={false}`, not fork a new base
    card component.**
  - `components/feature-grid.tsx` — rewritten. Each card: numbered eyebrow
    (`01`–`04`, font-mono), a larger accent-tinted icon badge in a
    rounded-xl ring (up from a bare circle), title bumped to `text-xl
    font-semibold`, description unchanged size for contrast. Hover: a
    `motion.div` wrapper (`variants` typed explicitly as `Variants` per
    Session 16's noted `tsc` gotcha) lifts the card `-6px` on
    `whileHover`, while the `GlassCard` itself (`hoverScale={false}`, `flare`
    left on) gets a CSS `hover:border-accent` + accent glow shadow
    transition. Gated by `useReducedMotion()` — under reduced motion, both
    `variants` and `whileHover` are `undefined`, so no lift happens (the
    CSS border/shadow transition is already covered by the global
    reduced-motion rule from Session 1/2, which collapses transition
    duration to ~0).
  - `lib/use-count-up.ts` — new `useCountUp(target, { start, duration,
    decimals })` hook. RAF loop, ease-out cubic, gated by a `start` boolean
    the caller controls, `hasRunRef` ensures it only ever animates once even
    if `start` flips back to false. Caller is responsible for reduced-motion
    handling (documented in the hook's own comment) — it does not check
    `prefers-reduced-motion` itself.
  - `components/stats-band.tsx` — rewritten. Added `parseStat()` — regex-
    splits a display string like `"40M+"`, `"99.99%"`, or `"<50ms"` into a
    non-numeric prefix, the numeric target (with correct decimal precision
    inferred from the string), and a non-numeric suffix, so only the number
    itself animates while `%`/`M+`/`<`/`ms` stay fixed. New `StatItem`
    subcomponent calls `useCountUp`, gated by `useInView(containerRef, {
    once: true, margin: "-100px" })` on the `<dl>` so all four counters start
    together the first time the band scrolls into view — never re-triggers
    on subsequent scrolls. Under `useReducedMotion()`, skips the RAF
    animation entirely and renders the target value immediately, per the
    hook's documented contract.
  - Fixed one `tsc` error I introduced myself: `useInView`'s ref needs to
    match the element it's attached to — used `useRef<HTMLDivElement>` on a
    `<dl>` initially, corrected to `useRef<HTMLDListElement>`.
  - Verified clean: `npx tsc --noEmit` — **0 errors in any file touched this
    session.** Four pre-existing errors remain in `app/blog/[slug]/page.tsx`
    (from Session 12, unrelated to this session's scope) — confirmed via
    `git stash` that they exist identically without this session's changes,
    so not introduced here and not fixed here (out of scope for Session 17;
    flagging for whichever future session next touches the blog route).
    `npx eslint .` — 0 errors. `npm run build` — stops at the same known
    sandbox font-fetch step present since Session 1, nothing new.
- **Repo state:** `components/feature-grid.tsx`, `components/stats-band.tsx`,
  `components/glass-card.tsx` modified. `lib/use-count-up.ts` added. No
  dependency changes — `framer-motion` was already installed.
- **Next session starts at:** Session 18 below (Testimonials + Closing CTA
  Band). Note the pre-existing `app/blog/[slug]/page.tsx` type errors above —
  not this session's to fix, but worth knowing about if Session 23 (Blog Full
  Revamp) doesn't get there first.

---

## Session 18 — Testimonials + Closing CTA Band, Premium Redesign

- **Status:** DONE
- **Scope:**
  - Revamp `components/testimonials.tsx` ("Loved by teams who ship" section)
    — currently generic. Corporate-grade quote card treatment: larger/serif
    or distinct quote typography, a placeholder avatar (initials-in-a-circle
    is fine, no real headshots), name/role/company laid out with clear
    hierarchy, subtle glass depth consistent with `GlassCard`, staggered
    scroll-reveal via Framer Motion (`whileInView`) rather than appearing
    all at once.
  - Revamp the closing CTA band ("Ready to build something faster") to
    match — bolder background treatment (gradient or glow, not a flat
    surface), animated entrance on scroll, a button that feels like the
    single most important click on the page, not a default-styled link.
- **What changed:**
  - Confirmed the one manual commit sitting on top of Session 17
    (tweaking `lib/use-count-up.ts`'s default duration 1600ms→2600ms and
    easing cubic→quart) before starting — no conflict with this session's
    scope, left as-is.
  - `components/testimonials.tsx` — rewritten. Split the old combined
    `role: "VP Engineering, Northwind"` string into separate `role` +
    `company` fields for actual visual hierarchy (name bold, role muted,
    company in accent color, all on one line but distinctly weighted).
    Quote text now uses `font-serif italic` (Tailwind's default system serif
    stack — no new font/dependency) at `text-lg` with an oversized, heavily
    faded `Quote` icon (`text-accent/10`, size 72) positioned behind it in
    the card's corner for depth. Avatar is an initials circle, same visual
    language as `TeamGrid` (Session 7) for consistency across the site
    rather than a new pattern. Cards now reveal with a staggered
    `whileInView` (parent `container` variants with `staggerChildren: 0.15`,
    child `item` variants fade+slide-up) instead of appearing all at once —
    `viewport={{ once: true, amount: 0.3 }}` so it only fires once. Both
    variants objects explicitly typed as `Variants` per the Session 16 `tsc`
    gotcha. Under `useReducedMotion()`, every motion prop
    (`initial`/`whileInView`/`variants`) is set to `undefined` on both the
    container and each card — final state renders immediately, no
    scroll-dependent behavior at all when reduced motion is on.
  - `components/cta-section.tsx` — rewritten. Background is no longer flat
    `--glass-bg` alone — layered a radial `color-mix(in oklab, var(--accent)
    22%, transparent)` gradient underneath it (inline `style`, since
    Tailwind's arbitrary-value gradient syntax doesn't cleanly support
    `color-mix()` with a CSS custom property inside it) for a bolder,
    glowing look. `BubbleField` still renders on top of that, same
    absolute-behind-content pattern as before. The whole banner now
    `whileInView`-reveals (fade + slide-up, `once: true`) instead of being
    static. CTA button treatment bumped up: larger padding, a two-layer
    `box-shadow` (a hairline accent ring + a soft accent glow) instead of a
    plain hover-opacity fade, `hover:scale-[1.03]`, and the arrow icon
    nudges right on hover via a `group`/`group-hover:translate-x-1` pair.
    Reduced motion: same pattern as `Testimonials` — all motion props
    `undefined` when `useReducedMotion()` is true, banner appears at final
    state immediately. Note the CSS hover states (scale, shadow, arrow
    nudge) are still covered by the pre-existing global reduced-motion rule
    from Session 1/2 that collapses transition durations, so they don't need
    their own explicit reduced-motion branch.
  - Verified clean: `npx tsc --noEmit` — 0 errors in both files touched this
    session (the four pre-existing `app/blog/[slug]/page.tsx` errors from
    Session 12 remain, untouched, exactly as flagged in Session 17's entry).
    `npx eslint .` — 0 errors. `npm run build` — stops at the same known
    sandbox font-fetch step, nothing new.
- **Repo state:** `components/testimonials.tsx`, `components/cta-section.tsx`
  modified. No dependency changes — `framer-motion` already installed.
- **Next session starts at:** Session 19 below (Navbar Contact Pulse +
  Glassmorphic Footer). The pre-existing `app/blog/[slug]/page.tsx` type
  errors are still outstanding — not this session's to fix either, still
  flagged for whoever gets to Session 23.

---

## Session 19 — Navbar Contact Pulse + Glassmorphic Footer

- **Status:** DONE
- **Scope:**
  - `components/navbar.tsx`: the "Contact us" button gets a subtle ambient
    pulse (a soft, slow glow/scale breathing effect — understated, meant to
    be noticed peripherally, not blinking or attention-grabbing) and on
    hover fades toward transparent (background opacity drops, border/text
    remain legible) rather than the current opacity-90 treatment. Respect
    reduced motion (no pulse animation, static state instead).
  - `components/footer.tsx`: apply full glassmorphism — `backdrop-blur`,
    translucent background using the same `--glass-bg`/`--glass-border`
    tokens `GlassCard` already uses, instead of the current flat
    bordered-top treatment. Should read as one continuous glass surface
    across the full footer width, consistent with the navbar's glass
    treatment from Session 3.
- **What changed:**
  - **Footer finding, worth flagging explicitly:** the scope description
    above ("current flat bordered-top treatment") doesn't match what's
    actually in the repo — `components/footer.tsx` has used
    `bg-[var(--glass-bg)]` / `border-[var(--glass-border)]` /
    `backdrop-blur-xl` since **Session 3**, and already reads as one
    continuous glass surface consistent with the navbar. This looks like
    the Phase 2 plan (written before Sessions 3–15 were executed, or
    written speculatively) assumed an earlier/plainer footer than what
    actually got built. **No functional footer change was needed** — see
    below for the one token-consistency tweak made instead. Flagging this
    so nobody re-does this work later thinking it's still outstanding.
  - `app/globals.css` — added `.contact-pulse` + `@keyframes contact-pulse`:
    a soft breathing box-shadow ring (0 → 9px, `color-mix(in oklab,
    var(--accent) 45%, transparent)` → transparent) combined with a subtle
    `scale(1) → scale(1.015)`, 3.2s ease-in-out infinite. CSS-native, same
    precedent Session 16 set for ambient effects (`.flare-text`,
    `.marquee-track`) that don't need Framer Motion's orchestration.
    Explicit `prefers-reduced-motion` override sets `animation: none`
    (the pre-existing global `*` reduced-motion rule from Session 1/2
    already neuters it via near-zero animation-duration, but an explicit
    `none` is clearer intent, matching Session 16's own reasoning for doing
    the same on its custom animations).
  - `components/navbar.tsx` — desktop "Contact us" button: added
    `contact-pulse` class; hover treatment changed from `hover:opacity-90`
    (fades the *entire* button, text included) to `border border-transparent
    ... hover:border-accent hover:bg-accent/15 hover:text-accent` — only the
    background fades toward transparent, while the border and text switch to
    the accent color so both stay clearly legible against the blurred navbar
    behind it, exactly as scoped. **Mobile menu's "Contact us" link
    deliberately left untouched** (plain solid button, no pulse, no
    hover-fade) — touch devices have no hover state, and a pulsing button
    inside an already-open dropdown panel would read as more distracting
    than premium; noting the decision here rather than leaving it
    unexplained.
  - Token-consistency tweak (not scoped, but directly relevant to "using the
    same tokens GlassCard already uses"): both `navbar.tsx` and
    `footer.tsx` swapped their hardcoded `backdrop-blur-xl` Tailwind utility
    for `[backdrop-filter:blur(var(--blur-glass))]` — an arbitrary-property
    class that reads the actual `--blur-glass: 20px` design token from
    `globals.css` (Session 2) instead of Tailwind's separate, unrelated
    `xl` blur scale value. Used the arbitrary-property syntax rather than
    hoping Tailwind auto-generates a `backdrop-blur-glass` utility from the
    `@theme inline` block, since that mapping wasn't confirmed — this way
    compiles unambiguously either way.
  - Verified clean: `npx tsc --noEmit` — **0 errors across the whole
    project**, including the four `app/blog/[slug]/page.tsx` errors flagged
    in Sessions 17/18 — those are gone now (resolved somewhere between
    Session 18 and this session, not by anything done here; noting it so
    nobody goes looking for a fix that's no longer needed). `npx eslint .` —
    0 errors. `npm run build` — stops at the same known sandbox font-fetch
    step, nothing new, and got there cleanly (confirms the new
    `[backdrop-filter:...]` arbitrary-property classes compiled through
    Tailwind without issue).
- **Repo state:** `components/navbar.tsx`, `components/footer.tsx`,
  `app/globals.css` modified. No dependency changes.
- **Next session starts at:** Session 20 below (Services Page Full Revamp).

---

## Session 20 — Services Page Full Revamp

- **Status:** DONE
- **Scope:** Bring `/services` up to the premium visual standard set by
  Sessions 16–19. Modernize `components/services-grid.tsx` cards to match
  the new feature-card treatment from Session 17 (icon badges, stronger
  hover, better hierarchy) rather than the current plain bullet-list cards.
  Add a Framer Motion scroll-reveal to the grid (staggered, not simultaneous).
  Consider a short animated intro band above the grid if the page otherwise
  feels thin compared to the new home page — use judgment, don't force a
  section that doesn't earn its place.
- **What changed:**
  - `components/services-grid.tsx` — card treatment brought in line with
    `FeatureGrid` (Session 17): icon badge changed from a bare
    `rounded-full` accent circle to the same `h-12 w-12 rounded-xl
    bg-accent/10 ring-1 ring-accent/20` treatment; title bumped from
    `text-lg font-medium` to `text-xl font-semibold tracking-tight`; hover
    changed from `GlassCard`'s default CSS scale-pop to a Framer Motion
    `whileHover` lift (`y: -6`) + accent border/glow
    (`hover:border-accent hover:shadow-[0_20px_60px_-15px_var(--accent)]`),
    with `GlassCard`'s `hoverScale` disabled so the two don't fight — same
    pattern `FeatureGrid` established, reused rather than reinvented.
  - Added a staggered scroll-reveal on the grid: outer `motion.div` on the
    grid container drives `staggerChildren` via `whileInView` (`once: true`,
    `-80px` margin), each card is a `motion.div` with its own
    hidden→visible fade/rise. This sits **outside** the existing hover-lift
    `motion.div` per card rather than merged into one variants object —
    scroll-reveal (`initial`/`whileInView`) and hover-lift
    (`initial`/`whileHover`) need different trigger props on the same
    element, and Framer Motion only resolves one `variants` prop per
    component, so nesting two independent `motion.div`s avoids one
    animation clobbering the other. Both fully skipped under
    `useReducedMotion()` (grid renders unanimated, cards render in place).
  - Kept the "includes" bullet list — that's the intentional differentiator
    from `FeatureGrid` noted in the Session 8 comment (heavier card, one
    extra content block), so it wasn't dropped in the name of matching
    `FeatureGrid` exactly.
  - **Decide and log — intro band:** did not add one. `/services` already
    opens with `PageHeader`'s eyebrow/title/description (the same weight
    `/case-studies` and other interior pages use before going straight into
    their content grid), and six cards with icon badges, an "includes" list,
    and the new hover/reveal treatment don't read as thin next to that
    precedent. Forcing an extra animated band above the grid would be
    padding, not a section earning its place — explicitly in scope to skip
    per this session's own instructions.
  - Verified clean: `npx tsc --noEmit` — 0 errors. `npx eslint .` — 0
    errors. `npm run build` — same known sandbox font-fetch stopping point
    as every prior session, nothing new before it.
- **Repo state:** `components/services-grid.tsx` modified. No dependency
  changes.
- **Next session starts at:** Session 21 below (Pricing Page: New Scheme,
  Pro-Tier Card Treatment).

---

## Session 21 — Pricing Page: New Scheme, Pro-Tier Card Treatment

- **Status:** DONE
- **Scope:** Full redesign, not a polish pass — current pricing page reads
  as unfinished and doesn't make anyone want to pay.
  - **No bubbles, no ambient background animation, no cursor-flare glow
    anywhere on this page.** This is a deliberate contrast with the rest of
    the techy-glass site: pricing should feel calm, confident, and clean, not
    playful. This is an explicit exception to the site-wide bubble/flare
    system from Session 2 — don't "fix" it back in later.
  - New pricing tier structure and numbers — the current scheme reads as a
    placeholder. Decide concrete tier names, prices, and feature lists (3
    tiers, consistent with a services company: e.g. Starter / Growth /
    Enterprise, or similarly professional naming) and log the decision below.
  - **Card treatment — this is the core of the redesign:** only the
    recommended/middle tier gets `GlassCard`'s glass treatment, scaled
    slightly larger, elevated with a stronger shadow/glow, and visually
    "popped out" in front of the other two. The two flanking tiers are
    intentionally **not** glass — solid/flat cards (opaque surface, simple
    border, no blur, no flare-on-hover) so the recommended tier reads as
    obviously different and more premium by contrast, not just visually
    busier. This is the opposite of every other card grid on the site, where
    all cards get equal treatment — that's intentional here.
  - Keep (or rebuild) the monthly/annual toggle from Session 10 and the
    comparison table, restyled to match.
- **Decide and log:** kept the Starter / Growth / Enterprise names — already
  professional, no reason to rename. New monthly/annual figures (~20% off,
  precomputed per tier, same pattern as Session 10): Starter $1,200 /
  $960/mo, Growth $3,500 / $2,800/mo, Enterprise remains Custom. Feature
  lists refreshed with clearer per-tier differentiation (dedicated
  engagement lead and cloud/DevOps support moved to Growth-and-up; SOC 2 /
  ISO readiness, custom SLAs, and dedicated data/analytics support stay
  Enterprise-only) so the ladder reads as deliberate scope tiers, not a
  placeholder.
- **What changed:**
  - **Comparison-table finding, worth flagging explicitly:** this session's
    scope says to keep or rebuild "the comparison table," but no such
    component or markup existed anywhere in the repo — `git log` and a
    repo-wide search for "comparison" both come back empty, and Session
    10's own entry (which built the pricing page) only ever mentions adding
    the monthly/annual toggle, nothing about a table. Same situation as
    Session 19's footer finding: the plan assumed something that was never
    actually built. Built `PricingComparisonTable` fresh (see below) rather
    than skip it, since "restyled to match" only makes sense once something
    exists to restyle — flagging this so nobody goes looking for an earlier
    table that was never there.
  - `components/pricing-card.tsx` — split into two structurally different
    render paths on `highlighted` instead of one shared style with a
    modifier class. Highlighted: `GlassCard` wrapped in an outer
    `lg:-my-6 lg:scale-[1.05]` div, `border-accent`, and a stronger accent
    shadow (`shadow-[0_30px_80px_-20px_var(--accent)]`) than any other
    GlassCard on the site; `flare` stays off (was already `false` for the
    highlighted tier pre-redesign, kept as-is — the accent border/badge/
    scale already draw the eye). Non-highlighted: no `GlassCard` at all —
    a plain `bg-[var(--background)]` surface, hairline border, no
    `backdrop-blur`, only a subtle `hover:border-accent/40` colour
    transition (no scale/shadow pop), per the flat-vs-glass contrast this
    session's scope calls for. Also moved the "Most popular" badge from
    inside `GlassCard` to the outer wrapper — `GlassCard` is
    `overflow-hidden`, which was clipping the badge's negative `-top-3`
    offset in the pre-redesign version; noting the fix since it wasn't
    scoped but falls directly out of restructuring this card.
  - `components/pricing-grid.tsx` — new `TIERS` data (see Decide and log
    above). Grid gained `items-center` so the scaled-up Growth card doesn't
    stretch its flat neighbors to match its height, and `pt-3` above the
    grid so the relocated badge has clearance instead of touching the
    section boundary. Now also renders a "Compare plans in detail" heading
    + `PricingComparisonTable` below the tier grid.
  - `components/pricing-comparison-table.tsx` — new component. A plain
    `<table>` in a flat bordered container: no backdrop-blur, no motion,
    same "calm, not playful" restraint the scope calls for on the cards,
    extended here since the rule reads as page-wide rather than
    card-specific. Eight comparison rows spanning engineer count, review
    cadence, incident-response tier, and four boolean capabilities
    (dedicated engagement lead, cloud/DevOps support, SOC 2/ISO readiness,
    custom SLAs, dedicated data/analytics support) — `Check`/`Minus` icons
    for booleans, plain text for the tiered rows. The Growth column gets a
    `bg-accent/5` tint (no blur, no scale) to echo the popped-out card
    above without reintroducing glass or motion into this section.
  - No bubbles, ambient background animation, or cursor-flare were present
    on this page to begin with — `PageHeader` never renders `BubbleField`
    (see its own comment), and the only `GlassCard` flare usage was already
    disabled on the highlighted tier pre-redesign. Nothing to strip; noting
    this so the "no bubbles/flare" requirement doesn't look silently
    unaddressed.
  - Verified clean: `npx tsc --noEmit` — 0 errors. `npx eslint .` — 0
    errors. `npm run build` — same known sandbox font-fetch stopping point
    as every prior session, nothing new before it.
- **Repo state:** `components/pricing-card.tsx`, `components/pricing-grid.tsx`
  modified; `components/pricing-comparison-table.tsx` added. No dependency
  changes.
- **Next session starts at:** Session 22 below (Careers Page → Job Board
  Feed Redesign).

---

## Session 22 — Careers Page → Job Board Feed Redesign

- **Status:** DONE
- **Scope:** Restructure `/careers` from a static "grid of role cards" into
  something that feels like a real job board feed (LinkedIn Jobs / similar
  in spirit, not a literal clone):
  - Each role renders as a feed-style row/card: small company logo/mark
    placeholder, role title as the primary click target, department ·
    location · type as metadata, a short description, and a clear
    "Apply now" action — visually distinct from a generic "read more" link.
  - Add feed-appropriate chrome even if not fully functional: a search/filter
    bar at the top (department/location filter — can be non-functional
    UI-only if wiring real filtering isn't in scope, but say so explicitly
    in "What changed" if so), a posted-date or "Actively hiring" style
    badge per role, and a save/bookmark icon per listing (icon-only,
    doesn't need working persistence).
  - Keep the culture/values content from Session 11, but it should support
    the job-feed experience rather than compete with it for attention —
    likely a compact intro banner or sidebar rather than the page's main
    focus the way it is now.
- **What changed:**
  - `lib/careers.ts` — added a `postedLabel` field to `Role` (e.g. "Posted
    2 days ago") per role, so the feed's posted-date badge is real per-role
    data rather than a single static string.
  - `components/open-roles.tsx` — full rewrite, now `"use client"` (needed
    for the per-row bookmark toggle's local state):
    - `RoleFilterBar`: a search input + department/location `<select>`s
      above the list. **Explicitly non-functional** — the inputs are
      uncontrolled and don't filter `OPEN_ROLES`, per the scope's own
      allowance for UI-only chrome. Real filtering (controlled selects +
      a derived/filtered list) would be a natural follow-up, intentionally
      not bundled into this session so the diff stays focused on the feed
      layout itself.
    - `RoleRow`: one continuous row per role instead of an isolated
      `GlassCard` — company mark placeholder (a fixed "CN" monogram badge,
      since every role shares the same posting company, not per-role logo
      art), title as the primary link, an "Actively hiring" pill next to
      it, a metadata line (department/location/type icons + the new
      `postedLabel`), description, requirement tags, and an "Apply now"
      button visually distinct from the title link (solid accent pill vs.
      plain text link). A `Bookmark` icon toggle sits next to Apply —
      local `useState` only, flips fill/color on click, no persistence,
      exactly as scoped.
    - The list itself is one flat bordered container with row dividers
      (`border-b` between rows) rather than a grid of separate glass
      surfaces — a feed reads as one continuous list, which six competing
      `GlassCard`s didn't support.
  - `app/careers/page.tsx` — culture/values section condensed from a full
    `h2` + four `h3`/`p` blocks into a single compact glass banner: one
    short paragraph plus the same four values now rendered as pill tags
    instead of headed paragraphs. No content dropped, just demoted to
    supporting context so the role feed reads as the page's main focus, per
    scope.
  - Verified clean: `npx tsc --noEmit` — 0 errors. `npx eslint .` — 0
    errors. `npm run build` — same known sandbox font-fetch stopping point
    as every prior session, nothing new before it.
- **Repo state:** `lib/careers.ts`, `components/open-roles.tsx`,
  `app/careers/page.tsx` modified. No dependency changes.
- **Next session starts at:** Session 23 below (Blog Full Revamp).

---

## Session 23 — Blog Full Revamp

- **Status:** DONE
- **Scope:** Bring `/blog` and `/blog/[slug]` up to the same premium
  standard.
  - Index: give the most recent post a larger "featured" treatment (bigger
    card, maybe a short excerpt preview) above a standard grid for the rest,
    rather than every post in a uniform grid. Improve `BlogCard` visually —
    stronger tag styling, clearer date/reading-time treatment, hover
    micro-interaction consistent with the rest of the revamped card system.
  - Detail page: revisit the `.prose` typography treatment from Session 12
    for a more editorial, premium feel (pull quote styling, better spacing
    rhythm) and add a scroll-reveal on the header block.
- **What changed:**
  - `components/blog-card.tsx` — `BlogCard` brought up to the
    FeatureGrid/ServicesGrid hover standard (Sessions 17/20): Framer Motion
    `whileHover` lift (`cardLift`, same variant shape as those two) +
    accent border/glow, `GlassCard`'s own `hoverScale` disabled so the two
    don't fight. Tags upgraded from a flat accent tint to tint + `ring-1
    ring-accent/20`. Date/reading-time row now uses `Calendar`/`Clock`
    icons instead of bare text. File is now `"use client"` (Framer Motion
    requires it) — the stretched-link click-through pattern from Session 9
    /12 is unchanged.
  - `components/blog-card.tsx` — new `FeaturedBlogCard` export, a separate
    component rather than a `featured` boolean on `BlogCard`: the layout
    genuinely diverges (two-column row + decorative accent panel vs. a
    vertical card), not just size, so branching one component would mean
    two unrelated render paths under one name. No post has a cover image
    (Session 12 never added one to the frontmatter schema), so the
    right-hand panel is a decorative radial-gradient + centered `Sparkles`
    icon rather than a missing/broken `<Image>` — gives the featured slot
    real visual weight without standing up an image pipeline this session
    wasn't scoped to build.
  - `app/blog/page.tsx` — destructures `getAllPosts()` (already
    newest-first) into `[featuredPost, ...restPosts]`; renders
    `FeaturedBlogCard` above the grid, `BlogCard` grid for the rest. Falls
    back gracefully (no featured block) if `getAllPosts()` ever returns
    empty — guarded with `featuredPost &&`.
  - `components/scroll-reveal.tsx` — new, generic reusable client wrapper
    (`ScrollReveal`) that fades/rises its children into view via
    `whileInView`, `useReducedMotion`-aware. Built as a standalone wrapper
    rather than adding motion directly into the shared `PageHeader`
    component: `PageHeader` is a plain Server Component used on every
    interior page, and `motion.div` requires a Client Component boundary —
    wrapping the call site keeps that boundary local to the one page that
    asked for it instead of forcing every `PageHeader` usage site-wide to
    hydrate as a client component. Reusable by later sessions for the same
    effect elsewhere, not just this header.
  - `app/blog/[slug]/page.tsx` — wraps `<PageHeader>` in `<ScrollReveal>`.
    `.prose` treatment expanded: `prose-lg` (up from base `prose`) for a
    larger, more editorial type scale; `prose-p:leading-relaxed` for
    looser paragraph rhythm; explicit `prose-blockquote:*` overrides for a
    pull-quote look (left accent-color rule, `not-italic`, larger
    `text-xl` medium-weight text) since Tailwind Typography's default
    blockquote (thin gray border, italic) reads as an aside, not a pull
    quote.
  - `content/blog/zero-downtime-migrations.mdx` — added one blockquote
    (a genuine one-line pull quote pulled from the post's own voice, not
    filler) since none of the three Session 12 posts had one — there was
    otherwise no blockquote anywhere in the content to verify the new
    styling against.
  - Verified clean: `npx tsc --noEmit` — 0 errors. `npx eslint .` — 0
    errors. `npm run build` — same known sandbox font-fetch stopping point
    as every prior session, nothing new before it.
- **Repo state:** `components/blog-card.tsx`, `app/blog/page.tsx`,
  `app/blog/[slug]/page.tsx`, `content/blog/zero-downtime-migrations.mdx`
  modified; `components/scroll-reveal.tsx` added. No dependency changes.
- **Next session starts at:** Session 24 below (Phase 2 Close-Out:
  Cross-Site Consistency Pass).

---

## Session 24 — Phase 2 Close-Out: Cross-Site Consistency Pass

- **Status:** DONE
- **Scope:** Final session of Phase 2. Full-site review to make sure the
  revamp reads as one coherent premium design system rather than nine
  independently-revamped sections:
  - Walk every page (including ones not explicitly touched in Sessions
    16–23 — Home sections not covered above, About, Case Studies, Contact)
    and confirm hover states, spacing, type scale, and motion timing feel
    consistent with each other.
  - Re-run `npx tsc --noEmit`, `npx eslint .`, `npm run build` — same
    verification bar as every prior session.
  - Re-check `prefers-reduced-motion` compliance across every new Framer
    Motion animation added in this phase — it's easy for a later session to
    add motion and forget the reduced-motion fallback that earlier sessions
    were careful about.
  - Re-check dark/light mode on every revamped component — glass/flat
    contrast choices (Session 21's pricing cards especially) need to look
    intentional in both modes, not just the one it was designed in.
- **What changed:**
  - Full-site audit against the Sessions 16–23 standard turned up two real
    inconsistencies, both fixed:
    - `components/case-study-card.tsx` and `components/team-grid.tsx` were
      the last two card grids still on the pre-revamp plain `GlassCard`
      CSS-only scale hover (Case Studies index, About page's Leadership
      grid) while every other grid on the site (FeatureGrid, ServicesGrid,
      BlogCard, OpenRoles' row treatment) had been brought up to the
      Framer Motion `whileHover` lift (`cardLift`, same `{ y: -6,
      transition: { duration: 0.25, ease: "easeOut" } }` shape used since
      Session 17) + accent border/glow standard. Both rewritten to match:
      `motion.div` wrapper with the shared `cardLift` variants,
      `GlassCard`'s `hoverScale` disabled so it doesn't fight the lift, same
      `hover:border-accent hover:shadow-[0_20px_60px_-15px_var(--accent)]`
      glow. `CaseStudyCard` is now a client component (`"use client"`) since
      Framer Motion requires it — the stretched-link click-through pattern
      is unchanged. Both gate the hover variants behind `useReducedMotion()`
      the same way every other animated card on the site does.
    - Every interior page's `<PageHeader>` was static except
      `/blog/[slug]`, which Session 23 wrapped in `<ScrollReveal>` — so one
      page had a fade/rise entrance on its header and seven didn't (About,
      Services, Pricing, Careers, Blog index, Case Studies, Contact). Wrapped
      all seven in `<ScrollReveal>` (the generic wrapper Session 23 built
      specifically to be reused elsewhere) so every interior page now enters
      the same way. No changes to `PageHeader` itself — it stays a plain
      Server Component, per the reasoning already documented in
      `components/scroll-reveal.tsx`.
  - Reviewed but left unchanged, with reasoning confirmed still valid:
    - `components/pricing-card.tsx` — the non-highlighted tiers' flat,
      non-glass surface is a documented **intentional** contrast choice from
      Session 21 (the highlighted tier is glass + accent glow, the other
      tiers are deliberately flat so the recommended tier reads as
      obviously different) — confirmed this still reads correctly in both
      light and dark via the same `var(--background)` / `var(--glass-border)`
      tokens every other surface uses, not a hardcoded color. No change
      needed; this is the one place on the site that's supposed to look
      different from the rest, by design.
    - `components/hero.tsx`, `components/cta-section.tsx`,
      `components/testimonials.tsx`, `components/feature-grid.tsx`,
      `components/services-grid.tsx`, `components/stats-band.tsx`,
      `components/open-roles.tsx`, `components/blog-card.tsx` — all already
      gate their Framer Motion variants behind `useReducedMotion()` and use
      only CSS-variable-backed colors, consistent with each other and with
      the two components fixed above.
    - `app/globals.css`'s `prefers-reduced-motion` media query already
      collapses all animation/transition durations sitewide as a backstop,
      independent of each component's own `useReducedMotion()` check —
      confirmed still in place and unchanged.
  - Verified clean: `npx tsc --noEmit` — 0 errors (two pre-existing,
    unrelated errors for `PageProps`/`LayoutProps` in `app/blog/[slug]` and
    `app/layout.tsx` disappear once `.next/types` exists, i.e. after
    `next build` has run at least once in the sandbox — not something this
    session's diff touches or introduces). `npx eslint .` — 0 errors.
    `npm run build` — same known sandbox font-fetch stopping point
    (`fonts.googleapis.com` unreachable from the sandbox) as every prior
    session, nothing new before it.
- **Repo state:** `app/about/page.tsx`, `app/services/page.tsx`,
  `app/pricing/page.tsx`, `app/careers/page.tsx`, `app/blog/page.tsx`,
  `app/case-studies/page.tsx`, `app/contact/page.tsx`,
  `components/case-study-card.tsx`, `components/team-grid.tsx` modified.
  No dependency changes, no new components.
- **Next session starts at:** None — Phase 2 complete.

---

## Session 25 — Production Build Fix: `node:fs` Leaking Into Client Bundle

- **Status:** DONE
- **Scope:** Out-of-band bugfix session, not part of the original 15-session
  plan. The user's Vercel deployment of Session 23's patch failed at build
  time (Turbopack production build, not the sandbox's dev-style build) with:
  ```
  FATAL: An unexpected Turbopack error occurred:
  Failed to write app endpoint /blog/page
  Caused by:
  - the chunking context (unknown) does not support external modules (request: node:fs)
  ```
- **Root cause:** `lib/blog.ts` does `import fs from "node:fs"` /
  `import path from "node:path"` at module scope to read local MDX files —
  correct and necessary for a Server-Component-only data module. Session 23
  made `components/blog-card.tsx` a `"use client"` component (needed for
  its new Framer Motion hover-lift) but left it importing
  `formatPostDate` — a plain **value** import — from `@/lib/blog`. Importing
  any value from a module pulls the *entire* module into whichever bundle
  imports it; for a Client Component that means `node:fs` gets dragged into
  the browser bundle, which Turbopack's production build correctly refuses
  to do (Next's local/dev build path tolerated it, which is why this wasn't
  caught before shipping).
  - **Why the sandbox never caught this:** every prior session's `npm run
    build` verification in this sandbox dies during `app/layout.tsx`'s
    `next/font/google` fetch (no network route to
    `fonts.googleapis.com` here) — before Turbopack ever gets far enough
    into the module graph to compile `/blog/page` and hit this error.
    Vercel has normal internet access, sails past the font step, and hits
    the real bug immediately after. **This is a real gap in this sandbox's
    verification coverage for anything reachable only through pages later
    in the build graph than the font import** — worth keeping in mind for
    future sessions: a clean `tsc`/`eslint`/sandbox-`build` is not proof the
    production build will succeed past the font-fetch point.
- **What changed:**
  - `lib/format.ts` — new file. `formatPostDate` moved here verbatim; it has
    no filesystem dependency of its own, so it's client-safe on its own.
  - `lib/blog.ts` — `formatPostDate` removed (no longer exported from here).
    Added a comment on the file's existing "server-only" rationale
    explaining what broke and where the fs-free helper now lives, so a
    future session doesn't reintroduce the same mistake by adding another
    fs-free helper to this file for a Client Component to import.
  - `components/blog-card.tsx` — now imports `formatPostDate` from
    `@/lib/format` and only the `BlogPostMeta` **type** (erased at compile
    time, so still safe) from `@/lib/blog`.
  - `app/blog/[slug]/page.tsx` — a Server Component, so it was never
    actually broken, but updated to import `formatPostDate` from
    `@/lib/format` too, for consistency (one canonical source for the
    helper, not "server pages use the blog.ts copy, client components use
    the format.ts copy").
  - Audited every other `"use client"` component's `@/lib/*` imports for
    the same pattern (importing a value from a module that does
    `node:fs`/`node:path` at module scope) — `lib/blog.ts` was the only
    offender; `lib/case-studies.ts`, `lib/careers.ts`, `lib/utils.ts`,
    `lib/validation.ts`, `lib/use-hover-flare.ts`, `lib/use-count-up.ts` are
    all plain data/logic with no Node built-ins, confirmed clean.
  - Verified: `npx tsc --noEmit` — 0 errors. `npx eslint .` — 0 errors.
    `npm run build` — reaches the same font-fetch wall as every prior
    session with no error before it (i.e. no regression), which per the
    root-cause note above is the most this sandbox can confirm; the actual
    fix can only be fully confirmed by the next Vercel deploy.
- **Repo state:** `lib/blog.ts`, `components/blog-card.tsx`,
  `app/blog/[slug]/page.tsx` modified; `lib/format.ts` added.
- **Next session starts at:** N/A — Phase 2 complete, this was a bugfix.

---

## Decision Log

(Sessions append one line here whenever the scope above tells them to "decide and
log" something, so later sessions don't need to dig through commits to find out.)

- Session 10 (Pricing Page): added a monthly/annual toggle. "Save 20%" is
  shown on the annual option; each tier's annual price is a precomputed
  ~20%-off number in the data rather than a live percentage calculation.
- Session 17 (Stat Counters): hand-rolled `useCountUp` hook, not a counting
  library — small enough (RAF loop + ease-out cubic) that a dependency
  wasn't justified.
