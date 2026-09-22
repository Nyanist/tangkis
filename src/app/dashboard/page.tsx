import Sidebar from "@/components/sections/dashboard2/Sidebar";
import Dashboard2Main from "@/components/sections/dashboard2/Dashboard2Main";

export const metadata = {
  title: "TANGKIS Demo Dashboard | Pemantauan Kesiapan Bahan Bakar Genset Cadangan",
  description: "Pusat pemantauan real-time kesiapan dan kualitas bahan bakar genset cadangan.",
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f0f0f0] text-[#172B3A]">
      <p className="border-b border-[#E9A21B]/40 bg-[#FBEED6] px-4 pb-2 pt-20 text-center text-xs font-semibold text-[#8A5A00] md:px-6 lg:pt-24">
        TANGKIS — prototipe antarmuka. Data yang ditampilkan pada halaman ini adalah data contoh untuk keperluan demonstrasi.
      </p>
      <div className="flex flex-1">
        <Sidebar />
        <main className="min-w-0 flex-1 p-4 md:p-6">
          <Dashboard2Main />
        </main>
      </div>
    </div>
  );
}
