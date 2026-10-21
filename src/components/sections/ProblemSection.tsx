"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import ScrollHint from "@/components/motion/ScrollHint";
import { problems } from "@/lib/data/problems";
import { cn, KONTEN_SECTION } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

// Full-screen story: the section is (n + 1) screens tall and its content is pinned, so scrolling is what advances it.
// Each problem gets its own stretch of scroll, with the photo, counter, title and text swapping at the boundaries.
const N = problems.length;
const pad = (n: number) => String(n).padStart(2, "0");

export default function ProblemSection() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.max(0, Math.min(N - 1, Math.floor(v * N))));
  });

  // Jump to a problem by scrolling to the middle of its stretch.
  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const start = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: start + ((i + 0.5) / N) * range, behavior: "smooth" });
  };

  const p = problems[active];

  return (
    <section ref={ref} id="masalah" className="relative bg-brand-950 text-[#f0f0f0]" style={{ height: `${(N + 1) * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Photos crossfade; a green-tinted scrim keeps the text readable and the section on palette. */}
        {problems.map((x, i) => (
          <motion.div
            key={x.id}
            aria-hidden="true"
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <Image src={x.image} alt="" fill sizes="100vw" priority={i === 0} className="object-cover object-right" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/65 to-brand-950/20" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-brand-950/40" aria-hidden="true" />

        <div className={cn(KONTEN_SECTION, "relative z-10 flex h-full flex-col pb-24 pt-28 lg:pl-12 xl:pl-24 2xl:pl-40")}>
          <div className="flex flex-1 flex-col justify-center">
            <p className="font-mono text-sm tracking-[0.35em] text-white/60" aria-hidden="true">
              {pad(active + 1)} <span className="px-1">/</span> {pad(N)}
            </p>

            <div aria-live="polite" className="mt-8 min-h-[16rem] max-w-2xl sm:min-h-[18rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <h2 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">{t(p.title)}</h2>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl">{t(p.description)}</p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Side dots */}
          <div className="absolute right-5 top-1/2 flex -translate-y-1/2 flex-col gap-3 md:right-8" role="tablist" aria-label={t("Masalah", "Problem")}>
            {problems.map((x, i) => (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={t(x.title)}
                onClick={() => goTo(i)}
                className={cn("h-2.5 w-2.5 rounded-full transition-all duration-300", i === active ? "scale-125 bg-white" : "bg-white/35 hover:bg-white/70")}
              />
            ))}
          </div>

          <ScrollHint dark={false} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block" />
        </div>
      </div>
    </section>
  );
}
