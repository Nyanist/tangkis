"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { MITRA, type Tangki } from "@/lib/data/dashboard";
import { useEscapeToClose } from "@/lib/useEscapeToClose";
import { useLang } from "@/lib/i18n";
import { LABEL_STATUS } from "@/lib/data/dashboardI18n";

// Demo only: nothing is sent anywhere. Send asks for at least one tank, then shows a confirmation.
export default function KirimPermintaanPopup({ daftarTangki, onClose }: { daftarTangki: Tangki[]; onClose: () => void }) {
  const { t: tr } = useLang();
  const [to, setTo] = useState(MITRA[0].id);
  const [subjek, setSubjek] = useState<string[]>(
    daftarTangki.filter((t) => t.status === "MERAH" || t.status === "KUNING").map((t) => t.kode)
  );
  const [body, setBody] = useState("");
  const [terkirim, setTerkirim] = useState(false);
  const mitra = MITRA.find((m) => m.id === to) ?? MITRA[0];

  useEscapeToClose(onClose);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="judul-kirim" className="w-full max-w-lg rounded-lg border border-brand-100 bg-white p-5" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 id="judul-kirim" className="font-semibold text-brand-950">{tr("Kirim Permintaan Pembersihan", "Send Cleaning Request")}</h2>
          <button type="button" onClick={onClose} aria-label={tr("Tutup", "Close")} className="rounded p-1 text-neutral-900 hover:bg-brand-100/60">
            <X className="h-5 w-5" />
          </button>
        </div>

        {terkirim ? (
          <div role="status">
            <p className="text-sm text-neutral-900">
              {tr(
                `Permintaan untuk ${subjek.length} tangki tercatat dan akan diteruskan ke ${mitra.nama} (${mitra.email}).`,
                `The request for ${subjek.length} tank(s) is recorded and will be forwarded to ${mitra.nama} (${mitra.email}).`
              )}
            </p>
            <p className="mt-2 text-xs text-neutral-900">{tr("Mode demo: tidak ada email yang benar-benar dikirim.", "Demo mode: no email is actually sent.")}</p>
            <button type="button" onClick={onClose} className="mt-4 w-full rounded-md bg-brand-700 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-800">
              {tr("Selesai", "Done")}
            </button>
          </div>
        ) : (
        <>
        <div className="grid gap-3">
          <label className="grid gap-1 text-sm">
            <span className="text-xs font-semibold text-neutral-900">{tr("Kepada", "To")}</span>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="rounded-md border border-brand-100 px-3 py-2"
            >
              {MITRA.map((m) => (
                <option key={m.id} value={m.id}>{m.nama} ({m.email})</option>
              ))}
            </select>
          </label>
          <div className="grid gap-1 text-sm">
            <span className="text-xs font-semibold text-neutral-900">{tr("Pilih tangki yang ditangani", "Select the tanks to handle")}</span>
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
                  {t.kode} ({tr(LABEL_STATUS[t.status])}, {t.airPpm} ppm)
                </label>
              ))}
            </div>
          </div>
          <label className="grid gap-1 text-sm">
            <span className="text-xs font-semibold text-neutral-900">{tr("Pesan", "Message")}</span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder={tr("Tulis rincian permintaan di sini...", "Write the request details here...")}
              className="rounded-md border border-brand-100 px-3 py-2"
            />
          </label>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={onClose} className="rounded-md border border-brand-100 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
            {tr("Batal", "Cancel")}
          </button>
          <button
            type="button"
            onClick={() => setTerkirim(true)}
            disabled={subjek.length === 0}
            className="rounded-md bg-brand-700 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {tr("Kirim", "Send")}
          </button>
        </div>
        {subjek.length === 0 && <p className="mt-2 text-xs text-[#B83232]">{tr("Pilih minimal satu tangki.", "Pick at least one tank.")}</p>}
        </>
        )}
      </div>
    </div>
  );
}
