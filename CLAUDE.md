# CLAUDE.md — Launchpad Agency Website

> Read this file before touching anything. This is the full project context.
> Do NOT read source files just to understand the project — everything you need is here.
> Only open a file when you are about to edit it.

---

## Project Overview

**What it is:** Launchpad agency website — a premium creative web studio.
**Live URL:** https://launchpadweb-agency.vercel.app
**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS (utility classes used minimally — most styling is inline via CSS vars), Framer Motion, Three.js
**Package manager:** npm
**Fonts:** Syne (headings, 700/800) + Inter (body, 300/400/500) — loaded from Google Fonts in globals.css
**Positioning:** Premium creative studio. NOT a "local business" agency. Builds cinematic, custom-coded web experiences for founders, studios, and brands.

---

## ⚠️ LOCKED DECISIONS — DO NOT REVERSE THESE

1. **DARK MODE ONLY.** This site is permanently dark. There is no theme toggle. There is no light mode for users. `ThemeProvider` hardcodes `"dark"`. `ThemeToggle.tsx` exists but is NEVER rendered. Do not add any toggle, switch, or theme control anywhere on the page — not in the navbar, not in the footer, not floating. This is a deliberate brand decision. The dark aesthetic IS the identity.

2. **NO "LOCAL BUSINESS" LANGUAGE.** Never use phrases like "local businesses", "go global", "dominate your market", "your city", "local SEO". We are a premium creative studio targeting founders, brands, and agencies — not corner shops.

3. **NO EMOJIS IN UI.** No emoji icons in service cards, CTAs, section headers, or anywhere in the interface. Use numbered labels (01, 02...) or clean text only.

4. **INLINE STYLES ONLY.** All styling uses `style={{}}` props with CSS variables (`var(--accent)` etc). Do not switch to Tailwind classes — it breaks the theming system.

---

## File Structure

```
app/
  globals.css        — All CSS vars, animations, base styles, responsive overrides
  layout.tsx         — Root layout, loads ThemeProvider + Cursor
  page.tsx           — Page composition (imports all section components, NO ThemeToggle)

components/
  Navbar.tsx         — Fixed top nav, glass blur, mobile hamburger menu
  Hero.tsx           — Full-screen hero, Three.js canvas bg, animated cycling headline
  Marquee.tsx        — Scrolling ticker strip (tech stack items, not verticals)
  WhoWeHelp.tsx      — "Who we work with" — headline + copy + verticals pill list
  Services.tsx       — 6 service cards, numbered 01–06, 3-col grid
  Portfolio.tsx      — Selected work — Meteoric Boost hero card + 2 coming soon cards
  Process.tsx        — 4-step numbered process
  Contact.tsx        — Contact form section
  CtaBanner.tsx      — Full-width CTA banner
  Footer.tsx         — Minimal footer
  ThemeProvider.tsx  — Hardcodes dark mode. DO NOT add toggle logic here.
  ThemeToggle.tsx    — NOT USED. Do not import or render this anywhere.
  Cursor.tsx         — Custom cursor dot + ring, hidden on mobile
```

---

## Design System

### CSS Variables (globals.css) — Dark mode only (`.dark` class, always active)

```
--bg: #050d1a
--bg2: #091222
--surface: #0d1c35
--surface2: #101f3a
--text: #e8f0ff
--text2: #a0bcdf
--muted: #4a6a94
--accent: #4f8eff          ← primary blue — headlines, CTAs, highlights
--accent2: #6aaeff
--accent-glow: rgba(61,139,255,0.25)
--border: rgba(61,139,255,0.14)
--border2: rgba(61,139,255,0.28)
--nav-bg: rgba(5,13,26,0.88)
--marquee-bg: #091222
```

Light mode vars exist in `:root` but are irrelevant — users never see them.

### Typography
- **Headings:** `fontFamily: "Syne, sans-serif"`, `fontWeight: 800`, `letterSpacing: "-0.03em"`
- **Body:** `fontFamily: "Inter, sans-serif"`, `fontWeight: 400`
- **Labels/Tags:** Inter, `fontSize: "0.7–0.82rem"`, `letterSpacing: "0.08em"`, `textTransform: "uppercase"`

### Animation Classes (globals.css)
- `.reveal` + `.reveal.visible` — scroll-triggered fade+slideUp via `react-intersection-observer`
- `.animate-fade-up-1` through `.animate-fade-up-5` — staggered page-load (delays 0.3s → 1.3s)
- `.animate-marquee` — infinite horizontal scroll
- `.animate-scroll-pulse` — breathing pulse on scroll indicator

### Standard Hover Pattern
```ts
onMouseEnter: { borderColor: "var(--accent)", transform: "translateY(-6px)", boxShadow: "0 12px 40px var(--accent-glow)" }
onMouseLeave: { borderColor: "var(--border)", transform: "none", boxShadow: "none" }
```

---

## Component Reference

### Navbar.tsx
- Fixed, `zIndex: 100`, `backdropFilter: "blur(16px)"`, `background: var(--nav-bg)`
- Logo: "Launch**pad**" — "pad" styled in `var(--accent)`
- Nav links: Studio → `#who` | Services → `#services` | Work → `#portfolio` | Process → `#process` | Contact → `#contact`
- CTA: "Work with us →" pill button (accent bg, scrolls to `#contact`)
- Mobile: animated hamburger → X, full-screen dark overlay with large Syne links
- **No theme toggle. Ever.**

### Hero.tsx
- Full `height: "100vh"`, `overflow: "hidden"`
- Three.js `<canvas>` fills absolute background — wireframe IcosahedronGeometry + 2 TorusGeometry rings + particle Points — all mouse-reactive
- **NEVER touch the Three.js `useEffect` block**
- Headline (Framer Motion cycling):
  - Static line: `"We build web experiences that"`
  - Cycling line (accent color, AnimatePresence slide-up every 3s): `"demand attention."` / `"convert visitors."` / `"outlast trends."` / `"reflect your craft."`
- Subtext: `"Custom-coded in Next.js. Cinematic in motion. Built for brands that refuse to blend in."`
- Buttons: `"View selected work →"` → `#portfolio` | `"Start a project"` → `#contact`
- Scroll indicator: animated vertical line + "scroll" label at bottom center
- Headline container: `maxWidth: "min(820px, 92vw)"`, `wordBreak: "break-word"`

### Marquee.tsx
- Infinite ticker, `borderTop` + `borderBottom: 1px solid var(--border)`
- Items (doubled for loop): `["Next.js 14", "·", "TypeScript", "·", "Framer Motion", "·", "Three.js", "·", "Tailwind CSS", "·", "Cinematic Design", "·", "Custom Coded", "·", "No Templates", "·"]`
- Each item: 5px accent dot bullet + Syne uppercase text

### WhoWeHelp.tsx
- Section id: `#who`
- Headline: `"Built for brands with something to say."`
- Body: `"We work with founders, studios, and growing brands who know that a generic website is worse than no website. The kind of people who'd rather have one exceptional thing than five mediocre ones."`
- Verticals: pill/tag list — `["Personal Brands", "Creative Agencies", "F&B Concepts", "Fitness & Wellness", "Real Estate", "Professional Services"]`
- **No stat blocks (94%, 3s, 2×, 75%) — those are gone**

### Services.tsx
- Section id: `#services`
- Headline: `"What we do"` — no subtext
- 6 cards, 3-col desktop / 1-col mobile, `react-intersection-observer` stagger
- Numbered labels 01–06 in `var(--accent)` replacing old emojis
- No tag badges
- Cards: `background: var(--surface2)`, `border: 1px solid var(--border)`, `borderRadius: "1.2rem"`
- Services: 01 Custom Web Dev · 02 Motion & Interaction · 03 SEO & Performance · 04 E-commerce & Booking · 05 Brand & Visual Identity · 06 Ongoing Partnership

### Portfolio.tsx
- Section id: `#portfolio`
- Headline: `"Selected Work"` — subtext: `"A growing portfolio of digital experiences. Each one built from scratch."`
- **Card 1 — REAL (full-width hero card):**
  - "Meteoric Boost" / "Personal Brand Agency · Sydney, AU"
  - "A cinematic web presence for a 141K-follower personal brand agency. Dark, bold, and built to convert."
  - Tags: ["Next.js 14", "Framer Motion", "Three.js", "Dark Cinematic"]
  - Badge: "Featured Work" | Link: `#` (update post April 10 with live URL)
- **Cards 2–3 — PLACEHOLDER:**
  - CSS grain texture bg, `opacity: 0.4`, no hover lift
  - "Next Project" / "In Progress — 2025" | Badge: "Coming Soon"

### Process.tsx
- Section id: `#process`
- Headline: `"Simple process, stunning results"` — subtext: `"From first call to live site in weeks — not months."`
- 4 steps horizontal, gradient line connector across top
- Steps: 1 Free Audit · 2 Strategy Call · 3 We Build · 4 You Launch
- Step number: accent circle badge with glow ring

### CtaBanner.tsx
- `background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)`
- Large watermark text behind content (opacity 0.07)
- Headline: `"Ready to build something unforgettable?"`
- Subtext: `"Let's talk about your project. No templates, no filler — just clean, cinematic work."`
- CTA: `"Start a conversation →"` → `#contact`

### Footer.tsx
- Minimal. `borderTop: 1px solid var(--border)`
- Logo + nav links + copyright line
- Copyright: `"© 2026 Launchpad — Custom web experiences for brands with a point of view."`

### ThemeProvider.tsx
- Provides `theme` / `setTheme` context. Hardcoded default: `"dark"`. Never changes.

### ThemeToggle.tsx
- **Dead file. Not imported. Not rendered. Don't touch it, don't use it.**

### Cursor.tsx
- `#cursor` (10px dot) + `#cursor-ring` (34px ring), both in `var(--accent)`
- `mix-blend-mode: screen` in dark
- Hidden on mobile via `globals.css` media query

---

## Rules for Making Changes

1. **Read CLAUDE.md first. Only open a source file when you're about to edit it.**
2. **Never touch the Three.js `useEffect` in Hero.tsx.**
3. **Dark only. No toggle. No exceptions.** See locked decisions above.
4. **Inline styles with CSS vars.** Don't switch to Tailwind classes.
5. **21st.dev installs:** `npx shadcn@latest add "https://21st.dev/r/[component-url]"`
6. **Framer Motion** is installed — import `motion`, `AnimatePresence` from `"framer-motion"`
7. **Scroll reveals** — use `useInView` from `react-intersection-observer` + `.reveal`/`.reveal.visible` classes
8. **Section IDs are frozen:** `#hero` `#who` `#services` `#portfolio` `#process` `#contact`
9. **Dev:** `npm run dev` | **Deploy:** push to GitHub → Vercel auto-deploys

---

## Pending Work

- [ ] Fix hero headline overflow (clamp font size, `wordBreak: "break-word"`, `maxWidth: "min(820px, 92vw)"`)
- [ ] Fix hero buttons rendering as blank boxes (ensure buttons div is sibling of h1, not nested inside AnimatePresence)
- [ ] Remove `<ThemeToggle />` from page.tsx + remove its import
- [ ] Update Marquee items to tech stack (not business verticals)
- [ ] Portfolio.tsx — replace fake projects with Meteoric Boost hero card + 2 coming soon
- [ ] CtaBanner.tsx — update copy to new positioning
- [ ] Footer.tsx — remove "Making local legends go global"
- [ ] Contact.tsx — audit for any "local business" language
- [ ] Update Portfolio Meteoric Boost `href` post April 10 launch

---

## Agency Context

- **Agency:** Launchpad — Mumbai-based premium web studio
- **Founders:** Shaurya (tech/build) + Jaypal (investment/marketing)
- **Stack:** Next.js 14, TypeScript, Tailwind, Framer Motion, Three.js
- **Email:** launchpadwebagency@gmail.com
- **Real clients:** Meteoric Boost (Moksh Vasant, Sydney — 141K followers personal brand agency)
- **Tone:** Confident. Minimal. Zero fluff. We own the dark aesthetic — it's not a preference, it's the brand.
## Pending Work

- [ ] Fix SCROLL indicator — must be `position: absolute, bottom: 2rem` direct child of outer section, not inside text container
- [ ] Full mobile responsiveness pass (see mobile rules below)
- [ ] Portfolio.tsx — replace fake projects with Meteoric Boost hero card + 2 coming soon
- [ ] CtaBanner.tsx — update copy to new positioning
- [ ] Footer.tsx — remove "Making local legends go global"
- [ ] Contact.tsx — audit for any "local business" language
- [x] Fix hero headline overflow — DONE
- [x] Fix hero buttons blank boxes — DONE
- [x] Remove ThemeToggle — DONE
- [x] Update Marquee items to tech stack — DONE
- [x] Cinematic navbar (transparent → glass on scroll) — DONE
- [ ] Update Portfolio Meteoric Boost `href` post April 10 launch

## Mobile Responsiveness Rules

**Breakpoint:** `768px` and below = mobile treatment.

**Hero.tsx mobile:**
- Font size: `clamp(1.6rem, 8vw, 2.8rem)` — NOT the desktop clamp
- paddingTop: `"70px"` on text container (navbar height)
- Buttons: `flexDirection: "column"`, `width: "100%"`, `maxWidth: "280px"`, centered
- Subtext: `fontSize: "0.9rem"`
- Three.js canvas: render at `Math.min(window.devicePixelRatio, 1)` on mobile (not 2) for perf

**Navbar.tsx mobile:**
- Hamburger menu already exists — verify it works
- CTA pill hidden on mobile (already implemented)
- Full-screen overlay links: font large, centered, Syne 800

**Marquee.tsx mobile:**
- Reduce font size to `0.65rem`, gap to `1.5rem`
- Same infinite scroll, just tighter

**Services.tsx mobile:**
- 1-col grid (already handled via `isMobile` state)
- Card padding: `1.5rem`

**Portfolio.tsx mobile:**
- 1-col grid
- Featured card full width
- Coming soon cards full width, stacked

**Process.tsx mobile:**
- 4 steps go to 2-col grid (not 1-col, not 4-col)
- Remove horizontal connector line on mobile (`display: none`)

**CtaBanner.tsx mobile:**
- Padding: `3rem 1.5rem`
- Headline font: `clamp(1.4rem, 5vw, 1.8rem)`
- Watermark text: `fontSize: "5rem"` (not 14rem)

**Contact.tsx mobile:**
- Form goes single column
- Input padding standard

**Footer.tsx mobile:**
- Stack logo + links + copyright vertically, centered
- Gap: `1.2rem` between each

**globals.css mobile rules:**
- `cursor: auto` on body (custom cursor hidden)
- `#cursor, #cursor-ring: display: none`
- All section padding: `4rem 1.5rem`

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.
