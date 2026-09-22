import DashboardTopbar from "@/components/sections/dashboard/DashboardTopbar";
import SummaryCards from "@/components/sections/dashboard/SummaryCards";
import LokasiSection from "@/components/sections/dashboard/LokasiSection";

// Hidden layout-comparison page (the previous /dashboard design) — not linked
// from the navbar.
export const metadata = {
  title: "TANGKIS Dashboard v1 (Perbandingan)",
  robots: { index: false, follow: false },
};

export default function Dashboard2Page() {
  return (
    <main className="mx-auto min-h-screen max-w-[1440px] bg-[#f0f0f0] p-4 pt-24 text-[#172B3A] md:p-8 md:pt-28 lg:pt-32">
      {/* <div className="fixed right-4 top-16 z-30 lg:top-0 rounded-b border border-[#E9A21B]/50 bg-[#FBEED6] px-3 py-1 text-xs font-bold">
        DATA CONTOH — BUKAN HASIL PENGUKURAN
      </div> */}
      <DashboardTopbar />
      <div className="mb-4">
        <SummaryCards />
      </div>
      <LokasiSection />
      <footer className="mt-4 border-t border-brand-100 pt-3 text-xs text-[#5A6B7B]">
        TANGKIS — prototipe antarmuka. Angka pada halaman ini adalah data contoh untuk keperluan demonstrasi.
      </footer>
    </main>
  );
}
