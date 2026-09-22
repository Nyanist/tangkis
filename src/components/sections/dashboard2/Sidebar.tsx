import { LayoutGrid, ListChecks, FileText, Settings, Globe, ShieldCheck } from "lucide-react";

const NAV = [
  { label: "Dashboard", icon: LayoutGrid, active: true },
  { label: "Daftar Tangki", icon: ListChecks, active: false },
  { label: "Laporan", icon: FileText, active: false },
  { label: "Pengaturan", icon: Settings, active: false },
];

// ponytail: decorative nav — this is a hidden comparison page, not a real route tree.
// Hidden below lg instead of adding a mobile drawer — the site's own Navbar already
// covers branding/nav on small screens, this sidebar is non-functional chrome.
export default function Sidebar() {
  return (
    <aside className="hidden w-64 flex-none flex-col justify-between bg-brand-950 px-4 py-6 text-[#f0f0f0] lg:flex">
      <div>
        <div className="mb-8 flex items-center gap-2 px-2">
          <ShieldCheck className="h-7 w-7 text-brand-300" />
          <span className="text-xl font-extrabold tracking-widest">TANGKIS</span>
        </div>
        <nav className="grid gap-1">
          {NAV.map((n) => (
            <button
              key={n.label}
              type="button"
              className={
                n.active
                  ? "flex items-center gap-3 rounded-lg bg-brand-700 px-3 py-2.5 text-sm font-semibold"
                  : "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-[#f0f0f0]"
              }
            >
              <n.icon className="h-4.5 w-4.5" />
              {n.label}
            </button>
          ))}
        </nav>
      </div>
      <button type="button" aria-label="Ganti bahasa" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/60 hover:bg-white/10 hover:text-[#f0f0f0]">
        <Globe className="h-4 w-4" />
        ID
      </button>
    </aside>
  );
}
