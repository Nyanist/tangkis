import AboutHeroSection from "@/components/sections/AboutHeroSection";
import ValueSection from "@/components/sections/ValueSection";
import TeamSection from "@/components/sections/TeamSection";

export const metadata = {
  title: "Tentang Kami | TANGKIS",
  description: "Tim di balik TANGKIS — pemantauan kesiapan bahan bakar genset cadangan.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHeroSection />
      <ValueSection/>
      <TeamSection />
    </main>
  );
}
