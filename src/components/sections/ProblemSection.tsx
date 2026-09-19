"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import SectionBadge from "@/components/sections/SectionBadge";
import FadeUp from "@/components/motion/FadeUp";
import { problems } from "@/lib/data/problems";
import { cn } from "@/lib/utils";

type Problem = (typeof problems)[number];

function ProblemCard({ p }: { p: Problem }) {
  return (
    <div className="relative flex min-h-[24rem] flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br from-slate-800 to-blue-900 p-6 pb-8 text-white lg:h-[min(500px,50vh)]">
      <p.icon className="h-14 w-14" strokeWidth={1.5} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="relative">
        <h3 className="text-xl font-semibold">{p.title}</h3>
        <p className="mt-2 text-sm text-slate-200">{p.description}</p>
      </div>
    </div>
  );
}

// Each card fades/rises in over its own slice of the section's scroll progress.
function RevealCard({ p, i, progress }: { p: Problem; i: number; progress: MotionValue<number> }) {
  const start = 0.1 + i * 0.25;
  const range = [start, start + 0.2];
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [80, 0]);
  const scale = useTransform(progress, range, [0.95, 1]);
  return (
    <motion.div style={{ opacity, y, scale }} className="lg:flex-1">
      <ProblemCard p={p} />
    </motion.div>
  );
}

export default function ProblemSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [desktop, setDesktop] = useState(false); // false on first render so SSR/hydration match
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

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
      className={cn("scroll-mt-24 bg-white", pinned ? "h-[300vh]" : "py-16 lg:py-24")}
    >
      <div
        className={cn(
          "mx-auto max-w-[95%] px-4 md:px-6 lg:max-w-[92%] xl:max-w-[1400px]",
          pinned && "sticky top-0 flex h-screen flex-col justify-center pt-24"
        )}
      >
        <FadeUp>
          <SectionBadge number="04" label="Masalah" />
          <h2 className="mt-6 max-w-3xl text-3xl font-bold md:text-5xl">Masalah yang Kami Selesaikan</h2>
        </FadeUp>
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
      </div>
    </section>
  );
}
