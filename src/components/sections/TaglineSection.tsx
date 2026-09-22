import FadeUp from "@/components/motion/FadeUp";

export default function TaglineSection() {
  return (
    <section className="bg-brand-100 py-6 lg:py-8">
      <FadeUp>
        <p className="px-4 text-center whitespace-nowrap text-[clamp(0.875rem,5.4vw,3rem)] font-extrabold text-brand-700">
          #TangkalRisikoSebelumTerjadi
        </p>
      </FadeUp>
    </section>
  );
}
