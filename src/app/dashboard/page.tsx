import DashboardTopbar from "@/components/sections/dashboard/DashboardTopbar";
import SummaryCards from "@/components/sections/dashboard/SummaryCards";
import TankTable from "@/components/sections/dashboard/TankTable";
import TrendChart from "@/components/sections/dashboard/TrendChart";
import AlertPanel from "@/components/sections/dashboard/AlertPanel";
import SystemHealth from "@/components/sections/dashboard/SystemHealth";

export const metadata = {
  title: "TANGKIS Demo Dashboard | Pemantauan Kesiapan Bahan Bakar Genset Cadangan",
  description: "Pusat pemantauan real-time kesiapan dan kualitas bahan bakar genset cadangan.",
};

export default function DashboardPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[1440px] bg-[#F4F7FA] p-4 pt-24 text-[#172B3A] md:p-8 md:pt-28 lg:pt-32">
      <div className="fixed right-4 top-16 z-30 lg:top-0 rounded-b border border-[#E9A21B]/50 bg-[#FBEED6] px-3 py-1 text-xs font-bold">
        DATA CONTOH — BUKAN HASIL PENGUKURAN
      </div>
      <DashboardTopbar />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_400px]">
        <div className="flex flex-col gap-4">
          <SummaryCards />
          <TankTable />
          <TrendChart />
        </div>
        <div className="flex flex-col gap-4">
          <AlertPanel />
          <SystemHealth />
        </div>
      </div>
      <footer className="mt-4 border-t border-[#D9E1E8] pt-3 text-xs text-[#5A6B7B]">
        TANGKIS — prototipe antarmuka. Angka pada halaman ini adalah data contoh untuk keperluan demonstrasi.
      </footer>
    </main>
  );
}
