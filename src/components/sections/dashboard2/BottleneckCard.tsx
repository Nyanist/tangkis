import { Radar } from "lucide-react";
import { AMBANG } from "@/lib/data/dashboard";
import { DETAIL_PER_TANGKI, tangkiForSite } from "@/lib/data/dashboard2";

// ponytail: "sisa runtime aman" has no real fuel-consumption model behind it —
// a simple illustrative heuristic (worse ppm over batas → fewer hours), not a
// prediction. Swap for a real runtime calc if this page ever needs to be accurate.
function hitungRuntimeAman(ppm: number) {
  if (ppm <= AMBANG.batas) return Math.round(((AMBANG.batas - ppm) / AMBANG.batas) * 48);
  return 0;
}

export default function BottleneckCard({ site }: { site: string }) {
  const rows = tangkiForSite(site);

  return (
    <section aria-labelledby="judul-bottleneck" className="rounded-lg border border-brand-100 bg-white p-3 md:p-4">
      <h2 id="judul-bottleneck" className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-950">
        <Radar className="h-4 w-4 text-brand-700" />
        Analisis Kesiagaan Kritis (Bottleneck Site)
      </h2>

      {rows.length === 0 ? (
        <p className="text-sm text-[#5A6B7B]">Tidak ada tangki untuk site ini.</p>
      ) : (
        <BottleneckContent rows={rows} site={site} />
      )}
    </section>
  );
}

function BottleneckContent({ rows, site }: { rows: ReturnType<typeof tangkiForSite>; site: string }) {
  const kritis = [...rows].sort((a, b) => b.airPpm - a.airPpm)[0];
  const runtime = hitungRuntimeAman(kritis.airPpm);
  const totalKapasitas = rows.reduce((sum, t) => sum + (parseFloat(DETAIL_PER_TANGKI[t.kode]?.kapasitas ?? "0") || 0), 0);
  const rataKadarAir = Math.round(rows.reduce((sum, t) => sum + t.airPpm, 0) / rows.length);
  const bermasalah = rows.filter((t) => t.status !== "HIJAU").length;

  const stat = [
    { label: "Total Kapasitas", value: `${totalKapasitas} kL` },
    { label: "Rata-rata Kadar Air", value: `${rataKadarAir} ppm` },
    { label: "Tangki Bermasalah", value: `${bermasalah}/${rows.length}`, warn: bermasalah > 0 },
    { label: "Sisa Runtime Aman", value: `${runtime} Jam`, warn: runtime === 0 },
  ];

  return (
    <>
      <p className="text-xs text-[#5A6B7B]">{site || "Semua Site"} · {rows.length} tangki dipantau</p>
      <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stat.map((s) => (
          <div key={s.label}>
            <p className="text-[11px] text-[#5A6B7B]">{s.label}</p>
            <p className={`text-lg font-bold tabular-nums ${s.warn ? "text-[#B83232]" : "text-[#172B3A]"}`}>{s.value}</p>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-[#5A6B7B]">
        Paling kritis: <span className="font-semibold text-[#172B3A]">{kritis.kode}</span> ({kritis.lokasi}) — {kritis.airPpm} ppm
      </p>
    </>
  );
}
