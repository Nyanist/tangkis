"use client";
import { TANGGAL_PEMBARUAN } from "@/lib/data/dashboard";

export default function DashboardTopbar() {
  return (
    <header className="mb-4 flex flex-wrap items-end justify-between gap-4 border-b border-[#D9E1E8] pb-3">
      <div>
        <h1 className="text-2xl font-extrabold tracking-[0.16em] text-[#0B2239]">TANGKIS</h1>
        <p className="font-medium text-[#123B66]">Pemantauan Kesiapan Bahan Bakar Genset Cadangan</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#2E8B57]/40 bg-[#2E8B57]/10 px-3 py-1 text-xs font-bold tracking-wider text-[#1F6B42]">
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
