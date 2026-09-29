# TANGKIS Website — UI/UX & Layout Analysis

Scope: `/` (landing), `/about`, `/dashboard`, plus the global Navbar and Footer.
Updated after the landing reorder (Latar Belakang first, scroll-driven Masalah last).
Basis: static review of the source (no browser/device testing, no user testing, no automated accessibility audit). Findings marked **verify** need a visual check.

---

## 1. Overview

| | |
|---|---|
| Product | TANGKIS — real-time water-content/temperature monitoring for standby generator fuel |
| Stack | Next.js 14 (App Router), Tailwind CSS 3, framer-motion, lucide-react, Inter font |
| Routes | `/` marketing landing, `/about` team, `/dashboard` demo monitoring UI (sample data) |
| Design language | Cargovision-inspired: full-viewport rounded hero, numbered section badges, floating "island" navbar, large type, pill buttons, dark/light section rhythm |
| Imagery | None. All image slots are gradient placeholders + icons |

**Overall read:** the marketing pages (landing + about) are cohesive and modern. The dashboard is a separate visual system embedded under the same navbar/footer, which is the largest consistency gap.

---

## 2. Design system

### 2.1 Colour

| Role | Landing / About | Dashboard |
|---|---|---|
| Dark surfaces | `slate-900`, `slate-800`, `blue-900` gradients | — |
| Light surfaces | `white`, `slate-50` | `#F4F7FA` page, `white` cards |
| Accent | `blue-600` (badges), `blue-300` (on dark) | `#123B66` (buttons, headings `#0B2239`) |
| Text | `slate-900`, `slate-600`, `slate-300` on dark | `#172B3A`, muted `#5A6B7B` |
| Status | — | green `#2E8B57`, amber `#E9A21B`, red `#D64545` / `#B83232`, info `#2F6FED` |
| Borders | `border` default, `white/20` on dark | `#D9E1E8` |

Landing/About use Tailwind palette tokens; the dashboard uses ~10 hard-coded hex values. Nothing is defined as a token in `tailwind.config.ts` (only a `brand` scale that is unused by the new pages).

### 2.2 Typography
- Single family (Inter via `--font-inter`).
- Section headings `text-3xl md:text-5xl font-bold`; hero `text-4xl md:text-6xl font-extrabold`; body `text-lg`/`text-sm`.
- Uppercase + wide tracking for eyebrow labels (hero pill, product tagline previously, dashboard metadata).
- Dashboard uses much smaller type (`text-[11px]`, `text-xs`) and `tabular-nums` for data — appropriate for a data UI.

### 2.3 Shape & spacing
- Pills (`rounded-full`) for buttons, badges, navbar island. `rounded-lg` cards. `rounded-3xl` hero (desktop only), `rounded-[32px]` product panel.
- Section rhythm: `py-16 lg:py-24`; container `max-w-[95%] lg:max-w-[92%] xl:max-w-[1400px]` with `px-4 md:px-6`.

### 2.4 Motion
| Effect | Where | Reduced-motion aware? |
|---|---|---|
| `FadeUp` (opacity + 40px rise, once) | all marketing sections | **No** |
| Scroll-driven card reveal (`useScroll`, pinned 300vh) | Masalah (desktop) | Yes (static stack when reduced motion or < `lg`) |
| Marquee (20 s loop) | Product section background | Yes (`globals.css`) |
| Accordion `grid-template-rows` 0fr→1fr | Fitur | No (short, low risk) |
| Navbar dock → island (500 ms) | global | No |
| Scroll cue bounce, arrow rotate on hover | hero, fitur | Scroll cue: no |
| Smooth scroll | `html` | Yes |

### 2.5 Iconography
lucide-react on the marketing pages (icons live in `problems.ts`/`features.ts` as components). The dashboard still uses emoji/unicode glyphs (`AlertPanel.tsx:13,54,63,66`, `SystemHealth.tsx:13`) — inconsistent with the rest.

---

## 3. Page analysis

### 3.1 Landing `/`

Flow: **Hero → 01 Latar Belakang → 02 Produk → 03 Fitur → 04 Masalah → Footer**

The page now reads as a narrative: why it matters → what the product is → how it works → which problems it solves → call to action.

| Section | Layout | What works | Concerns |
|---|---|---|---|
| Hero (`HeroSection.tsx`) | Full `100dvh` rounded gradient card, copy top-left (desktop) / centered (mobile), two pill CTAs, bottom-centre "Scroll" cue | Strong first impression; clear primary/secondary CTA hierarchy; navbar blends into it | Gradient-only, no product visual; the hero shows *what* but not *the product*; cue is the only scroll affordance |
| 01 Latar Belakang (`BackgroundSection.tsx`) | 2-column: headline + three paragraphs left, gradient card with `Fuel` icon right (stacked on mobile) | Clear, readable intro; text-first opening gives context before the pitch; image reuses the card style | Copy is composed from existing site facts and largely restates the Masalah cards (repetition); the image is a decorative placeholder that carries no information; the section is a plain text block with no emphasis (no key numbers or pull-out) |
| 02 Produk (`ProductSection.tsx`) | Dark full-bleed band, huge faint scrolling "TANGKIS", centred badge + headline | Effective visual break between two light sections; brand reinforcement | Headline is the tagline again (4th appearance); no supporting text or CTA in the section; faint text at `white/5` is decorative only (fine) |
| 03 Fitur (`FeaturesSection.tsx`) | 5/7 grid: sticky product panel left, accordion right | Sticky panel keeps product context in view; accordion reduces density | Left panel repeats name/tagline/description; accordion heading is inside a `<button>` (U-03); only one item open — no way to compare; panel is `aspect-[4/3]` and can clip content at some widths (**verify**) |
| 04 Masalah (`ProblemSection.tsx`) | Desktop: section pins for 300vh, three gradient cards fade/rise in one at a time as you scroll; < `lg` and reduced motion: static stack with fade-in | Storytelling pacing; one-card-at-a-time focus; descriptions now always visible; falls back cleanly on small screens | Long scroll (300vh) before the footer with no progress indicator; layout switches after hydration (`useEffect` media query), so on desktop the section may jump from normal height to 300vh on load (**verify**); cards are non-interactive but look clickable; pinned content height depends on viewport (`min(500px,50vh)`), short screens (**verify**) |
| Footer (`Footer.tsx`) | Large CTA copy + small arrow button + two pills, three link columns, copyright | Clear closing CTA, consistent dark theme | Sample-data notice appears **twice** within the footer (`Footer.tsx:27` and `:64`); CTA area has three routes to the same `/dashboard` (arrow, "Lihat Dashboard", label) |

### 3.2 About `/about`
- Hero card mirrors the landing hero (glass pill, `text-6xl` heading, two pill CTAs). Good continuity. Navbar starts transparent over it.
- `01 Tim` section: 4-column card grid with gradient avatar initials (`TeamSection.tsx`).
- Concerns: placeholder names ("Anggota Satu…"), no photos, no social links rendered though `team.ts` has `linkedin`; heading "Meet the Team" (`TeamSection.tsx:12`) is English amid Indonesian copy; numbering restarts at 01 on this page; page ends abruptly into footer (no mission/values/timeline content).

### 3.3 Dashboard `/dashboard`
Layout: topbar → 4 summary cards → tank table + trend chart (left, fluid) | alert panel + system health (right, 400 px) → in-page footer note.

| Element | Assessment |
|---|---|
| Summary cards | Excellent at-a-glance design: number, segmented bar, micro copy; red card gets left border + tint (colour + shape, not colour only) |
| Tank table | Dense but readable; inline ppm bar with threshold tick is a strong pattern; status pill combines LED + text |
| Trend chart | Custom SVG monotone spline with threshold line and active-point selection; good, but interaction/keyboard support is **verify** |
| Alert panel | Best UX on the page: severity strip, overshoot %, deadline, recommendation, two clear actions (primary/secondary) |
| System health | Compact status list; emoji icons (📶 🔲 〰️ 🛡️) feel off-brand |
| Chrome | Fixed "DATA CONTOH" badge, own `<h1>` "TANGKIS" + tagline in `DashboardTopbar.tsx`, plus the site navbar and site footer — three levels of chrome |

---

## 4. Global components

### 4.1 Navbar (`Navbar.tsx`)
- **Behaviour:** docked full-width at the top (`lg:pt-4`), after 40 px scroll animates to a centred `max-w-5xl` blurred pill (`lg:pt-6`) (`:31-45`). Transparent when docked on `/` and `/about`; solid `slate-900` on `/dashboard`.
- **Mobile:** full-width bar, hamburger opens a full-screen overlay (`:81`).
- Strengths: one consistent structure across all routes; brand left, links centre, CTA right.
- Gaps: no anchor links to sections (`#masalah`, `#produk`); "Lihat Dashboard" CTA duplicates the Dashboard link next to it; hamburger label `Toggle menu` is English and static (`:74`); the mobile overlay doesn't lock body scroll or trap focus (acknowledged by the `ponytail` comment); the `pathname === l.href` active state doesn't cover sub-paths.

### 4.2 `SectionBadge`
Numbered compound pill (blue circle + label), reused on landing and About, with a dark variant. Good reuse and a clear wayfinding device. Numbering is per page (landing 01–04, About 01).

### 4.3 `FadeUp`
Scroll-in wrapper, once-only. Used everywhere; does not respect `prefers-reduced-motion` (`FadeUp.tsx:12-20`).

---

## 5. Consistency review

| Aspect | Landing/About | Dashboard | Verdict |
|---|---|---|---|
| Palette | Tailwind slate/blue | Custom hex set | Divergent |
| Buttons | Full pills | `rounded-md` | Divergent |
| Icons | lucide | Emoji | Divergent |
| Headings | Large, marketing scale | Small, data scale | Acceptable (different purpose) |
| Navbar/Footer | Shared | Shared | Consistent |
| Language | Mostly Indonesian; "Meet the Team", "Scroll" (`HeroSection.tsx`), aria `Toggle menu` in English | Indonesian | Mixed |
| Copy repetition | Tagline: hero H1, product H2, features panel, footer H2, footer column | — | Heavy |

---

## 6. Findings (ranked)

| ID | Sev | Area | Finding | Evidence | Recommendation |
|---|---|---|---|---|---|
| U-01 | ~~High~~ Resolved | Landing | Problem-card descriptions were hover-only on `lg` and unreachable by keyboard/touch | `ProblemSection.tsx` | Fixed: descriptions are always visible |
| U-02 | High | Dashboard | Separate design system + duplicate chrome (site navbar, own H1/topbar, site footer, page footer note, floating badge) | `DashboardTopbar.tsx:8`, `dashboard/page.tsx:16-33` | Unify tokens; drop the duplicate brand H1 (keep status + timestamp); keep one sample-data notice |
| U-03 | Med | Landing | Accordion item is a `<button>` containing an `<h3>` and panel; no `aria-controls`; panel content not hidden from AT when collapsed | `FeaturesSection.tsx:41-63` | Heading outside the button, button controls a `region` with `hidden`/`inert` when closed |
| U-04 | Med | Global | `FadeUp` ignores reduced motion; scroll cue and navbar transitions too | `FadeUp.tsx:12-20` | Use framer's `useReducedMotion` and skip the transform |
| U-05 | Low (partly resolved) | Landing | `scroll-mt-24` added to `latar-belakang` and `masalah` and the hero cue now targets `#latar-belakang`; `#produk`/Fitur have no scroll margin or anchor, and the navbar has no in-page links | `Navbar.tsx:7-12`, `ProductSection.tsx`, `FeaturesSection.tsx` | Add `scroll-mt-24` to the remaining sections; optionally add section links |
| U-06 | Med | Landing | Tagline/description repeated 4–5 times; product story is thin (no product visual, no numbers, no proof) | see §5 | Vary copy per section; add a product screenshot/dashboard preview to hero or Produk section |
| U-07 | Med | Global | Sample-data notice duplicated inside the footer and again on the dashboard | `Footer.tsx:27,64`, `dashboard/page.tsx:17,32` | One notice per page |
| U-08 | Med | About | Placeholder team; `linkedin` field unused; little About content | `team.ts`, `TeamSection.tsx` | Real names/photos/links; add mission or timeline block |
| U-09 | Low | Global | Mixed language ("Meet the Team", "Scroll", "Toggle menu", "Kembali ke Home") | `TeamSection.tsx:12` etc. | Decide one UI language |
| U-10 | Low | Dashboard | Emoji icons vs lucide elsewhere | `AlertPanel.tsx:13,54,63,66`, `SystemHealth.tsx:13` | Replace with lucide (`TriangleAlert`, `Wrench`, `Send`, `Download`, `Wifi`, …) |
| U-11 | Low | Navbar | Redundant Dashboard link + CTA pill; mobile overlay lacks scroll lock/focus trap; toggle aria-label static | `Navbar.tsx:50-78` | Drop one; add `aria-label` that reflects state; lock body scroll |
| U-12 | Low | Landing | Three CTA paths to one destination in the footer | `Footer.tsx` CTA block | Keep arrow + one pill |
| U-14 | Med | Landing | Masalah pins for 300vh with no progress cue; the desktop switch happens after hydration and may cause a layout jump; screen-reader/keyboard users tabbing past the pinned section rely on native scroll (**verify**) | `ProblemSection.tsx` | Add a small progress counter (01/03); consider CSS-only `lg:` sticky so the height is correct on first paint; test keyboard focus |
| U-15 | Low | Landing | Latar Belakang paragraphs repeat the Masalah content; image is a placeholder | `background.ts`, `BackgroundSection.tsx` | Give Latar Belakang unique content (context, statistics, regulation) or a real photo |
| U-13 | Low | Tokens | Colours hard-coded/inconsistent; `tailwind.config.ts` `brand` scale unused | `tailwind.config.ts:12-16` | Define semantic tokens (`primary`, `surface-dark`, status colours) |

---

## 7. Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < `md` | Single column; hero centred; hamburger navbar (solid on scroll, no island); problem cards stack unpinned (`min-h-[24rem]`); accordion full width; footer stacks |
| `md` | Desktop nav links + CTA appear; team grid 2 cols |
| `lg` (1024) | Hero card rounded with margin; island navbar; problem cards in a row and pinned scroll-driven reveal; sticky product panel; dashboard 2-column |
| `xl` | Container capped at 1400 px |

Notes: navbar shows desktop links at `md` (768 px) but the island effect only starts at `lg`, so tablets get a full-width bar without the island — deliberate?, **verify**. Dashboard table scrolls horizontally on small screens (`overflow-x-auto`), acceptable.

---

## 8. Accessibility snapshot

**Good:** semantic `section/aside/header`, `aria-labelledby` on dashboard sections, decorative icons `aria-hidden`, LED status always paired with text, status not colour-only, `tabular-nums` for data, smooth-scroll and marquee respect reduced motion.

**Resolved:** hover-only problem descriptions (U-01); reduced-motion fallback for the scroll-driven reveal.

**Needs work:** U-03 (accordion semantics), U-04 (reduced motion), navbar toggle label and focus handling, no visible skip link, focus-visible styles are default browser only, contrast of `white/70` nav links over gradient and of `text-white/5` decorative text is fine but `text-slate-400` on `slate-900` footer paragraphs should be checked (**verify**), chart keyboard interaction (**verify**).

---

## 9. Recommendations

**Quick wins (≤ 1 day)**
1. Add `scroll-mt-*` to the remaining anchored sections (U-05).
3. Remove the duplicate sample-data notice and extra footer CTAs (U-07, U-12).
4. Honour reduced motion in `FadeUp` (U-04).
5. Pick one UI language and fix the stragglers (U-09).
6. Swap dashboard emoji for lucide icons (U-10).

**Medium**
7. Fix accordion semantics (U-03).
8. Reduce copy repetition; give each section distinct content (U-06).
9. Add a dashboard preview visual to the hero or Produk section — the product is currently never shown on the marketing page.
10. Navbar: section anchors, state-aware aria, scroll lock on mobile (U-05, U-11).

**Larger**
11. Introduce shared design tokens and re-skin the dashboard with them; reduce dashboard chrome (U-02, U-13).
12. Real team content and About storytelling (U-08).

---

## 10. Limitations
No rendering, device, Lighthouse, or contrast measurements were run; visual claims come from class names and layout logic in the source. All data shown in the product is sample data per the site's own notices.
