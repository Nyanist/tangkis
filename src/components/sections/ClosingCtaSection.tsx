"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";

const VIEWPORT = { once: true, margin: "-120px" } as const;

// Starts on the Team section's #f0f0f0 and eases through greens down to brand-950 (rgb 18,38,10),
// which is the colour of the contact section below — no visible seam on either side.
const BG = {
  backgroundImage:
    "linear-gradient(to bottom, #f0f0f0 0%, #dcebd5 10%, #a9cf98 22%, #5f9a48 38%, #2f6a1c 55%, #1b4010 75%, #12260a 100%)",
} as const;

export default function ClosingCtaSection() {
  const { t } = useLang();
  return (
    <section
      className="relative flex min-h-[120dvh] flex-col items-center justify-end overflow-hidden px-6 pb-28 pt-40 text-center text-white md:pb-36"
      style={BG}
    >
      {/* Substation photo, greyscale and very faint, fading in from the middle so the top stays clean */}
      <Image
        src="/about/hero-power.jpg"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className="object-cover opacity-[0.14] mix-blend-luminosity"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 25%, #000 65%, #000 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 25%, #000 65%, #000 90%, transparent)",
        }}
      />

      <div className="relative w-full max-w-6xl">
        <div className="overflow-hidden pb-3">
          <motion.h2
            className="font-serif text-[clamp(2.75rem,0.75rem+8vw,7.5rem)] font-black leading-[1] tracking-[-0.045em]"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("Siaga sebelum", "Ready before")}
          </motion.h2>
        </div>

        <motion.p
          className="font-serif text-[clamp(2.75rem,0.75rem+8vw,7.5rem)] font-extrabold italic leading-[1] tracking-[-0.04em] text-white/30"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
        >
          {t("pemadaman terjadi.", "the lights go out.")}
        </motion.p>

        <motion.p
          className="mx-auto mt-10 max-w-xl font-description text-lg font-semibold text-white md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          {t(
            "Pantau kualitas bahan bakar genset Anda secara real-time. Satu dasbor, nol titik buta.",
            "Monitor your generator's fuel quality in real time. One dashboard, zero blind spots."
          )}
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-3 rounded-full bg-[#f0f0f0] py-4 pl-8 pr-5 text-base font-semibold text-brand-950 transition-colors duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {t("Lihat demo dashboard", "View dashboard demo")}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-950 text-white transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
