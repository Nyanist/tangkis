"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import FadeUp from "@/components/motion/FadeUp";
import { team } from "@/lib/data/team";
import { cn, KONTEN_SECTION } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

// Face position of each team member, as % of the CROPPED display box below (not the raw
// /foto-tim.webp, which has ~39% of blank transparent headroom above the heads — the box
// keeps only the bottom 1600 of its 2238px height, via object-cover + object-bottom).
const FACE_POSITION: Record<number, { x: number; y: number }> = {
  1: { x: 20, y: 29 },
  2: { x: 38, y: 29 },
  3: { x: 53, y: 29 },
  4: { x: 69, y: 29 },
  5: { x: 87, y: 29 },
};

const STAGGER = 0.18;

export default function TeamSection() {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();
  return (
    <section className="overflow-hidden bg-[#f0f0f0] pt-16 lg:pt-24">
      <div className={KONTEN_SECTION}>
        <FadeUp className="flex flex-col items-center text-center">
          <h2 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-slate-950 md:text-6xl">
            {t("Kenali para pemikir kreatif di balik keberhasilan kami", "Meet the creative minds behind our success")}
          </h2>
        </FadeUp>

        {/* Space for the labels that stack above the heads on lg+ */}
        <div className="mt-10 lg:mt-36">
          <div className="relative mx-auto w-full lg:w-[80%] lg:-translate-x-[2%]" style={{ aspectRatio: "3819 / 1600" }}>
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px 0px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Image src="/foto-tim.webp" alt={t("Tim TANGKIS", "TANGKIS team")} fill className="object-cover object-bottom" />
              </motion.div>
            </div>

            {/* lg+: tags hang above each head — spring in one by one on scroll, then float gently */}
            <div className="pointer-events-none hidden lg:block">
              {team.map((m, i) => {
                const pos = FACE_POSITION[m.id];
                if (!pos) return null;
                const tilt = i % 2 === 0 ? -4 : 4;
                return (
                  <div
                    key={m.id}
                    className="absolute -translate-x-1/2"
                    style={{ left: `${pos.x}%`, bottom: `${100 - (pos.y - 17)}%`, width: "14.5%" }}
                  >
                    <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 40, scale: 0.7, rotate: tilt }}
                      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: tilt / 4 }}
                      viewport={{ once: true, margin: "-100px 0px" }}
                      transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.5 + i * STAGGER }}
                    >
                      <motion.div
                        className="pointer-events-auto w-full"
                        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                        transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                        whileHover={{ scale: 1.07, rotate: 0 }}
                      >
                        <TeamLabel name={m.name} role={m.role} major={t(m.bio)} compact />
                      </motion.div>

                      {/* dashed connector draws down, ending in a pulsing node on the head */}
                      <motion.div
                        className="h-6 w-0 origin-top border-l-2 border-dashed border-brand-700"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, margin: "-100px 0px" }}
                        transition={{ duration: 0.4, delay: 0.8 + i * STAGGER, ease: "easeOut" }}
                      />
                      <motion.span
                        className="relative -mt-0.5 flex h-3 w-3"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, margin: "-100px 0px" }}
                        transition={{ type: "spring", delay: 1.1 + i * STAGGER }}
                      >
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60" />
                        <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-brand-700" />
                      </motion.span>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* < lg: numbered pins over each head; the list below uses the same numbers. The in-view margins only trim
                top and bottom: a sideways margin hid the pin nearest the edge (no. 5) on narrow phones. */}
            <div className="pointer-events-none lg:hidden">
              {team.map((m, i) => {
                const pos = FACE_POSITION[m.id];
                if (!pos) return null;
                return (
                  <motion.span
                    key={m.id}
                    className="absolute flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-brand-700 text-[11px] font-bold text-white shadow-md"
                    style={{ left: `${pos.x}%`, top: `${pos.y - 24}%` }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-60px 0px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.4 + i * 0.12 }}
                  >
                    {i + 1}
                  </motion.span>
                );
              })}
            </div>
          </div>

          {/* < lg: a tidy numbered list under the photo, left-aligned so names scan easily */}
          <ol className="mx-auto mt-8 max-w-md divide-y divide-brand-700/10 pb-12 lg:hidden">
            {team.map((m, i) => (
              <motion.li
                key={m.id}
                className="flex items-center gap-4 py-4"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px 0px" }}
                transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-base font-bold leading-tight text-brand-950">{m.name}</p>
                  <p className="mt-0.5 text-sm font-semibold leading-tight text-brand-700">{m.role}</p>
                  <p className="mt-0.5 text-xs leading-tight text-slate-500">{t(m.bio)}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TeamLabel({ name, role, major, compact }: { name: string; role: string; major: string; compact?: boolean }) {
  return (
    <div className="text-center">
      <p className={cn("font-bold leading-tight text-brand-950", compact ? "text-[13px] xl:text-base" : "text-base")}>{name}</p>
      <p className={cn("mt-1 font-semibold leading-tight text-brand-700", compact ? "text-[11px] xl:text-[13px]" : "text-sm")}>{role}</p>
      <p className={cn("mt-1 leading-tight text-slate-500", compact ? "text-[11px] xl:text-xs" : "text-xs")}>{major}</p>
    </div>
  );
}
