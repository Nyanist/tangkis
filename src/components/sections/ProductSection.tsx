import Image from "next/image";
import SectionBadge from "@/components/sections/SectionBadge";
import { product } from "@/lib/data/product";
import { cn, KONTEN_SECTION } from "@/lib/utils";

export default function ProductSection() {
  return (
    <section
      id="produk"
      className="relative flex min-h-[50dvh] items-center justify-center overflow-hidden bg-brand-950 py-24 text-[#f0f0f0] lg:min-h-[70dvh]"
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
      <div className={cn(KONTEN_SECTION, "relative flex flex-col items-center")}>
        <SectionBadge number="02" label="Produk" dark />
        <h2 className="mt-6 max-w-4xl text-center text-3xl font-bold leading-tight md:text-5xl">
          {product.tagline}
        </h2>
        <Image
          src={product.productImage}
          alt={product.name}
          width={800}
          height={800}
          className="mt-12 w-full max-w-xl"
        />
      </div>
    </section>
  );
}
