"use client";
import { useState } from "react";
import { Download, Send } from "lucide-react";
import { PROFIL_LOKASI, TANGKI } from "@/lib/data/dashboard";
import KirimPermintaanPopup from "./KirimPermintaanPopup";

const NAMA_LOKASI = Object.keys(PROFIL_LOKASI);

export default function ProfilLokasiPanel({
  lokasi,
  onChangeLokasi,
}: {
  lokasi: string;
  onChangeLokasi: (nama: string) => void;
}) {
  const [showKirim, setShowKirim] = useState(false);
  const profil = PROFIL_LOKASI[lokasi];
  const daftarTangki = TANGKI.filter((t) => t.lokasi.split(" — ")[0] === lokasi);

  return (
    <aside aria-labelledby="judul-profil" className="rounded-lg border border-brand-100 bg-white p-4 md:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 id="judul-profil" className="font-semibold text-brand-950">Profil Lokasi</h2>
        <select
          value={lokasi}
          onChange={(e) => onChangeLokasi(e.target.value)}
          className="rounded-md border border-brand-100 bg-white px-2 py-1 text-sm text-[#172B3A]"
          aria-label="Pilih lokasi"
        >
          {NAMA_LOKASI.map((nama) => (
            <option key={nama} value={nama}>{nama}</option>
          ))}
        </select>
      </div>

      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
        <dt className="text-[#5A6B7B]">Alamat</dt>
        <dd className="text-right font-semibold">{profil.alamat}</dd>
        <dt className="text-[#5A6B7B]">Penanggung Jawab</dt>
        <dd className="text-right font-semibold">{profil.pic}</dd>
        <dt className="text-[#5A6B7B]">Telepon</dt>
        <dd className="text-right font-semibold">{profil.telepon}</dd>
      </dl>

      <div className="mt-4 grid gap-2">
        {daftarTangki.length > 0 && (
          <button
            type="button"
            onClick={() => setShowKirim(true)}
            className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-brand-700 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-800"
          >
            <Send className="h-4 w-4" />
            Kirim Permintaan Pembersihan
          </button>
        )}
        <button type="button" className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-brand-100 bg-white px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
          <Download className="h-4 w-4" />
          Unduh Laporan Bulanan
        </button>
      </div>

      {showKirim && <KirimPermintaanPopup daftarTangki={daftarTangki} onClose={() => setShowKirim(false)} />}
    </aside>
  );
}
