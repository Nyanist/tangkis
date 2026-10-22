import HeroSection from "@/components/sections/HeroSection";
import TaglineSection from "@/components/sections/TaglineSection";
import BackgroundSection from "@/components/sections/BackgroundSection";
import ProblemSection from "@/components/sections/ProblemSection";
import ProductSection from "@/components/sections/ProductSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import VideoSection from "@/components/sections/VideoSection";
import InteractiveSection from "@/components/sections/InteractiveSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TaglineSection />
      <BackgroundSection />
      <ProductSection />
      <HowItWorksSection />
      <FeaturesSection />
      <InteractiveSection />
      <ProblemSection />
      <VideoSection />
    </main>
  );
}
