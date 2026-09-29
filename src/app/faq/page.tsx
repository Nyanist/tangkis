import Link from "next/link";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { KONTEN_SECTION } from "@/lib/utils";

export const metadata = {
  title: "FAQ | TANGKIS",
  description: "Pertanyaan yang sering diajukan seputar TANGKIS.",
};

export default function FaqPage() {
  return (
    <main className="bg-[#f0f0f0] pb-24 pt-32 lg:pt-40">
      <div className={KONTEN_SECTION}>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-brand-950 md:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-4 font-description text-[#5A6B7B]">
            We are here to help you with any questions you may have. If you don&apos;t find what you need, please
            contact us.{" "}
            <Link href="mailto:hello@tangkis.tech" className="font-semibold text-brand-700 hover:text-brand-800">
              hello@tangkis.tech
            </Link>
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <FaqAccordion />
        </div>
      </div>
    </main>
  );
}
