import SectionBadge from "@/components/sections/SectionBadge";
import { product } from "@/lib/data/product";

export default function ProductSection() {
  return (
    <section
      id="produk"
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-slate-900 py-24 text-white"
    >
      <div
        className="absolute inset-0 flex items-center whitespace-nowrap text-[10rem] font-extrabold tracking-widest text-white/5 lg:text-[16rem]"
        aria-hidden
      >
        <div className="animate-marquee flex shrink-0">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} className="px-8">{product.name}</span>
          ))}
        </div>
      </div>
      <div className="relative flex flex-col items-center px-6">
        <SectionBadge number="02" label="Produk" dark />
        <h2 className="mt-6 max-w-4xl text-center text-3xl font-bold leading-tight md:text-5xl">
          {product.tagline}
        </h2>
      </div>
    </section>
  );
}
