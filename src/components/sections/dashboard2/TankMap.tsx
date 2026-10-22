"use client";
import { useEffect, useRef, useState } from "react";
import { MapPinned } from "lucide-react";
import type { LayerGroup, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { StatusTangki, Tangki } from "@/lib/data/dashboard";
import { displayInfo, PROFIL_LOKASI2, SITE_OPTIONS, sitesIn, tangkiForSite, type Wilayah } from "@/lib/data/dashboard2";
import { useLang } from "@/lib/i18n";
import { LABEL_STATUS } from "@/lib/data/dashboardI18n";

const WARNA: Record<StatusTangki, string> = { MERAH: "#D64545", KUNING: "#E9A21B", HIJAU: "#6aa84f" };
const URUTAN: StatusTangki[] = ["MERAH", "KUNING", "HIJAU"];
// Esri's "World Street Map" basemap: shows province borders, city names and, zoomed in, streets. It needs no API key
// (CARTO's basemaps now return an "API KEY REQUIRED" placeholder tile without one). Note Esri orders tiles {z}/{y}/{x}.
// The attribution strip is hidden by request; Esri's terms ask for "Esri, HERE, Garmin, © OpenStreetMap contributors"
// to be credited somewhere visible, so restore it (or credit it elsewhere on the page) before a public launch.
const TILES = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}";
const INDONESIA: [[number, number], [number, number]] = [[-11, 95], [6, 141]];

const worst = (tanks: Tangki[]) => URUTAN.find((s) => tanks.some((t) => t.status === s)) ?? "HIJAU";
const latLng = (site: string): [number, number] => {
  const [lng, lat] = PROFIL_LOKASI2[site].koordinat;
  return [lat, lng];
};

// Where the company's tanks are across Indonesia, on a real zoomable map. Each dot is a site, coloured by its worst
// tank, pulsing so it reads at a glance; the tank count is in its hover tooltip. Clicking a dot sets the page's site filter, so the cards and table follow the map,
// and the map flies in to that site; picking a region in the top bar fits the map to that region.
export default function TankMap({
  wilayah,
  site,
  onSiteChange,
  onSelectTank,
}: {
  wilayah: Wilayah | "";
  site: string;
  onSiteChange: (s: string) => void;
  onSelectTank: (t: Tangki) => void;
}) {
  const { t } = useLang();
  const boxRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const layerRef = useRef<LayerGroup | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const [ready, setReady] = useState(false);
  // The marker click handler is created once per redraw; a ref keeps it calling the latest callback.
  const onSiteChangeRef = useRef(onSiteChange);
  onSiteChangeRef.current = onSiteChange;

  // Leaflet touches `window`, so it is loaded in the browser only.
  useEffect(() => {
    let cancelled = false;
    import("leaflet").then((L) => {
      if (cancelled || !boxRef.current || mapRef.current) return;
      leafletRef.current = L;
      const map = L.map(boxRef.current, { zoomSnap: 0.25, minZoom: 3, maxBounds: [[-20, 85], [15, 150]], scrollWheelZoom: false, attributionControl: false });
      L.tileLayer(TILES, { maxZoom: 18 }).addTo(map);
      map.fitBounds(INDONESIA);
      // Wheel zoom only after the map is clicked, so scrolling the page past it does not zoom by accident.
      map.on("click", () => map.scrollWheelZoom.enable());
      map.on("mouseout", () => map.scrollWheelZoom.disable());
      layerRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      setReady(true);
    });
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Redraw the dots whenever the filters change.
  useEffect(() => {
    const L = leafletRef.current;
    const layer = layerRef.current;
    if (!ready || !L || !layer) return;
    layer.clearLayers();
    SITE_OPTIONS.forEach((s, i) => {
      const all = tangkiForSite(s);
      const inScope = !wilayah || PROFIL_LOKASI2[s].wilayah === wilayah;
      const selected = s === site;
      const status = worst(all);
      // A solid dot in the site's worst status colour, with a ring of the same colour pulsing out of it (see
      // .tank-pulse in globals.css). Each site starts its pulse at a different moment so the map does not blink in unison.
      const size = 34;
      const icon = L.divIcon({
        className: "",
        iconSize: [size, size],
        html: `<span class="tank-pulse${status === "MERAH" ? " tank-pulse--kritis" : ""}" style="--c:${WARNA[status]};--delay:${(i * 0.37) % 2}s;opacity:${inScope ? 1 : 0.35}"><span class="tank-pulse__dot${selected ? " tank-pulse__dot--selected" : ""}"></span></span>`,
      });
      L.marker(latLng(s), { icon, title: s, keyboard: true, zIndexOffset: selected ? 1000 : 0 })
        .bindTooltip(`<b>${s}</b><br>${PROFIL_LOKASI2[s].kota}, ${all.length} ${t("tangki", "tanks")}`, { direction: "top", offset: [0, -size / 2] })
        .on("click", () => onSiteChangeRef.current(selected ? "" : s))
        .addTo(layer);
    });
  }, [ready, wilayah, site, t]);

  // Fly to the picked site, or fit the picked region (or the whole country).
  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map) return;
    if (site) map.flyTo(latLng(site), 13, { duration: 0.8 });
    else if (wilayah) map.flyToBounds(sitesIn(wilayah).map(latLng), { padding: [60, 60], maxZoom: 8, duration: 0.8 });
    else map.flyToBounds(INDONESIA, { duration: 0.8 });
  }, [ready, site, wilayah]);

  const visible = tangkiForSite("", wilayah);
  const counts = URUTAN.map((s) => ({ s, n: visible.filter((tk) => tk.status === s).length }));
  const selectedProfil = site ? PROFIL_LOKASI2[site] : undefined;
  const statusLabel = (s: StatusTangki) => t(LABEL_STATUS[s]);

  return (
    <section aria-labelledby="judul-peta" className="mb-16">
      <h2 id="judul-peta" className="mb-1 flex items-center gap-2 text-lg font-semibold text-brand-950">
        <MapPinned className="h-5 w-5 text-brand-700" aria-hidden />
        {t("Peta Sebaran Tangki", "Tank Map")}
      </h2>
      <p className="mb-4 text-sm text-neutral-900">
        {t(
          "Klik titik untuk melihat tangki di lokasi tersebut.",
          "Click a dot to see the tanks at that location."
        )}
      </p>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="relative isolate min-w-0 overflow-hidden rounded-lg bg-[#e8f1f5]">
          <div ref={boxRef} className="h-[300px] w-full sm:h-[420px] lg:h-[480px]" role="region" aria-label={t("Peta Indonesia dengan lokasi tangki", "Map of Indonesia with tank locations")} />
          {!ready && <p className="absolute inset-0 grid place-items-center text-sm text-neutral-900">{t("Memuat peta…", "Loading map…")}</p>}
          <ul className="pointer-events-none absolute bottom-6 left-3 z-[500] flex gap-4 rounded-md bg-white/90 px-3 py-1.5 text-xs text-neutral-900 shadow-sm">
            {counts.map(({ s, n }) => (
              <li key={s} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: WARNA[s] }} aria-hidden />
                {statusLabel(s)} {n}
              </li>
            ))}
          </ul>
        </div>

        {/* Side panel: plain list, no cards */}
        <div className="min-w-0">
          {selectedProfil ? (
            <>
              <p className="text-base font-semibold text-brand-950">{site}</p>
              <p className="text-sm text-neutral-900">{selectedProfil.alamat}</p>
              <p className="mt-1 text-sm text-neutral-900">PIC {selectedProfil.pic}, {selectedProfil.telepon}</p>
              <ul className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
                {tangkiForSite(site).map((tk) => (
                  <li key={tk.kode}>
                    <button type="button" onClick={() => onSelectTank(tk)} className="flex w-full items-center gap-3 py-2.5 text-left text-sm hover:bg-brand-50">
                      <span className="h-2.5 w-2.5 flex-none rounded-full" style={{ background: WARNA[tk.status] }} aria-hidden />
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-neutral-900">{displayInfo(tk).kode}</span>
                        <span className="block truncate text-xs text-neutral-900">{displayInfo(tk).bagian}</span>
                      </span>
                      <span className="tabular-nums text-neutral-900">{tk.airPpm} ppm</span>
                    </button>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => onSiteChange("")} className="mt-3 text-sm font-semibold text-brand-700 hover:text-brand-950">
                {t("Tampilkan semua lokasi", "Show all locations")}
              </button>
            </>
          ) : (
            <>
              <p className="text-base font-semibold text-brand-950">{wilayah || t("Seluruh Indonesia", "All of Indonesia")}</p>
              <p className="mt-1 text-sm text-neutral-900">
                {visible.length} {t("tangki di", "tanks at")} {sitesIn(wilayah).length} {t("lokasi", "locations")}
              </p>
              <ul className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
                {[...visible].sort((a, b) => b.airPpm - a.airPpm).slice(0, 5).map((tk) => (
                  <li key={tk.kode}>
                    <button type="button" onClick={() => onSelectTank(tk)} className="flex w-full items-center gap-3 py-2.5 text-left text-sm hover:bg-brand-50">
                      <span className="h-2.5 w-2.5 flex-none rounded-full" style={{ background: WARNA[tk.status] }} aria-hidden />
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-neutral-900">{displayInfo(tk).kode}</span>
                        <span className="block truncate text-xs text-neutral-900">{PROFIL_LOKASI2[displayInfo(tk).fasilitas]?.kota}</span>
                      </span>
                      <span className="tabular-nums text-neutral-900">{tk.airPpm} ppm</span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-neutral-900">{t("Lima tangki dengan kadar air tertinggi.", "The five tanks with the highest water content.")}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
