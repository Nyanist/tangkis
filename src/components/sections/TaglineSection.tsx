import FadeUp from "@/components/motion/FadeUp";

// overflow-hidden + a gentler vw factor: the clamp doesn't account for px-4,
// so at ~320px the nowrap string could push past the viewport.
export default function TaglineSection() {
  return (
    <section className="overflow-hidden bg-brand-100 py-6 lg:py-8">
      <FadeUp>
        <p className="px-4 text-center whitespace-nowrap text-[clamp(0.875rem,5vw,3rem)] font-extrabold text-brand-700">
          #TangkalRisikoSebelumTerjadi
        </p>
      </FadeUp>
    </section>
  );
}
