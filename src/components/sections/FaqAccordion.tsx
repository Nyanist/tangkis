"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang, type L } from "@/lib/i18n";

// First six questions/answers are the original set from the template; the rest are TANGKIS-specific additions.
const FAQS: { q: L; a: L }[] = [
  {
    q: { id: "Apa tujuan dari website ini?", en: "What is the purpose of this website?" },
    a: {
      id: "Website ini memperkenalkan TANGKIS, sistem pemantauan kualitas bahan bakar untuk genset cadangan, sekaligus menjadi pintu masuk ke dasbor pemantauannya.",
      en: "This website showcases TANGKIS, a fuel-quality monitoring system for backup generators, and gives access to its monitoring dashboard.",
    },
  },
  {
    q: { id: "Bagaimana cara menghubungi tim dukungan?", en: "How do I contact support?" },
    a: {
      id: "Kirim email ke tangkis.tech@gmail.com atau kirim pesan lewat Instagram @tangkis.tech, dan tim kami akan membalas secepatnya.",
      en: "Email tangkis.tech@gmail.com or message us on Instagram @tangkis.tech, and our team will get back to you as soon as possible.",
    },
  },
  {
    q: { id: "Bagaimana cara menemukan produk terbaik?", en: "How do I find the best products?" },
    a: {
      id: "Lihat bagian Fitur Utama di beranda, atau hubungi tim kami untuk mendapatkan rekomendasi yang sesuai kebutuhan Anda.",
      en: "Browse the Key Features section on the homepage, or reach out to our team for a personalized recommendation.",
    },
  },
  {
    q: { id: "Apakah produk bisa dikembalikan?", en: "Can I return a product?" },
    a: {
      id: "Pengembalian diterima dalam 30 hari setelah barang diterima, selama barang belum digunakan dan masih dalam kemasan asli.",
      en: "Returns are accepted within 30 days of delivery, provided the item is unused and in its original packaging.",
    },
  },
  {
    q: { id: "Apakah tersedia pengiriman internasional?", en: "Do you offer international shipping?" },
    a: {
      id: "Ya, kami mengirim ke sebagian besar negara. Biaya dan lama pengiriman bergantung pada tujuan.",
      en: "Yes, we ship to most countries. Shipping cost and delivery time vary by destination.",
    },
  },
  {
    q: { id: "Bagaimana cara melacak pesanan saya?", en: "How can I track my order?" },
    a: {
      id: "Setelah pesanan dikirim, Anda akan menerima tautan pelacakan lewat email.",
      en: "Once your order ships, you will receive a tracking link by email.",
    },
  },
  {
    q: { id: "Apa itu TANGKIS?", en: "What is TANGKIS?" },
    a: {
      id: "TANGKIS adalah sistem pemantauan kualitas bahan bakar yang melacak kondisi solar di tangki genset cadangan, sehingga penurunan kualitas terdeteksi sebelum menyebabkan kegagalan.",
      en: "TANGKIS is a fuel-quality monitoring system that tracks the condition of diesel stored in backup generator tanks, so degradation is caught before it causes a failure.",
    },
  },
  {
    q: { id: "Untuk siapa TANGKIS dibuat?", en: "Who is TANGKIS built for?" },
    a: {
      id: "Fasilitas yang bergantung pada genset cadangan, seperti rumah sakit, pusat data, menara telekomunikasi, dan pabrik, di mana pemadaman mendadak sangat merugikan.",
      en: "Facilities that depend on backup generators, such as hospitals, data centers, telecom sites and industrial plants, where an unexpected outage is costly.",
    },
  },
  {
    q: { id: "Bagaimana cara mengakses dasbor?", en: "How do I access the dashboard?" },
    a: {
      id: "Masuk lewat halaman Login dengan akun terdaftar Anda. Jika belum punya akun, hubungi kami dan kami akan membantu menyiapkannya.",
      en: "Sign in from the Login page with your registered account. If you do not have one yet, contact us and we will help you get set up.",
    },
  },
  {
    q: { id: "Seberapa sering data tangki diperbarui?", en: "How often is the tank data updated?" },
    a: {
      id: "Pembacaan sensor diperbarui terus-menerus dan ditampilkan di dasbor, lengkap dengan status terbaru tiap tangki.",
      en: "Sensor readings are refreshed continuously and shown on the dashboard, along with the latest status of each tank.",
    },
  },
  {
    q: { id: "Apakah bisa memantau lebih dari satu lokasi?", en: "Can I monitor more than one location?" },
    a: {
      id: "Bisa. Dasbor memungkinkan Anda berpindah antar lokasi dan membandingkan kondisi bahan bakar seluruh tangki di satu tempat.",
      en: "Yes. The dashboard lets you switch between locations and compare the fuel condition of every tank in one place.",
    },
  },
];

export default function FaqAccordion() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-brand-100 border-y border-brand-100">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q.en}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-4 py-6 text-left"
            >
              <h3
                className={cn(
                  "text-base font-semibold transition-colors md:text-lg",
                  isOpen ? "text-brand-700" : "text-brand-950 group-hover:text-brand-700"
                )}
              >
                {t(item.q)}
              </h3>
              <ChevronDown
                className={cn("h-5 w-5 flex-none text-brand-700 transition-transform duration-300", isOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            <div className="accordion-content" data-open={isOpen}>
              <div className="overflow-hidden">
                <p className="pb-6 pr-9 font-description text-[#5A6B7B]">{t(item.a)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
