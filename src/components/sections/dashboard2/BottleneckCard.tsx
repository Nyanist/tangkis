"use client";
import { useState, type ReactNode } from "react";
import { ShieldAlert } from "lucide-react";
import { AMBANG, TREN_PER_TANGKI, type Tangki } from "@/lib/data/dashboard";
import { DETAIL_PER_TANGKI, displayInfo, facilityOf, tangkiForSite, type Wilayah } from "@/lib/data/dashboard2";
import { DATA_EN, LABEL_STATUS } from "@/lib/data/dashboardI18n";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// ponytail: "sisa runtime aman" has no real fuel-consumption model behind it —
// a simple illustrative heuristic (worse ppm over batas → fewer hours), not a
// prediction. Swap for a real runtime calc if this page ever needs to be accurate.
function hitungRuntimeAman(ppm: number) {
  if (ppm <= AMBANG.batas) return Math.round(((AMBANG.batas - ppm) / AMBANG.batas) * 48);
  return 0;
}

const kapasitasKl = (tk: Tangki) => parseFloat(DETAIL_PER_TANGKI[tk.kode]?.kapasitas ?? "") || 0;

// Chart inks: marks stay neutral gray; only status (critical red, yellow) gets colour, matching the rest of the page.
const INK = "#525252";
const INK_SOFT = "#d4d4d4";
const MERAH = "#D64545";
const KUNING = "#E9A21B";

export default function BottleneckCard({ site, wilayah }: { site: string; wilayah: Wilayah | "" }) {
  const { t } = useLang();
  const rows = tangkiForSite(site, wilayah);

  return (
    <div className="min-w-0">
      <div className="mb-4">
        <h2 id="judul-bottleneck" className="mb-1 flex items-center gap-2 text-lg font-semibold text-brand-950">
          <ShieldAlert className="h-5 w-5 flex-none text-brand-700" aria-hidden />
          {t("Analisis Kesiagaan Kritis (Bottleneck Site)", "Critical Readiness Analysis (Bottleneck Site)")}
        </h2>
        <p className="text-sm text-neutral-900">{t("Ringkasan kesiapan tangki dalam cakupan yang dipilih. Arahkan kursor ke grafik untuk melihat nilainya.", "Readiness summary for the tanks in the chosen scope. Hover a chart to see its values.")}</p>
      </div>

      <section aria-labelledby="judul-bottleneck" className="min-w-0 rounded-lg border border-brand-100 bg-white p-4 md:p-6">
        {rows.length === 0 ? (
          <p className="text-sm text-neutral-900">{t("Tidak ada tangki untuk site ini.", "There are no tanks for this site.")}</p>
        ) : (
          <BottleneckContent rows={rows} site={site} wilayah={wilayah} />
        )}
      </section>
    </div>
  );
}

function BottleneckContent({ rows, site, wilayah }: { rows: Tangki[]; site: string; wilayah: Wilayah | "" }) {
  const { t } = useLang();
  const byPpm = [...rows].sort((a, b) => b.airPpm - a.airPpm);
  const kritis = byPpm[0];
  const runtime = hitungRuntimeAman(kritis.airPpm);
  const totalKapasitas = rows.reduce((sum, tk) => sum + kapasitasKl(tk), 0);
  const rataKadarAir = Math.round(rows.reduce((sum, tk) => sum + tk.airPpm, 0) / rows.length);
  const nKritis = rows.filter((tk) => tk.status === "MERAH").length;
  const nKuning = rows.filter((tk) => tk.status === "KUNING").length;
  const nLokasi = new Set(rows.map((tk) => facilityOf(DETAIL_PER_TANGKI[tk.kode]?.siteLabel ?? tk.lokasi))).size;

  // Fleet average per month, from each tank's six-month trend.
  const bulan = (TREN_PER_TANGKI[rows[0].kode]?.bulan ?? []).map((b) => t(b, DATA_EN[b]));
  const rataBulanan = bulan.map((_, i) => Math.round(rows.reduce((s, tk) => s + (TREN_PER_TANGKI[tk.kode]?.ppm[i] ?? tk.airPpm), 0) / rows.length));
  const naik = rataBulanan.length > 1 ? rataBulanan[rataBulanan.length - 1] - rataBulanan[0] : 0;

  const byKapasitas = [...rows].sort((a, b) => kapasitasKl(b) - kapasitasKl(a));
  const byRuntime = [...rows].sort((a, b) => hitungRuntimeAman(a.airPpm) - hitungRuntimeAman(b.airPpm));
  const nama = (tk: Tangki) => `${displayInfo(tk).kode}, ${displayInfo(tk).siteLabel}`;
  const jam = t("jam", "hrs");

  return (
    <>
      <p className="text-sm text-neutral-900">{rows.length} {t("tangki dipantau di", "tanks monitored at")} {site || (wilayah ? t("wilayah " + wilayah, "the " + wilayah + " region") : t("semua site", "all sites"))}</p>

      {/* Four stat columns split by hairlines: a big number with a small unit, a label, a quieter note, then a small chart.
          Two columns (2 x 2) below xl, compact on phones; four in a row from xl. */}
      <div className="mt-4 grid grid-cols-2 border-y border-slate-200 xl:grid-cols-4">
        <Stat
          className="border-r max-xl:border-b"
          value={totalKapasitas.toLocaleString(t("id-ID", "en-GB"))}
          unit="kL"
          label={t("Total Kapasitas", "Total Capacity")}
          note={t(`Di ${nLokasi} lokasi`, `Across ${nLokasi} locations`)}
        >
          <Bars items={byKapasitas.map((tk) => ({ v: kapasitasKl(tk), color: INK, tip: `${nama(tk)}: ${DETAIL_PER_TANGKI[tk.kode]?.kapasitas ?? "—"}` }))} />
        </Stat>

        <Stat
          className="max-xl:border-b xl:border-r"
          value={String(rataKadarAir)}
          unit="ppm"
          label={t("Rata-rata Kadar Air", "Average Water Content")}
          note={naik > 0 ? t(`Naik ${naik} ppm sejak ${bulan[0]}`, `Up ${naik} ppm since ${bulan[0]}`) : t("Rata-rata enam bulan terakhir", "Average over the last six months")}
        >
          <Sparkline values={rataBulanan} labels={bulan} batas={AMBANG.batas} />
        </Stat>

        <Stat
          className="border-r"
          value={String(nKritis + nKuning)}
          unit={`/${rows.length}`}
          label={t("Tangki Bermasalah", "Problem Tanks")}
          note={t(`${nKritis} kritis, ${nKuning} kuning`, `${nKritis} critical, ${nKuning} yellow`)}
        >
          <Ticks
            items={byPpm.map((tk) => ({
              color: tk.status === "MERAH" ? MERAH : tk.status === "KUNING" ? KUNING : INK_SOFT,
              tall: tk.status !== "HIJAU",
              tip: `${nama(tk)}: ${t(LABEL_STATUS[tk.status])}, ${tk.airPpm} ppm`,
            }))}
          />
        </Stat>

        <Stat
          value={String(runtime)}
          unit={jam}
          label={t("Sisa Runtime Aman", "Safe Runtime Left")}
          note={t(`Dari tangki terburuk, ${displayInfo(kritis).kode}`, `From the worst tank, ${displayInfo(kritis).kode}`)}
        >
          <Bars
            items={byRuntime.map((tk) => {
              const h = hitungRuntimeAman(tk.airPpm);
              return { v: h, color: h === 0 ? MERAH : INK, tip: `${nama(tk)}: ${h} ${jam}` };
            })}
          />
        </Stat>
      </div>

      <p className="mt-4 text-sm text-neutral-900">
        {t("Paling kritis", "Most critical")} <span className="font-semibold text-neutral-900">{displayInfo(kritis).kode}</span> {t("di", "at")} {displayInfo(kritis).siteLabel} {t("dengan kadar air", "with water content of")} {kritis.airPpm} ppm
      </p>
    </>
  );
}

function Stat({ value, unit, label, note, className, children }: { value: string; unit: string; label: string; note: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("flex min-w-0 flex-col border-slate-200 px-3 py-4 max-xl:odd:pl-0 max-xl:even:pr-0 sm:px-6 sm:py-6 xl:first:pl-0 xl:last:pr-0", className)}>
      <p className="flex items-baseline gap-1 text-neutral-900">
        <span className="text-3xl font-normal tabular-nums tracking-tight sm:text-5xl">{value}</span>
        <span className="text-base text-neutral-500 sm:text-2xl">{unit}</span>
      </p>
      <p className="mt-2 text-xs text-neutral-900 sm:mt-4 sm:text-sm">{label}</p>
      <p className="mt-0.5 text-xs text-neutral-500 sm:mt-1 sm:text-sm">{note}</p>
      <div className="mt-auto pt-3 sm:pt-6">{children}</div>
    </div>
  );
}

// Shared hover readout: the chart reports which mark is under the pointer and the line above the plot shows it.
function useHover() {
  const [tip, setTip] = useState<string | null>(null);
  const readout = (
    <p className="mb-1 h-4 truncate text-[11px] text-neutral-900 sm:mb-1.5 sm:text-xs" aria-live="polite">
      {tip ?? ""}
    </p>
  );
  return { setTip, readout };
}

// Vertical bars on one baseline. Zero values keep a 2px stub so every tank still has a mark to hover.
function Bars({ items }: { items: { v: number; color: string; tip: string }[] }) {
  const { setTip, readout } = useHover();
  const max = Math.max(1, ...items.map((i) => i.v));
  return (
    <div>
      {readout}
      <div className="flex h-12 items-end gap-px sm:h-20 sm:gap-0.5" onPointerLeave={() => setTip(null)}>
        {items.map((it, i) => (
          <div key={i} role="img" aria-label={it.tip} className="group flex h-full min-w-0 flex-1 items-end" onPointerEnter={() => setTip(it.tip)}>
            <div className="w-full rounded-t-[3px] transition-opacity group-hover:opacity-70" style={{ height: `max(2px, ${(it.v / max) * 100}%)`, background: it.color }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// One thin tick per tank, worst first; problem tanks stand taller and carry their status colour.
function Ticks({ items }: { items: { color: string; tall: boolean; tip: string }[] }) {
  const { setTip, readout } = useHover();
  return (
    <div>
      {readout}
      <div className="flex h-12 items-end gap-0.5 sm:h-20 sm:gap-[3px]" onPointerLeave={() => setTip(null)}>
        {items.map((it, i) => (
          <div key={i} role="img" aria-label={it.tip} className="group flex h-full min-w-0 flex-1 items-end" onPointerEnter={() => setTip(it.tip)}>
            <div className={cn("w-full rounded-[2px] transition-opacity group-hover:opacity-70", it.tall ? "h-full" : "h-3/5")} style={{ background: it.color }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Monthly line with a light area under it, a dot on the latest (or hovered) month and the dashed spec limit for scale.
function Sparkline({ values, labels, batas }: { values: number[]; labels: string[]; batas: number }) {
  const { t } = useLang();
  const { setTip, readout } = useHover();
  const [aktif, setAktif] = useState<number | null>(null);
  if (values.length === 0) return null;
  const lo = Math.min(...values) * 0.9;
  const hi = Math.max(batas, ...values) * 1.02;
  const x = (i: number) => (values.length === 1 ? 50 : (i / (values.length - 1)) * 100);
  const y = (v: number) => 100 - ((v - lo) / (hi - lo)) * 100;
  const line = values.map((v, i) => `${i ? "L" : "M"}${x(i)} ${y(v)}`).join(" ");
  const titik = aktif ?? values.length - 1;

  return (
    <div>
      {readout}
      <div
        role="img"
        aria-label={values.map((v, i) => `${labels[i]} ${v} ppm`).join(", ")}
        className="relative h-12 sm:h-20"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const k = Math.max(0, Math.min(values.length - 1, Math.round(((e.clientX - r.left) / r.width) * (values.length - 1))));
          setAktif(k);
          setTip(`${labels[k]}: ${values[k]} ppm`);
        }}
        onPointerLeave={() => {
          setAktif(null);
          setTip(null);
        }}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <line x1="0" x2="100" y1={y(batas)} y2={y(batas)} stroke={MERAH} strokeWidth="1" strokeDasharray="4 3" vectorEffect="non-scaling-stroke" />
          <path d={`${line} L100 100 L0 100 Z`} fill="#f1f1f1" />
          <path d={line} fill="none" stroke={INK} strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          {aktif !== null && <line x1={x(aktif)} x2={x(aktif)} y1="0" y2="100" stroke="#a3a3a3" strokeWidth="1" vectorEffect="non-scaling-stroke" />}
        </svg>
        <span
          aria-hidden
          className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
          style={{ left: `${x(titik)}%`, top: `${y(values[titik])}%`, background: values[titik] > batas ? MERAH : INK }}
        />
        <span aria-hidden className="absolute right-0 -translate-y-full pb-0.5 text-[10px] text-[#B83232]" style={{ top: `${y(batas)}%` }}>
          {t("batas", "limit")} {batas}
        </span>
      </div>
    </div>
  );
}
