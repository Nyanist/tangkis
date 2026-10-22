"use client";

import Link from "next/link";
import KineticGrid from "@/components/ui/kinetic-grid";
import FadeUp from "@/components/motion/FadeUp";
import { useLang, type L } from "@/lib/i18n";

// Who the dashboard is for: one card per role, from the field up. Each card is problem (001), what TANGKIS shows (002), link (003).
const ROLES: { role: L; problem: L; solution: L; cta: L; href: string }[] = [
  {
    role: { id: "Teknisi Genset", en: "Generator Technician" },
    problem: {
      id: "Cek bahan bakar masih manual dan bergantung pada ingatan: kapan terakhir diisi, apakah tangki sudah lama tidak disentuh.",
      en: "Fuel checks are still manual and rely on memory: when it was last filled, whether the tank has sat untouched for long.",
    },
    solution: {
      id: "Setiap tangki menampilkan kadar air, suhu, dan hari sejak pengisian dalam satu layar, lengkap dengan status hijau, kuning, atau merah.",
      en: "Every tank shows water content, temperature, and days since refill on one screen, with a green, yellow, or red status.",
    },
    cta: { id: "Lihat status tangki", en: "See tank status" },
    href: "/dashboard",
  },
  {
    role: { id: "Manajer Fasilitas", en: "Facility Manager" },
    problem: {
      id: "Kondisi tangki di banyak gedung atau banyak genset tersebar di catatan teknisi dan laporan berkala.",
      en: "Tank conditions across many buildings or generators are scattered over technician notes and periodic reports.",
    },
    solution: {
      id: "Semua tangki diurutkan berdasarkan tingkat risiko, jadi yang perlu ditangani lebih dulu langsung terlihat.",
      en: "All tanks are ranked by risk, so the ones that need attention first stand out right away.",
    },
    cta: { id: "Lihat daftar tangki", en: "See tank list" },
    href: "/dashboard",
  },
  {
    role: { id: "Manajer K3 dan Risiko", en: "HSE and Risk Manager" },
    problem: {
      id: "Bahan bakar yang menurun kualitasnya baru ketahuan saat genset gagal start ketika dibutuhkan.",
      en: "Fuel that has degraded is only discovered when the generator fails to start at the moment it is needed.",
    },
    solution: {
      id: "Skor risiko dihitung dengan rumus yang jelas dan bisa diaudit, bukan penilaian subjektif, sehingga dasar keputusannya bisa dijelaskan.",
      en: "The risk score follows a clear, auditable formula instead of a subjective judgement, so the basis for a decision can be explained.",
    },
    cta: { id: "Lihat skor risiko", en: "See risk score" },
    href: "/dashboard",
  },
  {
    role: { id: "Direksi atau C-Level", en: "Executives or C-Level" },
    problem: {
      id: "Sulit menjawab \u201capakah gedung kita siap kalau listrik padam?\u201d tanpa menunggu laporan dari bawah.",
      en: "It is hard to answer \u201cis our building ready if the power goes out?\u201d without waiting for reports from below.",
    },
    solution: {
      id: "Ringkasan kesiapan semua lokasi dalam satu halaman, dengan laporan yang bisa dibuat otomatis oleh AI dari data yang sudah ada.",
      en: "A readiness summary of every location on one page, with reports the AI can generate automatically from existing data.",
    },
    cta: { id: "Lihat ringkasan kesiapan", en: "See readiness summary" },
    href: "/dashboard",
  },
  {
    role: { id: "Pemilik atau Pengelola Gedung", en: "Building Owner or Manager" },
    problem: {
      id: "Biaya gangguan listrik dan genset gagal siaga baru terasa setelah kejadian.",
      en: "The cost of power disruptions and a standby generator that fails is only felt after the event.",
    },
    solution: {
      id: "Simulasi \u201cbagaimana jika\u201d membantu menimbang kapan perlu isi ulang atau pembersihan tangki, sebelum masalah muncul.",
      en: "\u201cWhat if\u201d simulations help weigh when a refill or tank cleaning is needed, before a problem appears.",
    },
    cta: { id: "Lihat simulasi", en: "See simulation" },
    href: "/dashboard",
  },
];

export default function InteractiveSection() {
  const { t } = useLang();

  return (
    <KineticGrid className="min-h-0">
      <section className="py-14 lg:py-16">
        <FadeUp>
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-[#f0f0f0] sm:text-5xl">
              {t("Dibangun untuk orang-orang yang menjaga genset tetap siap", "Built for the people who keep generators ready")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-[#f0f0f0]/55 sm:text-lg">
              {t(
                "Posisinya berbeda, tapi semua melihat kondisi bahan bakar yang sama. Setiap peran mendapat tampilan yang ia butuhkan.",
                "The roles differ, but everyone sees the same fuel condition. Each role gets the view it needs."
              )}
            </p>
          </div>
        </FadeUp>

        {/* Cards drift right to left on their own and pause under the pointer. The track holds two identical halves and
            slides by exactly one half, so the loop never jumps; the second half is hidden from assistive tech. With
            reduced motion the drift stops and the row scrolls by hand instead. */}
        <div
          className="group mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] motion-reduce:overflow-x-auto"
          role="region"
          aria-label={t("Peran pengguna", "User roles")}
        >
          <div className="flex w-max animate-roles-drift group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 gap-5 pr-5">
                {ROLES.map((r) => (
                  <li
                    key={r.role.en}
                    className="flex w-[84vw] max-w-[380px] shrink-0 flex-col rounded-3xl border border-white/15 bg-[#0d1d08] p-7 shadow-xl sm:w-[380px]"
                  >
                    <h3 className="text-xl font-semibold text-white">{t(r.role)}</h3>
                    <ol className="mt-5 flex-1 divide-y divide-white/10 border-t border-white/10 text-base leading-relaxed">
                      <li className="flex gap-3 py-4 text-slate-300">
                        <span>{t(r.problem)}</span>
                      </li>
                      <li className="flex gap-3 py-4 font-medium text-white">
                        <span>{t(r.solution)}</span>
                      </li>
                      <li className="flex gap-3 py-4">
                        <Link
                          href={r.href}
                          tabIndex={copy === 1 ? -1 : undefined}
                          className="font-mono text-xs uppercase tracking-[0.18em] text-brand-300 transition-colors hover:text-[#f0f0f0]"
                        >
                          {t(r.cta)}
                        </Link>
                      </li>
                    </ol>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>
    </KineticGrid>
  );
}
