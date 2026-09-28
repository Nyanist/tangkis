"use client";
import Image from "next/image";
import FadeUp from "@/components/motion/FadeUp";
import SectionBadge from "@/components/sections/SectionBadge";
import { team } from "@/lib/data/team";
import { KONTEN_SECTION } from "@/lib/utils";

// Face position of each team member, as % of the CROPPED display box below (not the raw
// /foto-tim.png, which has ~39% of blank transparent headroom above the heads — the box
// keeps only the bottom 1600 of its 2238px height, via object-cover + object-bottom).
const FACE_POSITION: Record<number, { x: number; y: number }> = {
  1: { x: 20, y: 29 },
  2: { x: 38, y: 29 },
  3: { x: 53, y: 29 },
  4: { x: 69, y: 29 },
  5: { x: 87, y: 29 },
};

export default function TeamSection() {
  return (
    <section className="bg-[#f0f0f0] pt-16 lg:pt-24">
      <div className={KONTEN_SECTION}>
        <FadeUp>
          <SectionBadge number="02" label="Tim" />
          <h2 className="mt-6 max-w-3xl text-3xl font-bold md:text-5xl">Meet the Team</h2>
        </FadeUp>

        <div className="relative mx-auto w-[90%] lg:w-[80%]" style={{ aspectRatio: "3819 / 1600" }}>
          {/* overflow-hidden lives on this inner wrapper, not the outer box — so it only
              crops the photo, not the hover labels/lines that render above the outer box. */}
          <div className="absolute inset-0 overflow-hidden">
            <Image src="/foto-tim.png" alt="Tim TANGKIS" fill className="object-cover object-bottom" />
          </div>

          {team.map((m) => {
            const pos = FACE_POSITION[m.id];
            if (!pos) return null;
            return (
              <div
                key={m.id}
                className="group absolute inset-y-0 -translate-x-1/2"
                style={{ left: `${pos.x}%`, width: "16%" }}
              >
                {/* Hover hit-zone over the face */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ top: `${pos.y}%`, width: "70%", height: "31%" }}
                />

                {/* Label + dashed connector, as one stack anchored by its bottom edge just
                    above the face — so the line always touches the label, whatever its height. */}
                <div
                  className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 -translate-y-2 flex-col items-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  style={{ bottom: `${100 - (pos.y - 17)}%` }}
                >
                  <div className="w-max max-w-[42vw] rounded-xl border border-brand-700/20 bg-white/95 px-4 py-3 text-center shadow-lg backdrop-blur-sm sm:max-w-[220px]">
                    <p className="text-sm font-bold text-brand-950">{m.name}</p>
                    <p className="mt-0.5 text-xs font-semibold text-brand-700">{m.role}</p>
                    <p className="mt-1 text-xs text-slate-500">{m.bio}</p>
                  </div>
                  <div className="h-6 w-0 border-l-2 border-dashed border-brand-700" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
