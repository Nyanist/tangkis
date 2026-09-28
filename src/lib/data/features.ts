import { Droplets, ListOrdered, Gauge, LineChart, ClipboardList } from "lucide-react";

export const features = [
  {
    id: 1,
    icon: Droplets,
    title: "Deteksi air di dasar tangki",
    description:
      "Probe mendeteksi lapisan air bebas yang mengendap di dasar tangki beserta riwayat suhu penyimpanannya, dengan hasil ditampilkan sebagai estimasi tingkat kandungan air, bukan pembacaan langsung, karena metode pengukurannya berbeda dari uji laboratorium.",
  },
  {
    id: 2,
    icon: ListOrdered,
    title: "Tangki mana yang berisiko bulan ini",
    description:
      "Dasbor mengurutkan seluruh tangki berdasarkan risiko, sehingga pemeriksaan bisa diarahkan ke yang paling perlu lebih dulu. Inilah yang membedakan TANGKIS dari layanan pembersihan tangki yang sudah ada, karena layanan tersebut baru bertindak setelah ada kecurigaan kerusakan, sedangkan TANGKIS memberi tahu lebih awal.",
  },
  {
    id: 3,
    icon: Gauge,
    title: "Status hijau, kuning, merah per tangki",
    description:
      "Status disusun dari tiga hal yang terukur, yaitu tebal lapisan air, lama bahan bakar mengendap sejak pengisian terakhir, dan ayunan suhu harian yang memicu pengembunan.",
  },
  {
    id: 4,
    icon: LineChart,
    title: "Riwayat dan tren tiap tangki",
    description:
      "Grafik menunjukkan perkembangan kondisi tiap tangki dari waktu ke waktu, memudahkan pengelola gedung melihat kapan tren mulai memburuk sebelum sampai ke status merah.",
  },
  {
    id: 5,
    icon: ClipboardList,
    title: "Laporan dan jalur tindak lanjut",
    description:
      "Rekap kondisi tiap tangki siap diunduh untuk kebutuhan audit, dan tangki berstatus merah dapat diteruskan ke mitra pembersihan bahan bakar.",
  },
];
