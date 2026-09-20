"use client";
import { Fuel } from "lucide-react";
import FadeUp from "@/components/motion/FadeUp";
import SectionBadge from "@/components/sections/SectionBadge";
import { background } from "@/lib/data/background";
import Image from "next/image";

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
          <div className="relative min-h-[24rem] overflow-hidden rounded-lg shadow-2xl lg:h-[500px]">
            <Image
              src="/s1-pch-img.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
