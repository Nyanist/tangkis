"use client";
import { ListChecks } from "lucide-react";
import { AMBANG, CATATAN_AMBANG, LEGENDA_AMBANG, SKALA_TAMPILAN_PPM, type Tangki } from "@/lib/data/dashboard";
import { DETAIL_PER_TANGKI, displayInfo, tangkiForSite, type Wilayah } from "@/lib/data/dashboard2";
import { cn, kelasLed, KELAS_PIL_STATUS } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { DATA_EN, LABEL_STATUS } from "@/lib/data/dashboardI18n";

const bar: Record<string, string> = { HIJAU: "#6aa84f", KUNING: "#E9A21B", MERAH: "#D64545" };

// `rows` overrides the site filter (the Tank List page filters on its own); `plain` drops the heading strip and the
// card frame, for pages that already have their own heading.
export default function TankTable2({ site, wilayah = "", onSelect, rows: rowsOverride, plain }: { site: string; wilayah?: Wilayah | ""; onSelect: (t: Tangki) => void; rows?: Tangki[]; plain?: boolean }) {
  const { t: tr } = useLang();
  const max = SKALA_TAMPILAN_PPM;
  const rows = rowsOverride ?? [...tangkiForSite(site, wilayah)].sort((a, b) => b.airPpm - a.airPpm);

  return (
    <div className="flex min-w-0 flex-col lg:h-full">
      {!plain && (
        <div className="mb-4">
          <h2 id="judul-tabel2" className="mb-1 flex items-center gap-2 text-lg font-semibold text-brand-950">
            <ListChecks className="h-5 w-5 text-brand-700" aria-hidden />
            {tr("Daftar Tangki", "Tank List")}
          </h2>
          <p className="text-sm text-neutral-900">{tr("Klik baris untuk melihat tren kadar air dan kesehatan sensor tangki.", "Click a row to see the tank's water content trend and sensor health.")}</p>
        </div>
      )}
      <section aria-labelledby={plain ? undefined : "judul-tabel2"} aria-label={plain ? tr("Daftar Tangki", "Tank List") : undefined} className={cn("min-w-0", plain ? "border-t border-slate-200" : "rounded-lg border border-brand-100 bg-white p-4 md:p-5 lg:flex-1")}>
      {/* Phones: one compact card per tank instead of a seven-column table that would need sideways scrolling. */}
      <ul className={cn("divide-y divide-brand-100 md:hidden", !plain && "max-h-[30rem] overflow-y-auto overscroll-contain")}>
        {rows.length === 0 && <li className="py-6 text-center text-xs text-neutral-900">{tr("Tidak ada tangki untuk site ini.", "There are no tanks for this site.")}</li>}
        {rows.map((t) => {
          const detail = DETAIL_PER_TANGKI[t.kode];
          return (
            <li key={t.kode}>
              <button
                type="button"
                onClick={() => onSelect(t)}
                className={cn("block w-full border-l-4 py-3 pl-3 pr-1 text-left", t.status === "MERAH" && "bg-[#D64545]/[.06]")}
                style={{ borderColor: bar[t.status] }}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-bold text-brand-950">{displayInfo(t).kode}</span>
                  <span className={cn("inline-flex flex-none items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-wider", KELAS_PIL_STATUS[t.status])}>
                    <span className={cn("led", kelasLed(t.status))} aria-hidden="true" />
                    {tr(LABEL_STATUS[t.status])}
                  </span>
                </span>
                <span className="mt-0.5 block text-xs text-neutral-900">{displayInfo(t).siteLabel}</span>
                <span className="mt-2 flex items-center gap-2">
                  <span className="relative h-1.5 flex-1 rounded-full bg-[#172B3A]/10" aria-hidden="true">
                    <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.min(100, (t.airPpm / max) * 100)}%`, background: bar[t.status] }} />
                    <span className="absolute -top-1 -bottom-1 w-0.5 bg-[#B83232]" style={{ left: `${(AMBANG.batas / max) * 100}%` }} />
                  </span>
                  <span className={cn("text-sm font-semibold tabular-nums", t.status === "MERAH" && "text-[#B83232]")}>{t.airPpm} ppm</span>
                </span>
                <span className="mt-1.5 block text-[11px] text-neutral-900">
                  {detail?.kapasitas ?? "—"} · {detail ? tr(detail.koneksiGenset, DATA_EN[detail.koneksiGenset]) : "—"} · {t.hari} {tr("hari sejak pengisian", "days since refill")}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {/* On the dashboard the table scrolls inside a fixed height (about 6 rows) with a sticky header, so 20+ tanks
          do not stretch the page. The full Tank List page (plain) keeps its natural height. */}
      <div className={cn("hidden overflow-x-auto md:block", !plain && "max-h-[30rem] overflow-y-auto overscroll-contain")}>
        <table className="w-full border-collapse text-sm tabular-nums">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="text-center text-xs text-neutral-900">
              <th className="px-3 py-2 font-semibold">{tr("Kode Tangki", "Tank Code")}</th>
              <th className="px-3 py-2 font-semibold">{tr("Lokasi", "Location")}</th>
              <th className="px-3 py-2 font-semibold">{tr("Kapasitas", "Capacity")}</th>
              <th className="px-3 py-2 font-semibold">{tr("Koneksi Genset", "Generator Connection")}</th>
              <th className="px-3 py-2 font-semibold">{tr("Kadar Air (ppm)", "Water Content (ppm)")}</th>
              <th className="px-3 py-2 font-semibold">{tr("Hari Sejak Pengisian", "Days Since Refill")}</th>
              <th className="px-3 py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={7} className="px-3 py-6 text-center text-xs text-neutral-900">{tr("Tidak ada tangki untuk site ini.", "There are no tanks for this site.")}</td></tr>
            )}
            {rows.map((t) => {
              const detail = DETAIL_PER_TANGKI[t.kode];
              return (
                <tr
                  key={t.kode}
                  onClick={() => onSelect(t)}
                  // Rows open the tank's detail popup, so they are reachable with Tab and open with Enter or Space too.
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(t);
                    }
                  }}
                  aria-label={`${displayInfo(t).kode}, ${displayInfo(t).siteLabel}, ${t.airPpm} ppm`}
                  className={cn(
                    "cursor-pointer border-t border-brand-100 outline-none hover:bg-brand-dark/15 focus-visible:bg-brand-dark/15 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-700",
                    t.status === "MERAH" && "bg-[#D64545]/[.08]"
                  )}
                >
                  <td className="whitespace-nowrap border-l-4 px-3 py-2 font-bold text-brand-950" style={{ borderColor: bar[t.status] }}>{displayInfo(t).kode}</td>
                  <td className="px-3 py-2 text-xs text-neutral-900">{displayInfo(t).siteLabel}</td>
                  <td className="px-3 py-2 text-center text-xs text-neutral-900">{detail?.kapasitas ?? "—"}</td>
                  <td className="px-3 py-2 text-xs text-neutral-900">{detail ? tr(detail.koneksiGenset, DATA_EN[detail.koneksiGenset]) : "—"}</td>
                  <td className="px-3 py-2">
                    <span className="flex items-center justify-end gap-2">
                      <span className="relative hidden h-1.5 w-16 overflow-visible rounded-full bg-[#172B3A]/10 sm:inline-block" aria-hidden="true">
                        <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.min(100, (t.airPpm / max) * 100)}%`, background: bar[t.status] }} />
                        <span className="absolute -top-1 -bottom-1 w-0.5 bg-[#B83232]" style={{ left: `${(AMBANG.batas / max) * 100}%` }} />
                      </span>
                      <span className={cn("min-w-9 text-right font-semibold", t.status === "MERAH" && "text-[#B83232]")}>{t.airPpm}</span>
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">{t.hari}</td>
                  <td className="px-3 py-2">
                    <span className={cn("inline-flex min-w-20 items-center justify-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-wider", KELAS_PIL_STATUS[t.status])}>
                      <span className={cn("led", kelasLed(t.status))} aria-hidden="true" />
                      {tr(LABEL_STATUS[t.status])}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ul className="mt-3 flex flex-wrap justify-between gap-3 text-xs text-neutral-900" aria-hidden="true">
        {LEGENDA_AMBANG.map((l) => (
          <li key={l.label} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: l.warna }} />
            {tr(l.label, DATA_EN[l.label])}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs leading-relaxed text-neutral-900">{tr(CATATAN_AMBANG, DATA_EN[CATATAN_AMBANG])}</p>
      </section>
    </div>
  );
}
