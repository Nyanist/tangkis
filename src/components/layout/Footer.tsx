import Link from "next/link";
import { Mail } from "lucide-react";
// import { ArrowUpRight } from "lucide-react";
import { product } from "@/lib/data/product";

// ponytail: lucide-react dropped brand/logo icons (trademark policy) — hand-rolled
// minimal marks instead of pulling in a whole icon pack for two glyphs.
function LinkedinMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.064 2.064 0 1 1 0-4.128 2.064 2.064 0 0 1 0 4.128zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function InstagramMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

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
            {/* ponytail: LinkedIn/Instagram are decorative placeholders — no real accounts to link yet */}
            <div className="mt-3 flex items-center gap-4">
              <Link href="#" aria-label="LinkedIn" className="text-slate-400 hover:text-[#f0f0f0]">
                <LinkedinMark className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-slate-400 hover:text-[#f0f0f0]">
                <InstagramMark className="h-5 w-5" />
              </Link>
              <Link href="mailto:hello@tangkis.tech" aria-label="Email" className="text-slate-400 hover:text-[#f0f0f0]">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 text-center text-xs text-slate-500">
        © 2026 {product.name}. Hak Cipta Dilindungi
      </div>
    </footer>
  );
}
