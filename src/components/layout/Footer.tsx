"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { product } from "@/lib/data/product";
import { cn } from "@/lib/utils";
import MagnetButton from "@/components/motion/MagnetButton";

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

// Pages that already have their own CTA/contact block right above the footer
// don't need this one repeated — Tentang Kami ends on ContactWithGlobe.
const HIDE_CTA_ON = ["/about"];

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/login") return null;
  const showCta = !HIDE_CTA_ON.includes(pathname);

  return (
    <footer className="overflow-hidden bg-brand-950 text-[#f0f0f0]">
      <div className={cn("mx-auto max-w-[1800px] px-6 lg:px-12", showCta ? "pt-24 lg:pt-40" : "pt-16 lg:pt-20")}>
        {showCta && (
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-extrabold leading-tight md:text-6xl">{product.tagline}</h2>
              <p className="mt-6 max-w-xl font-description text-slate-400">{product.description}</p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <MagnetButton href="/about" label="Tentang Kami" />
            </div>
          </div>
        )}

        <div className={cn("grid gap-8 border-t border-white/10 py-10 md:grid-cols-3", showCta && "mt-20")}>
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
              <Link href="/faq" className="hover:text-[#f0f0f0]">FAQ</Link>
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
              <Link href="https://instagram.com/tangkis.tech" aria-label="Instagram" className="text-slate-400 hover:text-[#f0f0f0]">
                <InstagramMark className="h-5 w-5" />
              </Link>
              <Link href="mailto:hello@tangkis.tech" aria-label="Email" className="text-slate-400 hover:text-[#f0f0f0]">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 border-t border-white/10 py-4 text-center text-xs text-slate-500 sm:flex-row sm:gap-4">
        <span>© 2026 {product.name}. Hak Cipta Dilindungi</span>
        <span className="flex items-center gap-4">
          <Link href="#" className="hover:text-[#f0f0f0]">Syarat & Ketentuan</Link>
          <Link href="#" className="hover:text-[#f0f0f0]">Kebijakan Privasi</Link>
        </span>
      </div>
    </footer>
  );
}
