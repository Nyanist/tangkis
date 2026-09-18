import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import ProductSection from "@/components/sections/ProductSection";
import FeaturesSection from "@/components/sections/FeaturesSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <ProductSection />
      <FeaturesSection />
    </main>
  );
}
