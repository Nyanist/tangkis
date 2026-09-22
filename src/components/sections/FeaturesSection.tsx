"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Fuel } from "lucide-react";
import SectionBadge from "@/components/sections/SectionBadge";
import FadeUp from "@/components/motion/FadeUp";
import { features } from "@/lib/data/features";
import { product } from "@/lib/data/product";
import { cn, KONTEN_SECTION } from "@/lib/utils";

export default function FeaturesSection() {
  const [active, setActive] = useState<number | null>(features[0].id); // null = all collapsed

  return (
    <section className="bg-slate-50 py-16 lg:py-24">
      {/* grid-cols-12 + gap-24 meant 11 gaps × 96px = 1056px of gap, more than the
          content box at ~1100px — every track collapsed and this column overflowed. */}
      <div className={cn(KONTEN_SECTION, "grid grid-cols-1 gap-12 lg:grid-cols-[5fr_7fr] lg:gap-12")}>
        <div className="min-w-0">
          <div className="flex flex-col gap-10 rounded-[32px] bg-gradient-to-br from-brand-950 to-brand-800 p-8 text-[#f0f0f0] lg:sticky lg:top-32">
            <Fuel className="h-14 w-14" strokeWidth={1.5} aria-hidden />
            <div>
              <h2 className="text-3xl font-bold">{product.name}</h2>
              <p className="mt-2 font-medium text-brand-300">{product.tagline}</p>
              <p className="mt-4 text-sm text-slate-300">{product.description}</p>
              <Link
                href="/dashboard"
                className="mt-6 inline-block rounded-full bg-[#f0f0f0] px-6 py-3 text-sm font-semibold text-brand-950 hover:bg-brand-100"
              >
                Buka Demo Dashboard
              </Link>
            </div>
          </div>
        </div>
        <div className="min-w-0">
          <FadeUp>
            <SectionBadge number="03" label="Fitur" />
            <h2 className="mb-8 mt-6 text-3xl font-bold md:text-5xl">Fitur Utama</h2>
          </FadeUp>
          <div className="border-t border-slate-200">
            {features.map((f, i) => {
              const isOpen = active === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActive(isOpen ? null : f.id)}
                  aria-expanded={isOpen}
                  className="group block w-full border-b border-slate-200 py-8 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-[#f0f0f0]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="flex-1 text-xl font-semibold">
                      <f.icon className="mr-2 inline h-5 w-5 align-[-0.15em]" aria-hidden />
                      {f.title}
                    </h3>
                    <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:rotate-45" aria-hidden />
                  </div>
                  <div className="accordion-content" data-open={isOpen}>
                    <div className="overflow-hidden">
                      <p className="pl-14 pt-4 text-slate-600">{f.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
