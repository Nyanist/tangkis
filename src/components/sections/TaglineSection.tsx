// Slim ticker strip: the hashtag repeats and scrolls right to left. The strip is brand-950, the colour the hero fades into
// above it and the Background section starts from below it, so the three read as one surface.
// The track holds two identical halves and slides left by exactly one half (`animate-marquee`, -50%), so the loop is seamless.
const TAG = "#TangkalRisikoSebelumTerjadi";
const REPEATS = 6;

function Half() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {Array.from({ length: REPEATS }, (_, i) => (
        <span key={i} className="flex items-center">
          <span className="px-8 text-[clamp(1.5rem,3.4vw,3rem)] font-extrabold tracking-tight text-[#f0f0f0] md:px-14">{TAG}</span>
          <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
        </span>
      ))}
    </div>
  );
}

export default function TaglineSection() {
  return (
    <section aria-label={TAG} className="overflow-hidden bg-brand-950 py-7 md:py-9">
      <div className="flex w-max animate-marquee-tagline whitespace-nowrap">
        <Half />
        <Half />
      </div>
    </section>
  );
}
