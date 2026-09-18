"use client";
import { motion } from "framer-motion";
import FadeUp from "@/components/motion/FadeUp";
import { features } from "@/lib/data/features";

export default function FeaturesSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <FadeUp><h2 className="text-center text-3xl font-bold">Fitur Utama</h2></FadeUp>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <FadeUp key={f.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="h-full rounded-xl border bg-white p-6 shadow-sm hover:shadow-md"
              >
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.description}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
