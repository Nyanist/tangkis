"use client";
import { ChevronRight, Fuel } from "lucide-react";
import { DAY_TANK_LIST } from "@/lib/data/dashboard2";
import { type Tangki } from "@/lib/data/dashboard";
import { cn, kelasLed } from "@/lib/utils";

const DOT: Record<string, string> = { HIJAU: "bg-[#2E8B57]", KUNING: "bg-[#E9A21B]", MERAH: "bg-[#D64545]" };

export default function DayTankCard({ onSelect }: { onSelect: (t: Tangki) => void }) {
  return (
    <section aria-labelledby="judul-day-tank" className="rounded-lg border border-brand-100 bg-white p-4 md:p-5">
      <h2 id="judul-day-tank" className="mb-2 flex items-center gap-2 font-semibold text-brand-950">
        <Fuel className="h-4.5 w-4.5 text-brand-700" />
        Status Kesiagaan Day Tank (Genset-Specific)
      </h2>
      <ul>
        {DAY_TANK_LIST.map(({ tangki, label }) => (
          <li key={tangki.kode} className="border-t border-brand-100 first:border-t-0">
            <button
              type="button"
              onClick={() => onSelect(tangki)}
              className="flex w-full items-center gap-3 py-2.5 text-left hover:bg-brand-100/60"
            >
              <span className={cn("led", kelasLed(tangki.status))} aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-[#172B3A]">{tangki.kode}</span>
                <span className="block truncate text-xs text-[#5A6B7B]">{label}</span>
              </span>
              <ChevronRight className="h-4 w-4 flex-none text-[#5A6B7B]" />
              <span className={cn("h-3 w-3 flex-none rounded-sm", DOT[tangki.status])} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
