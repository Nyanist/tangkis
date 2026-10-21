import DashboardShell from "@/components/sections/dashboard2/DashboardShell";
import DemoBanner from "@/components/sections/dashboard2/DemoBanner";

export const metadata = {
  title: "TANGKIS Demo Dashboard | Pemantauan Kesiapan Bahan Bakar Genset Cadangan",
  description: "Pusat pemantauan real-time kesiapan dan kualitas bahan bakar genset cadangan.",
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f0f0f0] text-neutral-900">
      <DemoBanner />
      <DashboardShell />
    </div>
  );
}
