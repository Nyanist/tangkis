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
    <section className="lg:p-3">
      <div className="relative flex h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 px-6 text-center text-[#f0f0f0] lg:items-start lg:justify-start lg:rounded-3xl lg:px-10 lg:text-left">
        <CircuitAccent />
        <div className="relative w-full max-w-3xl px-4 md:px-0 lg:mt-[clamp(7rem,18vh,9.5rem)]">
          <FadeUp delay={0.15}>
            <h1 className="mt-6 text-[clamp(2.25rem,1.5rem+3vw,3.75rem)] font-extrabold leading-tight">{product.tagline}</h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg lg:text-xl">{product.description}</p>
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
        {/* pinned to CircuitAccent's hub square (center 77%, 52% of the section) so the traces converge on it */}
        <Image
          src="/produk-hero.webp"
          alt={product.name}
          width={500}
          height={500}
          priority
          className="pointer-events-none absolute left-[77%] top-[52%] z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block lg:w-80 xl:w-[36rem]"
        />
        <ScrollHint opacity={hintOpacity} className="absolute bottom-8 inset-x-0 mx-auto w-fit" />
      </div>
    </section>
  );
}
