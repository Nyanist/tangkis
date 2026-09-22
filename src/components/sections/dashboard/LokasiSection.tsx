"use client";
import { useState } from "react";
import { PROFIL_LOKASI } from "@/lib/data/dashboard";
import TankTable from "./TankTable";
import ProfilLokasiPanel from "./ProfilLokasiPanel";
import SystemHealth from "./SystemHealth";

const NAMA_LOKASI = Object.keys(PROFIL_LOKASI);

// Owns the selected-lokasi state so the left Daftar Tangki table and the right
// Profil Lokasi dropdown stay in sync — page.tsx stays a server component
// (exports metadata), so this client wrapper holds the shared state and the
// two-column grid instead.
export default function LokasiSection() {
  const [lokasi, setLokasi] = useState(NAMA_LOKASI[0]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_400px]">
      <div className="flex min-w-0 flex-col gap-4">
        <TankTable lokasi={lokasi} />
      </div>
      <div className="flex flex-col gap-4">
        <ProfilLokasiPanel lokasi={lokasi} onChangeLokasi={setLokasi} />
        <SystemHealth />
      </div>
    </div>
  );
}
