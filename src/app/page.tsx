import HeroSection from "@/components/sections/HeroSection";
import TaglineSection from "@/components/sections/TaglineSection";
import BackgroundSection from "@/components/sections/BackgroundSection";
import ProblemSection from "@/components/sections/ProblemSection";
import ProductSection from "@/components/sections/ProductSection";
import FeaturesSection from "@/components/sections/FeaturesSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TaglineSection />
      <BackgroundSection />
      <ProductSection />
      <FeaturesSection />
      <ProblemSection />
    </main>
  );
}
