"use client";
import FadeUp from "@/components/motion/FadeUp";
import SectionBadge from "@/components/sections/SectionBadge";
import { team } from "@/lib/data/team";

export default function TeamSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[95%] px-4 md:px-6 lg:max-w-[92%] xl:max-w-[1400px]">
        <FadeUp>
          <SectionBadge number="01" label="Tim" />
          <h2 className="mt-6 max-w-3xl text-3xl font-bold md:text-5xl">Meet the Team</h2>
        </FadeUp>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <FadeUp key={m.id} delay={i * 0.1}>
              <div className="flex min-h-[18rem] flex-col rounded-lg border bg-slate-50 p-6 text-center transition-shadow hover:shadow-md">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-slate-800 to-blue-900 text-2xl font-bold text-white">
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
