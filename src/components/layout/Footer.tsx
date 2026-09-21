import Link from "next/link";
// import { ArrowUpRight } from "lucide-react";
import { product } from "@/lib/data/product";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-brand-950 text-[#f0f0f0]">
      <div className="mx-auto max-w-[1800px] px-6 pt-24 lg:px-12 lg:pt-40">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-4xl font-extrabold leading-tight md:text-6xl">{product.tagline}</h2>
            <p className="mt-6 max-w-xl text-slate-400">{product.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="rounded-full bg-[#f0f0f0] px-5 py-2 text-sm font-semibold text-brand-950 hover:bg-brand-100"
              >
                Lihat Demo Dashboard
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold hover:bg-white/10"
              >
                Tentang Kami
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <div className="flex items-center gap-5">
              {/* <Link
                href="/dashboard"
                aria-label="Buka Dashboard Live"
                className="group relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/30"
              >
                <span className="absolute inset-0 scale-0 rounded-full bg-[#f0f0f0] transition-transform duration-500 group-hover:scale-100" />
                <ArrowUpRight className="relative h-7 w-7 transition-colors duration-500 group-hover:text-brand-950" strokeWidth={1.5} aria-hidden />
              </Link>
              <div>
                <p className="text-lg font-semibold">Buka Demo Dashboard Live</p>
                <p className="mt-1 text-sm text-slate-400">
                  Data pada situs ini adalah data contoh untuk demonstrasi.
                </p>
              </div> */}
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-8 border-t border-white/10 py-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-extrabold tracking-widest">{product.name}</p>
            <p className="mt-2 text-sm text-slate-400">{product.tagline}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Navigasi</p>
            <div className="mt-2 flex flex-col gap-1 text-sm text-slate-400">
              <Link href="/" className="hover:text-[#f0f0f0]">Beranda</Link>
              <Link href="/about" className="hover:text-[#f0f0f0]">Tentang Kami</Link>
              <Link href="/dashboard" className="hover:text-[#f0f0f0]">Demo Dashboard</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold">Connect</p>
            <p className="mt-2 text-sm text-slate-400">
              hello@tangkis.tech
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        © 2026 {product.name}. Hak Cipta Dilindungi
      </div>
    </footer>
  );
}
