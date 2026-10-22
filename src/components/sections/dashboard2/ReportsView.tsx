"use client";
import { Download } from "lucide-react";
import { TANGKI, TREN_PER_TANGKI } from "@/lib/data/dashboard";
import { useNow } from "@/lib/useNow";
import { displayInfo } from "@/lib/data/dashboard2";
import { useLang } from "@/lib/i18n";
import { LABEL_STATUS } from "@/lib/data/dashboardI18n";
import { downloadCsv } from "@/lib/downloadCsv";
import { ViewHeading } from "./DashboardShell";

export default function ReportsView() {
  const { t } = useLang();
  const now = useNow();
  const statusLabel = (s: string) => t(LABEL_STATUS[s]);

  const reports = [
    {
      title: t("Ringkasan Kesiapan Tangki", "Tank Readiness Summary"),
      desc: t("Status, kadar air, suhu, dan hari sejak pengisian untuk semua tangki.", "Status, water content, temperature, and days since refill for every tank."),
      period: t("Per pembaruan terakhir", "As of last update"),
      run: () =>
        downloadCsv(
          "tangkis-ringkasan-kesiapan.csv",
          [t("Kode", "Code"), t("Lokasi", "Location"), t("Kadar Air (ppm)", "Water (ppm)"), t("Suhu (°C)", "Temp (°C)"), t("Hari Sejak Pengisian", "Days Since Refill"), "Status"],
          TANGKI.map((tk) => [displayInfo(tk).kode, displayInfo(tk).siteLabel, tk.airPpm, tk.suhuC, tk.hari, statusLabel(tk.status)])
        ),
    },
    {
      title: t("Tren Kadar Air Bulanan", "Monthly Water Content Trend"),
      desc: t("Rata-rata kadar air tiap tangki per bulan, untuk melihat tangki yang memburuk.", "Average water content per tank per month, to spot tanks getting worse."),
      period: t("April sampai September 2026", "April to September 2026"),
      run: () => {
        const bulan = Object.values(TREN_PER_TANGKI)[0]?.bulan ?? [];
        downloadCsv(
          "tangkis-tren-kadar-air.csv",
          [t("Kode", "Code"), ...bulan],
          TANGKI.map((tk) => [displayInfo(tk).kode, ...(TREN_PER_TANGKI[tk.kode]?.ppm ?? [])])
        );
      },
    },
    {
      title: t("Daftar Tindak Lanjut", "Follow-up List"),
      desc: t("Tangki berstatus kuning dan kritis, diurutkan dari yang paling mendesak.", "Yellow and critical tanks, most urgent first."),
      period: t("Per pembaruan terakhir", "As of last update"),
      run: () =>
        downloadCsv(
          "tangkis-tindak-lanjut.csv",
          [t("Kode", "Code"), t("Lokasi", "Location"), t("Kadar Air (ppm)", "Water (ppm)"), "Status"],
          TANGKI.filter((tk) => tk.status !== "HIJAU")
            .sort((a, b) => b.airPpm - a.airPpm)
            .map((tk) => [displayInfo(tk).kode, displayInfo(tk).siteLabel, tk.airPpm, statusLabel(tk.status)])
        ),
    },
  ];

  return (
    <>
      <ViewHeading
        title={t("Laporan", "Reports")}
        subtitle={`${t("Data per", "Data as of")} ${now ?? ""}. ${t("Diunduh sebagai CSV, bisa dibuka di Excel.", "Downloads as CSV, opens in Excel.")}`}
      />
      <ul className="divide-y divide-slate-200 border-y border-slate-200">
        {reports.map((r) => (
          <li key={r.title} className="flex flex-wrap items-center gap-x-6 gap-y-2 py-5">
            <div className="min-w-0 flex-1 basis-72">
              <p className="font-semibold text-brand-950">{r.title}</p>
              <p className="mt-0.5 text-sm text-neutral-900">{r.desc}</p>
            </div>
            <span className="w-40 text-xs text-neutral-900">{r.period}</span>
            <button
              type="button"
              onClick={r.run}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-950"
            >
              <Download className="h-4 w-4" aria-hidden />
              {t("Unduh CSV", "Download CSV")}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
