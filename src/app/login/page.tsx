"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";
import { product } from "@/lib/data/product";
import { GlassFold } from "@/components/ui/glass-fold";

// ponytail: static UI only — no auth wiring, form just prevents default. Hook up
// to a real auth flow when there's a backend to call.
function GoogleMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.1A11.99 11.99 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28v-3.1H1.26A11.99 11.99 0 0 0 0 12c0 1.94.46 3.77 1.26 5.38l4.01-3.1z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A11.99 11.99 0 0 0 1.26 6.62l4.01 3.1C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

// "Pastikan ... Anda dengan TANGKIS" → everything before "dengan", so the headline
// can break there and highlight the brand name.
const taglineLead = product.tagline.replace(new RegExp(`\\s*dengan\\s+${product.name}\\s*$`), "");

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="grid min-h-screen lg:grid-cols-[60fr_40fr]">
      {/* Form panel */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 md:px-16 lg:order-2 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="mb-10 flex items-center gap-2 text-sm font-medium text-[#5A6B7B] hover:text-brand-800">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>

          <Image src="/logo-full-hijau.webp" alt={product.name} width={160} height={40} className="mb-8 h-9 w-auto" priority />

          <h1 className="text-3xl font-bold text-brand-950">Selamat Datang Kembali</h1>
          <p className="mt-2 font-description text-sm text-[#5A6B7B]">
            Masuk untuk memantau kesiapan bahan bakar genset Anda.
          </p>

          <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-brand-950">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#5A6B7B]" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nama@perusahaan.com"
                  className="w-full rounded-lg border border-brand-100 bg-white py-2.5 pl-11 pr-3.5 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-brand-950">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#5A6B7B]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-brand-100 bg-white py-2.5 pl-11 pr-11 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5A6B7B] hover:text-brand-800"
                >
                  {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#5A6B7B]">
                <input type="checkbox" className="h-4 w-4 rounded border-brand-100 text-brand-700 focus:ring-brand-500/30" />
                Ingat saya
              </label>
              <Link href="#" className="font-semibold text-brand-700 hover:text-brand-800">
                Lupa kata sandi?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-brand-700 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
            >
              Masuk
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-[#5A6B7B]">
            <span className="h-px flex-1 bg-brand-100" />
            Atau lanjutkan dengan
            <span className="h-px flex-1 bg-brand-100" />
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-brand-100 bg-white py-2.5 text-sm font-semibold text-brand-950 transition-colors hover:bg-brand-50"
          >
            <GoogleMark className="h-[18px] w-[18px]" />
            Masuk dengan Google
          </button>

          <p className="mt-8 text-center text-sm text-[#5A6B7B]">
            Belum punya akun?{" "}
            <Link href="#" className="font-semibold text-brand-700 hover:text-brand-800">
              Daftar
            </Link>
          </p>
        </div>
      </div>

      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-brand-950 lg:order-1 lg:block">
        {/* Animated WebGL folds: brand-700 panes, brand-950 base, mint lit edges. */}
        <GlassFold color1="#3f8a34" color2="#12260a" color3="#bdebd0" speed={0.4} noise={0.1} className="absolute inset-0" />
        {/* Scrim behind the copy so the white text stays readable over the bright edges. */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/85 via-brand-950/55 to-brand-950/10" aria-hidden="true" />

        <div className="relative flex h-full flex-col justify-center px-16 text-[#f0f0f0] xl:px-20">
          {/* Break before "dengan" so the brand name lands as the punchline, not an orphan. */}
          <h2 className="max-w-xl font-heading text-5xl font-bold leading-[1.05] tracking-tight text-balance xl:text-6xl">
            {taglineLead}
            <br />
            dengan <span className="text-brand-300">{product.name}</span>
          </h2>

          {/* Soft dark shadow lifts the copy off the shader's bright folds. */}
          <p className="mt-6 max-w-md font-description text-base font-medium leading-relaxed text-white/95 [text-shadow:0_1px_14px_rgba(18,38,10,0.85)]">
            {product.description}
          </p>
        </div>
      </div>
    </main>
  );
}
