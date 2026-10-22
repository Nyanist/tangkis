"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Sidebar, { NAV, type DashboardView } from "./Sidebar";
import Dashboard2Main from "./Dashboard2Main";
import TankListView from "./TankListView";
import ReportsView from "./ReportsView";
import SettingsView from "./SettingsView";

const VIEWS = NAV.map((n) => n.id);
const fromHash = (): DashboardView => {
  const h = window.location.hash.slice(1) as DashboardView;
  return VIEWS.includes(h) ? h : "dashboard";
};

// Holds which menu page is open. The choice is mirrored in the URL hash (#tangki, #laporan, ...) so a page can be
// linked to directly and the browser's back button steps between menu pages.
export default function DashboardShell() {
  const { t } = useLang();
  const [view, setView] = useState<DashboardView>("dashboard");

  useEffect(() => {
    setView(fromHash());
    const onHash = () => setView(fromHash());
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onHash);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onHash);
    };
  }, []);

  const go = (v: DashboardView) => {
    if (v === view) return;
    // pushState keeps a history entry (Back still steps between menu pages) without leaving a bare "#" in the URL.
    window.history.pushState(null, "", v === "dashboard" ? window.location.pathname + window.location.search : `#${v}`);
    setView(v);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="flex flex-1">
      <Sidebar view={view} onChange={go} />
      <main className="min-w-0 flex-1 p-4 md:p-6">
        {/* Phones and tablets: the same menu as four equal tabs, icon over label, so all fit without scrolling */}
        <nav className="-mx-4 mb-5 grid grid-cols-4 border-b border-slate-200 px-2 md:-mx-6 md:px-6 lg:hidden" aria-label={t("Menu dashboard", "Dashboard menu")}>
          {NAV.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => go(n.id)}
              aria-current={n.id === view ? "page" : undefined}
              className={cn(
                "-mb-px flex min-w-0 flex-col items-center gap-1 border-b-2 px-1 py-2.5 text-center text-[11px] leading-tight transition-colors sm:flex-row sm:justify-center sm:gap-2 sm:text-sm",
                n.id === view ? "border-brand-700 font-semibold text-brand-950" : "border-transparent text-neutral-900 hover:text-brand-950"
              )}
            >
              <n.icon className="h-4 w-4 flex-none" />
              <span className="max-w-full truncate">{t(n.label)}</span>
            </button>
          ))}
        </nav>

        {view === "dashboard" && <Dashboard2Main />}
        {view === "tangki" && <TankListView />}
        {view === "laporan" && <ReportsView />}
        {view === "pengaturan" && <SettingsView />}
      </main>
    </div>
  );
}

// Shared page heading for the menu pages: plain text, no box around it.
export function ViewHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-brand-950">{title}</h1>
      <p className="mt-1 text-sm text-neutral-900">{subtitle}</p>
    </header>
  );
}
