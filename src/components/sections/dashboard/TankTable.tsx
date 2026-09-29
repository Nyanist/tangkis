"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { AMBANG, CATATAN_AMBANG, LEGENDA_AMBANG, SKALA_TAMPILAN_PPM, TANGKI, type Tangki } from "@/lib/data/dashboard";
import { cn, kelasLed, KELAS_PIL_STATUS } from "@/lib/utils";
import { useEscapeToClose } from "@/lib/useEscapeToClose";
import TankDetailPopup from "./TankDetailPopup";

const bar: Record<string, string> = { HIJAU: "#6aa84f", KUNING: "#E9A21B", MERAH: "#D64545" };

export default function TankTable({ lokasi }: { lokasi: string }) {
  const [tangki, setTangki] = useState<Tangki[]>(TANGKI);
  const [resetTarget, setResetTarget] = useState<string | null>(null);
  const [detailTarget, setDetailTarget] = useState<string | null>(null);
  const max = SKALA_TAMPILAN_PPM;

  const tampil = tangki.filter((t) => t.lokasi.split(" — ")[0] === lokasi);
  const resetTank = tangki.find((t) => t.kode === resetTarget);
  const detailTank = tangki.find((t) => t.kode === detailTarget);

  useEscapeToClose(() => setResetTarget(null));

  return (
    <section aria-labelledby="judul-tabel" className="rounded-lg border border-brand-100 bg-white p-4 md:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 id="judul-tabel" className="font-semibold text-brand-950">Daftar Tangki</h2>
        <ul className="flex flex-wrap gap-3 text-xs text-[#5A6B7B]" aria-hidden="true">
          {LEGENDA_AMBANG.map((l) => (
            <li key={l.label} className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: l.warna }} />
              {l.label}
            </li>
          ))}
        </ul>
      </div>
      <p className="mb-2 text-xs text-[#5A6B7B] md:hidden">Geser tabel ke samping untuk melihat semua kolom.</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm tabular-nums">
          <thead>
            <tr className="text-left text-xs text-[#5A6B7B]">
              <th className="px-3 py-2 font-semibold">Kode Tangki</th>
              <th className="px-3 py-2 font-semibold">Lokasi</th>
              <th className="px-3 py-2 text-right font-semibold">Kadar Air (ppm)</th>
              <th className="px-3 py-2 text-right font-semibold">Suhu (°C)</th>
              <th className="px-3 py-2 text-right font-semibold">Hari Sejak Pengisian</th>
              <th className="px-3 py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {tampil.map((t) => (
              <tr
                key={t.kode}
                onClick={() => setDetailTarget(t.kode)}
                className={cn(
                  "cursor-pointer border-t border-brand-100 hover:bg-brand-dark/15",
                  t.status === "MERAH" && "bg-[#D64545]/[.08]"
                )}
              >
                <td className="border-l-4 px-3 py-2 font-bold text-brand-950" style={{ borderColor: bar[t.status] }}>{t.kode}</td>
                <td className="px-3 py-2">{t.lokasi}</td>
                <td className="px-3 py-2">
                  <span className="flex items-center justify-end gap-2">
                    <span className="relative hidden h-1.5 w-20 overflow-visible rounded-full bg-[#172B3A]/10 sm:inline-block" aria-hidden="true">
                      <span className="absolute inset-y-0 left-0 rounded-full bg-[#6aa84f]/15" style={{ width: `${(AMBANG.kuningMulai / max) * 100}%` }} />
                      <span className="absolute inset-y-0 rounded-full bg-[#E9A21B]/15" style={{ left: `${(AMBANG.kuningMulai / max) * 100}%`, width: `${((AMBANG.batas - AMBANG.kuningMulai) / max) * 100}%` }} />
                      <span className="absolute inset-y-0 right-0 rounded-full bg-[#D64545]/15" style={{ left: `${(AMBANG.batas / max) * 100}%` }} />
                      <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.min(100, (t.airPpm / max) * 100)}%`, background: bar[t.status] }} />
                      <span className="absolute -top-1 -bottom-1 w-0.5 bg-[#B83232]" style={{ left: `${(AMBANG.batas / max) * 100}%` }} aria-hidden="true" />
                    </span>
                    <span className={cn("min-w-9 text-right font-semibold", t.status === "MERAH" && "text-[#B83232]")}>{t.airPpm}</span>
                  </span>
                </td>
                <td className="px-3 py-2 text-right">{t.suhuC}</td>
                <td className="px-3 py-2 text-right">
                  <span className="inline-flex items-center gap-2">
                    {t.hari}
                    <button
                      type="button"
                      aria-label={`Reset hari sejak pengisian untuk ${t.kode}`}
                      title="Reset hari sejak pengisian"
                      onClick={(e) => {
                        e.stopPropagation();
                        setResetTarget(t.kode);
                      }}
                      className="rounded p-1 text-[#5A6B7B] hover:bg-brand-100/60 hover:text-brand-700"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span className={cn("inline-flex min-w-24 items-center justify-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-wider", KELAS_PIL_STATUS[t.status])}>
                    <span className={cn("led", kelasLed(t.status))} aria-hidden="true" />
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
            {tampil.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-sm text-[#5A6B7B]">Belum ada tangki terdaftar di lokasi ini.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-[#5A6B7B]">{CATATAN_AMBANG}</p>

      {/* ponytail: no focus trap — Escape now closes it (useEscapeToClose), same cut Navbar's overlay already makes on the rest */}
      {resetTank && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4" onClick={() => setResetTarget(null)}>
          <div role="dialog" aria-modal="true" className="w-full max-w-sm rounded-lg border border-brand-100 bg-white p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold text-brand-950">Reset hari sejak pengisian?</h3>
            <p className="mt-2 text-sm text-[#5A6B7B]">
              Yakin ingin mereset penghitung hari untuk <strong className="text-[#172B3A]">{resetTank.kode}</strong> ke 0?
            </p>
            <p className="mt-3 rounded-md bg-brand-100/60 p-2.5 text-xs leading-relaxed text-brand-800">
              Catatan: ini interaksi demo. Pada produk sungguhan, reset ini dipicu tombol fisik di perangkat lapangan, bukan popup ini.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setResetTarget(null)} className="rounded-md border border-brand-100 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setTangki((prev) => prev.map((x) => (x.kode === resetTarget ? { ...x, hari: 0 } : x)));
                  setResetTarget(null);
                }}
                className="rounded-md bg-brand-700 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-800"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {detailTank && <TankDetailPopup tangki={detailTank} onClose={() => setDetailTarget(null)} />}
    </section>
  );
}
