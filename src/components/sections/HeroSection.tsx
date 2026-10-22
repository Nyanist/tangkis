"use client";
import Link from "next/link";
import { useScroll, useTransform } from "framer-motion";
import ScrollHint from "@/components/motion/ScrollHint";
import CircuitAccent from "@/components/motion/CircuitAccent";
import HeroBackdrop from "@/components/motion/HeroBackdrop";
import WorldMapArc from "@/components/motion/WorldMapArc";
import FadeUp from "@/components/motion/FadeUp";
import { product } from "@/lib/data/product";
import { useLang } from "@/lib/i18n";

export default function HeroSection() {
  const { t } = useLang();
  // Scroll hint fades out as soon as the user starts scrolling.
  const { scrollY } = useScroll();
  const hintOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section>
      <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 px-6 pb-24 pt-24 text-center text-[#f0f0f0] md:items-start md:px-10 md:text-left">
        <HeroBackdrop />
        <CircuitAccent />
        {/* lg:max-w-[52%] keeps the copy clear of the product image, which starts
            at 52% of the hero. Both are percentages so they scale together. */}
        <div className="relative z-10 w-full max-w-3xl px-4 md:px-0 lg:max-w-[50%]">
          <FadeUp delay={0.2}>
            <h1 className="mt-6 text-[clamp(2.25rem,1rem+4vw,5.25rem)] font-extrabold leading-[1.04] tracking-tight">
              {t(product.tagline)}
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="mt-6 max-w-2xl font-description text-base text-slate-300 sm:text-lg lg:text-xl">{t(product.description)}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link
                href="/dashboard"
                className="rounded-full bg-[#f0f0f0] px-7 py-3.5 text-base font-semibold text-brand-950 transition-colors hover:bg-brand-100"
              >
                {t("Lihat Demo Dashboard", "View Dashboard Demo")}
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-base font-semibold backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {t("Tentang Kami", "About Us")}
              </Link>
            </div>
          </FadeUp>
        </div>
        {/* Arched world map: on lg+ it takes the right side of the hero, vertically centred; below lg it flows in
            under the copy at a phone-friendly width. Drag it sideways to spin it. */}
        <WorldMapArc className="absolute right-[1.5%] top-1/2 z-10 hidden w-[min(52vw,880px)] -translate-y-[46%] lg:block" />
        <WorldMapArc className="relative z-10 mx-auto mt-8 w-[min(100%,520px)] lg:hidden" />
        {/* The hero's green follows the dark lamp section below it: over the lower half the whole backdrop (gradient,
            glows, circuit traces) is washed toward brand-950 along an S-curve, so it ends on exactly the colour the
            next section starts with instead of being cut by a short dark band. Sits under the copy and the
            illustration (z-10) so neither is dimmed. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[52%] [background-image:linear-gradient(to_bottom,rgba(18,38,10,0)_0%,rgba(18,38,10,0.03)_10%,rgba(18,38,10,0.10)_22%,rgba(18,38,10,0.24)_35%,rgba(18,38,10,0.44)_49%,rgba(18,38,10,0.66)_63%,rgba(18,38,10,0.84)_77%,rgba(18,38,10,0.95)_89%,rgb(18,38,10)_100%)]"
        />
        <ScrollHint opacity={hintOpacity} className="absolute bottom-8 right-8 z-30 md:right-10" />
      </div>
    </section>
  );
}
