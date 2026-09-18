import Link from "next/link";
import { product } from "@/lib/data/product";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold tracking-widest">{product.name}</p>
          <p className="mt-2 text-sm text-slate-600">{product.tagline}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Navigasi</p>
          <div className="mt-2 flex flex-col gap-1 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <Link href="/about" className="hover:text-slate-900">About</Link>
            <Link href="/dashboard" className="hover:text-slate-900">Dashboard</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">Prototipe</p>
          <p className="mt-2 text-sm text-slate-600">
            Data pada situs ini adalah data contoh untuk demonstrasi.
          </p>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-slate-500">
        © 2026 {product.name} — prototipe antarmuka.
      </div>
    </footer>
  );
}
