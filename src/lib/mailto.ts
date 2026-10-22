import type { Lang } from "@/lib/i18n";

export const EMAIL_TANGKIS = "tangkis.tech@gmail.com";

// Every "email us" link opens the visitor's mail app with a ready-to-send subject and body. The parts in
// [square brackets] are blanks the sender fills in before sending; everything else can go as is.
const TEMPLATE: Record<Lang, { subject: string; body: string[] }> = {
  id: {
    subject: "Permintaan Informasi TANGKIS - [Nama Instansi]",
    body: [
      "Halo Tim TANGKIS,",
      "",
      "Saya [Nama Lengkap], [Jabatan] di [Nama Instansi/Perusahaan].",
      "",
      "Kami tertarik memakai TANGKIS untuk memantau kualitas bahan bakar genset cadangan di fasilitas kami. Gambaran singkatnya:",
      "- Jenis fasilitas: [rumah sakit / pusat data / gedung perkantoran / lainnya]",
      "- Kota: [Kota]",
      "- Jumlah lokasi: [Jumlah]",
      "- Jumlah tangki genset: [Jumlah]",
      "",
      "Keperluan kami: [demo produk / penawaran harga / uji coba / pertanyaan teknis]",
      "",
      "Catatan tambahan: [Pertanyaan atau kebutuhan khusus]",
      "",
      "Saya bisa dihubungi lewat email ini atau di [Nomor Telepon/WhatsApp].",
      "",
      "Terima kasih,",
      "[Nama Lengkap]",
      "[Nama Instansi/Perusahaan]",
    ],
  },
  en: {
    subject: "TANGKIS Information Request - [Organization Name]",
    body: [
      "Hello TANGKIS Team,",
      "",
      "I am [Full Name], [Job Title] at [Organization/Company Name].",
      "",
      "We are interested in using TANGKIS to monitor the fuel quality of the backup generators at our facilities. In short:",
      "- Facility type: [hospital / data center / office building / other]",
      "- City: [City]",
      "- Number of sites: [Number]",
      "- Number of generator tanks: [Number]",
      "",
      "What we need: [product demo / price quote / pilot / technical question]",
      "",
      "Additional notes: [Questions or special requirements]",
      "",
      "You can reach me by replying to this email or at [Phone/WhatsApp Number].",
      "",
      "Thank you,",
      "[Full Name]",
      "[Organization/Company Name]",
    ],
  },
};

// mailto: link with the template in the visitor's current language. CRLF line breaks keep the
// layout intact in Outlook, Gmail and Apple Mail.
export function mailtoTangkis(lang: Lang) {
  const { subject, body } = TEMPLATE[lang];
  return `mailto:${EMAIL_TANGKIS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.join("\r\n"))}`;
}
