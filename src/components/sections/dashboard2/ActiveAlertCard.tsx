"use client";
import { useState } from "react";
import { AlertOctagon, ChevronDown, Send } from "lucide-react";
import { AMBANG } from "@/lib/data/dashboard";
import { DETAIL_PER_TANGKI, tangkiForSite } from "@/lib/data/dashboard2";
import KirimPermintaanPopup from "@/components/sections/dashboard/KirimPermintaanPopup";

const GAYA: Record<string, { border: string; bg: string; stripe: string; text: string }> = {
  MERAH: { border: "border-[#D64545]/30", bg: "bg-[#D64545]/[.04]", stripe: "bg-[#D64545]", text: "text-[#B83232]" },
  KUNING: { border: "border-[#E9A21B]/30", bg: "bg-[#E9A21B]/[.06]", stripe: "bg-[#E9A21B]", text: "text-[#8A5A00]" },
};

export default function ActiveAlertCard({ site }: { site: string }) {
  const [showKirim, setShowKirim] = useState(false);
  const [showList, setShowList] = useState(false);
  const [selectedKode, setSelectedKode] = useState<string | null>(null);
  // Only MERAH/KUNING count as an "active alert" — HIJAU tanks don't need one.
  const alerts = tangkiForSite(site)
    .filter((t) => t.status === "MERAH" || t.status === "KUNING")
    .sort((a, b) => b.airPpm - a.airPpm);
  // Falls back to the worst alert whenever nothing's picked, or the pick fell out
  // of the list (e.g. the site filter changed under it).
  const t = alerts.find((a) => a.kode === selectedKode) ?? alerts[0];

  if (!t) {
    return (
      <aside aria-labelledby="judul-alert" className="rounded-lg border border-brand-100 bg-white p-4 md:p-5">
        <h2 id="judul-alert" className="mb-2 flex items-center gap-2 font-semibold text-brand-950">
          <AlertOctagon className="h-4.5 w-4.5 text-[#5A6B7B]" />
          Active Alert
        </h2>
        <p className="text-sm text-[#5A6B7B]">Tidak ada peringatan aktif untuk site ini.</p>
      </aside>
    );
  }

  const gaya = GAYA[t.status];
  const pct = Math.round(((t.airPpm - AMBANG.batas) / AMBANG.batas) * 100);
  const over = t.airPpm > AMBANG.batas;

  return (
    <aside aria-labelledby="judul-alert" className={`relative overflow-hidden rounded-lg border ${gaya.border} ${gaya.bg} p-4 md:p-5`}>
      <span className={`absolute inset-x-0 top-0 h-1 ${gaya.stripe}`} aria-hidden="true" />
      <div className="relative mb-2 flex items-center justify-between gap-2">
        <h2 id="judul-alert" className="flex items-center gap-2 font-semibold text-brand-950">
          <AlertOctagon className={`h-4.5 w-4.5 ${gaya.text}`} />
          Active Alert
        </h2>
        {alerts.length > 1 && (
          <button
            type="button"
            onClick={() => setShowList((v) => !v)}
            aria-expanded={showList}
            aria-label="Lihat semua peringatan aktif"
            className={`rounded-md border ${gaya.border} bg-white p-1 ${gaya.text} hover:bg-brand-100/60`}
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${showList ? "rotate-180" : ""}`} />
          </button>
        )}
        {showList && (
          <ul className={`absolute right-0 top-full z-10 mt-2 w-56 rounded-md border ${gaya.border} bg-white p-1 text-sm shadow-lg`}>
            {alerts.map((a) => (
              <li key={a.kode}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedKode(a.kode);
                    setShowList(false);
                  }}
                  aria-current={a.kode === t.kode}
                  className={`flex w-full items-center justify-between gap-2 rounded px-2 py-1.5 text-left hover:bg-brand-100/60 ${a.kode === t.kode ? "bg-brand-100/60 font-semibold" : ""}`}
                >
                  <span className="truncate text-[#172B3A]">{a.lokasi}</span>
                  <span className={`ml-2 flex-none text-xs font-bold ${GAYA[a.status].text}`}>{a.status}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="rounded-md border border-black/5 bg-white p-3">
        <p className="text-sm font-bold text-[#172B3A]">Peringatan: {t.kode}</p>
        <p className="text-xs text-[#5A6B7B]">{t.lokasi}</p>
        <div className="mt-2 flex items-end justify-between">
          <p><span className={`text-3xl font-bold tabular-nums ${gaya.text}`}>{t.airPpm}</span><span className="ml-1 text-sm text-[#5A6B7B]">ppm</span></p>
          {over && (
            <p className="text-right">
              <span className={`block text-lg font-bold tabular-nums ${gaya.text}`}>+{pct}%</span>
              <span className="text-xs text-[#5A6B7B]">Batas {AMBANG.batas}</span>
            </p>
          )}
        </div>
        <p className="mt-2 text-xs text-[#5A6B7B]">Tenggat tindakan: <span className="font-semibold text-[#172B3A]">14 hari</span></p>
      </div>
      <button
        type="button"
        onClick={() => setShowKirim(true)}
        className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-brand-700 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-800"
      >
        <Send className="h-4 w-4" />
        Kirim Permintaan Pembersihan
      </button>

      {showKirim && (
        <KirimPermintaanPopup
          // Every tank monitored at this site is selectable here, not just the
          // one shown above — e.g. at RS Medika Center that's both T-101 and DT-101.
          daftarTangki={tangkiForSite(site).map((x) => ({ ...x, kode: DETAIL_PER_TANGKI[x.kode]?.kode ?? x.kode }))}
          onClose={() => setShowKirim(false)}
        />
      )}
    </aside>
  );
}
