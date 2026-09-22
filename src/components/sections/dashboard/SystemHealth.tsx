"use client";
import { STATUS_SISTEM } from "@/lib/data/dashboard";
import { cn, IKON_KESEHATAN } from "@/lib/utils";

const gayaStatus: Record<string, string> = {
  AKTIF: "text-[#1F6B42]",
  NONAKTIF: "text-[#B83232]",
  CEK: "text-[#8A5A00]",
};

// Sticky status bar, not a card — stops before whatever follows it in the page
// (the demo-disclaimer strip on /dashboard-2, the site Footer on /dashboard)
// since CSS sticky naturally un-sticks once that next content needs to show.
export default function SystemHealth() {
  return (
    <section
      aria-labelledby="judul-sistem"
      className="sticky bottom-0 z-20 flex flex-wrap items-center gap-x-6 gap-y-1.5 border-t border-brand-100 bg-white px-4 py-2.5 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]"
    >
      <h2 id="judul-sistem" className="flex-none text-sm font-semibold text-brand-950">Kesehatan Sistem</h2>
      {STATUS_SISTEM.map((s) => {
        const Ikon = IKON_KESEHATAN[s.ikon] ?? IKON_KESEHATAN.pantau;
        return (
          <span key={s.nama} className="flex items-center gap-1.5 text-xs">
            <Ikon className="h-3.5 w-3.5 text-brand-700" />
            <span className="text-[#5A6B7B]">{s.nama}</span>
            <span className={cn("inline-flex items-center gap-1 font-bold tracking-wider", gayaStatus[s.status])}>
              {s.status === "AKTIF" ? (
                <span className="led led--ok led--pulse" aria-hidden="true" />
              ) : s.status === "CEK" ? (
                <span className="led led--warn" aria-hidden="true" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-[#D64545]" aria-hidden="true" />
              )}
              {s.status}
            </span>
          </span>
        );
      })}
    </section>
  );
}
