import dynamic from "next/dynamic";
import AboutHeroSection from "@/components/sections/AboutHeroSection";
import ValueSection from "@/components/sections/ValueSection";
import TeamSection from "@/components/sections/TeamSection";
import { KONTEN_SECTION } from "@/lib/utils";

// Pulls in d3 + topojson-client and only ever renders client-side (fetches
// world-atlas JSON at runtime, needs IntersectionObserver/ResizeObserver) — no
// reason for that weight to sit in this page's initial bundle for a section
// at the very bottom of the page.
const ContactWithGlobe = dynamic(() => import("@/components/ui/contact-with-globe"), { ssr: false });

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
