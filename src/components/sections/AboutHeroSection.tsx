"use client";
import Link from "next/link";
import FadeUp from "@/components/motion/FadeUp";

export default function AboutHeroSection() {
  return (
    <section className="md:p-3">
      <div className="relative flex min-h-[70dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 px-6 py-24 mb-6 text-center text-[#f0f0f0] md:items-start md:rounded-3xl md:px-10 md:text-left">
        <video
          src="/logo-animation.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover bg-transparent"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/80 via-brand-900/80 to-brand-700/80" />
        {/* px-4 md:px-0 matches HeroSection — without it the copy hugged the panel edge */}
        <div className="relative w-full max-w-3xl px-4 md:px-0">
          <FadeUp delay={0.15}>
            <h1 className="mt-6 text-[clamp(2.25rem,1.5rem+3vw,3.75rem)] font-extrabold leading-tight">Tentang Kami</h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg lg:text-xl">
              TANGKIS dirancang untuk mengeliminasi titik buta pada sistem genset darurat. 
              Melalui integrasi sensor fisik, embedded system, dan telemetri real-time, 
              kami memberikan visibilitas penuh atas kualitas bahan bakar bagi pengelola rumah sakit, pusat data, dan gedung komersial sebelum pemadaman terjadi
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
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
