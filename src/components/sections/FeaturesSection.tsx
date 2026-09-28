"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionBadge from "@/components/sections/SectionBadge";
import FadeUp from "@/components/motion/FadeUp";
import { features } from "@/lib/data/features";
import { product } from "@/lib/data/product";
import { cn, KONTEN_SECTION } from "@/lib/utils";

// Callout points on product-exploded.webp (624x468), positioned as % of the image —
// approximated by eye against the render, matching public/ref/ref-product.png's labels.
const PRODUCT_CALLOUTS = [
  { label: "Layar Status (OLED LED)", x: 6, y: 63 },
  { label: "RTC + Kartu Memori", x: 41, y: 50 },
  { label: "ESP32 + Modul Wifi", x: 44, y: 32 },
  { label: "DC-DC Buck Converter", x: 35, y: 64 },
  { label: "Enclosure IP65", x: 72, y: 19 },
  { label: "LED Indicator", x: 91, y: 49 },
  { label: "Probe Stainless 316 (built in sensor)", x: 72, y: 88 },
];

export default function FeaturesSection() {
  const [active, setActive] = useState<number | null>(null); // null = all collapsed

  return (
    <section className="bg-slate-50 py-16 lg:py-24">
      {/* grid-cols-12 + gap-24 meant 11 gaps × 96px = 1056px of gap, more than the
          content box at ~1100px — every track collapsed and this column overflowed. */}
      <div className={cn(KONTEN_SECTION, "grid grid-cols-1 gap-12 lg:grid-cols-[40fr_60fr] lg:gap-12")}>
        <div className="min-w-0">
          <div className="rounded-[32px] bg-transparent p-2 lg:sticky lg:top-32">
            <div className="relative aspect-[624/468] w-full">
              <Image
                src={product.productImage}
                alt={`Komponen internal ${product.name}`}
                fill
                className="object-contain"
              />
              {PRODUCT_CALLOUTS.map((c) => (
                <div
                  key={c.label}
                  className="group absolute z-0 -translate-x-1/2 -translate-y-1/2 hover:z-30"
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                >
                  <span className="relative z-10 block h-4 w-4 cursor-default rounded-full border-[0.5px] border-brand-dark bg-brand-600/85 shadow-sm transition-transform duration-200 group-hover:scale-150 group-hover:bg-brand-600" />
                  <span
                    className={cn(
                      "pointer-events-none absolute bottom-full z-20 mb-2 translate-y-1 whitespace-nowrap rounded-full bg-brand-700 px-3 py-1 text-xs font-medium text-[#f0f0f0] opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100",
                      c.x < 15 ? "left-0" : c.x > 85 ? "right-0" : "left-1/2 -translate-x-1/2"
                    )}
                  >
                    {c.label}
                  </span>
                </div>
              ))}
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
                    {/* <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-[#f0f0f0]">
                      {String(i + 1).padStart(2, "0")}
                    </span> */}
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
