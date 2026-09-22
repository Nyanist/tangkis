"use client";
import Image from "next/image";
import Link from "next/link";
import { useScroll, useTransform } from "framer-motion";
import ScrollHint from "@/components/motion/ScrollHint";
import CircuitAccent from "@/components/motion/CircuitAccent";
import FadeUp from "@/components/motion/FadeUp";
import { product } from "@/lib/data/product";

export default function HeroSection() {
  // Scroll hint fades out as soon as the user starts scrolling.
  const { scrollY } = useScroll();
  const hintOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="md:p-3">
      <div className="relative flex h-fill min-h-[70dvh] pb-[4%] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 px-6 text-center text-[#f0f0f0] md:items-start md:justify-start md:rounded-3xl md:px-10 md:text-left">
        <CircuitAccent />
        {/* lg:max-w-[52%] keeps the copy clear of the product image, which starts
            at 72% − half its width. Both are percentages so they scale together. */}
        <div className="relative items-center w-full max-w-3xl px-4 md:px-0 md:mt-[clamp(4.5rem,2vh,2rem)] lg:max-w-[52%]">
          <FadeUp delay={0.15}>
            <h1 className="mt-6 text-[clamp(2rem,1.25rem+2.5vw,3.25rem)] font-extrabold leading-tight">{product.tagline}</h1>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-6 max-w-2xl text-sm text-slate-300 sm:text-base lg:text-lg">{product.description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link
                href="/dashboard"
                className="rounded-full bg-[#f0f0f0] px-6 py-3 font-semibold text-brand-950 hover:bg-brand-100"
              >
                Lihat Demo Dashboard
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold backdrop-blur-sm hover:bg-white/20"
              >
                Tentang Kami
              </Link>
            </div>
          </FadeUp>
        </div>
        {/* Anchored to the section's bottom edge (not vertically centered) and sized up
            so it sits over CircuitAccent's traces instead of floating clear of them. */}
        <Image
          src="/produk-hero.webp"
          alt={product.name}
          width={6000}
          height={6000}
          priority
          className="pointer-events-none absolute bottom-0 xl:left-[77%] left-[78%] z-10 hidden -translate-x-1/2 lg:block lg:w-[80%] xl:w-[80%]"
        />
        <ScrollHint opacity={hintOpacity} className="absolute bottom-8 inset-x-0 mx-auto w-fit" />
      </div>
    </section>
  );
}
