"use client";
import { X } from "lucide-react";
import { KESEHATAN_PER_TANGKI, TREN_PER_TANGKI, type Tangki } from "@/lib/data/dashboard";
import { cn, IKON_KESEHATAN, kelasLed, KELAS_PIL_STATUS } from "@/lib/utils";
import { useEscapeToClose } from "@/lib/useEscapeToClose";
import TrendChart from "./TrendChart";

// ponytail: no focus trap — Escape now closes it (useEscapeToClose)
export default function TankDetailPopup({ tangki, onClose }: { tangki: Tangki; onClose: () => void }) {
  const tren = TREN_PER_TANGKI[tangki.kode];
  const kesehatan = KESEHATAN_PER_TANGKI[tangki.kode];

  useEscapeToClose(onClose);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-brand-100 bg-white p-5" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between gap-2">
          <div>
            <h2 className="font-bold text-brand-950">{tangki.kode}</h2>
            <p className="text-xs text-[#5A6B7B]">{tangki.lokasi}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-wider", KELAS_PIL_STATUS[tangki.status])}>
              <span className={cn("led", kelasLed(tangki.status))} aria-hidden="true" />
              {tangki.status}
            </span>
            <button type="button" onClick={onClose} aria-label="Tutup" className="rounded p-1 text-[#5A6B7B] hover:bg-brand-100/60">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {tren && <TrendChart tren={tren} judul={`Tren Kadar Air — ${tangki.kode} (${tangki.lokasi})`} />}

        {kesehatan && (
          <div className="mt-4 rounded-md border border-brand-100 p-3">
            <h3 className="mb-2 text-sm font-semibold text-brand-950">Kesehatan Sistem</h3>
            <ul>
              {kesehatan.map((item) => {
                const Ikon = IKON_KESEHATAN[item.ikon] ?? IKON_KESEHATAN.pantau;
                return (
                  <li key={item.nama} className="flex items-center gap-3 border-t border-brand-100 py-2 first:border-t-0 first:pt-0 last:pb-0">
                    <span className="grid h-7 w-7 flex-none place-items-center rounded-md bg-brand-100/60 text-brand-700">
                      <Ikon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1 text-sm">{item.nama}</span>
                    <span className={cn("inline-flex items-center gap-1.5 text-xs font-bold tracking-wider", item.status === "ONLINE" ? "text-[#1F6B42]" : "text-[#B83232]")}>
                      <span className={cn("h-2 w-2 rounded-full", item.status === "ONLINE" ? "bg-[#6aa84f]" : "bg-[#D64545]")} aria-hidden="true" />
                      {item.status}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
