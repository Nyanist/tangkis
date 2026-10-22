"use client";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import FadeUp from "@/components/motion/FadeUp";
import { cn, KONTEN_SECTION } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

// ---- Model (illustrative, not calibrated) -------------------------------------------------------
// TANGKIS reads two things: dissolved water, estimated as ppm_est = a_w × C_sat(T_bb) from a water
// activity sensor plus fuel temperature, and free water, a binary 0/1 from a dielectric probe at the
// tank's lowest point. The lamp then follows the green-status rules below.
const AMBANG_WASPADA_PPM = 270; // ppm_est must stay under this for green
const AMBANG_MERAH_PPM = 300; // B50 spec limit used elsewhere on the site (dashboard legend)
const AMBANG_SATURASI_PCT = 80;
const AMBANG_PREDIKSI_HARI = 30; // regression forecast to Red must be further away than this
const AMBANG_UMUR_LAB_HARI = 180; // lab result must be this old or newer
const AIR_BEBAS_MM = 5; // free-water layer drawn when the probe reports 1
const SLUDGE_MM = 3; // thin settled layer, drawn for the stratification only
const VOLUME_MAKS_L = 400;

// Illustrative saturation curve for water in B50: C_sat(T) = 330 · e^(0.025 (T − 25)) ppm.
// The real curve comes from Karl Fischer lab calibration.
const csat = (tC: number) => 330 * Math.exp(0.025 * (tC - 25));

type Status = "NORMAL" | "WASPADA" | "KRITIS";

// ---- Drawing constants (SVG user units) ---------------------------------------------------------
const S = 3.6; // px per mm
const LANTAI = 410; // tank floor y
const PERMUKAAN_PENUH = 150; // fuel surface y when the tank is full
const SURUT_MAKS = 60; // how far the surface drops at VOLUME_MAKS_L used
const yMm = (mm: number) => LANTAI - mm * S;

const WARNA_STATUS: Record<Status, { lampu: string; teks: string; chip: string }> = {
  NORMAL: { lampu: "#22c55e", teks: "text-brand-700", chip: "bg-brand-100/70 text-brand-800" },
  WASPADA: { lampu: "#E9A21B", teks: "text-[#8A5A00]", chip: "bg-[#E9A21B]/15 text-[#8A5A00]" },
  KRITIS: { lampu: "#D64545", teks: "text-[#B83232]", chip: "bg-[#D64545]/15 text-[#B83232]" },
};

export default function HowItWorksSection() {
  const { t, lang } = useLang();
  const reduceMotion = useReducedMotion();
  const [aw, setAw] = useState(0.62);
  // Phones only: which of the two info panels is unfolded (null = both folded). From md up both are always shown.
  const [panelInfo, setPanelInfo] = useState<"telemetri" | "fisika" | null>(null);
  const togglePanel = (p: "telemetri" | "fisika") => setPanelInfo((cur) => (cur === p ? null : p));
  const [suhu, setSuhu] = useState(31);
  const [airMm, setAirMm] = useState(0); // 0 = dry, AIR_BEBAS_MM = free water present
  const [volumePakai, setVolumePakai] = useState(120);
  const [prediksi, setPrediksi] = useState(90);
  const [umurLab, setUmurLab] = useState(60);
  const [menguras, setMenguras] = useState(false);
  const rafRef = useRef<number | null>(null);

  const airBebas = airMm > 0;
  const kejenuhan = csat(suhu);
  const ppm = Math.round(aw * kejenuhan);
  const saturasiPct = Math.round(aw * 100);

  const syarat = [
    { ok: !airBebas, k: t("Tidak ada air bebas (W_bebas = 0)", "No free water (W_bebas = 0)"), v: airBebas ? "W_bebas = 1" : "W_bebas = 0" },
    { ok: ppm < AMBANG_WASPADA_PPM, k: t(`Kadar air terlarut di bawah ${AMBANG_WASPADA_PPM} ppm`, `Dissolved water below ${AMBANG_WASPADA_PPM} ppm`), v: `${ppm} ppm` },
    { ok: saturasiPct < AMBANG_SATURASI_PCT, k: t(`Persen saturasi di bawah ${AMBANG_SATURASI_PCT}%`, `Saturation below ${AMBANG_SATURASI_PCT}%`), v: `${saturasiPct}%` },
    { ok: prediksi > AMBANG_PREDIKSI_HARI, k: t(`Prediksi regresi menuju Merah lebih dari ${AMBANG_PREDIKSI_HARI} hari`, `Regression forecast to Red is more than ${AMBANG_PREDIKSI_HARI} days away`), v: t(`${prediksi} hari`, `${prediksi} days`) },
    { ok: umurLab <= AMBANG_UMUR_LAB_HARI, k: t(`Hasil uji lab berumur ${AMBANG_UMUR_LAB_HARI} hari atau kurang`, `Lab result is ${AMBANG_UMUR_LAB_HARI} days old or less`), v: t(`${umurLab} hari`, `${umurLab} days`) },
  ];
  const semuaOk = syarat.every((s) => s.ok);
  // Free water turns the system Red straight away, even when dissolved water is low.
  const status: Status = airBebas || ppm >= AMBANG_MERAH_PPM ? "KRITIS" : semuaOk ? "NORMAL" : "WASPADA";
  const warna = WARNA_STATUS[status];

  const fmt = useCallback(
    (n: number, digits = 1) =>
      n.toLocaleString(lang === "id" ? "id-ID" : "en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits }),
    [lang]
  );

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  // Tween the free-water layer down to 0 so the drain reads as a physical process, not a jump.
  const kurasAir = () => {
    if (!airBebas || menguras) return;
    if (reduceMotion) {
      setAirMm(0);
      return;
    }
    setMenguras(true);
    const dari = airMm;
    const durasi = 1400;
    const mulai = performance.now();
    const langkah = (now: number) => {
      const p = Math.min(1, (now - mulai) / durasi);
      const ease = 1 - Math.pow(1 - p, 2);
      setAirMm(Math.round(dari * (1 - ease) * 10) / 10);
      if (p < 1) rafRef.current = requestAnimationFrame(langkah);
      else setMenguras(false);
    };
    rafRef.current = requestAnimationFrame(langkah);
  };

  const judul = t("Perubahan Indikator Berdasarkan Kualitas Bahan Bakar B50", "Indicator Changes Based on B50 Fuel Quality");

  const gagal = syarat.filter((s) => !s.ok).map((s) => s.k.toLowerCase());
  const catatan: Record<Status, string> = {
    NORMAL: t(
      `Seluruh syarat status Hijau terpenuhi: tidak ada air bebas, kadar air terlarut ${ppm} ppm (di bawah ${AMBANG_WASPADA_PPM} ppm), saturasi ${saturasiPct}%, prediksi menuju Merah ${prediksi} hari, dan hasil uji lab berumur ${umurLab} hari. Lampu hijau menyala stabil.`,
      `All Green status conditions are met: no free water, dissolved water at ${ppm} ppm (below ${AMBANG_WASPADA_PPM} ppm), saturation at ${saturasiPct}%, forecast to Red in ${prediksi} days, and a lab result ${umurLab} days old. The green lamp stays on.`
    ),
    WASPADA: t(
      `Belum semua syarat status Hijau terpenuhi, yaitu: ${gagal.join("; ")}. Karena itu lampu kuning menyala dan pemeriksaan perlu dijadwalkan.`,
      `Not all Green status conditions are met, namely: ${gagal.join("; ")}. The yellow lamp is therefore on and an inspection should be scheduled.`
    ),
    KRITIS: airBebas
      ? t(
          `Air bebas setinggi ${fmt(airMm, 0)} mm terdeteksi probe dielektrik (W_bebas = 1), sehingga sistem langsung menyalakan status Merah, bukan Hijau, walau kadar air terlarut masih ${ppm} ppm. Kuras air untuk mengembalikan kondisi.`,
          `Free water ${fmt(airMm, 0)} mm high is detected by the dielectric probe (W_bebas = 1), so the system lights Red straight away, not Green, even though dissolved water is still ${ppm} ppm. Drain the water to recover.`
        )
      : t(
          `Kadar air terlarut ${ppm} ppm sudah mencapai batas ${AMBANG_MERAH_PPM} ppm, sehingga lampu merah menyala dan peringatan dikirim ke dasbor.`,
          `Dissolved water at ${ppm} ppm has reached the ${AMBANG_MERAH_PPM} ppm limit, so the red lamp is on and an alert is sent to the dashboard.`
        ),
  };

  const statusKatup = menguras ? t("MENGURAS", "DRAINING") : airBebas ? t("SIAP KURAS", "READY TO DRAIN") : t("SIAGA", "STANDBY");

  const lampu: { kode: Status; label: string; y: number }[] = [
    { kode: "WASPADA", label: t("WASPADA", "CAUTION"), y: 175 },
    { kode: "NORMAL", label: t("AMAN", "SAFE"), y: 245 },
    { kode: "KRITIS", label: t("KRITIS", "CRITICAL"), y: 315 },
  ];

  const permukaan = PERMUKAAN_PENUH + (volumePakai / VOLUME_MAKS_L) * SURUT_MAKS;
  const yAir = yMm(SLUDGE_MM + airMm);
  const ySludge = yMm(SLUDGE_MM);

  return (
    <section id="cara-kerja" className="scroll-mt-24 bg-[#f0f0f0] py-16 font-hiw-body font-normal lg:py-24">
      <div className={KONTEN_SECTION}>
        {/* Heading on the left (pushed in from the edge), explanation in the column beside it. The two-tone
            heading follows the reference: dark, grey, dark. */}
        <FadeUp>
          <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pl-12 xl:pl-24 2xl:pl-40">
            <div>
              <h2 className="text-5xl font-bold leading-[1.04] tracking-[-0.035em] text-brand-950 md:text-6xl lg:text-7xl">
                {t("Fisika", "The Physics")}
                <br />
                <span className="text-[#9a9a9a]">{t("Di Balik", "Behind")}</span>
                <br />
                TANGKIS
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-slate-600 lg:pb-3 lg:pr-8">
              {t(
                "Atur aktivitas air, suhu, dan keberadaan air bebas di tangki, lalu lihat bagaimana sensor dan kotak kontrol memutuskan lampu mana yang menyala.",
                "Adjust the water activity, temperature, and free water in the tank, then watch how the sensors and control box decide which lamp to light."
              )}
            </p>
          </div>
        </FadeUp>

        <div className="mt-10 grid grid-cols-1 gap-10 rounded-2xl border border-slate-200 bg-[#f8f6f1] p-5 md:p-8 xl:grid-cols-[1.15fr_1fr] xl:gap-12">
          {/* ---------- Figure ---------- */}
          {/* The sticky wrapper lives inside a stretched grid cell, so it can only travel as far as this
              cell's bottom and never slides over the full-width note and tables below. */}
          <div className="min-w-0">
          <div className="xl:sticky xl:top-28">
            <p className="font-hiw-h2 text-xs font-semibold uppercase tracking-wider text-slate-600 md:text-sm">
              {t(
                "Respons kotak kontrol (Alat 2) terhadap kondisi bahan bakar di tangki (Alat 1)",
                "Control box response (Device 2) to the fuel condition in the tank (Device 1)"
              )}
            </p>

            <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-[#f3efe6] bg-[linear-gradient(#e7e2d6_1px,transparent_1px),linear-gradient(90deg,#e7e2d6_1px,transparent_1px)] bg-[size:20px_20px]">
              <svg viewBox="0 0 940 500" className="block h-auto w-full min-w-[720px]" role="img" aria-label={judul}>
                <defs>
                  <linearGradient id="hiw-solar" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#f3d27a" />
                    <stop offset="1" stopColor="#e2b44a" />
                  </linearGradient>
                  <linearGradient id="hiw-air" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#5aa7e0" />
                    <stop offset="1" stopColor="#2b78bf" />
                  </linearGradient>
                  <filter id="hiw-glow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="7" />
                  </filter>
                </defs>

                {/* Device labels */}
                <text x="85" y="52" fontSize="13" fontWeight="700" fill="#1f3d4a" letterSpacing="0.5">
                  {t("ALAT 1: TANGKI B50 DAN PROBE SENSOR", "DEVICE 1: B50 TANK AND SENSOR PROBE")}
                </text>
                <text x="560" y="52" fontSize="13" fontWeight="700" fill="#9a3412" letterSpacing="0.5">
                  {t("ALAT 2: KOTAK KONTROL", "DEVICE 2: CONTROL BOX")}
                </text>

                {/* ---- Tank ---- */}
                <path d="M78 98 L102 72 L418 72 L442 98 Z" fill="#244b5a" />
                <rect x="70" y="96" width="380" height="330" rx="6" fill="#1f3d4a" />
                <rect x="88" y="104" width="344" height={LANTAI - 104} fill="#f4f1ea" />
                {/* Fuel (F1): the surface drops as fuel is used */}
                <rect x="88" y={permukaan} width="344" height={Math.max(0, yAir - permukaan)} fill="url(#hiw-solar)" />
                <line x1="88" x2="432" y1={permukaan} y2={permukaan} stroke="#b7862a" strokeWidth="1.5" />
                {/* Free water (F2) */}
                <rect x="88" y={yAir} width="344" height={Math.max(0, ySludge - yAir)} fill="url(#hiw-air)" opacity="0.92" />
                {/* Sludge (F3) */}
                <rect x="88" y={ySludge} width="344" height={LANTAI - ySludge} fill="#7c4515" />

                {/* Dielectric probe at the tank's lowest point: binary 0 / 1 */}
                <rect x="244" y="62" width="40" height="30" rx="4" fill="#1b2a30" />
                <circle cx="264" cy="77" r="3.5" fill={warna.lampu} />
                <path d={`M264 92 V200 Q264 210 258 216 V${LANTAI - 26}`} fill="none" stroke="#28363c" strokeWidth="3" />
                <circle cx="258" cy="268" r="3.5" fill="#28363c" />
                {airBebas && <circle cx="258" cy={LANTAI - 14} r="18" fill="#D64545" opacity="0.5" filter="url(#hiw-glow)" />}
                <rect x="252" y={LANTAI - 26} width="12" height="22" rx="3" fill="#1d8fe0" stroke="#0f5c96" strokeWidth="1" />
                <rect x="294" y={LANTAI - 52} width="134" height="14" rx="2" fill="#fff8ec" opacity="0.92" />
                <text x="424" y={LANTAI - 41.5} textAnchor="end" fontSize="9.5" fill={airBebas ? "#B83232" : "#55636a"}>
                  {t(`PROBE DIELEKTRIK: ${airBebas ? "1" : "0"}`, `DIELECTRIC PROBE: ${airBebas ? "1" : "0"}`)}
                </text>

                {/* Phase markers */}
                {[
                  { k: "F1", y: (permukaan + yAir) / 2, show: yAir - permukaan > 18 },
                  { k: "F2", y: (yAir + ySludge) / 2, show: airBebas },
                  { k: "F3", y: (ySludge + LANTAI) / 2, show: true },
                ].map(
                  (m, i) =>
                    m.show && (
                      <g key={m.k} transform={`translate(${118 + i * 32} ${m.y})`}>
                        <circle r="11" fill="#fff" stroke="#9a3412" strokeWidth="1.3" />
                        <text textAnchor="middle" y="3.5" fontSize="9.5" fontWeight="700" fill="#9a3412">{m.k}</text>
                      </g>
                    )
                )}

                {/* Skid base */}
                <path d="M60 426 H460 L474 446 V470 L460 482 H60 L48 470 V446 Z" fill="#1b2326" />
                <rect x="84" y="440" width="350" height="28" rx="3" fill="#0f1416" stroke="#2a3438" />
                {/* Drain valve */}
                <path d="M450 408 H476 V470" fill="none" stroke="#5c6b70" strokeWidth="5" strokeLinecap="round" />
                <circle cx="452" cy="408" r="6" fill={menguras ? "#22c55e" : "#b23b1e"} />
                {menguras && (
                  <g>
                    {[0, 0.23, 0.46].map((d) => (
                      <circle key={d} cx="476" cy="472" r="3" fill="#2b78bf" className="animate-drip" style={{ animationDelay: `${d}s` }} />
                    ))}
                  </g>
                )}

                {/* Cable probe to control box */}
                <path d="M284 77 H520 V430 H612" fill="none" stroke="#9fd8b0" strokeWidth="3" />
                <path d="M284 77 H520 V430 H612" fill="none" stroke="#1f8a4c" strokeWidth="3" strokeDasharray="8 4" className="animate-cable-flow" />

                {/* ---- Control box ---- */}
                <circle cx="610" cy="102" r="8" fill="#9aa7ad" />
                <circle cx="720" cy="102" r="8" fill="#9aa7ad" />
                <rect x="565" y="108" width="200" height="300" rx="12" fill="#c9d2d6" stroke="#7b8a91" strokeWidth="2" />
                <rect x="575" y="118" width="180" height="280" rx="8" fill="#eef2f4" />
                {/* OLED */}
                <rect x="588" y="128" width="154" height="86" rx="5" fill="#1f4c86" />
                <rect x="593" y="133" width="144" height="76" rx="3" fill="#0b1220" />
                <g fontFamily="var(--font-jetbrains-mono), monospace" fontSize="9.5" fontWeight="600">
                  <text x="600" y="150" fill={warna.lampu}>
                    {status === "NORMAL"
                      ? t("AMAN: NORMAL", "SAFE: NORMAL")
                      : status === "WASPADA"
                        ? t("WASPADA: CEK", "CAUTION: CHECK")
                        : airBebas
                          ? t("KRITIS: AIR BEBAS", "CRITICAL: FREE H2O")
                          : t("KRITIS: KADAR AIR", "CRITICAL: WATER")}
                  </text>
                  <text x="600" y="168" fill="#7cc4ff">aw:{fmt(aw, 2)} T:{fmt(suhu, 0)}C</text>
                  <text x="600" y="184" fill="#e5e7eb">{t("AIR BEBAS", "FREE H2O")}: {airBebas ? "1" : "0"}</text>
                  <text x="600" y="200" fill="#fbbf24">{t("KADAR", "LEVEL")}: {ppm} PPM</text>
                </g>
                {/* Internals */}
                <rect x="588" y="226" width="154" height="160" rx="6" fill="#dfe5e8" stroke="#9aa7ad" />
                <rect x="600" y="240" width="26" height="60" rx="2" fill="#1b2326" />
                <rect x="634" y="236" width="50" height="118" rx="3" fill="#15803d" />
                <rect x="644" y="250" width="30" height="20" rx="1" fill="#0f5132" />
                <rect x="692" y="240" width="22" height="112" rx="3" fill="#1b2326" />
                <rect x="697" y="246" width="12" height="100" rx="2" fill="#e5e7eb" />
                <rect x="600" y="312" width="24" height="24" rx="2" fill="#1d8fe0" />
                <text x="665" y="372" textAnchor="middle" fontSize="9" fill="#55636a">
                  ESP32, RTC, microSD
                </text>
                {/* Bottom glands + pipes */}
                {[612, 665, 718].map((x) => (
                  <rect key={x} x={x - 8} y="406" width="16" height="12" rx="2" fill="#5c6b70" />
                ))}
                <path d="M612 418 V440 Q612 456 628 456 H650 Q665 456 665 440 V418" fill="none" stroke="#5c6b70" strokeWidth="4" />
                <path d="M718 418 V480" fill="none" stroke="#5c6b70" strokeWidth="4" />

                {/* Lamps */}
                {lampu.map((l) => {
                  const aktif = l.kode === status;
                  const c = WARNA_STATUS[l.kode].lampu;
                  return (
                    <g key={l.kode}>
                      <rect x="765" y={l.y - 14} width="18" height="28" rx="3" fill="#1b2326" />
                      {aktif && <circle cx="800" cy={l.y} r="22" fill={c} opacity="0.55" filter="url(#hiw-glow)" />}
                      <circle cx="800" cy={l.y} r="17" fill={aktif ? c : "#5b2f1c"} stroke="#1b2326" strokeWidth="2" opacity={aktif ? 1 : 0.85} />
                      {!aktif && <circle cx="800" cy={l.y} r="17" fill={c} opacity="0.25" />}
                      <text x="824" y={l.y + 4} fontSize="11" fontWeight="700" fill="#1f3d4a">
                        {l.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <dl className="mt-5 divide-y divide-slate-200 border-y border-slate-200 text-sm text-slate-600">
              {[
                ["F1", t("Biosolar B50", "B50 Biodiesel")],
                ["F2", t("Air Bebas", "Free Water")],
                ["F3", t("Endapan / Sludge Dasar", "Bottom Sediment / Sludge")],
              ].map(([kode, nama]) => (
                <div key={kode} className="grid grid-cols-[2.5rem_1fr] items-baseline py-2">
                  <dt className="font-bold text-[#9a3412]">{kode}</dt>
                  <dd>{nama}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[2.5rem_1fr] items-baseline py-2">
                <dt className="sr-only">{t("Katup Pemeliharaan", "Maintenance Valve")}</dt>
                <dd className="col-span-2">
                  {t("Katup Pemeliharaan", "Maintenance Valve")}: <b className="font-semibold text-[#172B3A]">{menguras ? t("Terbuka", "Open") : t("Tertutup", "Closed")}</b>
                </dd>
              </div>
            </dl>
          </div>
          </div>

          {/* ---------- Control panel ---------- */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-hiw-h2 text-xs font-semibold uppercase tracking-wider text-slate-600 md:text-sm">
                {t("INDIKATOR", "INDICATOR")}
              </p>
              <span className={cn("inline-flex items-center gap-1.5 rounded px-2.5 py-1 font-hiw-h2 text-xs font-semibold", warna.chip)} aria-live="polite">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: warna.lampu }} aria-hidden="true" />
                {status === "NORMAL"
                  ? t("LAMPU HIJAU AKTIF", "GREEN LAMP ON")
                  : status === "WASPADA"
                    ? t("LAMPU KUNING AKTIF", "YELLOW LAMP ON")
                    : t("LAMPU MERAH AKTIF", "RED LAMP ON")}
              </span>
            </div>
            <h3 className={cn("mt-3 font-hiw-h2 text-2xl font-semibold leading-snug md:text-3xl", warna.teks)}>{judul}</h3>

            <dl className="mt-5 grid grid-cols-3 divide-x divide-slate-200 border-y border-slate-200 py-4 text-center">
              {[
                { k: t("Kadar Air (ppm_est)", "Water Content (ppm_est)"), v: `${ppm} ppm`, c: ppm >= AMBANG_WASPADA_PPM ? "text-[#B83232]" : "text-[#172B3A]" },
                { k: t("Aktivitas Air (a_w)", "Water Activity (a_w)"), v: fmt(aw, 2), c: "text-[#1d5fa0]" },
                { k: t("Air Bebas (W_bebas)", "Free Water (W_bebas)"), v: airBebas ? "1" : "0", c: airBebas ? "text-[#B83232]" : "text-brand-700" },
              ].map((s) => (
                <div key={s.k} className="px-2">
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-600 md:text-xs">{rich(s.k)}</dt>
                  <dd className={cn("mt-1 text-lg font-semibold tabular-nums md:text-2xl", s.c)}>{s.v}</dd>
                </div>
              ))}
            </dl>

            {/* Green-status conditions, live */}
            <h4 className="mt-6 font-hiw-h2 text-xs font-semibold uppercase tracking-wider text-slate-600 md:text-sm">
              {t("Syarat Status Hijau", "Green Status Conditions")}
            </h4>
            <ul className="mt-2 divide-y divide-slate-200 border-y border-slate-200">
              {syarat.map((s) => (
                <li key={s.k} className="flex items-center gap-3 py-2.5 text-sm">
                  <span
                    className={cn(
                      "grid h-5 w-5 flex-none place-items-center rounded-full text-white",
                      s.ok ? "bg-brand-600" : "bg-[#D64545]"
                    )}
                    aria-hidden="true"
                  >
                    {s.ok ? <Check className="h-3 w-3" strokeWidth={3} /> : <X className="h-3 w-3" strokeWidth={3} />}
                  </span>
                  <span className="min-w-0 flex-1 text-slate-700">{rich(s.k)}</span>
                  <span className={cn("flex-none font-medium tabular-nums", s.ok ? "text-slate-600" : "text-[#B83232]")}>{rich(s.v)}</span>
                </li>
              ))}
            </ul>

            <Slider
              label={t("1. Aktivitas Air (a_w)", "1. Water Activity (a_w)")}
              value={aw}
              min={0.3}
              max={1}
              step={0.01}
              onChange={setAw}
              warnaNilai="text-[#1d5fa0]"
              tampil={fmt(aw, 2)}
              ticks={[t("0,30 (Kering)", "0.30 (Dry)"), t("0,80 (Batas Saturasi)", "0.80 (Saturation Limit)"), t("1,00 (Jenuh)", "1.00 (Saturated)")]}
            />
            <Slider
              label={t("2. Suhu Bahan Bakar (T_bb)", "2. Fuel Temperature (T_bb)")}
              value={suhu}
              min={20}
              max={60}
              step={1}
              onChange={setSuhu}
              warnaNilai="text-[#9a3412]"
              tampil={`${fmt(suhu, 0)} °C`}
              ticks={["20 °C", "40 °C", "60 °C"]}
            />
            <Slider
              label={t("3. Volume Pakai (V_pakai)", "3. Volume Used (V_pakai)")}
              value={volumePakai}
              min={0}
              max={VOLUME_MAKS_L}
              step={10}
              onChange={setVolumePakai}
              warnaNilai="text-[#172B3A]"
              tampil={`${fmt(volumePakai, 0)} L`}
              ticks={[t("0 L (Penuh)", "0 L (Full)"), `${VOLUME_MAKS_L} L`]}
            />

            <div className="mt-6">
              <span className="font-hiw-h2 text-sm font-semibold uppercase tracking-wide text-[#172B3A]">
                {rich(t("4. Air Bebas di Dasar Tangki (W_bebas)", "4. Free Water at the Tank Bottom (W_bebas)"))}
              </span>
              <div className="mt-3 grid grid-cols-2 gap-2" role="group" aria-label={t("Keluaran probe dielektrik", "Dielectric probe output")}>
                {[
                  { nilai: 0, label: t("0 (Kering)", "0 (Dry)") },
                  { nilai: AIR_BEBAS_MM, label: t("1 (Air Bebas Terdeteksi)", "1 (Free Water Detected)") },
                ].map((o) => {
                  const aktif = (o.nilai > 0) === airBebas;
                  return (
                    <button
                      key={o.nilai}
                      type="button"
                      onClick={() => !menguras && setAirMm(o.nilai)}
                      disabled={menguras}
                      aria-pressed={aktif}
                      className={cn(
                        "border px-3 py-2.5 font-hiw-h2 text-sm font-semibold transition-colors disabled:cursor-wait disabled:opacity-60",
                        aktif ? "border-[#1f3d4a] bg-[#1f3d4a] text-white" : "border-slate-300 text-slate-700 hover:border-[#1f3d4a]"
                      )}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <Slider
              label={t("5. Prediksi Regresi Menuju Merah", "5. Regression Forecast to Red")}
              value={prediksi}
              min={0}
              max={120}
              step={1}
              onChange={setPrediksi}
              warnaNilai="text-[#172B3A]"
              tampil={t(`${prediksi} hari`, `${prediksi} days`)}
              ticks={[t("0 hari", "0 days"), t(`${AMBANG_PREDIKSI_HARI} hari (Batas)`, `${AMBANG_PREDIKSI_HARI} days (Limit)`), t("120 hari", "120 days")]}
            />
            <Slider
              label={t("6. Umur Hasil Uji Lab", "6. Age of Lab Result")}
              value={umurLab}
              min={0}
              max={365}
              step={5}
              onChange={setUmurLab}
              warnaNilai="text-[#172B3A]"
              tampil={t(`${umurLab} hari`, `${umurLab} days`)}
              ticks={[t("0 hari", "0 days"), t(`${AMBANG_UMUR_LAB_HARI} hari (Batas)`, `${AMBANG_UMUR_LAB_HARI} days (Limit)`), t("365 hari", "365 days")]}
            />

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={kurasAir}
                disabled={!airBebas || menguras}
                className="border border-[#1d5fa0] px-4 py-3 font-hiw-h2 text-sm font-semibold uppercase tracking-wide text-[#1d5fa0] transition-colors hover:bg-[#1d5fa0] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#1d5fa0]"
              >
                {menguras ? t("Menguras…", "Draining…") : t("Kuras Air (Auto Drain Valve)", "Drain Water (Auto Drain Valve)")}
              </button>
              <button
                type="button"
                onClick={() => setVolumePakai(0)}
                disabled={volumePakai === 0}
                className="border border-[#9a3412] px-4 py-3 font-hiw-h2 text-sm font-semibold uppercase tracking-wide text-[#9a3412] transition-colors hover:bg-[#9a3412] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#9a3412]"
              >
                {t("Isi Ulang Tangki", "Refill Tank")}
              </button>
            </div>
          </div>

          {/* Instrument note, then telemetry and physics parameters in one row of two columns, then the disclaimer. */}
          <div className="border-t border-slate-200 pt-8 xl:col-span-2">
            <p className="text-base leading-relaxed text-slate-700">
              <b className="font-hiw-h2 font-semibold text-[#172B3A]">{t("Catatan Instrumen", "Instrument Note")}:</b> {catatan[status]}
            </p>

            {/* Phones: two fold-out rows, one open at a time. md+: the two lists side by side, always open. */}
            <div className="mt-8 grid grid-cols-1 border-b border-slate-200 md:grid-cols-2 md:gap-12 md:border-b-0">
              <PanelInfo
                id="telemetri"
                title={t("Telemetri Sensor dan Akuisisi Data ESP32", "Sensor Telemetry and ESP32 Data Acquisition")}
                open={panelInfo === "telemetri"}
                onToggle={() => togglePanel("telemetri")}
              >
                <dl className="divide-y divide-slate-200 text-sm md:mt-3 md:border-y md:border-slate-200">
                  <Baris k={t("Aktivitas Air (a_w)", "Water Activity (a_w)")} v={fmt(aw, 2)} />
                  <Baris k={t("Suhu Bahan Bakar (T_bb)", "Fuel Temperature (T_bb)")} v={`${fmt(suhu, 0)} °C`} />
                  <Baris k="C_sat(T_bb)" v={`${Math.round(kejenuhan)} ppm`} />
                  <Baris k={t("Kadar Air Terlarut (ppm_est)", "Dissolved Water (ppm_est)")} v={`${ppm} PPM`} cls={warna.teks} />
                  <Baris
                    k={t("Air Bebas (W_bebas)", "Free Water (W_bebas)")}
                    v={airBebas ? t("1 (terdeteksi)", "1 (detected)") : t("0 (kering)", "0 (dry)")}
                    cls={airBebas ? "text-[#B83232]" : "text-brand-700"}
                  />
                  <Baris k={t("Volume Pakai (V_pakai)", "Volume Used (V_pakai)")} v={`${fmt(volumePakai, 0)} L`} />
                  <Baris k={t("Status Katup & Log MicroSD", "Valve Status & MicroSD Log")} v={`${statusKatup}   ${t("TEREKAM CSV", "LOGGED CSV")}`} cls="text-[#9a3412]" />
                </dl>
              </PanelInfo>
              <PanelInfo
                id="fisika"
                title={t("Parameter Fisika Stratifikasi", "Stratification Physics Parameters")}
                open={panelInfo === "fisika"}
                onToggle={() => togglePanel("fisika")}
              >
                <dl className="divide-y divide-slate-200 text-sm md:mt-3 md:border-y md:border-slate-200">
                  <Baris k={t("Fasa Atas (Biosolar B50)", "Top Phase (B50 Biodiesel)")} v={`εr ≈ 2${t(",", ".")}8   ρ ≈ ${fmt(0.85, 2)} g/cm³`} />
                  <Baris k={t("Fasa Tengah (Air Bebas)", "Middle Phase (Free Water)")} v={`εr ≈ 80${t(",", ".")}1   ρ ≈ ${fmt(1, 2)} g/cm³`} cls="text-[#1d5fa0]" />
                  <Baris k={t("Fasa Dasar (Sludge/Emulsi)", "Bottom Phase (Sludge/Emulsion)")} v={`εr ≈ 38${t(",", ".")}0   ρ > ${fmt(1.05, 2)} g/cm³`} cls="text-[#9a3412]" />
                  <Baris k={t("Keluaran Probe Dielektrik", "Dielectric Probe Output")} v={t("0 (kering) atau 1 (air bebas)", "0 (dry) or 1 (free water)")} />
                  <Baris k={t("Kadar Air Terlarut", "Dissolved Water")} v="ppm_est = a_w × C_sat(T_bb)" />
                  <Baris k={t("Ambang Waspada Kadar Air", "Water Content Caution Threshold")} v={`ppm_est < ${AMBANG_WASPADA_PPM} ppm`} />
                  <Baris k={t("Kalibrasi Kurva C_sat", "C_sat Curve Calibration")} v={t("Uji lab Karl Fischer", "Karl Fischer lab test")} />
                </dl>
              </PanelInfo>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              {t(
                "Simulasi ini bersifat ilustratif: kurva saturasi C_sat dan angka ppm dihitung dari model sederhana untuk menjelaskan prinsip kerja, bukan hasil kalibrasi uji lab Karl Fischer.",
                "This simulation is illustrative: the C_sat saturation curve and ppm figures come from a simplified model to explain the working principle, not from Karl Fischer lab calibration."
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// One info list. Below md its title is a button that folds the list open or shut; from md up the title is a plain
// heading and the list is always visible.
function PanelInfo({ id, title, open, onToggle, children }: { id: string; title: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  const isi = `panel-info-${id}`;
  return (
    <div className="min-w-0 border-t border-slate-200 md:border-t-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={isi}
        className="flex w-full items-center justify-between gap-3 py-4 text-left md:hidden"
      >
        <h3 className="font-hiw-h2 text-xs font-semibold uppercase tracking-wider text-[#172B3A]">{title}</h3>
        <ChevronDown className={cn("h-4 w-4 flex-none text-slate-500 transition-transform duration-300", open && "rotate-180")} aria-hidden />
      </button>
      <h3 className="hidden font-hiw-h2 text-sm font-semibold uppercase tracking-wider text-[#172B3A] md:block">{title}</h3>
      <div id={isi} className={cn(open ? "block pb-2" : "hidden", "md:block md:pb-0")}>
        {children}
      </div>
    </div>
  );
}

// Renders names like a_w, T_bb, ppm_est and W_bebas with a real subscript.
function rich(text: string): ReactNode {
  return text.split(/([A-Za-z]+_[A-Za-z]+)/g).map((part, i) => {
    if (i % 2 === 0) return part;
    const [base, sub] = part.split("_");
    return (
      <span key={i}>
        {base}
        <sub className="text-[0.72em] leading-none">{sub}</sub>
      </span>
    );
  });
}

function Baris({ k, v, cls }: { k: string; v: string; cls?: string }) {
  return (
    // Label left, value right-aligned on one line at every width, so a phone does not spend two lines per reading.
    // A long value wraps inside its own column instead of pushing the label down.
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 py-2.5 sm:gap-x-6 sm:py-3">
      <dt className="text-sm text-slate-500 sm:text-base">{rich(k)}</dt>
      <dd className={cn("max-w-[11rem] text-right text-sm font-medium tabular-nums text-[#172B3A] sm:max-w-[16rem]", cls)}>{rich(v)}</dd>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  warnaNilai,
  tampil,
  ticks,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  warnaNilai: string;
  tampil: string;
  ticks: string[];
}) {
  return (
    <label className="mt-6 block">
      <span className="flex items-baseline justify-between gap-3">
        <span className="font-hiw-h2 text-sm font-semibold uppercase tracking-wide text-[#172B3A]">{rich(label)}</span>
        <span className={cn("text-sm font-semibold tabular-nums", warnaNilai)}>{tampil}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full cursor-pointer accent-[#1f3d4a]"
      />
      <span className="mt-1 flex flex-wrap justify-between gap-x-3 gap-y-0.5 text-[11px] text-slate-500 md:text-xs">
        {ticks.map((tk) => (
          <span key={tk}>{tk}</span>
        ))}
      </span>
    </label>
  );
}
