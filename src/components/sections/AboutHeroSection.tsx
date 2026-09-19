"use client";
import Link from "next/link";
import FadeUp from "@/components/motion/FadeUp";
import { product } from "@/lib/data/product";

export default function AboutHeroSection() {
  return (
    <section className="lg:p-3">
      <div className="flex min-h-[70dvh] flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 px-6 py-24 text-center text-white lg:items-start lg:rounded-3xl lg:px-10 lg:text-left">
        <div className="w-full max-w-3xl">
          <FadeUp>
            <p className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              {product.name}
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">Tentang Kami</h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              Kami membangun TANGKIS agar genset cadangan selalu siap — memadukan sensor,
              embedded system, dan dashboard yang mudah dibaca pengelola gedung maupun rumah sakit.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="/dashboard"
                className="rounded-full bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-200"
              >
                Lihat Dashboard
              </Link>
              <Link
                href="/"
                className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold backdrop-blur-sm hover:bg-white/20"
              >
                Kembali ke Home
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
