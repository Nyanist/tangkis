import { Radio, BellRing, TrendingUp, FileText } from "lucide-react";

export const features = [
  {
    id: 1,
    icon: Radio,
    title: "Pemantauan real-time",
    description:
      "Sensor kadar air dan suhu mengirim data live via gateway ESP32 ke dashboard pusat.",
  },
  {
    id: 2,
    icon: BellRing,
    title: "Peringatan ambang otomatis",
    description:
      "Status HIJAU / KUNING / MERAH mengikuti ambang 220 & 300 ppm — peringatan keluar sebelum melewati batas spesifikasi.",
  },
  {
    id: 3,
    icon: TrendingUp,
    title: "Tren & riwayat tangki",
    description:
      "Grafik tren 6 bulan per tangki memudahkan prediksi jadwal pembersihan.",
  },
  {
    id: 4,
    icon: FileText,
    title: "Laporan & tindak lanjut",
    description:
      "Unduh laporan bulanan dan kirim permintaan pembersihan langsung dari panel peringatan.",
  },
];
