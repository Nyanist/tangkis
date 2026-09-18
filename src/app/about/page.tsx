import AboutHeroSection from "@/components/sections/AboutHeroSection";
import TeamSection from "@/components/sections/TeamSection";

export const metadata = {
  title: "About | TANGKIS",
  description: "Tim di balik TANGKIS — pemantauan kesiapan bahan bakar genset cadangan.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHeroSection />
      <TeamSection />
    </main>
  );
}
