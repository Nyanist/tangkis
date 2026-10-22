import FaqContent from "@/components/sections/FaqContent";

export const metadata = {
  title: "FAQ | TANGKIS",
  description: "Pertanyaan yang sering diajukan seputar TANGKIS.",
};

export default function FaqPage() {
  return (
    <main className="bg-gradient-to-b from-brand-50 via-white to-white pb-24 pt-32 lg:pt-40">
      <FaqContent />
    </main>
  );
}
