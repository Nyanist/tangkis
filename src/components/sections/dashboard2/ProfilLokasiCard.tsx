"use client";
import { ArrowLeft, Building2, Download } from "lucide-react";
import { TREN_PER_TANGKI, type StatusTangki } from "@/lib/data/dashboard";
import { DETAIL_PER_TANGKI, displayInfo, PROFIL_LOKASI2, sitesIn, tangkiForSite, type Wilayah } from "@/lib/data/dashboard2";
import { useLang } from "@/lib/i18n";
import { downloadCsv } from "@/lib/downloadCsv";
import { LABEL_STATUS } from "@/lib/data/dashboardI18n";

const WARNA: Record<StatusTangki, string> = { MERAH: "#D64545", KUNING: "#E9A21B", HIJAU: "#6aa84f" };
const URUTAN: StatusTangki[] = ["MERAH", "KUNING", "HIJAU"];

// No site picked: a short list of every location in scope, worst first, each one clickable to open its profile.
// Site picked: its address, contact and tank summary. No "Kirim Permintaan Pembersihan" here, Active Alert has it.
export default function ProfilLokasiCard({ site, wilayah, onSiteChange }: { site: string; wilayah: Wilayah | ""; onSiteChange: (s: string) => void }) {
  const { t } = useLang();
  const profil = site ? PROFIL_LOKASI2[site] : undefined;

  const lokasi = sitesIn(wilayah)
    .map((s) => {
      const tanks = tangkiForSite(s);
      const worst = URUTAN.find((st) => tanks.some((tk) => tk.status === st)) ?? "HIJAU";
      return { s, tanks, worst };
    })
    .sort((a, b) => URUTAN.indexOf(a.worst) - URUTAN.indexOf(b.worst) || b.tanks.length - a.tanks.length);

  return (
    <section aria-labelledby="judul-profil2" className="flex flex-col rounded-lg border border-brand-100 bg-white p-3 md:p-5 lg:min-h-0 lg:flex-1">
      <h2 id="judul-profil2" className="mb-3 flex items-center gap-2 font-semibold text-brand-950">
        <Building2 className="h-4.5 w-4.5 text-brand-700" />
        {t("Profil Lokasi", "Location Profile")}
      </h2>

      {!profil ? (
        <>
          <p className="mb-2 text-sm text-neutral-900">
            {lokasi.length} {t("lokasi", "locations")}{wilayah ? ` ${t("di", "in")} ${wilayah}` : ""}. {t("Pilih salah satu untuk melihat profilnya.", "Pick one to see its profile.")}
          </p>
          {/* lg+: the list is taken out of the height calculation (absolute) and fills whatever is left, so this card
              ends level with the tank table beside it and the list scrolls inside. */}
          <div className="relative lg:min-h-[8rem] lg:flex-1">
          <ul className="max-h-72 divide-y divide-slate-200 overflow-y-auto overscroll-contain border-y border-slate-200 lg:absolute lg:inset-0 lg:max-h-none">
            {lokasi.map(({ s, tanks, worst }) => (
              <li key={s}>
                <button type="button" onClick={() => onSiteChange(s)} className="flex w-full items-center gap-3 py-2.5 text-left text-sm hover:bg-brand-50">
                  <span className="h-2.5 w-2.5 flex-none rounded-full" style={{ background: WARNA[worst] }} aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-neutral-900">{s}</span>
                    <span className="block truncate text-xs text-neutral-900">{PROFIL_LOKASI2[s].kota}, PIC {PROFIL_LOKASI2[s].pic}</span>
                  </span>
                  <span className="flex-none text-xs text-neutral-900">{tanks.length} {t("tangki", "tanks")}</span>
                </button>
              </li>
            ))}
          </ul>
          </div>
        </>
      ) : (
        <>
          <p className="mb-3 font-semibold text-neutral-900">{site}</p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
            <dt className="text-neutral-900">{t("Alamat", "Address")}</dt>
            <dd className="text-right font-semibold">{profil.alamat}</dd>
            <dt className="text-neutral-900">{t("Kota", "City")}</dt>
            <dd className="text-right font-semibold">{profil.kota}</dd>
            <dt className="text-neutral-900">{t("Wilayah", "Region")}</dt>
            <dd className="text-right font-semibold">{profil.wilayah}</dd>
            <dt className="text-neutral-900">{t("Penanggung Jawab", "Person in Charge")}</dt>
            <dd className="text-right font-semibold">{profil.pic}</dd>
            <dt className="text-neutral-900">{t("Telepon", "Phone")}</dt>
            <dd className="text-right font-semibold">
              <a href={`tel:${profil.telepon.replace(/-/g, "")}`} className="hover:text-brand-700">{profil.telepon}</a>
            </dd>
            <dt className="text-neutral-900">{t("Tangki", "Tanks")}</dt>
            <dd className="text-right font-semibold">
              {tangkiForSite(site).length} ({URUTAN.map((st) => tangkiForSite(site).filter((tk) => tk.status === st).length).join(" / ")})
            </dd>
          </dl>
          <p className="mt-1 text-right text-[11px] text-neutral-900">{t("kritis / kuning / normal", "critical / yellow / normal")}</p>
          <button
            type="button"
            onClick={() => {
              // One row per tank at this site: current reading plus its last six monthly averages.
              const tanks = tangkiForSite(site);
              const bulan = TREN_PER_TANGKI[tanks[0]?.kode]?.bulan ?? [];
              downloadCsv(
                `tangkis-laporan-bulanan-${site.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.csv`,
                [t("Kode", "Code"), t("Lokasi", "Location"), t("Kapasitas", "Capacity"), t("Kadar Air (ppm)", "Water (ppm)"), t("Hari Sejak Pengisian", "Days Since Refill"), "Status", ...bulan],
                tanks.map((tk) => [
                  displayInfo(tk).kode,
                  displayInfo(tk).siteLabel,
                  DETAIL_PER_TANGKI[tk.kode]?.kapasitas ?? "",
                  tk.airPpm,
                  tk.hari,
                  t(LABEL_STATUS[tk.status]),
                  ...(TREN_PER_TANGKI[tk.kode]?.ppm ?? []),
                ])
              );
            }}
            className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-brand-100 bg-white px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            <Download className="h-4 w-4" />
            {t("Unduh Laporan Bulanan", "Download Monthly Report")}
          </button>
          <button type="button" onClick={() => onSiteChange("")} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-950">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t("Kembali ke daftar lokasi", "Back to all locations")}
          </button>
        </>
      )}
    </section>
  );
}
