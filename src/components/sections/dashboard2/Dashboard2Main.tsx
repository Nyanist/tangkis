"use client";
import { useState } from "react";
import type { Wilayah } from "@/lib/data/dashboard2";
import TopHeader from "./TopHeader";
import KpiRow from "./KpiRow";
import Dashboard2Body from "./Dashboard2Body";

// Holds the two page filters: the company scope (whole company or one region, from the top bar) and the site
// (from the dropdown under Bottleneck Site, or a click on the map). Every widget reads both.
export default function Dashboard2Main() {
  const [wilayah, setWilayah] = useState<Wilayah | "">("");
  const [site, setSite] = useState("");
  return (
    <>
      <TopHeader
        wilayah={wilayah}
        onWilayahChange={(w) => {
          setWilayah(w);
          setSite("");
        }}
      />
      <KpiRow wilayah={wilayah} site={site} />
      <Dashboard2Body wilayah={wilayah} site={site} onSiteChange={setSite} />
    </>
  );
}
