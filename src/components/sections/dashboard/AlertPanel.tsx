"use client";
import { AMBANG, PERINGATAN, TANGKI, TREN } from "@/lib/data/dashboard";

export default function AlertPanel() {
  const t = TANGKI.find((x) => x.kode === PERINGATAN.kode)!;
  const pct = Math.round(((t.airPpm - AMBANG.batas) / AMBANG.batas) * 100);
  const max = TREN.sumbuY.max;

  return (
    <aside aria-labelledby="judul-peringatan" className="relative overflow-hidden rounded-lg border border-[#D9E1E8] bg-white p-4 md:p-5">
      <span className="absolute inset-x-0 top-0 h-1 bg-[#D64545]" aria-hidden="true" />
      <div className="mb-3 flex items-center justify-between">
        <h2 id="judul-peringatan" className="font-semibold text-[#0B2239]">⚠ Peringatan Aktif</h2>
        <span className="grid min-w-7 place-items-center rounded-full bg-[#B83232] px-2 py-0.5 text-xs font-bold text-white" aria-label="1 peringatan aktif">1</span>
      </div>

      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold">{t.kode} melampaui batas kadar air</h3>
          <p className="text-xs text-[#5A6B7B]">{t.lokasi}</p>
        </div>
        <span className="inline-flex flex-none items-center gap-1.5 rounded-full bg-[#B83232] px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-white">
          <span className="led led--putih led--pulse" aria-hidden="true" />MERAH
        </span>
      </div>

      <div className="mt-4 rounded-md border border-[#D64545]/20 bg-[#D64545]/[.06] p-3">
        <div className="flex items-end justify-between">
          <p><span className="text-4xl font-bold tabular-nums text-[#B83232]">{t.airPpm}</span><span className="ml-1 text-sm font-semibold text-[#5A6B7B]">ppm</span></p>
          <p className="text-right">
            <span className="block text-xl font-bold tabular-nums text-[#B83232]">+{pct}%</span>
            <span className="text-xs text-[#5A6B7B]">di atas batas {AMBANG.batas} ppm</span>
          </p>
        </div>
        <div className="relative mt-3 h-2 rounded-full bg-[#172B3A]/10" aria-hidden="true">
          <span className="absolute inset-y-0 left-0 rounded-full bg-[#D64545]" style={{ width: `${Math.min(100, (t.airPpm / max) * 100)}%` }} />
          <span className="absolute -top-1 -bottom-1 w-0.5 bg-[#0B2239]" style={{ left: `${(AMBANG.batas / max) * 100}%` }} />
        </div>
        <div className="relative mt-1 h-4 text-[11px] tabular-nums text-[#5A6B7B]" aria-hidden="true">
          <span className="absolute left-0">0</span>
          <span className="absolute -translate-x-1/2" style={{ left: `${(AMBANG.batas / max) * 100}%` }}>Batas {AMBANG.batas}</span>
          <span className="absolute right-0">{max} ppm</span>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
        <dt className="text-[#5A6B7B]">Mengendap tanpa penggantian</dt>
        <dd className="text-right font-semibold tabular-nums">{t.hari} hari</dd>
        <dt className="text-[#5A6B7B]">Tenggat tindakan</dt>
        <dd className="text-right font-semibold tabular-nums">{PERINGATAN.tenggatPembersihanHari} hari</dd>
      </dl>

      <div className="mt-4 flex items-center gap-3 rounded-md border border-[#D9E1E8] bg-[#123B66]/[.045] p-3">
        <span className="grid h-9 w-9 flex-none place-items-center rounded-md border border-[#D9E1E8] bg-white text-[#123B66]">🔧</span>
        <div>
          <p className="text-xs text-[#5A6B7B]">Rekomendasi tindakan</p>
          <p className="text-sm font-semibold text-[#0B2239]">{PERINGATAN.rekomendasiTindakan}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        <button type="button" className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-[#123B66] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0B2239]">
          ✈ Kirim Permintaan Pembersihan
        </button>
        <button type="button" className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-[#D9E1E8] bg-white px-3 py-2 text-sm font-semibold text-[#123B66] hover:bg-[#123B66]/[.09]">
          ⬇ Unduh Laporan Bulanan
        </button>
      </div>
    </aside>
  );
}
