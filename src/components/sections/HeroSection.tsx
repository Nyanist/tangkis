"use client";
import Link from "next/link";
import { useScroll, useTransform } from "framer-motion";
import ScrollHint from "@/components/motion/ScrollHint";
import FadeUp from "@/components/motion/FadeUp";
import { product } from "@/lib/data/product";

export default function HeroSection() {
  // Scroll hint fades out as soon as the user starts scrolling.
  const { scrollY } = useScroll();
  const hintOpacity = useTransform(scrollY, [0, 80], [1, 0]);

  return (
    <section className="lg:p-3">
      <div className="relative flex h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 px-6 text-center text-[#f0f0f0] lg:items-start lg:justify-start lg:rounded-3xl lg:px-10 lg:text-left">
        <div className="w-full max-w-3xl px-4 md:px-0 lg:mt-[clamp(7rem,18vh,9.5rem)]">
          <FadeUp>
            <p className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              {product.name}
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">{product.tagline}</h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">{product.description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
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
        <ScrollHint opacity={hintOpacity} className="absolute bottom-8 left-1/2 -translate-x-1/2" />
      </div>
    </section>
  );
}
