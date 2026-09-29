"use client";
import { useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

// Circular button, matching public/ref/magnet-{normal,hover}.png: a thin ring with
// a diagonal arrow at rest; on hover the ring thickens, the arrow straightens out,
// and the label spins slowly around the inside of the ring. The whole button also
// eases toward the cursor within its bounds (the "magnet" part), springing back to
// center on mouse-leave.
export default function MagnetButton({
  href,
  label,
  className,
  size = 160,
  hoverArea = 1.7,
  strength = 0.4,
}: {
  href: string;
  label: string;
  className?: string;
  size?: number;
  /** Multiplier on `size` for the invisible zone that triggers the pull/hover — bigger than the ring itself, so it reacts before the cursor reaches it. */
  hoverArea?: number;
  strength?: number;
}) {
  const pathId = useId();
  const zoneRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = zoneRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const r = size / 2 - 20;
  const circumference = 2 * Math.PI * r;
  const repeated = `${label} • `.repeat(6);
  const zoneSize = size * hoverArea;

  return (
    <div
      ref={zoneRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ width: zoneSize, height: zoneSize }}
      className="flex items-center justify-center"
    >
      <motion.div style={{ x: springX, y: springY }}>
      <Link
        href={href}
        aria-label={label}
        style={{ width: size, height: size }}
        className={cn("group relative flex items-center justify-center rounded-full", className)}
      >
        <span
          className={cn(
            "absolute inset-0 rounded-full border transition-all duration-300",
            hovered ? "border-2 border-[#f0f0f0]" : "border border-white/30"
          )}
        />
        <svg viewBox={`0 0 ${size} ${size}`} className={cn("absolute inset-0 h-full w-full", hovered && "animate-spin-slow")}>
          <path id={pathId} fill="none" d={`M ${size / 2},${size / 2} m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`} />
          <text className={cn("fill-brand-300 text-[10px] font-semibold uppercase tracking-widest transition-opacity duration-300", hovered ? "opacity-100" : "opacity-0")}>
            {/* textLength + lengthAdjust force the repeated string to stretch/compress to
                exactly one circumference — without it, the text's natural width rarely
                matches the path length, so the last repeat gets cut mid-word right where
                it meets the first repeat, reading as two labels jammed together with no "•". */}
            <textPath href={`#${pathId}`} textLength={circumference} lengthAdjust="spacingAndGlyphs">
              {repeated}
            </textPath>
          </text>
        </svg>
        <ArrowRight
          className={cn(
            "relative h-8 w-8 text-[#f0f0f0] transition-transform duration-300",
            hovered ? "rotate-0 scale-110" : "-rotate-45"
          )}
          aria-hidden="true"
        />
      </Link>
      </motion.div>
    </div>
  );
}
