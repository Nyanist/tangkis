"use client";
import { Building2, Download } from "lucide-react";
import { PROFIL_LOKASI2 } from "@/lib/data/dashboard2";

// No site dropdown here — the page's one site filter already lives under
// Bottleneck Site. No "Kirim Permintaan Pembersihan" here either — Active
// Alert already has that button, don't duplicate it.
export default function ProfilLokasiCard({ site }: { site: string }) {
  const profil = site ? PROFIL_LOKASI2[site] : undefined;

  return (
    <section aria-labelledby="judul-profil2" className="rounded-lg border border-brand-100 bg-white p-4 md:p-5">
      <h2 id="judul-profil2" className="mb-3 flex items-center gap-2 font-semibold text-brand-950">
        <Building2 className="h-4.5 w-4.5 text-brand-700" />
        Profil Lokasi
      </h2>

      {!profil ? (
        <p className="text-sm text-[#5A6B7B]">Pilih site di atas untuk melihat profil lokasi.</p>
      ) : (
        <>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
            <dt className="text-[#5A6B7B]">Alamat</dt>
            <dd className="text-right font-semibold">{profil.alamat}</dd>
            <dt className="text-[#5A6B7B]">Penanggung Jawab</dt>
            <dd className="text-right font-semibold">{profil.pic}</dd>
            <dt className="text-[#5A6B7B]">Telepon</dt>
            <dd className="text-right font-semibold">{profil.telepon}</dd>
          </dl>
          <button
            type="button"
            className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-brand-100 bg-white px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            <Download className="h-4 w-4" />
            Unduh Laporan Bulanan
          </button>
        </>
      )}
    </section>
  );
}
