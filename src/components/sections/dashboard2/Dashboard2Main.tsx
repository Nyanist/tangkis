"use client";
import { useState } from "react";
import TopHeader from "./TopHeader";
import KpiRow from "./KpiRow";
import Dashboard2Body from "./Dashboard2Body";

// Holds the "Pilih Site" filter state — the only piece of /dashboard-2 wired to
// be functional; everything else on this comparison page stays decorative.
export default function Dashboard2Main() {
  const [site, setSite] = useState("");
  return (
    <>
      <TopHeader />
      <KpiRow />
      <Dashboard2Body site={site} onSiteChange={setSite} />
    </>
  );
}
