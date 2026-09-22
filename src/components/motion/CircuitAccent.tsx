// Decorative circuit-trace accent (green take on public/hero-section-accent.webp): traces fan into a hub on the right,
// and a short light pulse travels along each one. Pure SVG + CSS, so it stays sharp and costs no image download.
// The hub is the SQUARE below (centre 770,290 in a 1000x560 box). Every trace ends exactly on one of its edges, on a
// fixed 12-14 unit grid, so the node dots line up. Move the square (or a trace's final coordinate) to move the dots.
const HUB = { x: 736, y: 256, size: 68 };
// Irregular traces, one per node, generated backwards from each node: a straight run out of the square, then random
// steep turns (axis <-> 2:1 diagonal, never 90 degrees) with random run lengths (>= 40 units) until they leave the box.
// Each trace only ever moves in one direction pair (e.g. left + up, never left, up, then right), and the seeded search
// rejects any layout where traces cross or come within 16 units of each other away from the square. 16 nodes:
// 5 left (y 262..318), 4 top, 3 right (centred: 269 / 290 / 311), 4 bottom. Each group leaves the box through its own
// side, so traces reach all four sides of the hero.
const PATHS = [
  "M-30 19 L226 19 L248 64 L477 64 L499 106 L625 106 L645 147 L645 218 L667 262 L736 262",
  "M-75 54 L219 54 L261 137 L404 137 L448 225 L609 225 L634 276 L736 276",
  "M-22 472 L173 472 L208 402 L414 402 L441 348 L619 348 L648 290 L736 290",
  "M-29 499 L204 499 L227 452 L448 452 L486 376 L636 376 L672 304 L736 304",
  "M-50 528 L242 528 L266 480 L477 480 L513 408 L649 408 L694 318 L736 318",
  "M558 -90 L558 36 L580 81 L711 81 L750 159 L750 256",
  "M722 -90 L722 64 L764 147 L764 256",
  "M805 -88 L805 108 L778 162 L778 256",
  "M833 -169 L833 102 L792 184 L792 256",
  "M1184 185 L911 185 L869 269 L804 269",
  "M1090 250 L908 250 L888 290 L804 290",
  "M1017 388 L894 388 L856 311 L804 311",
  "M674 625 L713 547 L713 500 L750 427 L750 324",
  "M822 592 L798 544 L798 480 L762 408 L762 324",
  "M982 723 L982 544 L938 455 L814 455 L776 380 L776 324",
  "M1004 672 L1004 488 L972 423 L818 423 L790 367 L790 324",
];

export default function CircuitAccent() {
  return (
    <svg
      viewBox="0 0 1000 560"
      preserveAspectRatio="xMaxYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70 max-md:opacity-40"
      aria-hidden
    >
      <defs>
        <radialGradient id="circuit-hub" cx="77%" cy="52%" r="45%">
          <stop offset="0%" stopColor="#93c47d" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#93c47d" stopOpacity="0" />
        </radialGradient>
        <marker id="circuit-node" markerUnits="userSpaceOnUse" refX="3" refY="3" markerWidth="6" markerHeight="6">
          <circle cx="3" cy="3" r="2" fill="none" stroke="#b6d7a8" strokeWidth="1" />
        </marker>
      </defs>
      <rect width="1000" height="560" fill="url(#circuit-hub)" />
      <rect x={HUB.x} y={HUB.y} width={HUB.size} height={HUB.size} rx="4" fill="none" stroke="#b6d7a8" strokeOpacity="0.25" />
      <g fill="none" stroke="#b6d7a8" strokeOpacity="0.25" strokeWidth="1">
        {PATHS.map((d) => (
          <path key={d} d={d} markerEnd="url(#circuit-node)" />
        ))}
      </g>
      {/* pathLength=100 normalizes every trace, so one dash keyframe fits all of them */}
      <g fill="none" stroke="#d9ead3" strokeWidth="1.6" strokeLinecap="round">
        {PATHS.map((d, i) => (
          <path
            key={d}
            d={d}
            pathLength={100}
            strokeDasharray="7 200"
            className="animate-circuit-pulse"
            style={{
              animationDuration: `${4 + (i % 5)}s`,
              animationDelay: `${(i * 0.7) % 5}s`,
              animationDirection: i % 3 === 0 ? "reverse" : "normal",
            }}
          />
        ))}
      </g>
    </svg>
  );
}
