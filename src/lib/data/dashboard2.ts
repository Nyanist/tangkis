// Extra mock fields for /dashboard-2 (a layout comparison page, see
// public/full-dashboard-reference.jpeg). Core tank data stays in dashboard.ts —
// this file only adds the fields that reference layout shows and dashboard.ts
// doesn't have (capacity, genset wiring, a secondary "day tank" list).
import { TANGKI, type Tangki } from "./dashboard";

export interface DetailTangki {
  kode: string;
  siteLabel: string;
  kapasitas: string;
  koneksiGenset: string;
}

// Display-only override of the TK-0x codes/labels from dashboard.ts, matching
// public/reference-db-content.jpeg's "Rekomendasi Pengganti" column — dashboard.ts
// (TANGKI) stays untouched since /dashboard still uses its original TK-0x data.
export const DETAIL_PER_TANGKI: Record<string, DetailTangki> = {
  "TK-01": { kode: "T-101", siteLabel: "RS Medika Center — Main Storage", kapasitas: "20 kL", koneksiGenset: "Genset 1 & 2 (Paralel EX1)" },
  "TK-02": { kode: "DT-101", siteLabel: "RS Medika Center — Day Tank Genset #1", kapasitas: "2 kL", koneksiGenset: "Genset 1 & 2 (Paralel EX1)" },
  "TK-03": { kode: "T-B2-01", siteLabel: "Sudirman Office Tower — Basement 2", kapasitas: "10 kL", koneksiGenset: "Genset 3 (Tunggal)" },
  "TK-04": { kode: "T-RF-02", siteLabel: "Sudirman Office Tower — Rooftop Reserve", kapasitas: "5 kL", koneksiGenset: "Genset 3 (Tunggal)" },
  "TK-05": { kode: "T-DC-A1", siteLabel: "Cikarang Data Center — Genset Zone A", kapasitas: "50 kL", koneksiGenset: "Genset Darurat 2" },
};

// Facility name is the part of siteLabel before " — " (e.g. "RS Medika Center —
// Main Storage" -> "RS Medika Center"). Shared by the site filter dropdown and
// the table it filters, so they always agree on what a "site" is.
export const facilityOf = (siteLabel: string) => siteLabel.split(" — ")[0];

export const SITE_OPTIONS = Array.from(
  new Set(Object.values(DETAIL_PER_TANGKI).map((d) => facilityOf(d.siteLabel)))
);

// Shared by Daftar Tangki and Active Alert so they always agree on which
// tanks are "currently shown" for a given site filter (empty site = all).
export function tangkiForSite(site: string): Tangki[] {
  return site ? TANGKI.filter((t) => facilityOf(DETAIL_PER_TANGKI[t.kode]?.siteLabel ?? "") === site) : TANGKI;
}

// ponytail: "day tank" isn't a separate category in our data model — reusing 3 of
// the 5 TANGKI rows with a day-tank-style label, rather than inventing a parallel
// tank type just for this one reference card.
export interface DayTank {
  tangki: Tangki;
  label: string;
}

export const DAY_TANK_LIST: DayTank[] = [
  { tangki: TANGKI[0], label: "RSH-DAY-01 (RS Harapan Kita — Genset 1)" },
  { tangki: TANGKI[2], label: "TWR-DAY-C2 (Menara Navis — Genset 3)" },
  { tangki: TANGKI[4], label: "DC1-DAY-EDG2 (Data Center — Genset Darurat 2)" },
];

// Decorative only — no filtering logic wired, matches the reference's two
// top-bar dropdowns. ponytail: static options, not a real org/site hierarchy.
export const PROVINSI_OPTIONS = ["PT Rahayani — Nasional", "PT Rahayani — Jawa & Bali"];
