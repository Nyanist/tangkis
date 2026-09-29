"use client";
import { ListChecks } from "lucide-react";
import { AMBANG, CATATAN_AMBANG, LEGENDA_AMBANG, SKALA_TAMPILAN_PPM, type Tangki } from "@/lib/data/dashboard";
import { DETAIL_PER_TANGKI, displayInfo, tangkiForSite } from "@/lib/data/dashboard2";
import { cn, kelasLed, KELAS_PIL_STATUS } from "@/lib/utils";

const bar: Record<string, string> = { HIJAU: "#6aa84f", KUNING: "#E9A21B", MERAH: "#D64545" };

export default function TankTable2({ site, onSelect }: { site: string; onSelect: (t: Tangki) => void }) {
  const max = SKALA_TAMPILAN_PPM;
  const rows = tangkiForSite(site);

  return (
    <div className="min-w-0">
      <div className="mb-3 flex items-center gap-2 rounded-lg border border-brand-100 bg-brand-50 px-4 py-3">
        <ListChecks className="h-4.5 w-4.5 text-brand-700" />
        <h2 id="judul-tabel2" className="font-semibold text-brand-950">Daftar Tangki</h2>
      </div>
      <section aria-labelledby="judul-tabel2" className="min-w-0 rounded-lg border border-brand-100 bg-white p-4 md:p-5">
      <p className="mb-2 text-xs text-[#5A6B7B] md:hidden">Geser tabel ke samping untuk melihat semua kolom.</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm tabular-nums">
          <thead>
            <tr className="text-center text-xs text-[#5A6B7B]">
              <th className="px-3 py-2 font-semibold">Lokasi</th>
              <th className="px-3 py-2 font-semibold">Site &amp; Label</th>
              <th className="px-3 py-2 font-semibold">Kapasitas (L)</th>
              <th className="px-3 py-2 font-semibold">Koneksi Genset</th>
              <th className="px-3 py-2 font-semibold">Kadar Air (ppm)</th>
              <th className="px-3 py-2 font-semibold">Hari Sejak Pengisian</th>
              <th className="px-3 py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={7} className="px-3 py-6 text-center text-xs text-[#5A6B7B]">Tidak ada tangki untuk site ini.</td></tr>
            )}
            {rows.map((t) => {
              const detail = DETAIL_PER_TANGKI[t.kode];
              return (
                <tr
                  key={t.kode}
                  onClick={() => onSelect(t)}
                  className={cn(
                    "cursor-pointer border-t border-brand-100 hover:bg-brand-dark/15",
                    t.status === "MERAH" && "bg-[#D64545]/[.08]"
                  )}
                >
                  <td className="border-l-4 px-3 py-2 font-bold text-brand-950" style={{ borderColor: bar[t.status] }}>{displayInfo(t).kode}</td>
                  <td className="px-3 py-2 text-xs text-[#5A6B7B]">{displayInfo(t).siteLabel}</td>
                  <td className="px-3 py-2 text-center text-xs text-[#5A6B7B]">{detail?.kapasitas ?? "—"}</td>
                  <td className="px-3 py-2 text-xs text-[#5A6B7B]">{detail?.koneksiGenset ?? "—"}</td>
                  <td className="px-3 py-2">
                    <span className="flex items-center justify-end gap-2">
                      <span className="relative hidden h-1.5 w-16 overflow-visible rounded-full bg-[#172B3A]/10 sm:inline-block" aria-hidden="true">
                        <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.min(100, (t.airPpm / max) * 100)}%`, background: bar[t.status] }} />
                        <span className="absolute -top-1 -bottom-1 w-0.5 bg-[#B83232]" style={{ left: `${(AMBANG.batas / max) * 100}%` }} />
                      </span>
                      <span className={cn("min-w-9 text-right font-semibold", t.status === "MERAH" && "text-[#B83232]")}>{t.airPpm}</span>
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">{t.hari}</td>
                  <td className="px-3 py-2">
                    <span className={cn("inline-flex min-w-20 items-center justify-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-wider", KELAS_PIL_STATUS[t.status])}>
                      <span className={cn("led", kelasLed(t.status))} aria-hidden="true" />
                      {t.status === "MERAH" ? "Kritis" : t.status === "KUNING" ? "Kuning" : "Normal"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ul className="mt-3 flex flex-wrap justify-between gap-3 text-xs text-[#5A6B7B]" aria-hidden="true">
        {LEGENDA_AMBANG.map((l) => (
          <li key={l.label} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: l.warna }} />
            {l.label}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs leading-relaxed text-[#5A6B7B]">{CATATAN_AMBANG}</p>
      </section>
    </div>
  );
}
