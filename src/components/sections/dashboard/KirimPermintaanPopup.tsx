"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { MITRA, type Tangki } from "@/lib/data/dashboard";
import { useEscapeToClose } from "@/lib/useEscapeToClose";

// ponytail: no validation, no mailto: — confirmed UI-only mock
export default function KirimPermintaanPopup({ daftarTangki, onClose }: { daftarTangki: Tangki[]; onClose: () => void }) {
  const [to, setTo] = useState(MITRA[0].id);
  const [subjek, setSubjek] = useState<string[]>(
    daftarTangki.filter((t) => t.status === "MERAH" || t.status === "KUNING").map((t) => t.kode)
  );
  const [body, setBody] = useState("");

  useEscapeToClose(onClose);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" className="w-full max-w-lg rounded-lg border border-brand-100 bg-white p-5" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-brand-950">Kirim Permintaan Pembersihan</h2>
          <button type="button" onClick={onClose} aria-label="Tutup" className="rounded p-1 text-[#5A6B7B] hover:bg-brand-100/60">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-3">
          <label className="grid gap-1 text-sm">
            <span className="text-xs font-semibold text-[#5A6B7B]">Kepada</span>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="rounded-md border border-brand-100 px-3 py-2"
            >
              {MITRA.map((m) => (
                <option key={m.id} value={m.id}>{m.nama} — {m.email}</option>
              ))}
            </select>
          </label>
          <div className="grid gap-1 text-sm">
            <span className="text-xs font-semibold text-[#5A6B7B]">Subjek — pilih tangki</span>
            <div className="grid gap-1.5 rounded-md border border-brand-100 px-3 py-2 max-h-40 overflow-y-auto">
              {daftarTangki.map((t) => (
                <label key={t.kode} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={subjek.includes(t.kode)}
                    onChange={(e) =>
                      setSubjek((prev) =>
                        e.target.checked ? [...prev, t.kode] : prev.filter((kode) => kode !== t.kode)
                      )
                    }
                  />
                  {t.kode} — {t.status} ({t.airPpm} ppm)
                </label>
              ))}
            </div>
          </div>
          <label className="grid gap-1 text-sm">
            <span className="text-xs font-semibold text-[#5A6B7B]">Pesan</span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder="Tulis rincian permintaan di sini..."
              className="rounded-md border border-brand-100 px-3 py-2"
            />
          </label>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={onClose} className="rounded-md border border-brand-100 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
            Batal
          </button>
          <button type="button" onClick={onClose} className="rounded-md bg-brand-700 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-800">
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
