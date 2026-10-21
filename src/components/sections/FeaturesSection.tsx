"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FadeUp from "@/components/motion/FadeUp";
import { features } from "@/lib/data/features";
import { product } from "@/lib/data/product";
import { useLang } from "@/lib/i18n";
import { cn, KONTEN_SECTION } from "@/lib/utils";

// Callout points on product-exploded.webp (624x468), positioned as % of the image —
// approximated by eye against the render, matching public/ref/ref-product.png's labels.
// Each callout is a black leader line from the component (x, y) out to a tail point (tx, ty), with the
// name plate attached at the tail on its `dir` side. All values are % of the 624x468 render. Tails are
// chosen so plates sit in the emptier parts of the picture and never cover each other.
type Callout = { label: string; en: string; x: number; y: number; tx: number; ty: number; dir: "left" | "right" | "top" | "bottom"; wrap?: boolean };
const PRODUCT_CALLOUTS: Callout[] = [
  { label: "Layar Status (OLED LED)", en: "Status Display (OLED LED)", x: 6, y: 62, tx: 3, ty: 74, dir: "right" },
  { label: "RTC + Kartu Memori", en: "RTC + Memory Card", x: 41, y: 52, tx: 32, ty: 40, dir: "left" },
  { label: "ESP32 + Modul Wifi", en: "ESP32 + WiFi Module", x: 44, y: 31, tx: 38, ty: 10, dir: "top" },
  // The small green board with the blue trimmer, between the main boards and the enclosure.
  { label: "DC-DC Buck Converter", en: "DC-DC Buck Converter", x: 50.6, y: 62.4, tx: 50.6, ty: 80, dir: "bottom" },
  { label: "Enclosure IP65", en: "IP65 Enclosure", x: 72, y: 19, tx: 76, ty: 6, dir: "top" },
  { label: "LED Indicator", en: "LED Indicator", x: 91, y: 49, tx: 78, ty: 41, dir: "left" },
  { label: "Probe Stainless 316 (sensor terpasang)", en: "Stainless 316 Probe (built-in sensor)", x: 71, y: 87, tx: 62, ty: 95, dir: "left", wrap: true },
];

const PLATE_ANCHOR: Record<Callout["dir"], string> = {
  left: "-translate-x-full -translate-y-1/2",
  right: "-translate-y-1/2",
  top: "-translate-x-1/2 -translate-y-full",
  bottom: "-translate-x-1/2",
};
const calloutViewport = { once: true, margin: "0px 0px -20% 0px" } as const;

export default function FeaturesSection() {
  const { t } = useLang();
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
                alt={`${t("Komponen internal", "Internal components of")} ${product.name}`}
                fill
                className="object-contain"
              />
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {PRODUCT_CALLOUTS.map((c, i) => (
                  <motion.line
                    key={c.label}
                    x1={c.x}
                    y1={c.y}
                    x2={c.tx}
                    y2={c.ty}
                    stroke="#111"
                    strokeWidth={1.25}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={calloutViewport}
                    transition={{ delay: 0.1 + i * 0.14, duration: 0.4 }}
                  />
                ))}
              </svg>
              {PRODUCT_CALLOUTS.map((c, i) => (
                <div key={c.label}>
                  {/* Pointer end of the leader line, sitting on the component */}
                  {/* Framer owns `transform` on the dot (scale), which wipes out Tailwind's -translate centering and
                      shifts it down-right of the line end. So the centering lives on a plain wrapper, the scale on the inner dot. */}
                  <span
                    className="pointer-events-none absolute z-10 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 md:h-2 md:w-2"
                    style={{ left: `${c.x}%`, top: `${c.y}%` }}
                  >
                    <motion.span
                      className="block h-full w-full rounded-full bg-[#111]"
                      initial={{ opacity: 0, scale: 0.4 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={calloutViewport}
                      transition={{ delay: 0.1 + i * 0.14, duration: 0.4 }}
                    />
                  </span>
                  {/* Plain positioning wrapper: framer owns `transform` on the inner span, which would
                      otherwise wipe out the translate classes that attach the plate to the line end. */}
                  <span
                    className={cn("pointer-events-none absolute z-20", PLATE_ANCHOR[c.dir])}
                    style={{ left: `${c.tx}%`, top: `${c.ty}%` }}
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={calloutViewport}
                      transition={{ delay: 0.25 + i * 0.14, duration: 0.45, ease: "easeOut" }}
                      className={cn(
                        "block rounded-full bg-brand-700 px-2 py-0.5 text-[10px] font-medium text-[#f0f0f0] shadow-lg md:px-3 md:py-1 md:text-xs",
                        c.wrap ? "max-w-[9.5rem] whitespace-normal text-center leading-tight md:max-w-[11rem]" : "whitespace-nowrap"
                      )}
                    >
                      {t(c.label, c.en)}
                    </motion.span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="min-w-0">
          <FadeUp>
            <div className="mb-10 grid items-end gap-5 xl:grid-cols-[auto_1fr] xl:gap-10">
              <div>
                <h2 className="text-5xl font-bold leading-[1.04] tracking-[-0.035em] text-brand-950 md:text-6xl">
                  {t("Fitur", "Key")}
                  <br />
                  <span className="text-brand-600">{t("Utama", "Features")}</span>
                </h2>
              </div>
              <p className="max-w-sm text-base leading-relaxed text-slate-600 xl:pb-2">
                {t(
                  "Lima fitur yang memantau kualitas solar, mengurutkan risiko, dan memandu tindak lanjut sebelum genset gagal.",
                  "Five features that monitor fuel quality, rank risk, and guide follow-up before the generator fails."
                )}
              </p>
            </div>
          </FadeUp>
          <div className="border-t border-slate-200">
            {features.map((f) => {
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
                    {/* icon sits in its own fixed-size tile so every title starts on the same left edge */}
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <f.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="min-w-0 flex-1 text-lg font-semibold leading-snug sm:text-xl">{t(f.title)}</h3>
                    <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:rotate-45" aria-hidden />
                  </div>
                  <div className="accordion-content" data-open={isOpen}>
                    <div className="overflow-hidden">
                      <p className="pl-[3.75rem] pr-10 pt-4 text-slate-600">{t(f.description)}</p>
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
