"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Fuel } from "lucide-react";
import SectionBadge from "@/components/sections/SectionBadge";
import FadeUp from "@/components/motion/FadeUp";
import { features } from "@/lib/data/features";
import { product } from "@/lib/data/product";

export default function FeaturesSection() {
  const [active, setActive] = useState(features[0].id);

  return (
    <section className="bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto grid max-w-[95%] grid-cols-1 gap-12 px-4 md:px-6 lg:max-w-[92%] lg:grid-cols-12 lg:gap-24 xl:max-w-[1400px]">
        <div className="lg:col-span-5">
          <div className="flex aspect-[4/3] flex-col justify-between rounded-[32px] bg-gradient-to-br from-slate-900 to-blue-900 p-8 text-white lg:sticky lg:top-32">
            <Fuel className="h-14 w-14" strokeWidth={1.5} aria-hidden />
            <div>
              <h2 className="text-3xl font-bold">{product.name}</h2>
              <p className="mt-2 font-medium text-blue-300">{product.tagline}</p>
              <p className="mt-4 text-sm text-slate-300">{product.description}</p>
              <Link
                href="/dashboard"
                className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-200"
              >
                Buka Demo Dashboard
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <FadeUp>
            <SectionBadge number="03" label="Fitur" />
            <h2 className="mb-8 mt-6 text-3xl font-bold md:text-5xl">Fitur Utama</h2>
          </FadeUp>
          <div className="border-t border-slate-200">
            {features.map((f, i) => {
              const isOpen = active === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActive(f.id)}
                  aria-expanded={isOpen}
                  className="group block w-full border-b border-slate-200 py-8 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="flex-1 text-xl font-semibold">
                      <f.icon className="mr-2 inline h-5 w-5 align-[-0.15em]" aria-hidden />
                      {f.title}
                    </h3>
                    <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:rotate-45" aria-hidden />
                  </div>
                  <div className="accordion-content" data-open={isOpen}>
                    <div className="overflow-hidden">
                      <p className="pl-14 pt-4 text-slate-600">{f.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
