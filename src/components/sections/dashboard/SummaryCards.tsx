"use client";
import { Fuel, CheckCircle, AlertTriangle, OctagonAlert } from "lucide-react";
import { TANGKI } from "@/lib/data/dashboard";
import { cn, computeStatusCounts } from "@/lib/utils";

export default function SummaryCards() {
  const total = TANGKI.length;
  const { hijau, kuning, merah } = computeStatusCounts(TANGKI);
  const lokasi = new Set(TANGKI.map((t) => t.lokasi.split(" — ")[0])).size;

  const segmen = [
    { label: "Total Tangki", value: total, micro: `di ${lokasi} lokasi`, icon: Fuel, cls: "text-brand-950", iconCls: "bg-brand-100/60 text-brand-700" },
    { label: "Hijau", value: hijau, micro: `${Math.round((hijau / total) * 100)}% dari total`, icon: CheckCircle, cls: "text-[#1F6B42]", iconCls: "bg-[#6aa84f]/15 text-[#1F6B42]" },
    { label: "Kuning", value: kuning, micro: "Perlu perhatian", icon: AlertTriangle, cls: "text-[#8A5A00]", iconCls: "bg-[#E9A21B]/15 text-[#8A5A00]" },
    { label: "Merah", value: merah, micro: "Tindakan segera", icon: OctagonAlert, cls: "text-[#B83232]", iconCls: "bg-[#D64545]/15 text-[#B83232]" },
  ];

  return (
    <section
      aria-label="Ringkasan status tangki"
      className="grid grid-cols-2 divide-x divide-y divide-brand-100 rounded-lg border border-brand-100 bg-white sm:grid-cols-4 sm:divide-y-0"
    >
      {segmen.map((s) => (
        <div key={s.label} className={cn("flex items-center gap-3 px-4 py-3", s.label === "Merah" && "border-l-4 border-l-[#D64545]")}>
          <span className={cn("grid h-8 w-8 flex-none place-items-center rounded-md", s.iconCls)}>
            <s.icon className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5A6B7B]">{s.label}</span>
              <span className={`text-xl font-bold tabular-nums ${s.cls}`}>{String(s.value).padStart(2, "0")}</span>
            </div>
            <p className="truncate text-xs text-[#5A6B7B]">{s.micro}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
