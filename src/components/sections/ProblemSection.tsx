"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import SectionBadge from "@/components/sections/SectionBadge";
import FadeUp from "@/components/motion/FadeUp";
import ScrollHint from "@/components/motion/ScrollHint";
import { problems } from "@/lib/data/problems";
import { cn } from "@/lib/utils";

type Problem = (typeof problems)[number];

function ProblemCard({ p }: { p: Problem }) {
  return (
    <div
      className="relative flex min-h-[24rem] flex-col justify-between overflow-hidden rounded-lg bg-cover bg-center p-6 pb-8 text-white lg:h-[min(500px,50vh)]"
      style={{ backgroundImage: `url(${p.image})` }}
    >
      <p.icon className="relative h-14 w-14" strokeWidth={1.5} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="relative">
        <h3 className="text-xl font-semibold">{p.title}</h3>
        <p className="mt-2 text-sm text-slate-200">{p.description}</p>
      </div>
    </div>
  );
}

// Scroll timeline while the section is pinned (progress 0..1 spans PIN_VH of scrolling):
// empty -> scroll -> card 1 -> scroll -> card 2 -> scroll -> card 3 -> hold -> release.
// Everything is measured in scroll distance, not screen position: each card slides in over CARD_SPAN of the
// timeline (CARD_SPAN * PIN_VH of scrolling), and cards begin CARD_STEP apart, leaving a scroll gap between them.
const PIN_VH = 300;
const CARD_START = 0;
const CARD_STEP = 0.3;
const CARD_SPAN = 0.2;

function RevealCard({ p, i, progress }: { p: Problem; i: number; progress: MotionValue<number> }) {
  const start = CARD_START + i * CARD_STEP;
  const range = [start, start + CARD_SPAN];
  // No fade: the card slides up from below the screen and then stays stuck in place.
  const y = useTransform(progress, range, ["100vh", "0vh"]);
  return (
    <motion.div style={{ y }} className="lg:flex-1">
      <ProblemCard p={p} />
    </motion.div>
  );
}

export default function ProblemSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [desktop, setDesktop] = useState(false); // false on first render so SSR/hydration match
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Hint is visible when the section pins, and is gone by the time the first card starts entering.
  const hintOpacity = useTransform(scrollYProgress, [0, CARD_START], [1, 0]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Pin + scroll-driven reveal only on desktop; smaller screens and reduced motion get a static stack.
  const pinned = desktop && !reduceMotion;

  return (
    <section
      ref={ref}
      id="masalah"
      className={cn("scroll-mt-24 bg-white", !pinned && "py-16 lg:py-24")}
      style={pinned ? { height: `${100 + PIN_VH}vh` } : undefined}
    >
      <div
        className={cn(
          "mx-auto max-w-[95%] px-4 md:px-6 lg:max-w-[92%] xl:max-w-[1400px]",
          pinned && "sticky top-0 flex h-screen flex-col justify-center pb-16 pt-24"
        )}
      >
        {/* Heading is plain (no fade) while pinned; the static layout keeps the usual scroll-in. */}
        {(() => {
          const heading = (
            <>
              <SectionBadge number="04" label="Masalah" />
              <h2 className="mt-6 max-w-3xl text-3xl font-bold md:text-5xl">Masalah yang Kami Selesaikan</h2>
            </>
          );
          return pinned ? <div>{heading}</div> : <FadeUp>{heading}</FadeUp>;
        })()}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row">
          {problems.map((p, i) =>
            pinned ? (
              <RevealCard key={p.id} p={p} i={i} progress={scrollYProgress} />
            ) : (
              <FadeUp key={p.id} delay={i * 0.1} className="lg:flex-1">
                <ProblemCard p={p} />
              </FadeUp>
            )
          )}
        </div>
        {pinned && <ScrollHint dark opacity={hintOpacity} className="absolute bottom-4 left-1/2 -translate-x-1/2" />}
      </div>
    </section>
  );
}
