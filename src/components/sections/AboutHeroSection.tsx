"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowDown } from "lucide-react";
import FadeUp from "@/components/motion/FadeUp";
import { useLang } from "@/lib/i18n";

interface Popup {
  src: string;
  alt: string;
}

// A segment is plain text, or a hoverable phrase that pops up a picture.
type Segment = string | { text: string; popup: Popup };

// Photos are from Wikimedia Commons (free licences); credits appear in the key-phrase popup captions.
const POPUPS = {
  sensor: { src: "/about/sensor.jpg", alt: "Ultrasonic sensor module" },
  embedded: { src: "/about/embedded.jpg", alt: "ESP32 embedded board" },
  telemetry: { src: "/about/telemetry.png", alt: "Telemetry dashboard" },
  fuel: { src: "/value-1.jpg", alt: "Fuel tank" },
  hospital: { src: "/about/hospital.jpg", alt: "Hospital building" },
  datacenter: { src: "/about/datacenter.jpg", alt: "Data center server racks" },
  building: { src: "/about/building.jpg", alt: "Commercial buildings" },
} satisfies Record<string, Popup>;

const COPY: { id: Segment[]; en: Segment[] } = {
  id: [
    "TANGKIS dirancang untuk mengeliminasi titik buta pada sistem genset darurat. Melalui integrasi ",
    { text: "sensor fisik", popup: POPUPS.sensor },
    ", ",
    { text: "embedded system", popup: POPUPS.embedded },
    ", dan ",
    { text: "telemetri real-time", popup: POPUPS.telemetry },
    ", kami memberikan visibilitas penuh atas ",
    { text: "kualitas bahan bakar", popup: POPUPS.fuel },
    " bagi pengelola ",
    { text: "rumah sakit", popup: POPUPS.hospital },
    ", ",
    { text: "pusat data", popup: POPUPS.datacenter },
    ", dan ",
    { text: "gedung komersial", popup: POPUPS.building },
    " sebelum pemadaman terjadi.",
  ],
  en: [
    "TANGKIS is designed to eliminate the blind spot in emergency generator systems. Through the integration of ",
    { text: "physical sensors", popup: POPUPS.sensor },
    ", ",
    { text: "embedded systems", popup: POPUPS.embedded },
    ", and ",
    { text: "real-time telemetry", popup: POPUPS.telemetry },
    ", we give ",
    { text: "hospital", popup: POPUPS.hospital },
    ", ",
    { text: "data center", popup: POPUPS.datacenter },
    ", and ",
    { text: "commercial building", popup: POPUPS.building },
    " operators full visibility into ",
    { text: "fuel quality", popup: POPUPS.fuel },
    " before an outage happens.",
  ],
};

interface Token {
  word: string;
  group: number | null; // index of the hoverable phrase this word belongs to
}

function tokenize(segments: Segment[]): { tokens: Token[]; popups: Popup[] } {
  const tokens: Token[] = [];
  const popups: Popup[] = [];
  for (const seg of segments) {
    const isKey = typeof seg !== "string";
    const text = isKey ? seg.text : seg;
    const group = isKey ? popups.push(seg.popup) - 1 : null;
    // keep the trailing space/punctuation attached to its word so wrapping stays natural
    for (const word of text.match(/\S+\s*|\s+/g) ?? []) tokens.push({ word, group });
  }
  return { tokens, popups };
}

const PAGE_BG = {
  backgroundImage:
    "linear-gradient(to bottom, #12260a 0, #17300e 45dvh, #2a5a17 85dvh, #8fbf7a 110dvh, #ffffff 135dvh)",
  backgroundColor: "#ffffff",
  backgroundRepeat: "no-repeat",
} as const;

export default function AboutHeroSection() {
  const { t, lang } = useLang();
  return (
    // One continuous background for hero + paragraph: deep green at the top, easing to white by
    // the time the paragraph starts, so the copy sits on a light surface and flows into the next section.
    <div style={PAGE_BG}>
      <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32 text-center text-[#f0f0f0]">
        {/* Electrical-substation photo covering the whole first screen, edge to edge. `lighten` drops its
            black night sky into the green gradient, so only the lit equipment and power lines show through. */}
        <Image
          src="/about/hero-power.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden="true"
          className="object-cover object-center opacity-50 mix-blend-lighten"
          // Fade the photo out over the last stretch of the screen, so it dissolves into the page
          // gradient instead of being cut off by the section edge.
          style={{
            maskImage: "linear-gradient(to bottom, #000 0, #000 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0, #000 60%, transparent 100%)",
          }}
        />
        {/* Dark scrim behind the copy so the photo never fights the text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_55%,rgba(8,20,5,0.75),rgba(8,20,5,0.25)_70%,transparent)]"
        />

        <div className="relative w-full max-w-6xl">
          <FadeUp delay={0.1}>
            <h1 className="bg-gradient-to-b from-white via-white/80 to-white/30 bg-clip-text text-[clamp(2.5rem,1rem+8vw,7.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-transparent">
              {t("Menghilangkan Titik Buta Genset", "Eliminating the Generator Blind Spot")}
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="mx-auto mt-8 max-w-xl font-description text-lg font-medium text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] sm:text-xl">
              {t(
                "Visibilitas penuh atas kualitas bahan bakar sebelum pemadaman terjadi.",
                "Full visibility into fuel quality before an outage happens."
              )}
            </p>
          </FadeUp>
        </div>

        <motion.div
          className="absolute bottom-10 text-slate-300"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </section>

      <RevealParagraph segments={COPY[lang === "en" ? "en" : "id"]} credit={t("Foto: Wikimedia Commons (CC BY / CC BY-SA / domain publik)", "Photo: Wikimedia Commons (CC BY / CC BY-SA / public domain)")} />
    </div>
  );
}

function RevealParagraph({ segments, credit }: { segments: Segment[]; credit: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const { tokens, popups } = tokenize(segments);

  // Consecutive tokens of one phrase share a hover wrapper (and one popup).
  const nodes: React.ReactNode[] = [];
  let i = 0;
  while (i < tokens.length) {
    const group = tokens[i].group;
    if (group === null) {
      nodes.push(<RevealWord key={i} progress={scrollYProgress} index={i} total={tokens.length} word={tokens[i].word} />);
      i++;
      continue;
    }
    const start = i;
    const words: React.ReactNode[] = [];
    while (i < tokens.length && tokens[i].group === group) {
      words.push(<RevealWord key={i} progress={scrollYProgress} index={i} total={tokens.length} word={tokens[i].word} strong />);
      i++;
    }
    nodes.push(
      <KeyPhrase key={`k${start}`} popup={popups[group]} credit={credit}>
        {words}
      </KeyPhrase>
    );
  }

  return (
    <section className="px-6 pb-24 pt-40 md:pt-56">
      <p
        ref={ref}
        className="mx-auto max-w-5xl text-2xl font-medium leading-[1.35] tracking-tight text-slate-500 sm:text-3xl md:text-5xl"
      >
        {nodes}
      </p>
    </section>
  );
}

function RevealWord({ progress, index, total, word, strong }: { progress: MotionValue<number>; index: number; total: number; word: string; strong?: boolean }) {
  const start = (index / total) * 0.85;
  const opacity = useTransform(progress, [start, start + 0.15], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={strong ? "font-bold text-slate-950" : undefined}>
      {word}
    </motion.span>
  );
}

function KeyPhrase({ popup, credit, children }: { popup: Popup; credit: string; children: React.ReactNode }) {
  return (
    <span tabIndex={0} className="group relative cursor-pointer underline decoration-slate-300 decoration-2 underline-offset-8 outline-none transition-colors hover:decoration-brand-600 focus-visible:decoration-brand-600">
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-4 w-56 origin-bottom -translate-x-1/2 translate-y-3 scale-90 rounded-2xl bg-white p-1.5 opacity-0 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:opacity-100 sm:w-72"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={popup.src} alt="" className="aspect-[4/3] w-full rounded-xl object-cover" loading="lazy" />
        <span className="block px-2 pb-1 pt-1.5 text-center text-[10px] leading-tight text-slate-400">{credit}</span>
      </span>
    </span>
  );
}
