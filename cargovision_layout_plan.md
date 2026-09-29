# Main Page Redesign — Cargovision.app Layout (Detailed Implementation Plan)

## Goal Description

Redesign the TANGKIS main landing page (`/`) to match the structural layout, visual patterns, and interaction model of [cargovision.app](https://cargovision.app/). This plan is based on actual HTML/CSS analysis of the reference site.

---

## Reference Layout Analysis (cargovision.app)

| # | Section | BG | Height | Key Pattern |
|---|---------|-----|--------|-------------|
| 1 | Hero | Dark image (`bg-hero.webp`) | `100dvh` | Full-viewport, rounded corners `lg:rounded-3xl`, text top-left on desktop, centered on mobile |
| 2 | Persona Cards (`#ecosystem`) | White | `min-h-screen` | 4 image cards in `flex gap-4` horizontal row, 384px mobile / 500px desktop |
| 3 | Features/Accordion (`#better-way`) | White | `min-h-screen` | `grid grid-cols-12`: sticky left image (5 cols) + expandable right accordion (7 cols) |
| 4 | Dark Carousel (`#what-makes-possible`) | Near-black `#0a0a0a` | `h-screen` | Full-screen immersive slides with gradient overlays, dot indicators, thumbnail strip |
| 5 | Journey header (`#our-journey`) | White | auto | Section badge + heading + CTA |
| 5b | Mobile cards | White | auto | Vertical stack of persona detail cards (`lg:hidden`) |
| 5c | Desktop panels | White | `h-screen` | Horizontal scroll panels (`snap-x`, desktop only) |
| 6 | Black divider | Black | `h-screen` | Decorative full-screen separator |
| 7 | Footer | Dark navy `#0A0F1A` | auto | Big CTA area + nav columns + marquee |

### Key Visual Patterns

- **Container**: `max-w-[95%] lg:max-w-[92%] xl:max-w-[1400px]` — fluid with hard cap
- **Compound section badge**: Number circle (primary bg) overlapping a label pill (gray bg, border)
- **Glass navbar**: `fixed top-8`, `rounded-full`, `backdrop-blur-md`, scroll-triggered bg opacity
- **Hero positioning**: `top-[clamp(7rem,18vh,9.5rem)]` with `@media(min-height:900px):top-[22vh]`
- **Accordion**: `grid-template-rows: 0fr` -> `1fr` CSS transition, `group-hover:translate-x-2` + `group-hover:rotate-45`
- **Impact carousel**: Gradients `from-black/75 via-black/45 to-transparent`, dot indicators right, thumbnails bottom-left (desktop)
- **Horizontal scroll**: `snap-x snap-mandatory`, `shrink-0 w-[50vw] xl:w-[40vw] h-screen` panels
- **Footer marquee**: Infinite horizontal text scroll with `translateX(-50%)` loop
- **Hovers**: Scale-fill circles (`scale-0` -> `scale-100`), underline grow from left, arrow rotation

---

## Proposed Changes

### 1. Data Layer

#### [NEW] `src/lib/data/landing.ts`

```ts
export const landingData = {
  hero: {
    badge: "Pemantauan Kesiapan Bahan Bakar Genset Berbasis IoT & AI",
    headline: "Bangun Sistem Energi Cadangan yang Lebih Efisien & Handal",
    subheadline:
      "Dukung operasional industri, rumah sakit, dan pusat data yang lebih aman dengan pemantauan kesiapan bahan bakar genset cadangan secara real-time.",
    primaryCta: { label: "Mulai Sekarang", href: "/dashboard" },
    secondaryCta: { label: "Jelajahi Solusi", href: "#solution" },
  },
  personas: {
    badge: "Our Ecosystem",
    title: "Terinspirasi oleh Para Profesional yang Menjaga Keandalan Energi",
    description:
      "Setiap hari, operator genset, tim maintenance, ahli regulasi, dan manajer fasilitas bekerja menjaga keandalan listrik cadangan.",
    roles: [
      { id: "facility", title: "Facility Manager", image: "", description: "Memastikan zero unplanned outage." },
      { id: "operator", title: "Operator Genset", image: "", description: "Memantau kondisi bahan bakar harian." },
      { id: "compliance", title: "Compliance Specialist", image: "", description: "Memenuhi spesifikasi B50 Kepmen ESDM." },
      { id: "director", title: "Plant Director", image: "", description: "Mengoptimalkan biaya perawatan genset." },
    ],
  },
  solutions: {
    badge: "A Better Way to Monitor",
    title: "Cara Baru Memahami Kesiapan & Kualitas Bahan Bakar",
    items: [
      {
        id: "automated-inspection",
        number: "01",
        title: "Automated Inspection",
        description:
          "Sensor IoT dan logika analitik mengenali pola peningkatan kadar air (ppm) dan suhu solar.",
        icon: "sensor",
      },
      {
        id: "digital-evidence",
        number: "02",
        title: "Digital Evidence & Compliance",
        description:
          "Dokumentasi digital otomatis untuk audit standar mutu bahan bakar B50 ESDM 257/2026.",
        icon: "evidence",
      },
      {
        id: "live-monitoring",
        number: "03",
        title: "Live Monitoring & Alerting",
        description:
          "Dashboard pemantauan terpusat dengan indikator status LED real-time dan peringatan dini.",
        icon: "monitoring",
      },
      {
        id: "clean-energy",
        number: "04",
        title: "Clean Energy Impact",
        description:
          "Mencegah pembusukan solar dan pemborosan bahan bakar untuk efisiensi operasional.",
        icon: "energy",
      },
    ],
  },
  impacts: {
    badge: "What TANGKIS Makes Possible",
    title: "Mengubah Cara Fasilitas Kritis Mengelola Bahan Bakar Cadangan",
    subheadline:
      "Teknologi yang membuat pemantauan bahan bakar lebih cepat, transparan, dan teruji.",
    cards: [
      {
        number: "01",
        title: "Pemeriksaan 24/7 Otomatis",
        description: "Pemantauan kontinyu tanpa pengambilan sampel manual secara berulang.",
        image: "",
      },
      {
        number: "02",
        title: "Zero Unplanned Blackout",
        description: "Deteksi dini kontaminasi air mencegah kegagalan genset saat darurat.",
        image: "",
      },
      {
        number: "03",
        title: "Kepatuhan ESDM 257/2026",
        description: "Laporan siap cetak untuk membuktikan kelayakan bahan bakar sesuai ambang 300 ppm.",
        image: "",
      },
      {
        number: "04",
        title: "Efisiensi & Dampak Lingkungan",
        description: "Mengurangi limbah bahan bakar dan memperpanjang usia solar genset cadangan.",
        image: "",
      },
    ],
  },
  milestones: {
    badge: "The Path We Walk",
    title: "Perjalanan TANGKIS di Dunia Inovasi & Startup",
    description: "Dari ide awal hingga pengakuan di kompetisi nasional & forum energi.",
    timeline: [
      {
        year: "2026",
        label: "Inception",
        number: "01",
        title: "UI Incubate Hackathon",
        description: "Program awal yang membantu validasi ide dan arah solusi teknologi pemantauan IoT.",
        image: "",
      },
      {
        year: "2026",
        label: "Introduction",
        number: "02",
        title: "Forum Energi Nasional",
        description: "Momen memperkenalkan konsep inspeksi digital bahan bakar genset kepada pelaku industri.",
        image: "",
      },
      {
        year: "2026",
        label: "Acceleration",
        number: "03",
        title: "Pertamuda Seed & Scale",
        description: "Pencapaian Top 3 nasional dan pendanaan prototipe pemantauan kesiapan genset.",
        image: "",
      },
      {
        year: "2026",
        label: "Global Recognition",
        number: "04",
        title: "Global Startup Acceleration",
        description: "Pengakuan internasional untuk inovasi efisiensi dan keberlanjutan energi cadangan.",
        image: "",
      },
    ],
    footerText:
      "Dan perjalanan baru saja dimulai. Kami terus berinovasi untuk masa depan energi cadangan yang efisien.",
  },
};
```

---

### 2. Section Components

#### [REWRITE] `src/components/sections/HeroSection.tsx`

- Full viewport `h-[100dvh]`, rounded corners desktop `lg:rounded-3xl`
- Background: dark gradient / image (`bg-[url('/images/hero.webp')]` when available) + `bg-black/50` overlay
- Content top-left desktop (`top-[clamp(7rem,18vh,9.5rem)] left-10`), centered mobile
- Glass pills: `bg-white/20 backdrop-blur-sm` badge, `bg-white/10 border-white/20` info pill
- CTAs: primary filled pill (`bg-white text-slate-900 rounded-full`), secondary glass
- Scroll indicator bottom-right (mouse icon + dot)

#### [NEW] `src/components/sections/PersonaSection.tsx`

- Section: `min-h-screen bg-white py-16 lg:py-24`, container `max-w-[1400px]`
- Header: compound badge (number circle + label pill) + "Learn More" button
- Cards: `flex gap-4` row, each `relative h-96 lg:h-[500px] rounded-lg group`
- Full-bleed image + gradient overlay (`from-black/60`), bottom label, hover CTA slide-up

#### [NEW] `src/components/sections/SolutionSection.tsx`

- Section: `min-h-screen bg-white`, container `grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24`
- Left (5 cols): sticky image `lg:sticky lg:top-32`, rounded 32px, aspect-[4/3], gradient overlay + info pill
- Right (7 cols): accordion `border-t border-gray-200`, each item `group py-10 border-b cursor-pointer`
- Number badge circle + title + arrow (`group-hover:rotate-45`), expandable content (stacked mobile, side-by-side desktop)

#### [NEW] `src/components/sections/ImpactSection.tsx`

- Full-screen `h-screen bg-[#0a0a0a]` carousel (`useState` active index)
- Slides: bg image + gradients (left-to-right, bottom-to-top fades), content `max-w-3xl`, progress bar per slide
- Controls: dot indicators (right vertical), thumbnail strip (bottom-left, desktop only)

#### [NEW] `src/components/sections/MilestonesSection.tsx`

- Mobile (`lg:hidden`): vertical card stack, image (aspect-[4/3] rounded-2xl) + text, CTA card at bottom
- Desktop (`hidden lg:block`): horizontal scroll `overflow-x-auto snap-x snap-mandatory`, panels `shrink-0 w-[50vw] xl:w-[40vw] h-screen`, 5th panel = CTA card, progress bar bottom

#### [NEW] `src/components/sections/BlackDivider.tsx`

- Decorative `h-screen bg-black` separator before footer

---

### 3. Layout & Navigation

#### [REWRITE] `src/components/layout/Navbar.tsx`

- Desktop: `fixed top-8 left-0 right-0 z-50 flex justify-center`, inner pill `h-16 rounded-full border border-white/20`
- Transparent on hero -> `bg-black/90 backdrop-blur-md` on scroll (`useEffect` + scroll listener)
- Brand left, links center (`/milestones`, `/about`), CTA pill right ("Lihat Dashboard")
- Mobile: `fixed top-0 h-16 bg-black/90 backdrop-blur-md`, brand + hamburger, full-screen overlay menu

#### [REWRITE] `src/components/layout/Footer.tsx`

- Wrapper `bg-[#0A0F1A] text-white` + noise texture overlay (SVG data URI)
- Content `max-w-[1800px] px-6 lg:px-12 pt-32 lg:pt-48`
- Top CTA: `grid grid-cols-12` — left (7 cols) heading + contact row, right (5 cols) large arrow circle (scale-fill hover)
- Nav columns: Home, Solusi, Blog, Milestones, About, Contact, Portal
- Social: circular icon buttons with hover inversion
- Bottom marquee: infinite "TANGKIS" text scroll

---

### 4. Page Assembly

#### [MODIFY] `src/app/page.tsx`

```tsx
import HeroSection from "@/components/sections/HeroSection";
import PersonaSection from "@/components/sections/PersonaSection";
import SolutionSection from "@/components/sections/SolutionSection";
import ImpactSection from "@/components/sections/ImpactSection";
import MilestonesSection from "@/components/sections/MilestonesSection";
import BlackDivider from "@/components/sections/BlackDivider";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PersonaSection />
      <SolutionSection />
      <ImpactSection />
      <MilestonesSection />
      <BlackDivider />
    </main>
  );
}
```

### 5. Theme & CSS

#### [MODIFY] `src/app/globals.css`

```css
html { scroll-behavior: smooth; }

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee { animation: marquee 20s linear infinite; }

.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.5s ease;
}
.accordion-content[data-open="true"] { grid-template-rows: 1fr; }
```

#### [MODIFY] `tailwind.config.ts`

```ts
theme: {
  extend: {
    colors: {
      primary: "#123B66",
      dark: "#0a0a0a",
      "dark-navy": "#0A0F1A",
    },
  },
},
```

---

## Verification Plan

### Automated
```bash
npx tsc --noEmit
npm run build
```

### Manual
| Check | Expected Result |
|---|---|
| `npm run dev` → `localhost:3000` | Cargovision-style layout loads |
| Hero | Full-viewport dark bg, glass pills, dual CTAs, scroll indicator |
| Persona Section | 4 horizontal image cards with hover CTA |
| Solution Section | Sticky image left + accordion right (desktop), stacked (mobile) |
| Impact Section | Dark carousel, 4 slides, dots + thumbnails + progress |
| Milestones Section | Horizontal scroll (desktop), vertical stack (mobile) |
| Footer | Dark navy, CTA area, nav columns, marquee |
| Navbar | Floating glass pill (desktop), fixed bar (mobile) |
| Responsive 375px / 1440px | Single column / full layouts |
| `npm run build` | Succeeds |

---

# Comparison: `redesign_implementation_plan.md` vs This Plan (`cargovision_layout_plan.md`)

## Overview

Both plans redesign the TANGKIS main page after cargovision.app. The existing `redesign_implementation_plan.md`
is a **high-level section mapping**; this plan is a **detailed layout specification** derived from actual HTML/CSS
analysis of the reference site.

| Aspect | `redesign_implementation_plan.md` | `cargovision_layout_plan.md` (this file) |
|---|---|---|
| **Source fidelity** | Section names approximated from visible content | Exact structure, classes, breakpoints, hover patterns from reference HTML |
| **Navbar** | Not specified | Floating glass pill (`fixed top-8`, `rounded-full`, backdrop-blur, scroll transition), dual mobile/desktop |
| **Hero** | Badge + headline + CTAs + dashboard preview card | Full-viewport `100dvh`, `rounded-3xl` desktop, dark bg + overlay, `clamp()` positioning, glass pills, mouse scroll indicator |
| **Persona section** | 4 role cards (generic grid) | Horizontal `flex gap-4`, 500px image cards, gradient overlays, hover CTA, compound section badge |
| **Solution section** | 4-column / 2×2 grid (generic) | `grid-cols-12`: sticky left image (5 cols, `lg:sticky lg:top-32`) + expandable accordion (7 cols) |
| **Impact section** | 3 value-prop cards (generic) | Full-screen dark carousel (`h-screen bg-[#0a0a0a]`), dots, thumbnails, gradients, progress bar |
| **Milestones section** | Timeline (generic) | Dual responsive: mobile vertical stack, desktop horizontal scroll (`snap-x`, `50vw` panels) |
| **Footer** | Expanded brand footer (generic) | Multi-zone: big CTA grid (7+5 cols), nav columns, social icons, infinite marquee |
| **Black divider** | — | Decorative `h-screen bg-black` separator (matches reference section 6) |
| **CSS additions** | — | Marquee keyframes, accordion `grid-template-rows` transition, noise texture, glass patterns |
| **Data file** | `landing.ts` basic content | `landing.ts` with reference-accurate structure (badges, numbered items, timeline labels, image placeholders) |
| **Scroll behavior** | — | CSS `snap-x`, `scroll-behavior: smooth`, sticky positioning (no Locomotive Scroll dep) |

## Section Mapping

| Cargovision section | `redesign_implementation_plan.md` | This plan | Delta |
|---|---|---|---|
| Hero | HeroSection (badge + CTAs + preview) | HeroSection (full-viewport, glass pills, no preview card) | Restructure |
| Persona cards | PersonaSection (role cards) | PersonaSection (horizontal image cards) | Layout detail |
| Features accordion | SolutionSection (4-col grid) | SolutionSection (sticky + accordion) | Full rewrite |
| Dark carousel | ImpactSection (3 cards) | ImpactSection (carousel, 4 slides) | Full rewrite |
| Journey / milestones | MilestonesSection (timeline) | MilestonesSection (dual responsive) | Full rewrite |
| Footer | Footer (expanded) | Footer (multi-zone + marquee) | Full rewrite |
| Navbar | — | Navbar (glass pill) | **New** |
| Black divider | — | BlackDivider | **New** |

## Files to Delete (both plans agree, this plan explicit)

| File | Reason |
|---|---|
| `src/components/sections/ProblemSection.tsx` | Superseded by PersonaSection |
| `src/components/sections/ProductSection.tsx` | Merged into hero |
| `src/components/sections/FeaturesSection.tsx` | Superseded by SolutionSection |
| `src/lib/data/problems.ts` | Absorbed into `landing.ts` |
| `src/lib/data/features.ts` | Absorbed into `landing.ts` |
| `src/lib/data/product.ts` | Absorbed into `landing.ts` |

## Execution Order

```
1.  Create landing.ts data file
2.  Rewrite Navbar (glass pill)
3.  Rewrite HeroSection
4.  Create PersonaSection
5.  Create SolutionSection (sticky + accordion)
6.  Create ImpactSection (dark carousel)
7.  Create MilestonesSection (dual responsive)
8.  Create BlackDivider
9.  Rewrite Footer
10. Update page.tsx imports
11. Update globals.css (marquee, accordion, noise)
12. Update tailwind.config.ts (primary/dark colors)
13. Delete old sections + data files
14. tsc --noEmit + npm run build
```
