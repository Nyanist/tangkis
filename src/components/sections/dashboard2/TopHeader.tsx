"use client";
import { SlidersHorizontal, Clock, UserCircle2 } from "lucide-react";
import { PERUSAHAAN, WILAYAH, type Wilayah } from "@/lib/data/dashboard2";
import { useLang } from "@/lib/i18n";
import { useNow } from "@/lib/useNow";

// The company scope select filters the whole page by region. The "Filter Global" button stays decorative.
export default function TopHeader({ wilayah, onWilayahChange }: { wilayah: Wilayah | ""; onWilayahChange: (w: Wilayah | "") => void }) {
  const { t } = useLang();
  const now = useNow();
  return (
    <header className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-wide text-brand-950">TANGKIS</h1>
            <p className="text-sm text-neutral-900">{t("Pemantauan Kesiapan Bahan Bakar Genset Cadangan", "Backup Generator Fuel Readiness Monitoring")}</p>
          </div>
          <Profil className="lg:hidden" />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <select
            value={wilayah}
            onChange={(e) => onWilayahChange(e.target.value as Wilayah | "")}
            className="min-w-0 flex-1 rounded-md border border-brand-100 bg-white px-3 py-1.5 text-sm sm:flex-none"
            aria-label={t("Cakupan perusahaan", "Company scope")}
          >
            <option value="">{PERUSAHAAN} ({t("Nasional", "National")})</option>
            {WILAYAH.map((w) => <option key={w} value={w}>{PERUSAHAAN} ({w})</option>)}
          </select>
          <button type="button" className="inline-flex flex-none items-center gap-1.5 rounded-md border border-brand-100 bg-white px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            {t("Filter Global", "Global Filter")}
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-brand-100 bg-white px-3 py-1.5 text-xs font-medium text-neutral-900">
          <Clock className="h-3.5 w-3.5 flex-none text-brand-700" />
          <span className="hidden sm:inline">{t("Update Data Otomatis:", "Auto Data Update:")}</span> <time className="min-w-[11.5rem] font-semibold tabular-nums text-neutral-900">{now ?? " "}</time>
        </span>
        <Profil className="hidden lg:flex" />
      </div>
    </header>
  );
}

// Signed-in user chip. Phones show it beside the title, desktop at the end of the right column.
function Profil({ className }: { className?: string }) {
  const { t } = useLang();
  return (
    <span className={`flex flex-none items-center gap-2 text-sm ${className ?? ""}`}>
      <UserCircle2 className="h-8 w-8 text-brand-700" />
      <span className="leading-tight">
        <span className="block font-semibold text-neutral-900">{t("Admin Darurat", "Emergency Admin")}</span>
        <span className="block text-xs text-neutral-900">{t("Profil", "Profile")}</span>
      </span>
    </span>
  );
}
