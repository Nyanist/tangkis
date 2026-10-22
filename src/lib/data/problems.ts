import { Zap, Lock, TrendingDown } from "lucide-react";
import type { L } from "@/lib/i18n";

export const problems: { id: number; icon: typeof Zap; image: string; title: L; description: L }[] = [
  {
    id: 1,
    icon: Zap,
    image: "/masalah-1.webp",
    title: { id: "Kegagalan Start Saat Darurat", en: "Failure to Start in an Emergency" },
    description: {
      id: "Solar yang mengendap lama memicu kondensasi air di tangki. Filter tersumbat dan genset mogok seketika justru saat suplai listrik PLN terputus.",
      en: "Diesel that sits for a long time causes water to condense in the tank. Filters clog and the generator stalls at the very moment grid power is cut.",
    },
  },
  {
    id: 2,
    icon: Lock,
    image: "/masalah-2.webp",
    title: { id: "Inspeksi Manual yang Tidak Terukur", en: "Unmeasurable Manual Inspections" },
    description: {
      id: "Pengambilan sampel fisik berkala memakan waktu, jarang terdokumentasi rapi, dan sering kali terlambat mendeteksi pembusukan bahan bakar.",
      en: "Periodic physical sampling is time-consuming, rarely documented properly, and often detects fuel degradation too late.",
    },
  },
  {
    id: 3,
    icon: TrendingDown,
    image: "/masalah-3.webp",
    title: { id: "Perawatan Bersifat Reaktif", en: "Reactive Maintenance" },
    description: {
      id: "Tanpa data tren kadar air dan suhu harian, tindakan purging atau pembersihan tangki baru dilakukan setelah kontaminasi merusak injektor mesin.",
      en: "Without daily water-content and temperature trend data, purging or tank cleaning only happens after contamination has damaged the engine injectors.",
    },
  },
];
