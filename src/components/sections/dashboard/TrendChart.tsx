"use client";
import { useMemo, useState } from "react";
import { AMBANG, TREN } from "@/lib/data/dashboard";

// ponytail: Fritsch-Carlson monotone spline inline — recharts if multi-series/interactions grow
function tangents(xs: number[], ys: number[]) {
  const n = xs.length, m = new Array(n).fill(0);
  if (n < 2) return m;
  const d: number[] = [];
  for (let k = 0; k < n - 1; k++) d.push((ys[k + 1] - ys[k]) / (xs[k + 1] - xs[k]));
  m[0] = d[0]; m[n - 1] = d[d.length - 1];
  for (let k = 1; k < n - 1; k++) m[k] = d[k - 1] * d[k] <= 0 ? 0 : (d[k - 1] + d[k]) / 2;
  for (let k = 0; k < n - 1; k++) {
    if (d[k] === 0) { m[k] = 0; m[k + 1] = 0; continue; }
    const a = m[k] / d[k], b = m[k + 1] / d[k], s = a * a + b * b;
    if (s > 9) { const t = 3 / Math.sqrt(s); m[k] = t * a * d[k]; m[k + 1] = t * b * d[k]; }
  }
  return m;
}

export default function TrendChart() {
  const [active, setActive] = useState(TREN.ppm.length - 1);
  const W = 640, H = 300, mg = { t: 24, r: 14, b: 30, l: 48 };
  const iw = W - mg.l - mg.r, ih = H - mg.t - mg.b;
  const { min, max, langkah } = TREN.sumbuY;
  const n = TREN.ppm.length;

  const g = useMemo(() => {
    const px = (i: number) => mg.l + (iw / n) * (i + 0.5);
    const py = (v: number) => mg.t + ih * (1 - (Math.min(max, Math.max(min, v)) - min) / (max - min));
    const xs = TREN.ppm.map((_, i) => px(i));
    const ys = TREN.ppm.map(py);
    const m = tangents(xs, ys);
    let d = `M${xs[0]} ${ys[0].toFixed(1)}`;
    for (let k = 0; k < n - 1; k++) {
      const j = (xs[k + 1] - xs[k]) / 3;
      d += ` C${(xs[k] + j).toFixed(1)} ${(ys[k] + m[k] * j).toFixed(1)} ${(xs[k + 1] - j).toFixed(1)} ${(ys[k + 1] - m[k + 1] * j).toFixed(1)} ${xs[k + 1]} ${ys[k + 1].toFixed(1)}`;
    }
    return { px, py, xs, ys, d, yBatas: py(AMBANG.batas), yKuning: py(AMBANG.kuningMulai), bottom: mg.t + ih };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ticks: number[] = [];
  for (let v = min; v <= max; v += langkah) ticks.push(v);
  const over = TREN.ppm[active] > AMBANG.batas;

  return (
    <section aria-labelledby="judul-tren" className="rounded-lg border border-[#D9E1E8] bg-white p-4 md:p-5">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h2 id="judul-tren" className="font-semibold text-[#0B2239]">{TREN.judul}</h2>
        <ul className="flex flex-wrap gap-4 text-xs text-[#5A6B7B]" aria-hidden="true">
          <li className="flex items-center gap-1.5"><span className="h-1 w-5 rounded bg-[#123B66]" />Kadar air</li>
          <li className="flex items-center gap-1.5"><span className="w-5 border-t-2 border-dashed border-[#D64545]" />Batas {AMBANG.batas} ppm</li>
        </ul>
      </div>
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-64 w-full md:h-80"
          role="img"
          tabIndex={0}
          aria-label={`${TREN.judul}. Nilai terakhir ${TREN.ppm[n - 1]} ppm, batas ${AMBANG.batas} ppm.`}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") setActive((a) => Math.min(n - 1, a + 1));
            if (e.key === "ArrowLeft") setActive((a) => Math.max(0, a - 1));
            if (e.key === "Home") setActive(0);
            if (e.key === "End") setActive(n - 1);
          }}
        >
          <defs>
            <linearGradient id="grad-navy" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#123B66" stopOpacity="0.12" />
              <stop offset="1" stopColor="#123B66" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad-red" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#D64545" stopOpacity="0.2" />
              <stop offset="1" stopColor="#D64545" stopOpacity="0.05" />
            </linearGradient>
            <clipPath id="klip-atas"><rect x="0" y="0" width={W} height={g.yBatas} /></clipPath>
            <clipPath id="klip-bawah"><rect x="0" y={g.yBatas} width={W} height={H - g.yBatas} /></clipPath>
          </defs>

          <rect x={mg.l} y={g.yKuning} width={iw} height={g.bottom - g.yKuning} fill="#2E8B57" opacity="0.05" />
          <rect x={mg.l} y={g.yBatas} width={iw} height={g.yKuning - g.yBatas} fill="#E9A21B" opacity="0.08" />
          <rect x={mg.l} y={mg.t} width={iw} height={g.yBatas - mg.t} fill="#D64545" opacity="0.04" />

          {ticks.map((v) => (
            <g key={v}>
              <line x1={mg.l} x2={W - mg.r} y1={g.py(v)} y2={g.py(v)} stroke={v === min ? "#172B3A55" : "#172B3A12"} strokeWidth="1" />
              <text x={mg.l - 8} y={g.py(v) + 4} textAnchor="end" fontSize="12" fill="#5A6B7B">{v}</text>
            </g>
          ))}

          <line x1={mg.l} x2={W - mg.r} y1={g.yBatas} y2={g.yBatas} stroke="#D64545" strokeWidth="1.5" strokeDasharray="6 5" />
          <text x={W - mg.r} y={g.yBatas - 6} textAnchor="end" fontSize="12" fontWeight="600" fill="#B83232">
            Batas spesifikasi {AMBANG.batas} ppm
          </text>

          <path d={`${g.d} L${g.xs[n - 1]} ${g.bottom} L${g.xs[0]} ${g.bottom} Z`} fill="url(#grad-navy)" clipPath="url(#klip-bawah)" />
          <path d={`${g.d} L${g.xs[n - 1]} ${mg.t} L${g.xs[0]} ${mg.t} Z`} fill="url(#grad-red)" clipPath="url(#klip-atas)" />
          <path d={g.d} fill="none" stroke="#123B66" strokeWidth="2.6" strokeLinecap="round" clipPath="url(#klip-bawah)" />
          <path d={g.d} fill="none" stroke="#D64545" strokeWidth="2.6" strokeLinecap="round" clipPath="url(#klip-atas)" />

          {TREN.ppm.map((v, i) => (
            <g key={i}>
              <circle cx={g.xs[i]} cy={g.ys[i]} r={i === active ? 6 : 4} fill={v > AMBANG.batas ? "#D64545" : "#123B66"} stroke="#fff" strokeWidth="2" />
              {i === active && <circle cx={g.xs[i]} cy={g.ys[i]} r="11" fill="none" stroke={over ? "#D64545" : "#123B66"} strokeWidth="2" opacity="0.35" />}
              <text x={g.xs[i]} y={g.ys[i] - 12} textAnchor="middle" fontSize="12" fontWeight="600" fill={v > AMBANG.batas ? "#B83232" : "#172B3A"}>{v}</text>
              <text x={g.xs[i]} y={H - 8} textAnchor="middle" fontSize="12" fill="#5A6B7B">{TREN.bulan[i]}</text>
              <rect
                x={g.xs[i] - iw / n / 2} y={mg.t} width={iw / n} height={ih}
                fill="transparent" style={{ cursor: "crosshair" }}
                onPointerEnter={() => setActive(i)}
                onPointerDown={() => setActive(i)}
              >
                <title>{TREN.bulan[i]}: {v} ppm</title>
              </rect>
            </g>
          ))}

          <line x1={g.xs[active]} x2={g.xs[active]} y1={mg.t} y2={g.bottom} stroke="#6B7C8C" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
        <div className="pointer-events-none absolute rounded-md bg-[#0B2239] px-3 py-2 text-xs text-white shadow-lg" style={{ left: `${Math.max(8, Math.min(92, (g.xs[active] / W) * 100))}%`, top: 0, transform: "translate(-50%, -10%)" }} role="status">
          <span className="opacity-70">{TREN.bulan[active]}</span>
          <span className="block text-base font-bold tabular-nums">{TREN.ppm[active]} ppm</span>
          <span>{over ? `+${Math.round(((TREN.ppm[active] - AMBANG.batas) / AMBANG.batas) * 100)}% di atas batas` : `${AMBANG.batas - TREN.ppm[active]} ppm di bawah batas`}</span>
        </div>
      </div>
    </section>
  );
}
