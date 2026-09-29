"use client";
import { TANGGAL_PEMBARUAN } from "@/lib/data/dashboard";

export default function DashboardTopbar() {
  return (
    <header className="mb-4 flex flex-wrap items-end justify-between gap-4 border-b border-brand-100 pb-3">
      <div>
        <h1 className="text-xl font-extrabold tracking-[0.16em] text-brand-950 md:text-2xl">
          TANGKIS
        </h1>
        <p className="mt-1 text-sm font-medium text-brand-700 md:text-base">Pemantauan Kesiapan Bahan Bakar Genset Cadangan</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-300/50 bg-brand-100/60 px-3 py-1 text-xs font-bold tracking-wider text-brand-800">
          <span className="led led--ok led--pulse" aria-hidden="true" />
          SISTEM ONLINE
        </span>
        <p className="text-sm text-[#5A6B7B]">
          Pembaruan terakhir: <time className="font-semibold text-[#172B3A]">{TANGGAL_PEMBARUAN}</time>
        </p>
      </div>
    </header>
  );
}
