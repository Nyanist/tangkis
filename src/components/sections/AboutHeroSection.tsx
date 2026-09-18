"use client";
import FadeUp from "@/components/motion/FadeUp";

export default function AboutHeroSection() {
  return (
    <section className="bg-slate-900 py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <FadeUp><h1 className="text-4xl font-extrabold">Tentang Kami</h1></FadeUp>
        <FadeUp delay={0.15}>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Kami membangun TANGKIS agar genset cadangan selalu siap — memadukan sensor,
            embedded system, dan dashboard yang mudah dibaca pengelola gedung maupun rumah sakit.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
