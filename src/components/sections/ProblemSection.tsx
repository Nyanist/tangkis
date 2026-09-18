"use client";
import FadeUp from "@/components/motion/FadeUp";
import { problems } from "@/lib/data/problems";

export default function ProblemSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <FadeUp><h2 className="text-center text-3xl font-bold">Masalah yang Kami Selesaikan</h2></FadeUp>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {problems.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.1}>
              <div className="h-full rounded-xl border bg-white p-6 shadow-sm">
                <div className="text-3xl">{p.icon}</div>
                <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{p.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
