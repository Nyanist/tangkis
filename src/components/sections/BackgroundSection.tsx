"use client";
import { Fuel } from "lucide-react";
import FadeUp from "@/components/motion/FadeUp";
import SectionBadge from "@/components/sections/SectionBadge";
import { background } from "@/lib/data/background";

export default function BackgroundSection() {
  return (
    <section id="latar-belakang" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-[95%] items-center gap-12 px-4 md:px-6 lg:max-w-[92%] lg:grid-cols-2 lg:gap-24 xl:max-w-[1400px]">
        <FadeUp>
          <SectionBadge number="01" label="Latar Belakang" />
          <h2 className="mt-6 text-3xl font-bold md:text-5xl">{background.title}</h2>
          <div className="mt-6 space-y-4 text-lg text-slate-600">
            {background.paragraphs.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.15}>
          {/* ponytail: gradient placeholder — swap for next/image when a real photo exists */}
          <div className="relative flex min-h-[24rem] flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br from-slate-800 to-blue-900 p-6 pb-8 text-white lg:h-[500px]">
            <Fuel className="h-14 w-14" strokeWidth={1.5} aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
