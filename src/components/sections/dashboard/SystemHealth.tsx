"use client";
import { STATUS_SISTEM } from "@/lib/data/dashboard";
import { cn } from "@/lib/utils";

export default function SystemHealth() {
  return (
    <section aria-labelledby="judul-sistem" className="rounded-lg border border-[#D9E1E8] bg-white p-4 md:p-5">
      <h2 id="judul-sistem" className="mb-2 font-semibold text-[#0B2239]">Kesehatan Sistem</h2>
      <ul>
        {STATUS_SISTEM.map((s) => (
          <li key={s.nama} className="flex items-center gap-3 border-t border-[#D9E1E8] py-2.5 first:border-t-0 first:pt-0 last:pb-0">
            <span className="grid h-7 w-7 flex-none place-items-center rounded-md bg-[#123B66]/[.09] text-[#123B66]">
              {s.ikon === "sensor" ? "📶" : s.ikon === "gateway" ? "🔲" : s.ikon === "aliran" ? "〰️" : "🛡️"}
            </span>
            <span className="min-w-0 flex-1 text-sm">{s.nama}</span>
            <span className={cn("inline-flex items-center gap-1.5 text-xs font-bold tracking-wider", s.kondisi === "info" ? "text-[#2F6FED]" : "text-[#1F6B42]")}>
              <span className={cn("led", s.kondisi === "info" ? "led--info" : "led--ok")} aria-hidden="true" />
              {s.nilai}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
