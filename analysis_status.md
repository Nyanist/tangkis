# Recent Analysis — Status Tracker

Companion to `website_analysis.md` (committed 2026-09-19 as `3db4a88`). Explains what was
analysed recently, what changed since, and what is still open. Findings detail lives in
`website_analysis.md` §6 — this file tracks status only.

## Analyses performed

| When | What | Artifact |
|---|---|---|
| 2026-09-19 | cargovision.app HTML/CSS structure analysis (sections, navbar, carousel, footer patterns) | `cargovision_layout_plan.md` |
| 2026-09-19 | Responsiveness pass (padding, card heights, chart tooltip, safe-area) | committed in `799bb52` |
| 2026-09-19 | Full UI/UX audit: `/`, `/about`, `/dashboard`, Navbar, Footer | `website_analysis.md` |
| 2026-09-19 | Dev-server ChunkLoadError diagnosis (dual `dev` + `start`, stale `.next`) | fixed, no artifact |

## Changes since the audit

- `ProblemSection` / `FeaturesSection` containers gained `px-4 md:px-6` (audit §2.3 already reflects this).
- Marketing pages migrated to lucide-react icons; dashboard still uses emoji (U-10 open).
- `ProductSection` (dark marquee band) and `SectionBadge` now exist and are covered by the audit.

## Finding status (IDs from `website_analysis.md` §6)

| ID | Sev | Status |
|---|---|---|
| U-01 | High | OPEN — problem-card descriptions still hover-only on `lg` |
| U-02 | High | OPEN — dashboard tokens/chrome unification not started |
| U-03 | Med | OPEN — accordion `<button>`/`<h3>` semantics unchanged |
| U-04 | Med | OPEN — `FadeUp` still ignores reduced motion (verified: no `useReducedMotion`) |
| U-05 | Med | OPEN — no `scroll-mt-*` on anchored sections (verified: none present) |
| U-06 | Med | OPEN — copy repetition unaddressed |
| U-07 | Med | OPEN — duplicate sample-data notices remain |
| U-08 | Med | OPEN — placeholder team data remains |
| U-09 | Low | OPEN — mixed ID/EN strings remain |
| U-10 | Low | OPEN — dashboard emoji icons remain |
| U-11 | Low | OPEN — navbar redundancy/focus handling unchanged |
| U-12 | Low | OPEN — three footer CTAs to `/dashboard` remain |
| U-13 | Low | OPEN — `brand` scale still unused |

## Suggested next batch (quick wins, ≤ 1 day)

1. U-01: always show problem descriptions (one-line change).
2. U-04: `useReducedMotion` in `FadeUp` (one-line change).
3. U-05: add `scroll-mt-24` to `#masalah`, `#produk`, `#fitur` sections.
4. U-10: swap dashboard emoji for lucide (`TriangleAlert`, `Wrench`, `Send`, `Download`, `Wifi`).
5. U-09: pick ID or EN for "Meet the Team", "Scroll", "Toggle menu".
