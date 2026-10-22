"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";

// Scroll-expansion hero: a small media card sits over a background picture, then grows to fill the screen as the
// visitor scrolls, while the title splits apart to the left and right.
//
// Adapted from the original 21st.dev component. The original captured the window's wheel/touch events and froze the
// page (preventDefault + scrollTo(0, 0)) until the card was fully open, which only works when it is the whole page.
// Here the progress follows the page's own scroll through a tall section with a sticky stage, so the section can live
// in the middle of a page and the visitor never gets trapped.

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  /** Optional picture behind the card. Without it, an animated green gradient is used. */
  bgImageSrc?: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  /** Shown below the stage once the card is fully open. */
  children?: ReactNode;
}

// Green gradient base with a few soft blobs drifting slowly across it, so the backdrop is alive without being busy.
const BLOBS = [
  { color: "#6aa84f", size: "55vmax", from: ["-10%", "-5%"], to: ["35%", "25%"], duration: 14 },
  { color: "#2f7d32", size: "50vmax", from: ["60%", "5%"], to: ["30%", "40%"], duration: 17 },
  { color: "#a8d98a", size: "42vmax", from: ["20%", "60%"], to: ["65%", "35%"], duration: 20 },
  { color: "#0f5132", size: "48vmax", from: ["70%", "65%"], to: ["10%", "55%"], duration: 16 },
];

function GreenGradient({ animated }: { animated: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#12260a] via-[#1f5a2a] to-[#7fc16a]" aria-hidden="true">
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-60 blur-3xl"
          style={{ width: b.size, height: b.size, background: b.color, left: b.from[0], top: b.from[1] }}
          animate={animated ? { left: [b.from[0], b.to[0], b.from[0]], top: [b.from[1], b.to[1], b.from[1]] } : undefined}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [viewport, setViewport] = useState({ w: 1280, h: 720 });

  // 0 at the top of the section, 1 once the sticky stage is about to leave. The card finishes opening at 70%,
  // and the remaining scroll holds it fully open for a moment.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setScrollProgress(Math.min(1, Math.max(0, v / 0.7))));

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Only play while on screen, so the big file is not decoded for nothing.
  useEffect(() => {
    const el = videoRef.current;
    const host = sectionRef.current;
    if (!el || !host) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => undefined);
      else el.pause();
    });
    io.observe(host);
    return () => io.disconnect();
  }, [mediaType]);

  const progress = reduceMotion ? 1 : scrollProgress;
  // The card opens to the video's own 16:9 shape, as large as the screen allows, so the picture (and the captions
  // burned into it) is never cropped once fully open. Starts as the small portrait card.
  // The fixed navbar covers the top ~100px, so the open card must sit in the space below it, not behind it.
  const NAV_CLEARANCE = isMobile ? 84 : 112;
  const BOTTOM_GAP = 20;
  const availH = viewport.h - NAV_CLEARANCE - BOTTOM_GAP;
  const endW = Math.min(viewport.w * 0.95, availH * (16 / 9));
  const endH = endW * (9 / 16);
  const mediaWidth = 300 + progress * (endW - 300);
  const mediaHeight = 400 + progress * (endH - 400);
  // Centre of the card: screen centre while small, centre of the free area under the navbar once open.
  const mediaCenterY = viewport.h / 2 + progress * (NAV_CLEARANCE + availH / 2 - viewport.h / 2);
  const textTranslateX = progress * (isMobile ? 180 : 150);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <>
      <section ref={sectionRef} className="relative h-[260vh] bg-brand-950">
        <div className="sticky top-0 h-[100dvh] overflow-hidden">
          <motion.div className="absolute inset-0 z-0" animate={{ opacity: 1 - progress }} transition={{ duration: 0.1 }}>
            {bgImageSrc ? (
              <Image src={bgImageSrc} alt="" aria-hidden="true" fill sizes="100vw" className="object-cover object-center" />
            ) : (
              <GreenGradient animated={!reduceMotion} />
            )}
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
            <div
              className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-2xl"
              style={{
                width: `${mediaWidth}px`,
                height: `${mediaHeight}px`,
                top: `${mediaCenterY}px`,
                boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="pointer-events-none relative h-full w-full">
                {mediaType === "video" ? (
                  <video
                    ref={videoRef}
                    src={mediaSrc}
                    poster={posterSrc}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full rounded-2xl object-cover"
                    controls={false}
                    disablePictureInPicture
                    disableRemotePlayback
                  />
                ) : (
                  <Image src={mediaSrc} alt={title || ""} width={1280} height={720} className="h-full w-full rounded-2xl object-cover" />
                )}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-black/30"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 0.5 - progress * 0.3 }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              <div className="relative z-10 mt-4 flex flex-col items-center text-center">
                {date && (
                  <p className="text-xl text-white md:text-2xl" style={{ transform: `translateX(-${textTranslateX}vw)` }}>
                    {date}
                  </p>
                )}
                {scrollToExpand && (
                  <p className="font-medium text-white/90" style={{ transform: `translateX(${textTranslateX}vw)` }}>
                    {scrollToExpand}
                  </p>
                )}
              </div>
            </div>

            <div className={`relative z-10 flex w-full flex-col items-center justify-center gap-4 text-center ${textBlend ? "mix-blend-difference" : "mix-blend-normal"}`}>
              <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl" style={{ transform: `translateX(-${textTranslateX}vw)` }}>
                {firstWord}
              </h2>
              <h2 className="text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl" style={{ transform: `translateX(${textTranslateX}vw)` }}>
                {restOfTitle}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {children && <div className="bg-brand-950 px-6 pb-20 pt-4 text-[#f0f0f0] md:px-16 lg:pb-28">{children}</div>}
    </>
  );
};

export default ScrollExpandMedia;
