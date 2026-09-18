"use client";
import Link from "next/link";
import FadeUp from "@/components/motion/FadeUp";
import { product } from "@/lib/data/product";

export default function ProductSection() {
  return (
    <section className="py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
        <FadeUp>
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="mt-2 font-medium text-blue-600">{product.tagline}</p>
          <p className="mt-4 text-slate-600">{product.description}</p>
          <Link href="/dashboard" className="mt-6 inline-block rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700">
            Buka Dashboard Live
          </Link>
        </FadeUp>
        <FadeUp delay={0.15}>
          <div className="flex min-h-64 items-center justify-center rounded-xl border bg-slate-50 p-10 text-6xl">
            🛢️
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
