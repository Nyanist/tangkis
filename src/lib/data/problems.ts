import { Zap, Lock, TrendingDown } from "lucide-react";

export const problems = [
  {
    id: 1,
    icon: Zap,
    title: "Genset gagal saat dibutuhkan",
    description:
      "Bahan bakar yang mengendap berbulan-bulan terkontaminasi air — genset macet tepat saat listrik padam.",
  },
  {
    id: 2,
    icon: Lock,
    title: "Inspeksi manual & sporadis",
    description:
      "Pengecekan tangki dilakukan manual, jarang, dan tidak terdokumentasi. Masalah baru ketahuan setelah terlambat.",
  },
  {
    id: 3,
    icon: TrendingDown,
    title: "Tak ada tren kualitas",
    description:
      "Tanpa data historis kadar air dan suhu, pengelola tak bisa memprediksi kapan tangki perlu dibersihkan.",
  },
];
