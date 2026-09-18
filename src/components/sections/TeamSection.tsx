"use client";
import FadeUp from "@/components/motion/FadeUp";
import { team } from "@/lib/data/team";

export default function TeamSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <FadeUp><h2 className="text-center text-3xl font-bold">Meet the Team</h2></FadeUp>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <FadeUp key={m.id} delay={i * 0.1}>
              <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 text-2xl font-bold text-slate-500">
                  {m.name.charAt(0)}
                </div>
                <h3 className="mt-4 font-semibold">{m.name}</h3>
                <p className="text-sm font-medium text-blue-600">{m.role}</p>
                <p className="mt-2 text-sm text-slate-600">{m.bio}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
