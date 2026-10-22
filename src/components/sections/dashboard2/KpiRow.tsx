"use client";
import { tangkiForSite, type Wilayah } from "@/lib/data/dashboard2";
import { computeStatusCounts } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

// Status counts as soft pills: a pale tint of the status colour, a thin border of the same hue and text in its
// darker shade, with the count in bold. The total uses neutral gray so only the three statuses carry colour.
export default function KpiRow({ wilayah, site }: { wilayah: Wilayah | ""; site: string }) {
  const { t } = useLang();
  const rows = tangkiForSite(site, wilayah);
  const { hijau, kuning, merah } = computeStatusCounts(rows);

  const pil = [
    { label: t("Total Tangki Dipantau", "Total Tanks Monitored"), value: rows.length, cls: "border-neutral-200 bg-neutral-100 text-neutral-700" },
    { label: t("Status Hijau", "Green Status"), value: hijau, cls: "border-[#2E8B57]/30 bg-[#2E8B57]/10 text-[#1F6B42]" },
    { label: t("Status Kuning", "Yellow Status"), value: kuning, cls: "border-[#E9A21B]/40 bg-[#E9A21B]/10 text-[#8A5A00]" },
    { label: t("Status Merah", "Red Status"), value: merah, cls: "border-[#D64545]/30 bg-[#D64545]/10 text-[#B83232]" },
  ];

  return (
    <ul className="mb-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap" aria-label={t("Ringkasan status tangki", "Tank status summary")}>
      {pil.map((p) => (
        <li key={p.label} className={`flex min-w-0 items-center justify-between gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold sm:inline-flex sm:justify-start sm:px-4 sm:text-sm ${p.cls}`}>
          <span className="truncate">{p.label}</span>
          <span className="font-bold tabular-nums">{p.value}</span>
        </li>
      ))}
    </ul>
  );
}
