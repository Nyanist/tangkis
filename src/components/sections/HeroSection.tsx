"use client";
import Link from "next/link";
import FadeUp from "@/components/motion/FadeUp";
import { product } from "@/lib/data/product";

export default function HeroSection() {
  return (
    <section className="mx-auto flex min-h-[85vh] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center">
      <FadeUp>
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">{product.name}</p>
      </FadeUp>
      <FadeUp delay={0.15}>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
          {product.tagline}
        </h1>
      </FadeUp>
      <FadeUp delay={0.3}>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">{product.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/dashboard" className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
            Lihat Dashboard
          </Link>
          <Link href="/about" className="rounded-lg border px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100">
            Tentang Kami
          </Link>
        </div>
      </FadeUp>
    </section>
  );
}
