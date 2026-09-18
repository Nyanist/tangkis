export const AMBANG = { kuningMulai: 220, batas: 300 };

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
  { kode: "TK-05", lokasi: "Pusat Data C — Ruang Genset 1", airPpm: 158, suhuC: 29, hari: 21, status: "HIJAU" },
];

export const TREN = {
  kode: "TK-01",
  judul: "Tren Kadar Air — TK-01 (Rumah Sakit A, Tangki Utama)",
  bulan: ["Apr 2026", "Mei 2026", "Jun 2026", "Jul 2026", "Agu 2026", "Sep 2026"],
  ppm: [232, 261, 294, 331, 376, 412],
  sumbuY: { min: 200, max: 450, langkah: 50 },
};

export const PERINGATAN = {
  kode: "TK-01",
  tenggatPembersihanHari: 14,
  rekomendasiTindakan: "Inspeksi dan pembersihan tangki",
};

export const STATUS_SISTEM = [
  { ikon: "sensor", nama: "Jaringan sensor", nilai: "ONLINE", kondisi: "ok" },
  { ikon: "gateway", nama: "Gateway ESP32", nilai: "ONLINE", kondisi: "ok" },
  { ikon: "aliran", nama: "Aliran data", nilai: "LIVE", kondisi: "info" },
  { ikon: "pantau", nama: "Status pemantauan", nilai: "AKTIF", kondisi: "ok" },
] as const;

export const CATATAN_AMBANG =
  "Ambang: Hijau di bawah 220 ppm, Kuning 220–300 ppm, Merah di atas 300 ppm. " +
  "Batas 300 ppm mengacu spesifikasi B50 Kepmen ESDM 257/2026 untuk bahan bakar saat diserahkan.";

export const TANGGAL_PEMBARUAN = "17 September 2026, 20.14.32";
