"use client";
import { useMemo, useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import { TANGKI, type StatusTangki, type Tangki } from "@/lib/data/dashboard";
import { DETAIL_PER_TANGKI, displayInfo, facilityOf, SITE_OPTIONS } from "@/lib/data/dashboard2";
import TankDetailPopup from "@/components/sections/dashboard/TankDetailPopup";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import TankTable2 from "./TankTable2";
import { ViewHeading } from "./DashboardShell";

const STATUS_FILTER: { id: StatusTangki | ""; id_: string; en: string }[] = [
  { id: "", id_: "Semua", en: "All" },
  { id: "MERAH", id_: "Kritis", en: "Critical" },
  { id: "KUNING", id_: "Kuning", en: "Yellow" },
  { id: "HIJAU", id_: "Normal", en: "Normal" },
];

const STATUS_RANK: Record<StatusTangki, number> = { MERAH: 0, KUNING: 1, HIJAU: 2 };
const kapasitasKl = (tk: Tangki) => parseFloat(DETAIL_PER_TANGKI[tk.kode]?.kapasitas ?? "") || 0;

// Sort choices for the list. `desc` is the phrase the subtitle ends with ("diurutkan dari ...").
// Ties fall back to highest water content, so the order is always stable and the riskiest tank comes first.
type Urutan = "air-desc" | "air-asc" | "hari-desc" | "status" | "kapasitas-desc" | "kode" | "lokasi";
const URUTAN: { id: Urutan; label: { id: string; en: string }; desc: { id: string; en: string }; cmp: (a: Tangki, b: Tangki) => number }[] = [
  { id: "air-desc", label: { id: "Kadar air tertinggi", en: "Highest water content" }, desc: { id: "kadar air tertinggi", en: "highest water content" }, cmp: (a, b) => b.airPpm - a.airPpm },
  { id: "air-asc", label: { id: "Kadar air terendah", en: "Lowest water content" }, desc: { id: "kadar air terendah", en: "lowest water content" }, cmp: (a, b) => a.airPpm - b.airPpm },
  { id: "status", label: { id: "Status paling kritis", en: "Most critical status" }, desc: { id: "status paling kritis", en: "most critical status" }, cmp: (a, b) => STATUS_RANK[a.status] - STATUS_RANK[b.status] },
  { id: "hari-desc", label: { id: "Paling lama sejak pengisian", en: "Longest since refill" }, desc: { id: "hari sejak pengisian terlama", en: "longest since refill" }, cmp: (a, b) => b.hari - a.hari },
  { id: "kapasitas-desc", label: { id: "Kapasitas terbesar", en: "Largest capacity" }, desc: { id: "kapasitas terbesar", en: "largest capacity" }, cmp: (a, b) => kapasitasKl(b) - kapasitasKl(a) },
  { id: "kode", label: { id: "Kode tangki (A–Z)", en: "Tank code (A–Z)" }, desc: { id: "kode tangki A–Z", en: "tank code A–Z" }, cmp: (a, b) => displayInfo(a).kode.localeCompare(displayInfo(b).kode, undefined, { numeric: true }) },
  { id: "lokasi", label: { id: "Lokasi (A–Z)", en: "Location (A–Z)" }, desc: { id: "lokasi A–Z", en: "location A–Z" }, cmp: (a, b) => displayInfo(a).siteLabel.localeCompare(displayInfo(b).siteLabel) },
];

// Full tank list: search, site and status filters over the same table the dashboard uses, without its card chrome.
export default function TankListView() {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [site, setSite] = useState("");
  const [status, setStatus] = useState<StatusTangki | "">("");
  const [urutan, setUrutan] = useState<Urutan>("air-desc");
  const sort = URUTAN.find((u) => u.id === urutan) ?? URUTAN[0];
  const [selected, setSelected] = useState<Tangki | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TANGKI.filter((tk) => {
      const info = displayInfo(tk);
      if (site && facilityOf(DETAIL_PER_TANGKI[tk.kode]?.siteLabel ?? "") !== site) return false;
      if (status && tk.status !== status) return false;
      return !q || info.kode.toLowerCase().includes(q) || info.siteLabel.toLowerCase().includes(q);
    }).sort((a, b) => sort.cmp(a, b) || b.airPpm - a.airPpm);
  }, [query, site, status, sort]);

  return (
    <>
      <ViewHeading
        title={t("Daftar Tangki", "Tank List")}
        subtitle={t(`${rows.length} dari ${TANGKI.length} tangki, diurutkan dari ${sort.desc.id}`, `${rows.length} of ${TANGKI.length} tanks, sorted by ${sort.desc.en}`)}
      />

      <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <label className="relative flex-1 basis-60">
          <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-900" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("Cari kode atau lokasi tangki", "Search tank code or location")}
            className="w-full border-b border-slate-300 bg-transparent py-2 pl-6 text-sm outline-none placeholder:text-slate-400 focus:border-brand-700"
          />
        </label>
        <select
          value={site}
          onChange={(e) => setSite(e.target.value)}
          className="border-b border-slate-300 bg-transparent py-2 text-sm outline-none focus:border-brand-700"
          aria-label={t("Pilih site", "Select site")}
        >
          <option value="">{t("Semua Site", "All Sites")}</option>
          {SITE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
        <label className="flex items-center gap-2 text-sm">
          <ArrowUpDown className="h-4 w-4 flex-none text-neutral-900" aria-hidden />
          <span className="sr-only">{t("Urutkan", "Sort by")}</span>
          <select
            value={urutan}
            onChange={(e) => setUrutan(e.target.value as Urutan)}
            className="border-b border-slate-300 bg-transparent py-2 text-sm outline-none focus:border-brand-700"
          >
            {URUTAN.map((u) => <option key={u.id} value={u.id}>{t(u.label)}</option>)}
          </select>
        </label>
        <div className="flex gap-4 text-sm" role="group" aria-label="Status">
          {STATUS_FILTER.map((s) => (
            <button
              key={s.id || "all"}
              type="button"
              onClick={() => setStatus(s.id)}
              aria-pressed={status === s.id}
              className={cn("border-b-2 py-1 transition-colors", status === s.id ? "border-brand-700 font-semibold text-brand-950" : "border-transparent text-neutral-900 hover:text-brand-950")}
            >
              {t(s.id_, s.en)}
            </button>
          ))}
        </div>
      </div>

      <TankTable2 site="" rows={rows} plain onSelect={setSelected} />
      {selected && <TankDetailPopup tangki={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
