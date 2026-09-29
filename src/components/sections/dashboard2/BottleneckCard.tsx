import Image from "next/image";
import { AlertTriangle, Clock, Container, Droplets } from "lucide-react";
import { AMBANG } from "@/lib/data/dashboard";
import { DETAIL_PER_TANGKI, displayInfo, tangkiForSite } from "@/lib/data/dashboard2";

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
    <div className="min-w-0">
      <div className="mb-3 flex items-center gap-2 rounded-lg border border-brand-100 bg-brand-50 px-4 py-3">
        <Image src="/logo-img-hijau.webp" alt="" width={28} height={28} className="h-6 w-auto" />
        <h2 id="judul-bottleneck" className="font-semibold text-brand-950">Analisis Kesiagaan Kritis (Bottleneck Site)</h2>
      </div>

      <section aria-labelledby="judul-bottleneck" className="min-w-0 rounded-lg border border-brand-100 bg-white p-4 md:p-6">
        {rows.length === 0 ? (
          <p className="text-sm text-[#5A6B7B]">Tidak ada tangki untuk site ini.</p>
        ) : (
          <BottleneckContent rows={rows} site={site} />
        )}
      </section>
    </div>
  );
}

function BottleneckContent({ rows, site }: { rows: ReturnType<typeof tangkiForSite>; site: string }) {
  const kritis = [...rows].sort((a, b) => b.airPpm - a.airPpm)[0];
  const runtime = hitungRuntimeAman(kritis.airPpm);
  const totalKapasitas = rows.reduce((sum, t) => sum + (parseFloat(DETAIL_PER_TANGKI[t.kode]?.kapasitas ?? "0") || 0), 0);
  const rataKadarAir = Math.round(rows.reduce((sum, t) => sum + t.airPpm, 0) / rows.length);
  const bermasalah = rows.filter((t) => t.status !== "HIJAU").length;

  const stat = [
    { label: "Total Kapasitas", value: `${totalKapasitas} kL`, icon: Container },
    { label: "Rata-rata Kadar Air", value: `${rataKadarAir} ppm`, icon: Droplets },
    { label: "Tangki Bermasalah", value: `${bermasalah}/${rows.length}`, warn: bermasalah > 0, icon: AlertTriangle },
    { label: "Sisa Runtime Aman", value: `${runtime} Jam`, warn: runtime === 0, icon: Clock },
  ];

  return (
    <>
      <p className="text-sm text-[#5A6B7B]">{site || "Semua Site"} · {rows.length} tangki dipantau</p>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stat.map((s) => (
          <div key={s.label} className="flex h-12 items-center gap-3">
            <s.icon className={`h-full w-auto flex-none ${s.warn ? "text-[#B83232]" : "text-brand-700"}`} />
            <div className="min-w-0">
              <p className="text-xs text-[#5A6B7B]">{s.label}</p>
              <p className={`text-2xl font-bold tabular-nums ${s.warn ? "text-[#B83232]" : "text-[#172B3A]"}`}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-[#5A6B7B]">
        Paling kritis: <span className="font-semibold text-[#172B3A]">{displayInfo(kritis).kode}</span> ({displayInfo(kritis).siteLabel}) — {kritis.airPpm} ppm
      </p>
    </>
  );
}
