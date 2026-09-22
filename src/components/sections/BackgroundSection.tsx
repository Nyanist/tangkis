"use client";
import FadeUp from "@/components/motion/FadeUp";
import SectionBadge from "@/components/sections/SectionBadge";
import { background } from "@/lib/data/background";
import Image from "next/image";
import { cn, KONTEN_SECTION } from "@/lib/utils";

export default function BackgroundSection() {
  return (
    <section id="latar-belakang" className="scroll-mt-24 bg-[#f0f0f0] py-8 lg:py-16">
      <div className={cn(KONTEN_SECTION, "grid items-center gap-12 lg:grid-cols-2 lg:gap-24")}>
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
          <div className="relative min-h-[24rem] lg:h-[500px]">
            {/* centered glow behind the image: no offset, spreads evenly on all sides */}
            <div aria-hidden className="absolute inset-6 rounded-lg bg-gradient-to-r from-transparent to-black/45 blur-xl" />
            <Image
              src="/s1-pch-img.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="rounded-lg object-cover"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
