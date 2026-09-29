"use client";

import KineticGrid from "@/components/ui/kinetic-grid";

export default function InteractiveSection() {
  return (
    <KineticGrid>
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <span className="mb-5 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 font-mono text-xs font-medium tracking-wide text-brand-300">
          Didukung Kecerdasan Buatan
        </span>
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-[#f0f0f0] sm:text-6xl">
          TANGKIS menyusun ringkasan, laporan audit, dan draf pesan ke vendor secara menyeluruh.
        </h2>
        <p className="mt-4 max-w-md font-description text-base text-[#f0f0f0]/50">
          Perhitungan status tetap berbasis rumus dan sensor yang bisa ditelusuri.
        </p>
      </section>
    </KineticGrid>
  );
}
