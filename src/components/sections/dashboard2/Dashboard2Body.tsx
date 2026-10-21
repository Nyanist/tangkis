"use client";
import { useState } from "react";
import type { Tangki } from "@/lib/data/dashboard";
import { sitesIn, type Wilayah } from "@/lib/data/dashboard2";
import TankDetailPopup from "@/components/sections/dashboard/TankDetailPopup";
import SystemHealth from "@/components/sections/dashboard/SystemHealth";
import BottleneckCard from "./BottleneckCard";
import ProfilLokasiCard from "./ProfilLokasiCard";
import TankTable2 from "./TankTable2";
import ActiveAlertCard from "./ActiveAlertCard";
import TankMap from "./TankMap";
import { useLang } from "@/lib/i18n";

export default function Dashboard2Body({
  wilayah,
  site,
  onSiteChange,
}: {
  wilayah: Wilayah | "";
  site: string;
  onSiteChange: (site: string) => void;
}) {
  const { t } = useLang();
  const [selected, setSelected] = useState<Tangki | null>(null);

  return (
    <>
      {/* Bottleneck Site is its own full-width row now — it doesn't need to line
          up with Profil Lokasi, and the site filter sits right under it
          since Bottleneck's overview is the thing the filter actually drives. */}
      <BottleneckCard site={site} wilayah={wilayah} />
      <select
        value={site}
        onChange={(e) => onSiteChange(e.target.value)}
        className="mt-3 w-full rounded-md border border-brand-100 bg-white px-3 py-1.5 text-sm sm:w-auto"
        aria-label={t("Pilih site", "Select site")}
      >
        <option value="">{t("Semua Site", "All Sites")}</option>
        {sitesIn(wilayah).map((n) => <option key={n} value={n}>{n}</option>)}
      </select>

      <div className="mt-4 mb-12 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_minmax(280px,420px)]">
        {/* On mobile these sit above Daftar Tangki, side by side; lg+ they stack in the right rail. */}
        <div className="order-1 grid min-w-0 grid-cols-1 gap-3 lg:order-2 lg:flex lg:flex-col lg:gap-4">
          <ActiveAlertCard site={site} wilayah={wilayah} />
          <ProfilLokasiCard site={site} wilayah={wilayah} onSiteChange={onSiteChange} />
        </div>
        <div className="order-2 min-w-0 lg:order-1">
          <TankTable2 site={site} wilayah={wilayah} onSelect={setSelected} />
        </div>
      </div>
      <TankMap wilayah={wilayah} site={site} onSiteChange={onSiteChange} onSelectTank={setSelected} />
      <SystemHealth />

      {selected && <TankDetailPopup tangki={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
