// English renderings of the Indonesian strings in dashboard.ts / dashboard2.ts. The data files keep
// their Indonesian values as the source of truth (they double as lookup keys elsewhere, e.g. status
// codes), so translation happens at render time: t(value, DATA_EN[value] ?? value).

export const STATUS_EN: Record<string, string> = {
  HIJAU: "GREEN",
  KUNING: "YELLOW",
  MERAH: "RED",
  AKTIF: "ACTIVE",
  NONAKTIF: "INACTIVE",
  CEK: "CHECK",
};

// What a tank status is called on screen, everywhere on /dashboard: t(LABEL_STATUS[tk.status]).
export const LABEL_STATUS: Record<string, { id: string; en: string }> = {
  MERAH: { id: "Kritis", en: "Critical" },
  KUNING: { id: "Kuning", en: "Yellow" },
  HIJAU: { id: "Normal", en: "Normal" },
};

export const DATA_EN: Record<string, string> = {
  "Jaringan Sensor": "Sensor Network",
  "Aliran Data": "Data Flow",
  "Status Pemantauan": "Monitoring Status",
  "Hijau di bawah 220 ppm*": "Green below 220 ppm*",
  "Kuning 220 sampai 300 ppm*": "Yellow 220 to 300 ppm*",
  "Merah di atas 300 ppm*": "Red above 300 ppm*",
  "*mengacu pada spesifikasi B50 Kepmen ESDM 257/2026 untuk bahan bakar saat diserahkan.":
    "*refers to the B50 specification of Kepmen ESDM 257/2026 for fuel at the time of handover.",
  "Genset 1 & 2 (Paralel EX1)": "Generator 1 & 2 (Parallel EX1)",
  "Genset 3 (Tunggal)": "Generator 3 (Single)",
  "Genset Darurat 2": "Emergency Generator 2",
  "17 September 2026, 20.14.32": "September 17, 2026, 20:14:32",
  "Mei 2026": "May 2026",
  "Agu 2026": "Aug 2026",
};
