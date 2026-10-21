"use client";
import { useState, type ReactNode } from "react";
import { AMBANG } from "@/lib/data/dashboard";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ViewHeading } from "./DashboardShell";

// Demo settings: every control works and the values live in component state, but nothing is sent anywhere.
export default function SettingsView() {
  const { t } = useLang();
  const [kuning, setKuning] = useState(AMBANG.kuningMulai);
  const [merah, setMerah] = useState(AMBANG.batas);
  const [intervalMenit, setIntervalMenit] = useState("15");
  const [notif, setNotif] = useState({ email: true, whatsapp: true, kuning: false });
  const [saved, setSaved] = useState(false);

  const invalid = kuning >= merah;
  const touch = <T,>(fn: (v: T) => void) => (v: T) => {
    fn(v);
    setSaved(false);
  };

  return (
    <>
      <ViewHeading title={t("Pengaturan", "Settings")} subtitle={t("Atur ambang status, notifikasi, dan frekuensi pembaruan data.", "Set status thresholds, notifications, and data refresh rate.")} />

      <form
        className="grid border-y border-slate-200 lg:grid-cols-3 lg:divide-x lg:divide-slate-200 max-lg:divide-y max-lg:divide-slate-200"
        onSubmit={(e) => {
          e.preventDefault();
          if (!invalid) setSaved(true);
        }}
      >
        <Group title={t("Ambang Kadar Air", "Water Content Thresholds")} desc={t("Menentukan kapan tangki berubah status.", "Decides when a tank changes status.")}>
          <NumberField label={t("Kuning mulai dari", "Yellow from")} value={kuning} onChange={touch(setKuning)} />
          <NumberField label={t("Kritis mulai dari", "Critical from")} value={merah} onChange={touch(setMerah)} />
          {invalid && <p className="text-sm text-[#B83232]">{t("Ambang kuning harus lebih kecil dari ambang kritis.", "The yellow threshold must be below the critical one.")}</p>}
        </Group>

        <Group title={t("Notifikasi", "Notifications")} desc={t("Ke mana peringatan dikirim.", "Where alerts are sent.")}>
          <Toggle label={t("Email ke PIC lokasi", "Email to site PIC")} on={notif.email} onChange={touch((v: boolean) => setNotif((n) => ({ ...n, email: v })))} />
          <Toggle label={t("WhatsApp untuk status kritis", "WhatsApp for critical status")} on={notif.whatsapp} onChange={touch((v: boolean) => setNotif((n) => ({ ...n, whatsapp: v })))} />
          <Toggle label={t("Kirim juga untuk status kuning", "Also send for yellow status")} on={notif.kuning} onChange={touch((v: boolean) => setNotif((n) => ({ ...n, kuning: v })))} />
        </Group>

        <Group title={t("Pembaruan Data", "Data Refresh")} desc={t("Seberapa sering sensor mengirim pembacaan.", "How often the sensors report.")}>
          <label className="flex items-center justify-between gap-4 text-sm">
            <span className="text-neutral-900">{t("Interval", "Interval")}</span>
            <select value={intervalMenit} onChange={(e) => touch(setIntervalMenit)(e.target.value)} className="border-b border-slate-300 bg-transparent py-1 outline-none focus:border-brand-700">
              {["5", "15", "30", "60"].map((m) => (
                <option key={m} value={m}>{m} {t("menit", "minutes")}</option>
              ))}
            </select>
          </label>
        </Group>

        <div className="flex flex-wrap items-center gap-4 py-4 lg:col-span-3 lg:!border-l-0 lg:border-t lg:border-slate-200">
          <button type="submit" disabled={invalid} className="rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50">
            {t("Simpan", "Save")}
          </button>
          <p className="text-sm text-neutral-900" aria-live="polite">
            {saved ? t("Tersimpan untuk sesi ini (mode demo, tidak dikirim ke server).", "Saved for this session (demo mode, not sent to a server).") : ""}
          </p>
        </div>
      </form>
    </>
  );
}

function Group({ title, desc, children }: { title: string; desc: string; children: ReactNode }) {
  return (
    // Title on top, controls right under it; on lg+ the three groups sit in one row so the page width is used.
    <fieldset className="py-5 lg:px-6 lg:first:pl-0 lg:last-of-type:pr-0">
      <legend className="sr-only">{title}</legend>
      <p className="font-semibold text-brand-950">{title}</p>
      <p className="mt-0.5 text-sm text-neutral-900">{desc}</p>
      <div className="mt-4 grid content-start gap-3">{children}</div>
    </fieldset>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="flex items-center justify-between gap-4 text-sm">
      <span className="text-neutral-900">{label}</span>
      <span className="flex items-baseline gap-1.5">
        <input
          type="number"
          min={0}
          step={10}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-20 border-b border-slate-300 bg-transparent py-1 text-right tabular-nums outline-none focus:border-brand-700"
        />
        <span className="text-neutral-900">ppm</span>
      </span>
    </label>
  );
}

function Toggle({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => onChange(!on)} className="flex items-center justify-between gap-4 text-left text-sm">
      <span className="text-neutral-900">{label}</span>
      <span className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", on ? "bg-brand-700" : "bg-slate-300")}>
        <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all", on ? "left-[1.375rem]" : "left-0.5")} />
      </span>
    </button>
  );
}
