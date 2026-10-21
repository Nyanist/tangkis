"use client";
import FadeUp from "@/components/motion/FadeUp";
import { background } from "@/lib/data/background";
import { useLang } from "@/lib/i18n";
import Image from "next/image";
import { cn, KONTEN_SECTION } from "@/lib/utils";

// The lamp banner above ends on brand-950, so this section starts on the very same colour and eases it out to a
// pale green that then carries all the way down to the section's bottom edge (no white band). The ramp is a fixed-height strip (170px on phones, 240px on tablets, 280px on desktop, set by the bg-[length] classes), so
// the dark part stays the same height whatever the section height; the top padding below keeps the copy
// under the part of the ramp that is already light enough for dark text.
const BG_FROM = [18, 38, 10];
const BG_TO = [217, 234, 211];
const RAMP = [
  [0, 0],
  [30, 0.02],
  [60, 0.08],
  [90, 0.2],
  [120, 0.38],
  [150, 0.58],
  [180, 0.76],
  [210, 0.9],
  [240, 0.97],
  [280, 1],
];
const mix = (m: number) => `rgb(${BG_FROM.map((c, i) => Math.round(c + (BG_TO[i] - c) * m)).join(",")})`;
const BACKGROUND_STYLE = {
  backgroundColor: mix(1),
  backgroundImage: `linear-gradient(to bottom, ${RAMP.map(([px, m]) => `${mix(m)} ${((px / 280) * 100).toFixed(2)}%`).join(", ")})`,
  backgroundRepeat: "no-repeat",
} as const;

export default function BackgroundSection() {
  const { t } = useLang();
  return (
    <section id="latar-belakang" className="scroll-mt-24 bg-[length:100%_170px] pb-8 pt-36 sm:bg-[length:100%_240px] sm:pt-48 lg:bg-[length:100%_280px] lg:pb-16 lg:pt-56" style={BACKGROUND_STYLE}>
      <div className={cn(KONTEN_SECTION, "grid items-center gap-12 lg:grid-cols-2 lg:gap-24")}>
        <FadeUp className="lg:pl-12 xl:pl-24 2xl:pl-40">
          <h2 className="text-5xl font-bold leading-[1.04] tracking-[-0.035em] text-brand-950 md:text-6xl">
            {t("Risiko Nyata", "The Real Risk")}
            <br />
            <span className="text-brand-600">{t("di Balik", "Behind Your")}</span>
            <br />
            {t("Genset Cadangan Anda", "Backup Generator")}
          </h2>
          <div className="mt-6 space-y-4 text-lg text-slate-600">
            {background.paragraphs.map((p) => (
              <p key={p.id}>{t(p)}</p>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.15}>
          <div className="relative min-h-[24rem] lg:h-[500px]">
            {/* centered glow behind the image: no offset, spreads evenly on all sides */}
            <div aria-hidden className="absolute inset-6 rounded-lg bg-gradient-to-r from-transparent to-black/45 blur-xl" />
            <Image
              src="/s1-pch-img.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="rounded-lg object-cover"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
