import { Zap, Lock, TrendingDown } from "lucide-react";

export const problems = [
  {
    id: 1,
    icon: Zap,
    image: "/s4-pch-card-1.webp",
    title: "Kegagalan Start Saat Darurat",
    description:
      "Solar yang mengendap lama memicu kondensasi air di tangki. Filter tersumbat dan genset mogok seketika justru saat suplai listrik PLN terputus.",
  },
  {
    id: 2,
    icon: Lock,
    image: "/s4-pch-card-2.webp",
    title: "Inspeksi Manual yang Tidak Terukur",
    description:
      "Pengambilan sampel fisik berkala memakan waktu, jarang terdokumentasi rapi, dan sering kali terlambat mendeteksi pembusukan bahan bakar.",
  },
  {
    id: 3,
    icon: TrendingDown,
    image: "/s4-pch-card-3.webp",
    title: "Perawatan Bersifat Reaktif",
    description:
      "Tanpa data tren kadar air dan suhu harian, tindakan purging atau pembersihan tangki baru dilakukan setelah kontaminasi merusak injektor mesin.",
  },
];
