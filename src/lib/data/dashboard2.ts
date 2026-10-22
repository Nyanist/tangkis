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
  "TK-01": { kode: "T-101", siteLabel: "RS Medika Center, Main Storage", kapasitas: "20 kL", koneksiGenset: "Genset 1 & 2 (Paralel EX1)" },
  "TK-02": { kode: "DT-101", siteLabel: "RS Medika Center, Day Tank Genset #1", kapasitas: "2 kL", koneksiGenset: "Genset 1 & 2 (Paralel EX1)" },
  "TK-03": { kode: "T-B2-01", siteLabel: "Sudirman Office Tower, Basement 2", kapasitas: "10 kL", koneksiGenset: "Genset 3 (Tunggal)" },
  "TK-04": { kode: "T-RF-02", siteLabel: "Sudirman Office Tower, Rooftop Reserve", kapasitas: "5 kL", koneksiGenset: "Genset 3 (Tunggal)" },
  "TK-05": { kode: "T-DC-A1", siteLabel: "Cikarang Data Center, Genset Zone A", kapasitas: "50 kL", koneksiGenset: "Genset Darurat 2" },
  "TK-06": { kode: "T-DC-A2", siteLabel: "Cikarang Data Center, Genset Zone A2", kapasitas: "50 kL", koneksiGenset: "Genset Darurat 2" },
  "TK-07": { kode: "T-DC-B1", siteLabel: "Cikarang Data Center, Genset Zone B", kapasitas: "30 kL", koneksiGenset: "Genset 3 (Tunggal)" },
  "TK-08": { kode: "T-SBY-01", siteLabel: "RS Medika Surabaya, Main Storage", kapasitas: "20 kL", koneksiGenset: "Genset 1 & 2 (Paralel EX1)" },
  "TK-09": { kode: "DT-SBY-01", siteLabel: "RS Medika Surabaya, Day Tank Genset #1", kapasitas: "2 kL", koneksiGenset: "Genset 1 & 2 (Paralel EX1)" },
  "TK-10": { kode: "T-BDG-01", siteLabel: "Dago Office Park, Basement 1", kapasitas: "8 kL", koneksiGenset: "Genset 3 (Tunggal)" },
  "TK-11": { kode: "T-DPS-01", siteLabel: "Nusa Dua Resort Complex, Main Storage", kapasitas: "15 kL", koneksiGenset: "Genset 1 & 2 (Paralel EX1)" },
  "TK-12": { kode: "T-DPS-02", siteLabel: "Nusa Dua Resort Complex, Laundry Annex", kapasitas: "5 kL", koneksiGenset: "Genset 3 (Tunggal)" },
  "TK-13": { kode: "T-MDN-01", siteLabel: "Medan Medical Center, Main Storage", kapasitas: "20 kL", koneksiGenset: "Genset 1 & 2 (Paralel EX1)" },
  "TK-14": { kode: "DT-MDN-01", siteLabel: "Medan Medical Center, Day Tank Genset #1", kapasitas: "2 kL", koneksiGenset: "Genset 1 & 2 (Paralel EX1)" },
  "TK-15": { kode: "T-PLM-01", siteLabel: "Palembang Distribution Hub, Warehouse Genset", kapasitas: "10 kL", koneksiGenset: "Genset 3 (Tunggal)" },
  "TK-16": { kode: "T-BPN-01", siteLabel: "Balikpapan Logistics Base, Main Storage", kapasitas: "40 kL", koneksiGenset: "Genset 1 & 2 (Paralel EX1)" },
  "TK-17": { kode: "T-BPN-02", siteLabel: "Balikpapan Logistics Base, Workshop Reserve", kapasitas: "5 kL", koneksiGenset: "Genset Darurat 2" },
  "TK-18": { kode: "T-PNK-01", siteLabel: "Pontianak Cold Storage, Genset Room", kapasitas: "12 kL", koneksiGenset: "Genset 3 (Tunggal)" },
  "TK-19": { kode: "T-MKS-01", siteLabel: "Makassar Port Terminal, Main Storage", kapasitas: "30 kL", koneksiGenset: "Genset 1 & 2 (Paralel EX1)" },
  "TK-20": { kode: "DT-MKS-01", siteLabel: "Makassar Port Terminal, Crane Day Tank", kapasitas: "3 kL", koneksiGenset: "Genset Darurat 2" },
  "TK-21": { kode: "T-MDO-01", siteLabel: "Manado Data Center, Genset Zone A", kapasitas: "25 kL", koneksiGenset: "Genset Darurat 2" },
};

// Facility name is the part of siteLabel before the first comma (e.g. "RS Medika Center,
// Main Storage" -> "RS Medika Center"). Shared by the site filter dropdown and
// the table it filters, so they always agree on what a "site" is.
export const facilityOf = (siteLabel: string) => siteLabel.split(", ")[0];

export const SITE_OPTIONS = Array.from(
  new Set(Object.values(DETAIL_PER_TANGKI).map((d) => facilityOf(d.siteLabel)))
);

// Shown labels put the part of the site in brackets: "RS Medika Center, Main Storage" -> "RS Medika Center (Main Storage)".
// The raw comma form stays in the data because facilityOf() splits on it.
export const formatSiteLabel = (raw: string) => {
  const [fasilitas, ...bagian] = raw.split(", ");
  return bagian.length ? `${fasilitas} (${bagian.join(", ")})` : fasilitas;
};

// Display kode/siteLabel for a tank, falling back to its raw dashboard.ts values
// when no DETAIL_PER_TANGKI override exists. Single source so every /dashboard
// component (Daftar Tangki, Bottleneck Site, Active Alert) shows the same naming.
// `fasilitas` and `bagian` are the two halves of the label, for places that show them apart.
export function displayInfo(t: Tangki) {
  const d = DETAIL_PER_TANGKI[t.kode];
  const raw = d?.siteLabel ?? t.lokasi;
  const [fasilitas, ...bagian] = raw.split(", ");
  return { kode: d?.kode ?? t.kode, siteLabel: formatSiteLabel(raw), fasilitas, bagian: bagian.join(", ") };
}

// Shared by every /dashboard widget so they always agree on which tanks are
// "currently shown" for the site and region filters (empty = all).
export function tangkiForSite(site: string, wilayah: Wilayah | "" = ""): Tangki[] {
  return TANGKI.filter((t) => {
    const f = facilityOf(DETAIL_PER_TANGKI[t.kode]?.siteLabel ?? "");
    return (!site || f === site) && (!wilayah || PROFIL_LOKASI2[f]?.wilayah === wilayah);
  });
}

export type Wilayah = "Jawa & Bali" | "Sumatera" | "Kalimantan" | "Sulawesi";
export const WILAYAH: Wilayah[] = ["Jawa & Bali", "Sumatera", "Kalimantan", "Sulawesi"];

export interface ProfilLokasi2 {
  alamat: string;
  pic: string;
  telepon: string;
  kota: string;
  wilayah: Wilayah;
  /** [longitude, latitude] of the street address (geocoded with OpenStreetMap Nominatim), for the map */
  koordinat: [number, number];
}

// One entry per facility in SITE_OPTIONS. The first three keep the PIC and phone data they had before the demo grew.
export const PROFIL_LOKASI2: Record<string, ProfilLokasi2> = {
  "RS Medika Center": { alamat: "Jl. Kesehatan No. 12, Jakarta Selatan", pic: "Budi Santoso", telepon: "021-5550101", kota: "Jakarta Selatan", wilayah: "Jawa & Bali", koordinat: [106.7927, -6.2677] },
  "Sudirman Office Tower": { alamat: "Jl. Sudirman Kav. 45, Jakarta Pusat", pic: "Siti Rahayu", telepon: "021-5550202", kota: "Jakarta Pusat", wilayah: "Jawa & Bali", koordinat: [106.8214, -6.21] },
  "Cikarang Data Center": { alamat: "Jl. Industri Selatan 3 Blok GG, Cikarang", pic: "Andi Wijaya", telepon: "021-5550303", kota: "Bekasi", wilayah: "Jawa & Bali", koordinat: [107.1591, -6.3025] },
  "RS Medika Surabaya": { alamat: "Jl. Raya Darmo No. 90, Surabaya", pic: "Dewi Lestari", telepon: "031-5550404", kota: "Surabaya", wilayah: "Jawa & Bali", koordinat: [112.7389, -7.2975] },
  "Dago Office Park": { alamat: "Jl. Ir. H. Juanda No. 120, Bandung", pic: "Rizky Pratama", telepon: "022-5550505", kota: "Bandung", wilayah: "Jawa & Bali", koordinat: [107.6214, -6.8657] },
  "Nusa Dua Resort Complex": { alamat: "Kawasan Pariwisata Nusa Dua Lot N4, Badung", pic: "Made Wirawan", telepon: "0361-5550606", kota: "Badung, Bali", wilayah: "Jawa & Bali", koordinat: [115.2239, -8.8017] },
  "Medan Medical Center": { alamat: "Jl. Gatot Subroto No. 210, Medan", pic: "Hendra Siregar", telepon: "061-5550707", kota: "Medan", wilayah: "Sumatera", koordinat: [98.6452, 3.5906] },
  "Palembang Distribution Hub": { alamat: "Jl. Mayor Zen No. 15, Palembang", pic: "Rina Oktaviani", telepon: "0711-5550808", kota: "Palembang", wilayah: "Sumatera", koordinat: [104.8103, -2.9687] },
  "Balikpapan Logistics Base": { alamat: "Jl. Mulawarman No. 77, Balikpapan", pic: "Agus Setiawan", telepon: "0542-5550909", kota: "Balikpapan", wilayah: "Kalimantan", koordinat: [116.9564, -1.2325] },
  "Pontianak Cold Storage": { alamat: "Jl. Adi Sucipto Km 9, Kubu Raya", pic: "Yohanes Liem", telepon: "0561-5551010", kota: "Pontianak", wilayah: "Kalimantan", koordinat: [109.3784, -0.0736] },
  "Makassar Port Terminal": { alamat: "Jl. Nusantara No. 1, Makassar", pic: "Andi Rahman", telepon: "0411-5551111", kota: "Makassar", wilayah: "Sulawesi", koordinat: [119.4073, -5.1287] },
  "Manado Data Center": { alamat: "Jl. Piere Tendean No. 33, Manado", pic: "Grace Wenas", telepon: "0431-5551212", kota: "Manado", wilayah: "Sulawesi", koordinat: [124.8383, 1.4915] },
};

// Scope dropdown in the top bar: the whole company ("" = Nasional) or one region.
export const PERUSAHAAN = "PT Rahayani";
export const sitesIn = (wilayah: Wilayah | "") => SITE_OPTIONS.filter((s) => !wilayah || PROFIL_LOKASI2[s]?.wilayah === wilayah);
