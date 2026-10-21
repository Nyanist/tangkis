// Animated "control room" backdrop for the hero, drawn under CircuitAccent. Pure CSS + SVG (keyframes live in
// globals.css), so it costs no JS and no image download, and every layer stops under prefers-reduced-motion.
// Everything here moves with `transform`/`opacity` only (the properties the browser animates on the GPU, off the
// main thread): glows are radial gradients instead of blur() filters, and the waveform scrolls instead of
// animating stroke-dashoffset, which would repaint the SVG on every frame.
// Layers, back to front: drifting aurora glows, a slowly scrolling grid, a scrolling
// sensor waveform, and rising data particles.

// Deterministic (no Math.random) so server and client markup match.
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  size: 2 + (i % 3),
  duration: 11 + ((i * 5) % 9),
  delay: -((i * 3.7) % 14),
  opacity: 0.35 + ((i * 13) % 5) * 0.1,
}));

// One sensor "heartbeat" repeated across the width: flat trend, a spike, a dip, flat again.
const WAVE =
  "M0 70 H90 L110 70 L124 28 L142 104 L158 70 H300 L318 70 L330 50 L342 84 L352 70 H520 L538 70 L552 22 L572 110 L588 70 H760 L776 70 L788 46 L800 90 L812 70 H980 L998 70 L1012 30 L1030 102 L1046 70 H1200";

export default function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Aurora glows: soft radial gradients, so no blur filter has to be re-rasterised as they move */}
      <div className="absolute -left-[14%] top-[14%] h-[70%] w-[62%] animate-aurora-a bg-[radial-gradient(closest-side,rgba(106,168,79,0.34),transparent)]" />
      <div className="absolute -right-[14%] top-[2%] h-[72%] w-[56%] animate-aurora-b bg-[radial-gradient(closest-side,rgba(46,139,87,0.32),transparent)]" />
      <div className="absolute -bottom-[34%] left-[18%] h-[70%] w-[62%] animate-aurora-c bg-[radial-gradient(closest-side,rgba(147,196,125,0.26),transparent)]" />

      {/* Grid, fading out toward the edges and drifting one cell per loop so the wrap is invisible */}
      <div className="absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_68%_52%,black_18%,transparent_72%)]">
        <div className="absolute inset-x-0 -top-14 bottom-0 animate-grid-drift bg-[linear-gradient(rgba(182,215,168,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(182,215,168,0.11)_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      {/* Sensor waveform: two identical copies side by side, the strip slides left by exactly one copy per loop */}
      <div className="absolute inset-x-0 bottom-[12%] h-24 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_18%,black_70%,transparent)] max-md:bottom-[30%] max-md:h-16">
        <svg viewBox="0 0 2400 140" preserveAspectRatio="none" className="h-full w-[200%] animate-wave-scroll opacity-70 max-md:opacity-45">
          <g fill="none" stroke="#d9ead3" strokeOpacity="0.4" strokeWidth="1.6" strokeLinejoin="round">
            <path d={WAVE} vectorEffect="non-scaling-stroke" />
            <path d={WAVE} transform="translate(1200 0)" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>
      </div>

      {/* Rising data particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 animate-particle-rise rounded-full bg-brand-300"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
