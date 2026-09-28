import AboutHeroSection from "@/components/sections/AboutHeroSection";
import ValueSection from "@/components/sections/ValueSection";
import TeamSection from "@/components/sections/TeamSection";
import ContactWithGlobe from "@/components/ui/contact-with-globe";
import { KONTEN_SECTION } from "@/lib/utils";

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
      <section className="overflow-hidden bg-brand-950 py-20 lg:py-28">
        <div className={KONTEN_SECTION}>
          <ContactWithGlobe />
        </div>
      </section>
    </main>
  );
}
