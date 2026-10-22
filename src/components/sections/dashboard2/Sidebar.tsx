"use client";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, ListChecks, FileText, Settings } from "lucide-react";
import { useLang, type L } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

export type DashboardView = "dashboard" | "tangki" | "laporan" | "pengaturan";

export const NAV: { id: DashboardView; label: L; icon: typeof LayoutGrid }[] = [
  { id: "dashboard", label: { id: "Dashboard", en: "Dashboard" }, icon: LayoutGrid },
  { id: "tangki", label: { id: "Daftar Tangki", en: "Tank List" }, icon: ListChecks },
  { id: "laporan", label: { id: "Laporan", en: "Reports" }, icon: FileText },
  { id: "pengaturan", label: { id: "Pengaturan", en: "Settings" }, icon: Settings },
];

// Desktop sidebar. Below lg it is hidden and DashboardShell shows the same NAV as a tab strip instead.
export default function Sidebar({ view, onChange }: { view: DashboardView; onChange: (v: DashboardView) => void }) {
  const { t } = useLang();
  return (
    <aside className="hidden w-64 flex-none flex-col justify-between bg-brand-950 px-4 py-6 text-[#f0f0f0] lg:flex">
      <div>
        <Link href="/" aria-label="TANGKIS" className="mb-8 block px-2">
          <Image src="/logo-horizontal.png" alt="TANGKIS" width={1669} height={411} className="h-10 w-auto" />
        </Link>
        <nav className="grid gap-1" aria-label={t("Menu dashboard", "Dashboard menu")}>
          {NAV.map((n) => {
            const active = n.id === view;
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => onChange(n.id)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                  active ? "bg-brand-700 font-semibold" : "font-medium text-white/70 hover:bg-white/10 hover:text-[#f0f0f0]"
                )}
              >
                <n.icon className="h-4.5 w-4.5" />
                {t(n.label)}
              </button>
            );
          })}
        </nav>
      </div>
      <LanguageSwitcher dropUp />
    </aside>
  );
}
