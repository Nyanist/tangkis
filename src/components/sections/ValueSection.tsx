"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import FadeUp from "@/components/motion/FadeUp";
import { cn, KONTEN_SECTION } from "@/lib/utils";
import { useLang, type L } from "@/lib/i18n";

interface ValueItem {
  title: L;
  subtitle: L;
  description: L;
  image: string;
  alt: L;
  credit: string;
}

// Photos are from Wikimedia Commons (free licences); credits appear as a tooltip when hovering the image.
const VALUES: ValueItem[] = [
  {
    title: { id: "Selaras", en: "Aligned" },
    subtitle: { id: "Untung saat mencegah", en: "Profit from prevention" },
    description: {
      id: "Membantu operasional dengan pencegahan proaktif. Mencegah kontaminasi dan kerusakan genset sebelum pemadaman terjadi demi efisiensi biaya maksimal.",
      en: "Supports operations through proactive prevention. Stops contamination and generator damage before an outage happens, for maximum cost efficiency.",
    },
    image: "/value-1.jpg",
    alt: { id: "Tangki bahan bakar berkarat", en: "Rusty fuel tank" },
    credit: "Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    title: { id: "Jujur", en: "Honest" },
    subtitle: { id: "Berbasis regulasi resmi", en: "Based on official regulations" },
    description: {
      id: "Mengacu pada standar ambang batas resmi dan SNI. Data telemetri sensor disajikan secara transparan, presisi, dan dapat dipertanggungjawabkan untuk audit keselamatan.",
      en: "Follows official threshold standards and SNI. Sensor telemetry data is presented transparently, precisely, and accountably for safety audits.",
    },
    image: "/value-2.jpg",
    alt: { id: "Ruang kontrol dengan banyak layar pemantau", en: "Control room with multiple monitoring screens" },
    credit: "Rubin Observatory / Wikimedia Commons, CC BY 4.0",
  },
  {
    title: { id: "Siaga", en: "Prepared" },
    subtitle: { id: "Teruji sebelum genting", en: "Tested before it is critical" },
    description: {
      id: "Memastikan bahan bakar dan tangki genset selalu dalam kondisi prima jauh sebelum situasi darurat, menjamin kontinuitas daya kritis bagi rumah sakit, data center, dan fasilitas vital.",
      en: "Keeps generator fuel and tanks in prime condition well before an emergency, ensuring critical power continuity for hospitals, data centers, and vital facilities.",
    },
    image: "/value-3.jpg",
    alt: { id: "Deretan genset diesel siap pakai", en: "Row of diesel generators ready for use" },
    credit: "Wikimedia Commons, CC BY 4.0",
  },
];

const AUTO_ADVANCE_MS = 6000;

// The picture is cut into pieces that form a canopy-generator silhouette: exhaust stack, two body panels
// (engine bay + radiator/alternator), a skid base and two wheels. x/y/w/h are fractions of the picture box;
// each piece shows the slice of the same photo that sits at its position, so together they reassemble it.
const SLICES = [
  { x: 0.15, y: 0, w: 0.09, h: 0.23, className: "rounded-t-full rounded-b-sm" }, // exhaust stack
  { x: 0.03, y: 0.22, w: 0.6, h: 0.48, className: "rounded-l-[2rem] rounded-r-lg" }, // engine bay
  { x: 0.65, y: 0.22, w: 0.32, h: 0.48, className: "rounded-r-[2rem] rounded-l-lg" }, // radiator / alternator
  { x: 0, y: 0.72, w: 1, h: 0.09, className: "rounded-md" }, // skid base
  { x: 0.14, y: 0.82, w: 0.15, h: 0.18, className: "rounded-full" }, // wheel
  { x: 0.71, y: 0.82, w: 0.15, h: 0.18, className: "rounded-full" }, // wheel
];

export default function ValueSection() {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % VALUES.length), AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [active, paused, reduceMotion]);

  const current = VALUES[active];

  return (
    <section className="bg-[radial-gradient(ellipse_at_70%_40%,#eef6e9_0%,#f8fbf6_45%,#ffffff_100%)] py-16 lg:py-28">
      <div className={KONTEN_SECTION}>
        <FadeUp>
          <h2 className="mx-auto max-w-3xl text-center text-4xl font-bold leading-[1.1] tracking-tight text-slate-950 md:text-6xl">
            {t("Tiga prinsip di balik setiap pembacaan sensor", "Three principles behind every sensor reading")}
          </h2>
        </FadeUp>

        <FadeUp delay={0.15} className="mt-10 grid grid-cols-1 items-center gap-12 lg:mt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <ol className="flex flex-col gap-6 lg:gap-8 lg:pl-12 xl:pl-20" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            {VALUES.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.title.en}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex w-full items-start gap-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700 md:gap-8"
                  >
                    <span
                      className={cn(
                        "w-10 shrink-0 pt-2 text-2xl font-extrabold tabular-nums transition-colors duration-500 md:w-14 md:pt-3 md:text-3xl",
                        isActive ? "text-brand-600" : "text-slate-400"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block font-heading font-black uppercase leading-[0.9] tracking-tight transition-colors duration-500",
                          "text-[clamp(2.5rem,1.5rem+4.5vw,5.5rem)]",
                          isActive ? "text-slate-950" : "text-slate-300 group-hover:text-slate-400"
                        )}
                      >
                        {t(item.title)}
                      </span>
                      {/* description opens under the active title (grid-rows trick animates height) */}
                      <span
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                          isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="mt-4 block text-base font-bold text-brand-700 md:text-lg">{t(item.subtitle)}</span>
                          <span className="mt-2 block max-w-lg text-base leading-relaxed text-slate-600">{t(item.description)}</span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div>
            <div tabIndex={0} className="group relative mx-auto aspect-[6/5] w-full max-w-xl outline-none" role="img" aria-label={t(current.alt)}>
              {SLICES.map((sl, si) => {
                const left = sl.x;
                return (
                  <div
                    key={si}
                    className={cn("absolute overflow-hidden bg-slate-200 shadow-[0_18px_30px_-18px_rgba(20,40,10,0.45)]", sl.className)}
                    style={{ top: `${sl.y * 100}%`, height: `${sl.h * 100}%`, left: `${left * 100}%`, width: `${sl.w * 100}%` }}
                  >
                    {/* a full-size copy of each photo, offset so this band shows its own slice of it */}
                    <div
                      className="absolute"
                      style={{
                        width: `${100 / sl.w}%`,
                        height: `${100 / sl.h}%`,
                        left: `${-(left / sl.w) * 100}%`,
                        top: `${-(sl.y / sl.h) * 100}%`,
                      }}
                    >
                      {VALUES.map((v, vi) => {
                        const on = vi === active;
                        return (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={v.image}
                            src={v.image}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out"
                            style={{
                              opacity: on ? 1 : 0,
                              transform: on ? "translateY(0) scale(1)" : "translateY(16px) scale(1.08)",
                              transitionDelay: on ? `${si * 90}ms` : "0ms",
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {/* photo credit, shown only while the picture is hovered or focused */}
              <span className="pointer-events-none absolute -bottom-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-900/90 px-3 py-1 text-[11px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                {t("Foto", "Photo")}: {current.credit}
              </span>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
