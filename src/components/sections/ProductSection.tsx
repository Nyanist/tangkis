"use client";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { product } from "@/lib/data/product";
import { useLang } from "@/lib/i18n";
import { cn, KONTEN_SECTION } from "@/lib/utils";

export default function ProductSection() {
  const { t } = useLang();
  return (
    <section
      id="produk"
      className="relative flex items-center justify-center overflow-hidden bg-brand-950 py-14 text-[#f0f0f0] lg:py-20"
    >
      <div
        className="absolute inset-0 flex items-center whitespace-nowrap text-[8rem] font-extrabold tracking-widest text-white/5 lg:text-[12rem]"
        aria-hidden
      >
        <div className="animate-marquee flex shrink-0">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} className="px-8">{product.name}</span>
          ))}
        </div>
      </div>
      <div className={cn(KONTEN_SECTION, "relative flex flex-col items-center")}>
        <h2 className="max-w-4xl text-center text-3xl font-bold leading-tight md:text-5xl">
          {t(product.tagline)}
        </h2>
        <Link
          href="https://8eh.link/TontonTangkisSekarang"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold backdrop-blur-sm hover:bg-white/20"
        >
          <PlayCircle className="h-5 w-5" aria-hidden />
          {t("Video", "Video")}
        </Link>
        {/* Google Drive-hosted animation — embedded via its /preview iframe, no local copy to maintain. */}
        {/* <iframe
          src="https://drive.google.com/file/d/1Nzw4G71Bcq4auuIf7-SXmjvvVcY8daFd/preview"
          className="mt-12 aspect-square w-full max-w-xl rounded-2xl"
          allow="autoplay"
          allowFullScreen
          title={`Animasi ${product.name}`}
        /> */}
      </div>
    </section>
  );
}
