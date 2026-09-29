"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { STATUS_SISTEM } from "@/lib/data/dashboard";
import { cn, IKON_KESEHATAN } from "@/lib/utils";

const gayaStatus: Record<string, string> = {
  AKTIF: "text-[#1F6B42]",
  NONAKTIF: "text-[#B83232]",
  CEK: "text-[#8A5A00]",
};

// Compact row: icon only, tinted by status so it still reads at a glance with no
// label. Expanded panel: full name + status text + LED, one per row.
function StatusItem({ s, full }: { s: (typeof STATUS_SISTEM)[number]; full: boolean }) {
  const Ikon = IKON_KESEHATAN[s.ikon] ?? IKON_KESEHATAN.pantau;

  if (!full) {
    return (
      <span title={`${s.nama}: ${s.status}`} className="flex-none">
        <Ikon className={cn("h-4 w-4", gayaStatus[s.status])} />
      </span>
    );
  }

  return (
    <>
      <span className="flex items-center gap-1.5 text-xs">
        <Ikon className="h-3.5 w-3.5 flex-none text-brand-700" />
        <span className="text-[#5A6B7B]">{s.nama}</span>
      </span>
      <span className={cn("inline-flex items-center gap-1 justify-self-end text-xs font-bold tracking-wider", gayaStatus[s.status])}>
        {s.status === "AKTIF" ? (
          <span className="led led--ok led--pulse" aria-hidden="true" />
        ) : s.status === "CEK" ? (
          <span className="led led--warn" aria-hidden="true" />
        ) : (
          <span className="h-2 w-2 rounded-full bg-[#D64545]" aria-hidden="true" />
        )}
        {s.status}
      </span>
    </>
  );
}

// Sticky status bar, not a card — stops before whatever follows it in the page
// (the demo-disclaimer strip on /dashboard-2, the site Footer on /dashboard)
// since CSS sticky naturally un-sticks once that next content needs to show.
//
// Icon-only by default; tapping the row expands the detail panel upward (the
// section is sticky bottom-0, so its bottom edge stays pinned and extra height
// grows up from there, like a burger menu). Click-driven only — no scroll-position
// auto-expand — since that was tied to the section's own height and caused a
// feedback loop right at the bottom of the page.
export default function SystemHealth() {
  const [expanded, setExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(expanded && panelRef.current ? panelRef.current.scrollHeight : 0);
  }, [expanded]);

  return (
    <section
      aria-labelledby="judul-sistem"
      className="sticky bottom-0 z-20 border-t border-brand-100 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.04)]"
    >
      <div className="overflow-hidden transition-[height] duration-300 ease-in-out" style={{ height }}>
        <div ref={panelRef} className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 px-4 pt-3">
          {STATUS_SISTEM.map((s) => (
            <StatusItem key={s.nama} s={s} full />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center gap-3 px-4 py-2.5"
      >
        <h2 id="judul-sistem" className="text-sm font-semibold text-brand-950">Kesehatan Sistem</h2>
        <div className="flex flex-1 items-center justify-evenly">
          {STATUS_SISTEM.map((s) => (
            <StatusItem key={s.nama} s={s} full={false} />
          ))}
        </div>
        <ChevronRight
          className={cn("h-4 w-4 flex-none text-brand-700 transition-transform duration-300", expanded && "-rotate-90")}
          aria-hidden="true"
        />
      </button>
    </section>
  );
}
