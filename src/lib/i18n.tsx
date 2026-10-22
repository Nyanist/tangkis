"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "id" | "en";
export type L = { id: string; en: string };

const STORAGE_KEY = "tangkis-lang";

// t("teks indonesia", "english text") or t({ id, en }) — inline pairs keep each
// translation next to the copy it replaces, so there's no key dictionary to drift out of sync.
type T = (idOrPair: string | L, en?: string) => string;

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: T;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // "id" on first render so SSR and hydration match; the saved choice is applied right after mount.
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "id" || saved === "en") setLangState(saved);
    } catch {
      /* storage blocked — stay on default */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback<T>(
    (idOrPair, en) => (typeof idOrPair === "string" ? (lang === "id" ? idOrPair : en ?? idOrPair) : idOrPair[lang]),
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
