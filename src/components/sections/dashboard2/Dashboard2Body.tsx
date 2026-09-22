"use client";
import { useState } from "react";
import type { Tangki } from "@/lib/data/dashboard";
import { SITE_OPTIONS } from "@/lib/data/dashboard2";
import TankDetailPopup from "@/components/sections/dashboard/TankDetailPopup";
import SystemHealth from "@/components/sections/dashboard/SystemHealth";
import BottleneckCard from "./BottleneckCard";
import DayTankCard from "./DayTankCard";
import TankTable2 from "./TankTable2";
import ActiveAlertCard from "./ActiveAlertCard";

export default function Dashboard2Body({
  site,
  onSiteChange,
}: {
  site: string;
  onSiteChange: (site: string) => void;
}) {
  const [selected, setSelected] = useState<Tangki | null>(null);

  return (
    <>
      {/* Bottleneck Site is its own full-width row now — it doesn't need to line
          up with Status Kesiagaan Day Tank, and the site filter sits right under it
          since Bottleneck's overview is the thing the filter actually drives. */}
      <BottleneckCard site={site} />
      <select
        value={site}
        onChange={(e) => onSiteChange(e.target.value)}
        className="mt-2 rounded-md border border-brand-100 bg-white px-3 py-1.5 text-sm"
        aria-label="Pilih site"
      >
        <option value="">Semua Site</option>
        {SITE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
      </select>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_420px]">
        <TankTable2 site={site} onSelect={setSelected} />
        <div className="flex flex-col gap-4">
          <ActiveAlertCard site={site} />
          <DayTankCard onSelect={setSelected} />
          <SystemHealth />
        </div>
      </div>

      {selected && <TankDetailPopup tangki={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
