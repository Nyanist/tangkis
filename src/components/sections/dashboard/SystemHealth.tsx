"use client";
import { STATUS_SISTEM } from "@/lib/data/dashboard";
import { cn, IKON_KESEHATAN } from "@/lib/utils";

const gayaStatus: Record<string, string> = {
  AKTIF: "text-[#1F6B42]",
  NONAKTIF: "text-[#B83232]",
  CEK: "text-[#8A5A00]",
};

export default function SystemHealth() {
  return (
    <section aria-labelledby="judul-sistem" className="rounded-lg border border-brand-100 bg-white p-4 md:p-5">
      <h2 id="judul-sistem" className="mb-2 font-semibold text-brand-950">Kesehatan Sistem</h2>
      <ul>
        {STATUS_SISTEM.map((s) => {
          const Ikon = IKON_KESEHATAN[s.ikon] ?? IKON_KESEHATAN.pantau;
          return (
            <li key={s.nama} className="flex items-center gap-3 border-t border-brand-100 py-2.5 first:border-t-0 first:pt-0 last:pb-0">
              <span className="grid h-7 w-7 flex-none place-items-center rounded-md bg-brand-100/60 text-brand-700">
                <Ikon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1 text-sm">{s.nama}</span>
              <span className={cn("inline-flex items-center gap-1.5 text-xs font-bold tracking-wider", gayaStatus[s.status])}>
                {s.status === "AKTIF" ? (
                  <span className="led led--ok led--pulse" aria-hidden="true" />
                ) : s.status === "CEK" ? (
                  <span className="led led--warn" aria-hidden="true" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-[#D64545]" aria-hidden="true" />
                )}
                {s.status}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
