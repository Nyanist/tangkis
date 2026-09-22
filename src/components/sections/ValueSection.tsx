"use client";
import FadeUp from "@/components/motion/FadeUp";
import SectionBadge from "@/components/sections/SectionBadge";
import { KONTEN_SECTION } from "@/lib/utils";

interface ValueItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

const VALUES: ValueItem[] = [
  {
    number: "01",
    title: "Selaras",
    subtitle: "Untung saat mencegah",
    description:
      "Membantu operasional dengan pencegahan proaktif. Mencegah kontaminasi dan kerusakan genset sebelum pemadaman terjadi demi efisiensi biaya maksimal.",
  },
  {
    number: "02",
    title: "Jujur",
    subtitle: "Berbasis regulasi resmi",
    description:
      "Mengacu pada standar ambang batas resmi dan SNI. Data telemetri sensor disajikan secara transparan, presisi, dan dapat dipertanggungjawabkan untuk audit keselamatan.",
  },
  {
    number: "03",
    title: "Siaga",
    subtitle: "Teruji sebelum genting",
    description:
      "Memastikan bahan bakar dan tangki genset selalu dalam kondisi prima jauh sebelum situasi darurat, menjamin kontinuitas daya kritis bagi rumah sakit, data center, dan fasilitas vital.",
  },
];

export default function ValueSection() {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-16 text-[#f0f0f0] lg:py-24">
      {/* Background ambient glow matching repo palette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/30 via-brand-950 to-brand-950"
        aria-hidden="true"
      />

      <div className={`relative ${KONTEN_SECTION}`}>
        <div className="mb-10 lg:mb-12">
          <FadeUp delay={0.1}>
            <SectionBadge number="02" label="Nilai Utama" dark />
          </FadeUp>
        </div>

        {/* 3-card layout matching reference-value.webp */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {VALUES.map((item, index) => (
            <FadeUp key={item.number} delay={0.15 + index * 0.1}>
              <div className="group relative flex min-h-[420px] flex-col justify-between rounded-[28px] border border-brand-800/40 bg-gradient-to-b from-[#14290c]/90 to-[#0e1d08]/90 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-brand-500/50 hover:from-[#17300e] hover:to-[#11240a] lg:min-h-[460px] lg:p-10">
                {/* Top content */}
                <div>
                  <div className="inline-flex w-fit items-center justify-center rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300">
                    {item.number}
                  </div>
                  <h3 className="mt-6 text-3xl font-extrabold tracking-tight text-[#f0f0f0] lg:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base font-medium text-slate-300 lg:text-lg">
                    {item.subtitle}
                  </p>
                </div>

                {/* Bottom description */}
                <div className="mt-8">
                  <p className="text-sm leading-relaxed text-slate-400 lg:text-base">
                    {item.description}
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
