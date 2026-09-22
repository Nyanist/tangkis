export const AMBANG = { kuningMulai: 220, batas: 300 };

// Shared by every Daftar Tangki table's legend (/dashboard and /dashboard-2).
export const LEGENDA_AMBANG = [
  { label: "Hijau di bawah 220 ppm*", warna: "#6aa84f" },
  { label: "Kuning 220–300 ppm*", warna: "#E9A21B" },
  { label: "Merah di atas 300 ppm*", warna: "#D64545" },
];

// Shared bar ceiling for ppm progress bars (TankTable, ProfilLokasiPanel) — independent
// of any one tank's trend range, since those bars compare all tanks on one scale.
export const SKALA_TAMPILAN_PPM = 450;

export type StatusTangki = "MERAH" | "KUNING" | "HIJAU";

export interface Tangki {
  kode: string;
  lokasi: string;
  airPpm: number;
  suhuC: number;
  hari: number;
  status: StatusTangki;
}

export const TANGKI: Tangki[] = [
  { kode: "TK-01", lokasi: "Rumah Sakit A — Tangki Utama", airPpm: 412, suhuC: 36, hari: 187, status: "MERAH" },
  { kode: "TK-02", lokasi: "Rumah Sakit A — Day Tank", airPpm: 268, suhuC: 34, hari: 42, status: "KUNING" },
  { kode: "TK-03", lokasi: "Menara Perkantoran B — Basement", airPpm: 195, suhuC: 31, hari: 63, status: "HIJAU" },
  { kode: "TK-04", lokasi: "Menara Perkantoran B — Cadangan", airPpm: 241, suhuC: 33, hari: 96, status: "KUNING" },
  { kode: "TK-05", lokasi: "Pusat Data C — Ruang Genset 1", airPpm: 322, suhuC: 29, hari: 58, status: "MERAH" },
];

export interface TrenTangki {
  bulan: string[];
  ppm: number[];
  sumbuY: { min: number; max: number; langkah: number };
}

const BULAN = ["Apr 2026", "Mei 2026", "Jun 2026", "Jul 2026", "Agu 2026", "Sep 2026"];

// ponytail: hand-picked sumbuY per tank instead of a scaling helper — 5 small
// arrays, ranges differ too much (TK-05 tops ~180 vs TK-01 ~450) to share one
export const TREN_PER_TANGKI: Record<string, TrenTangki> = {
  "TK-01": { bulan: BULAN, ppm: [232, 261, 294, 331, 376, 412], sumbuY: { min: 200, max: 450, langkah: 50 } },
  "TK-02": { bulan: BULAN, ppm: [150, 178, 205, 231, 250, 268], sumbuY: { min: 100, max: 300, langkah: 50 } },
  "TK-03": { bulan: BULAN, ppm: [120, 140, 155, 170, 182, 195], sumbuY: { min: 100, max: 250, langkah: 50 } },
  "TK-04": { bulan: BULAN, ppm: [140, 165, 190, 210, 226, 241], sumbuY: { min: 100, max: 300, langkah: 50 } },
  "TK-05": { bulan: BULAN, ppm: [180, 210, 245, 275, 300, 322], sumbuY: { min: 150, max: 350, langkah: 50 } },
};

// Per-tank "Kesehatan Sistem" — same 4 components as the global widget below,
// but scoped to one tank's own hardware, with a simple binary reading.
export interface ItemKesehatan {
  ikon: string;
  nama: string;
  status: "ONLINE" | "OFFLINE";
}

export const KESEHATAN_PER_TANGKI: Record<string, ItemKesehatan[]> = {
  "TK-01": [
    { ikon: "sensor", nama: "Jaringan Sensor", status: "ONLINE" },
    { ikon: "gateway", nama: "Gateway ESP32", status: "ONLINE" },
    { ikon: "aliran", nama: "Aliran Data", status: "ONLINE" },
    { ikon: "pantau", nama: "Status Pemantauan", status: "ONLINE" },
  ],
  "TK-02": [
    { ikon: "sensor", nama: "Jaringan Sensor", status: "ONLINE" },
    { ikon: "gateway", nama: "Gateway ESP32", status: "ONLINE" },
    { ikon: "aliran", nama: "Aliran Data", status: "ONLINE" },
    { ikon: "pantau", nama: "Status Pemantauan", status: "ONLINE" },
  ],
  "TK-03": [
    { ikon: "sensor", nama: "Jaringan Sensor", status: "ONLINE" },
    { ikon: "gateway", nama: "Gateway ESP32", status: "ONLINE" },
    { ikon: "aliran", nama: "Aliran Data", status: "ONLINE" },
    { ikon: "pantau", nama: "Status Pemantauan", status: "ONLINE" },
  ],
  "TK-04": [
    { ikon: "sensor", nama: "Jaringan Sensor", status: "ONLINE" },
    { ikon: "gateway", nama: "Gateway ESP32", status: "OFFLINE" },
    { ikon: "aliran", nama: "Aliran Data", status: "ONLINE" },
    { ikon: "pantau", nama: "Status Pemantauan", status: "ONLINE" },
  ],
  "TK-05": [
    { ikon: "sensor", nama: "Jaringan Sensor", status: "OFFLINE" },
    { ikon: "gateway", nama: "Gateway ESP32", status: "ONLINE" },
    { ikon: "aliran", nama: "Aliran Data", status: "ONLINE" },
    { ikon: "pantau", nama: "Status Pemantauan", status: "ONLINE" },
  ],
};

// Profil Lokasi — one entry per site (matches the prefix before " — " in Tangki.lokasi)
export interface ProfilLokasi {
  alamat: string;
  pic: string;
  telepon: string;
}

export const PROFIL_LOKASI: Record<string, ProfilLokasi> = {
  "Rumah Sakit A": { alamat: "Jl. Kesehatan No. 12, Jakarta Selatan", pic: "Budi Santoso", telepon: "021-5550101" },
  "Menara Perkantoran B": { alamat: "Jl. Sudirman Kav. 45, Jakarta Pusat", pic: "Siti Rahayu", telepon: "021-5550202" },
  "Pusat Data C": { alamat: "Jl. Gatot Subroto No. 8, Jakarta Selatan", pic: "Andi Wijaya", telepon: "021-5550303" },
};

// Global "Kesehatan Sistem" widget — a coarser 3-state reading (Aktif/Nonaktif/Cek)
// covering the same 4 components across the whole fleet.
export type StatusSistem = "AKTIF" | "NONAKTIF" | "CEK";

export const STATUS_SISTEM: { ikon: string; nama: string; status: StatusSistem }[] = [
  { ikon: "sensor", nama: "Jaringan Sensor", status: "AKTIF" },
  { ikon: "gateway", nama: "Gateway ESP32", status: "AKTIF" },
  { ikon: "aliran", nama: "Aliran Data", status: "AKTIF" },
  { ikon: "pantau", nama: "Status Pemantauan", status: "AKTIF" },
];

// ponytail: lives here, not a new lib/data/mitra.ts — 3 records, split out only if it grows independently
export interface Mitra {
  id: string;
  nama: string;
  email: string;
}

export const MITRA: Mitra[] = [
  { id: "m1", nama: "PT Bersih Tangki Nusantara", email: "ops@bersihtangki.co.id" },
  { id: "m2", nama: "CV Mitra Genset Prima", email: "cs@mitragenset.id" },
  { id: "m3", nama: "PT Layanan Bahan Bakar Sejahtera", email: "layanan@lbbs.co.id" },
];

export const CATATAN_AMBANG =
  "*mengacu pada spesifikasi B50 Kepmen ESDM 257/2026 untuk bahan bakar saat diserahkan.";

export const TANGGAL_PEMBARUAN = "17 September 2026, 20.14.32";
