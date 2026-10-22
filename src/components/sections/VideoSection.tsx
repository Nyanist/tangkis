"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeUp from "@/components/motion/FadeUp";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { useLang } from "@/lib/i18n";

// Product animation right after the Problem story. The Problem section says what goes wrong; this one only shows the
// product doing its job, so the copy stays short and points to the demo instead of re-explaining the issue.
export default function VideoSection() {
  const { t } = useLang();
  return (
    <div id="video" className="scroll-mt-24">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/product-animation.mp4"
        title={t("Lihat Langsung Cara Kerjanya", "See It Work Up Close")}
      >
        <FadeUp className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="text-lg leading-relaxed text-white/80 md:text-xl">
            {t(
              "Sensor membaca, kotak kontrol memutuskan, dashboard menampilkan hasilnya. Semua bisa dicoba langsung dengan data simulasi.",
              "The sensor reads, the control box decides, the dashboard shows the result. All of it can be tried right now with simulated data."
            )}
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-brand-950 transition-colors hover:bg-brand-100"
          >
            {t("Coba Demo Dashboard", "Try the Dashboard Demo")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </FadeUp>
      </ScrollExpandMedia>
    </div>
  );
}
