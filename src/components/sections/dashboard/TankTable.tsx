"use client";
import { AMBANG, CATATAN_AMBANG, TANGKI, TREN } from "@/lib/data/dashboard";
import { cn } from "@/lib/utils";

const pill: Record<string, string> = {
  HIJAU: "bg-[#2E8B57]/10 border-[#2E8B57]/30 text-[#1F6B42]",
  KUNING: "bg-[#E9A21B]/[.15] border-[#E9A21B]/50 text-[#8A5A00]",
  MERAH: "bg-[#B83232] border-[#B83232] text-white",
};
const bar: Record<string, string> = { HIJAU: "#2E8B57", KUNING: "#E9A21B", MERAH: "#D64545" };

export default function TankTable() {
  const max = TREN.sumbuY.max;
  return (
    <section aria-labelledby="judul-tabel" className="rounded-lg border border-[#D9E1E8] bg-white p-4 md:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 id="judul-tabel" className="font-semibold text-[#0B2239]">Daftar Tangki</h2>
        <p className="text-xs text-[#5A6B7B]">Penanda merah di {AMBANG.batas} ppm</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm tabular-nums">
          <thead>
            <tr className="bg-[#123B66]/[.045] text-left text-xs text-[#5A6B7B]">
              <th className="px-3 py-2 font-semibold">Kode Tangki</th>
              <th className="px-3 py-2 font-semibold">Lokasi</th>
              <th className="px-3 py-2 text-right font-semibold">Kadar Air (ppm)</th>
              <th className="px-3 py-2 text-right font-semibold">Suhu (°C)</th>
              <th className="px-3 py-2 text-right font-semibold">Hari</th>
              <th className="px-3 py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {TANGKI.map((t) => (
              <tr key={t.kode} className={cn("border-t border-[#D9E1E8] hover:bg-[#123B66]/[.045]", t.status === "MERAH" && "bg-[#D64545]/[.06]")}>
                <td className="border-l-4 px-3 py-2 font-bold text-[#0B2239]" style={{ borderColor: bar[t.status] }}>{t.kode}</td>
                <td className="px-3 py-2">{t.lokasi}</td>
                <td className="px-3 py-2">
                  <span className="flex items-center justify-end gap-2">
                    <span className="relative hidden h-1.5 w-20 overflow-visible rounded-full bg-[#172B3A]/10 sm:inline-block" aria-hidden="true">
                      <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.min(100, (t.airPpm / max) * 100)}%`, background: bar[t.status] }} />
                      <span className="absolute -top-1 -bottom-1 w-0.5 bg-[#B83232]" style={{ left: `${(AMBANG.batas / max) * 100}%` }} />
                    </span>
                    <span className={cn("min-w-9 text-right font-semibold", t.status === "MERAH" && "text-[#B83232]")}>{t.airPpm}</span>
                  </span>
                </td>
                <td className="px-3 py-2 text-right">{t.suhuC}</td>
                <td className="px-3 py-2 text-right">{t.hari}</td>
                <td className="px-3 py-2">
                  <span className={cn("inline-flex min-w-24 items-center justify-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-wider", pill[t.status])}>
                    <span className={cn("led", t.status === "MERAH" ? "led--putih" : t.status === "HIJAU" ? "led--ok" : "led--warn")} aria-hidden="true" />
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-[#5A6B7B]">{CATATAN_AMBANG}</p>
    </section>
  );
}
