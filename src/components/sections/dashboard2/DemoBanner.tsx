"use client";
import { useLang } from "@/lib/i18n";

export default function DemoBanner() {
  const { t } = useLang();
  return (
    <p className="border-b border-[#E9A21B]/40 bg-[#FBEED6] px-4 pb-2 pt-20 text-center text-xs font-semibold text-[#8A5A00] md:px-6 lg:pt-24">
      {t(
        "Data yang ditampilkan pada halaman ini adalah data contoh untuk keperluan demonstrasi.",
        "The data shown on this page is sample data for demonstration purposes."
      )}
    </p>
  );
}
