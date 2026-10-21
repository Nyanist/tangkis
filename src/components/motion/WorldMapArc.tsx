"use client";
import { useEffect, useRef } from "react";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { GeoPermissibleObjects } from "d3";
import { useReducedMotion } from "framer-motion";
import { useLang } from "@/lib/i18n";

// Hero world map: the continents as soft, solid shapes bent into an arch, fading out toward the bottom, with a few
// city markers. The arch comes from a conic projection whose cone apex is the south pole, which turns the parallels
// into upward-bulging arcs. The map slowly scrolls along the arch (the central longitude drifts), and can be dragged
// sideways to spin it by hand. The land outline is self-hosted (public/land-110m.json, from world-atlas).

const PARALLELS: [number, number] = [-5, -30]; // flatter cone = gentler arch
const START_LON = 10; // Europe and Africa in the middle, the Americas on the left, Asia on the right
const AUTO_SPEED = 3.2; // degrees of longitude per second: one full lap in about 112 s
const ASPECT = 1.9; // width / height of the drawing area

const HUB = { lat: -6.21, lon: 106.85 }; // Jakarta
const CITIES = [
  HUB,
  { lat: 1.35, lon: 103.82 }, // Singapore
  { lat: 35.68, lon: 139.69 }, // Tokyo
  { lat: 25.2, lon: 55.27 }, // Dubai
  { lat: 51.5, lon: -0.12 }, // London
  { lat: 40.71, lon: -74.0 }, // New York
  { lat: -33.87, lon: 151.21 }, // Sydney
];

interface WorldMapArcProps {
  className?: string;
}

export default function WorldMapArc({ className }: WorldMapArcProps) {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    let raf = 0;
    let visible = true;
    let w = 0;
    let h = 0;
    let dpr = 1;

    // set once the data has loaded
    let d3: typeof import("d3") | null = null;
    let land: GeoPermissibleObjects | null = null;
    let projection: ReturnType<typeof import("d3")["geoConicEquidistant"]> | null = null;
    let fill: CanvasGradient | null = null;

    let lon = START_LON;
    let velocity = 0; // degrees/s from a drag fling, decays
    let dragging = false;
    let lastX = 0;
    let lastMove = 0;
    let resumeAt = 0;

    // Size the canvas and fit the projection to it (scale + translate stay fixed while the longitude drifts).
    const layout = () => {
      const r = wrap.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      if (!d3 || !land) return;
      projection = d3.geoConicEquidistant().parallels(PARALLELS).rotate([-START_LON, 0]);
      projection.fitWidth(w, land);
      const b = d3.geoPath(projection).bounds(land);
      const [tx, ty] = projection.translate();
      projection.translate([tx + (w / 2 - (b[0][0] + b[1][0]) / 2), ty + h * 0.1 - b[0][1]]);
      // light at the top of the arch, gone by the bottom (this also hides Antarctica)
      fill = ctx.createLinearGradient(0, 0, 0, h);
      fill.addColorStop(0, "rgba(217,234,211,0.52)");
      fill.addColorStop(0.5, "rgba(217,234,211,0.2)");
      fill.addColorStop(0.86, "rgba(217,234,211,0)");
    };

    const draw = (now: number) => {
      if (!d3 || !land || !projection || !fill) return;
      projection.rotate([-lon, 0]);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = fill;
      ctx.beginPath();
      d3.geoPath(projection, ctx)(land);
      ctx.fill();

      // city markers: soft glow, a pulsing ring, a solid core
      const time = now / 1000;
      CITIES.forEach((c, i) => {
        const p = projection!([c.lon, c.lat]);
        if (!p) return;
        const [x, y] = p;
        if (x < 0 || x > w || y < 0 || y > h) return;
        const hub = i === 0;
        const base = Math.max(2.2, w * (hub ? 0.0058 : 0.0042));
        const glow = ctx.createRadialGradient(x, y, 0, x, y, base * 4.4);
        glow.addColorStop(0, hub ? "rgba(182,215,168,0.65)" : "rgba(147,196,125,0.5)");
        glow.addColorStop(1, "rgba(147,196,125,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, base * 4.4, 0, Math.PI * 2);
        ctx.fill();
        const ph = (time * 0.6 + i * 0.29) % 1;
        ctx.strokeStyle = `rgba(182,215,168,${(0.5 * (1 - ph)).toFixed(3)})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(x, y, base * (1.3 + 3.4 * ph), 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = hub ? "#eef8e8" : "#cfe6c4";
        ctx.beginPath();
        ctx.arc(x, y, base, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    let last = performance.now();
    const frame = (now: number) => {
      raf = 0;
      if (cancelled) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!dragging) {
        if (Math.abs(velocity) > 0.05) {
          lon += velocity * dt;
          velocity *= Math.pow(0.04, dt); // a fling fades out in roughly a second
        } else if (!reduceMotion && now > resumeAt) {
          lon -= AUTO_SPEED * dt; // continents drift to the right, the way the Earth turns
        }
      }
      draw(now);
      if (visible && (!reduceMotion || dragging || Math.abs(velocity) > 0.05)) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf && !cancelled) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    // ---- drag to spin
    const degPerPx = () => 300 / Math.max(1, w); // roughly one lap across the map width
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastMove = performance.now();
      velocity = 0;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
      kick();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const now = performance.now();
      const dLon = -dx * degPerPx();
      lon += dLon;
      velocity = Math.max(-240, Math.min(240, dLon / (Math.max(1, now - lastMove) / 1000)));
      lastX = e.clientX;
      lastMove = now;
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (performance.now() - lastMove > 90) velocity = 0; // stopped before letting go: no fling
      resumeAt = performance.now() + 1800;
      canvas.style.cursor = "grab";
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.style.cursor = "grab";

    layout();
    const ro = new ResizeObserver(() => {
      layout();
      draw(performance.now());
    });
    ro.observe(wrap);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(wrap);
    const onVis = () => {
      visible = !document.hidden;
      if (visible) kick();
    };
    document.addEventListener("visibilitychange", onVis);

    (async () => {
      try {
        const [d3mod, res] = await Promise.all([import("d3"), fetch("/land-110m.json")]);
        const topo = (await res.json()) as Topology<{ land: GeometryCollection }>;
        if (cancelled) return;
        d3 = d3mod;
        land = feature(topo, topo.objects.land) as unknown as GeoPermissibleObjects;
        layout();
        draw(performance.now());
        kick();
      } catch {
        /* no map data: the area stays empty rather than breaking the hero */
      }
    })();

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        aspectRatio: String(ASPECT),
        // continents slide in and out softly at the left and right ends of the arch
        WebkitMaskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={t(
          "Peta dunia melengkung yang bergeser perlahan, dengan penanda kota yang terhubung dengan Jakarta",
          "A slowly drifting, arched world map with city markers including Jakarta"
        )}
        className="block h-full w-full touch-pan-y select-none"
      />
    </div>
  );
}
