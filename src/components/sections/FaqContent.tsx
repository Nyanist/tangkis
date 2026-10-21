"use client";
import Link from "next/link";
import { Mail } from "lucide-react";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { KONTEN_SECTION } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { mailtoTangkis } from "@/lib/mailto";

export default function FaqContent() {
  const { t, lang } = useLang();

  return (
    <div className={KONTEN_SECTION}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">FAQ</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-brand-950 md:text-5xl">
          {t("Pertanyaan yang sering diajukan", "Frequently asked questions")}
        </h1>
        <p className="mt-4 font-description text-[#5A6B7B]">
          {t(
            "Jawaban singkat seputar TANGKIS, cara mendapatkan akses, dan cara menghubungi kami.",
            "Quick answers about TANGKIS, how to get access, and how to reach us."
          )}
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-3xl">
        <FaqAccordion />

        <div className="mt-12 flex flex-col gap-5 rounded-3xl bg-brand-50 p-6 md:flex-row md:items-center md:justify-between md:px-9 md:py-8">
          <div>
            <h2 className="text-lg font-bold text-brand-950">
              {t("Belum menemukan jawabannya?", "Still cannot find your answer?")}
            </h2>
            <p className="mt-1 font-description text-sm text-[#5A6B7B]">
              {t("Tim kami siap membantu lewat email atau Instagram.", "Our team is ready to help via email or Instagram.")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={mailtoTangkis(lang)}
              className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email
            </a>
            <Link
              href="https://instagram.com/tangkis.tech"
              className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-5 py-3 text-sm font-semibold text-brand-950 transition-colors hover:bg-brand-50"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
