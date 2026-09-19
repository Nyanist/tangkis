"use client";
import SectionBadge from "@/components/sections/SectionBadge";
import FadeUp from "@/components/motion/FadeUp";
import { problems } from "@/lib/data/problems";

export default function ProblemSection() {
  return (
    <section id="masalah" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[95%] px-4 md:px-6 lg:max-w-[92%] xl:max-w-[1400px]">
        <FadeUp>
          <SectionBadge number="01" label="Masalah" />
          <h2 className="mt-6 max-w-3xl text-3xl font-bold md:text-5xl">Masalah yang Kami Selesaikan</h2>
        </FadeUp>
        <div className="mt-10 flex flex-col gap-4 lg:flex-row">
          {problems.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.1} className="lg:flex-1">
              <div className="group relative flex min-h-[24rem] flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br from-slate-800 to-blue-900 p-6 pb-8 text-white lg:h-[500px]">
                <p.icon className="h-14 w-14" strokeWidth={1.5} aria-hidden />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="relative">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-slate-200 transition-all duration-300 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">
                    {p.description}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
