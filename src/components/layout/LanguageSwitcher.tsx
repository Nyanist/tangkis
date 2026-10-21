"use client";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang, type Lang } from "@/lib/i18n";

const OPTIONS: { code: Lang; label: string }[] = [
  { code: "id", label: "Bahasa Indonesia" },
  { code: "en", label: "English" },
];

interface LanguageSwitcherProps {
  /** "dark" = light text for dark backgrounds (navbar); "light" = dark text for white pages (login). */
  tone?: "dark" | "light";
  className?: string;
  /** Open the menu upward and left-aligned (for controls pinned to the bottom of a sidebar). */
  dropUp?: boolean;
}

export default function LanguageSwitcher({ tone = "dark", className, dropUp }: LanguageSwitcherProps) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const dark = tone === "dark";

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("Pilih bahasa", "Select language")}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors",
          dark ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-[#5A6B7B] hover:bg-brand-50 hover:text-brand-800"
        )}
      >
        <Globe className="h-4 w-4" aria-hidden />
        {lang}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} aria-hidden />
      </button>

      {open && (
        <ul
          role="listbox"
          className={cn(
            dropUp ? "absolute bottom-full left-0 mb-2" : "absolute right-0 top-full mt-2",
            "z-50 w-48 rounded-xl border p-1.5 shadow-lg backdrop-blur-md",
            dark ? "border-white/20 bg-brand-950/95 text-white/80" : "border-brand-100 bg-white text-brand-950"
          )}
        >
          {OPTIONS.map((o) => {
            const selected = o.code === lang;
            return (
              <li key={o.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    setLang(o.code);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium",
                    dark ? "hover:bg-white/10 hover:text-white" : "hover:bg-brand-50",
                    selected && (dark ? "bg-white/10 text-white" : "bg-brand-50 text-brand-800")
                  )}
                >
                  {o.label}
                  {selected && <Check className="h-4 w-4" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
