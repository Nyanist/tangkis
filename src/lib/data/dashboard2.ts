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

// Display kode/siteLabel for a tank, falling back to its raw dashboard.ts values
// when no DETAIL_PER_TANGKI override exists. Single source so every /dashboard
// component (Daftar Tangki, Bottleneck Site, Active Alert) shows the same naming.
export function displayInfo(t: Tangki) {
  const d = DETAIL_PER_TANGKI[t.kode];
  return { kode: d?.kode ?? t.kode, siteLabel: d?.siteLabel ?? t.lokasi };
}

// Shared by Daftar Tangki and Active Alert so they always agree on which
// tanks are "currently shown" for a given site filter (empty site = all).
export function tangkiForSite(site: string): Tangki[] {
  return site ? TANGKI.filter((t) => facilityOf(DETAIL_PER_TANGKI[t.kode]?.siteLabel ?? "") === site) : TANGKI;
}

export interface ProfilLokasi2 {
  alamat: string;
  pic: string;
  telepon: string;
}

// Keyed by SITE_OPTIONS facility names, reusing dashboard.ts's PROFIL_LOKASI
// values from the site each facility replaced (RS Medika Center was "Rumah
// Sakit A", etc. — see DETAIL_PER_TANGKI above) rather than inventing new PIC/phone data.
export const PROFIL_LOKASI2: Record<string, ProfilLokasi2> = {
  "RS Medika Center": { alamat: "Jl. Kesehatan No. 12, Jakarta Selatan", pic: "Budi Santoso", telepon: "021-5550101" },
  "Sudirman Office Tower": { alamat: "Jl. Sudirman Kav. 45, Jakarta Pusat", pic: "Siti Rahayu", telepon: "021-5550202" },
  "Cikarang Data Center": { alamat: "Jl. Gatot Subroto No. 8, Jakarta Selatan", pic: "Andi Wijaya", telepon: "021-5550303" },
};

// Decorative only — no filtering logic wired, matches the reference's two
// top-bar dropdowns. ponytail: static options, not a real org/site hierarchy.
export const PROVINSI_OPTIONS = ["PT Rahayani — Nasional", "PT Rahayani — Jawa & Bali"];
