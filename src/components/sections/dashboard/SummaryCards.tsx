"use client";
import { motion } from "framer-motion";
import { TANGKI } from "@/lib/data/dashboard";

export default function SummaryCards() {
  const total = TANGKI.length;
  const hijau = TANGKI.filter((t) => t.status === "HIJAU").length;
  const kuning = TANGKI.filter((t) => t.status === "KUNING").length;
  const merah = TANGKI.filter((t) => t.status === "MERAH").length;
  const lokasi = new Set(TANGKI.map((t) => t.lokasi.split(" — ")[0])).size;

  const cards = [
    {
      label: "Total tangki dipantau",
      value: total,
      micro: `di ${lokasi} lokasi`,
      seg: TANGKI.map((t) => t.status.toLowerCase()),
      cls: "border-[#D9E1E8]",
      valCls: "text-[#172B3A]",
    },
    {
      label: "Status hijau",
      value: hijau,
      micro: `${Math.round((hijau / total) * 100)}% dari total`,
      seg: TANGKI.map((_, k) => (k < hijau ? "hijau" : null)),
      cls: "border-[#D9E1E8]",
      valCls: "text-[#172B3A]",
    },
    {
      label: "Status kuning",
      value: kuning,
      micro: "Perlu perhatian",
      seg: TANGKI.map((_, k) => (k < kuning ? "kuning" : null)),
      cls: "border-[#D9E1E8]",
      valCls: "text-[#172B3A]",
    },
    {
      label: "Status merah",
      value: merah,
      micro: "Tindakan segera",
      seg: TANGKI.map((_, k) => (k < merah ? "merah" : null)),
      cls: "border-l-4 !border-l-[#D64545] bg-[#D64545]/[.06]",
      valCls: "text-[#B83232]",
    },
  ];

  return (
    <section aria-label="Ringkasan status tangki" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 + i * 0.07, duration: 0.45 }}
          className={`rounded-lg border bg-white p-4 ${c.cls}`}
        >
          <p className="truncate text-[11px] font-bold uppercase tracking-wider text-[#5A6B7B]">{c.label}</p>
          <div className="mt-2 flex items-end justify-between gap-2">
            <span className={`text-4xl font-bold leading-none tabular-nums ${c.valCls}`}>
              {String(c.value).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="flex gap-1" aria-hidden="true">
              {c.seg.map((s, k) => (
                <span
                  key={k}
                  className={`h-1.5 w-4 rounded-sm ${s === "hijau" ? "bg-[#2E8B57]" : s === "kuning" ? "bg-[#E9A21B]" : s === "merah" ? "bg-[#D64545]" : "bg-[#172B3A]/10"}`}
                />
              ))}
            </span>
            <span className="text-xs text-[#5A6B7B]">{c.micro}</span>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
