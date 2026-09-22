import { SlidersHorizontal, Clock, UserCircle2 } from "lucide-react";
import { TANGGAL_PEMBARUAN } from "@/lib/data/dashboard";
import { PROVINSI_OPTIONS } from "@/lib/data/dashboard2";

// ponytail: the province select and "Global Filter" button stay decorative
// (matches the reference layout) — "Pilih Site" now lives under Bottleneck Site.
export default function TopHeader() {
  return (
    <header className="mb-4 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold tracking-wide text-brand-950">TANGKIS v2.0</h1>
        <p className="text-sm text-[#5A6B7B]">Pemantauan Kesiapan Bahan Bakar Genset Cadangan</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <select className="rounded-md border border-brand-100 bg-white px-3 py-1.5 text-sm" defaultValue={PROVINSI_OPTIONS[0]}>
            {PROVINSI_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
          <button type="button" className="inline-flex items-center gap-1.5 rounded-md border border-brand-100 bg-white px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Global Filter
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-brand-100 bg-white px-3 py-1.5 text-xs font-medium text-[#5A6B7B]">
          <Clock className="h-3.5 w-3.5 flex-none text-brand-700" />
          <span className="hidden sm:inline">Update Data Otomatis:</span> <span className="font-semibold text-[#172B3A]">{TANGGAL_PEMBARUAN}</span>
        </span>
        <span className="flex items-center gap-2 text-sm">
          <UserCircle2 className="h-8 w-8 text-brand-700" />
          <span className="leading-tight">
            <span className="block font-semibold text-[#172B3A]">Admin Darurat</span>
            <span className="block text-xs text-[#5A6B7B]">Profile</span>
          </span>
        </span>
      </div>
    </header>
  );
}
