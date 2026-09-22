"use client";
import Link from "next/link";
import FadeUp from "@/components/motion/FadeUp";
import { product } from "@/lib/data/product";

export default function AboutHeroSection() {
  return (
    <section className="lg:p-3">
      <div className="flex min-h-[70dvh] flex-col items-center justify-center bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 px-6 py-24 text-center text-[#f0f0f0] lg:items-start lg:rounded-3xl lg:px-10 lg:text-left">
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
              TANGKIS dirancang untuk mengeliminasi titik buta pada sistem genset darurat. 
              Melalui integrasi sensor fisik, embedded system, dan telemetri real-time, 
              kami memberikan visibilitas penuh atas kualitas bahan bakar bagi pengelola rumah sakit, pusat data, dan gedung komersial sebelum pemadaman terjadi
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="/dashboard"
                className="rounded-full bg-[#f0f0f0] px-6 py-3 font-semibold text-brand-950 hover:bg-brand-100"
              >
                Lihat Demo Dashboard
              </Link>
              <Link
                href="/"
                className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold backdrop-blur-sm hover:bg-white/20"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
