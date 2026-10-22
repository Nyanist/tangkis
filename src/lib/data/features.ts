import { Droplets, ListOrdered, Gauge, LineChart, ClipboardList } from "lucide-react";
import type { L } from "@/lib/i18n";

export const features: { id: number; icon: typeof Droplets; title: L; description: L }[] = [
  {
    id: 1,
    icon: Droplets,
    title: { id: "Deteksi air di dasar tangki", en: "Water detection at the tank bottom" },
    description: {
      id: "Probe mendeteksi lapisan air bebas yang mengendap di dasar tangki beserta riwayat suhu penyimpanannya, dengan hasil ditampilkan sebagai estimasi tingkat kandungan air, bukan pembacaan langsung, karena metode pengukurannya berbeda dari uji laboratorium.",
      en: "The probe detects the free water layer that settles at the bottom of the tank along with its storage temperature history. Results are shown as an estimated water content level, not a direct reading, because the measurement method differs from laboratory testing.",
    },
  },
  {
    id: 2,
    icon: ListOrdered,
    title: { id: "Tangki mana yang berisiko bulan ini", en: "Which tanks are at risk this month" },
    description: {
      id: "Dasbor mengurutkan seluruh tangki berdasarkan risiko, sehingga pemeriksaan bisa diarahkan ke yang paling perlu lebih dulu. Inilah yang membedakan TANGKIS dari layanan pembersihan tangki yang sudah ada, karena layanan tersebut baru bertindak setelah ada kecurigaan kerusakan, sedangkan TANGKIS memberi tahu lebih awal.",
      en: "The dashboard ranks every tank by risk, so inspections can go to the ones that need it most first. This is what sets TANGKIS apart from existing tank-cleaning services: they only act once damage is suspected, while TANGKIS warns you earlier.",
    },
  },
  {
    id: 3,
    icon: Gauge,
    title: { id: "Status hijau, kuning, merah per tangki", en: "Green, yellow, red status per tank" },
    description: {
      id: "Status disusun dari tiga hal yang terukur, yaitu tebal lapisan air, lama bahan bakar mengendap sejak pengisian terakhir, dan ayunan suhu harian yang memicu pengembunan.",
      en: "Status is built from three measurable factors: the thickness of the water layer, how long the fuel has sat since the last refill, and the daily temperature swing that triggers condensation.",
    },
  },
  {
    id: 4,
    icon: LineChart,
    title: { id: "Riwayat dan tren tiap tangki", en: "History and trends for each tank" },
    description: {
      id: "Grafik menunjukkan perkembangan kondisi tiap tangki dari waktu ke waktu, memudahkan pengelola gedung melihat kapan tren mulai memburuk sebelum sampai ke status merah.",
      en: "Charts show how each tank's condition develops over time, making it easy for building managers to see when a trend starts to worsen before it reaches red status.",
    },
  },
  {
    id: 5,
    icon: ClipboardList,
    title: { id: "Laporan dan jalur tindak lanjut", en: "Reports and follow-up path" },
    description: {
      id: "Rekap kondisi tiap tangki siap diunduh untuk kebutuhan audit, dan tangki berstatus merah dapat diteruskan ke mitra pembersihan bahan bakar.",
      en: "A summary of each tank's condition is ready to download for audits, and red-status tanks can be forwarded to a fuel-cleaning partner.",
    },
  },
];
