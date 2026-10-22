"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

// Live clock for the dashboard's "last updated" stamp, e.g. "21 Oktober 2026, 14.05.09" / "21 October 2026, 14:05:09".
// Starts as null and fills in after mount, so the server-rendered HTML never disagrees with the browser's clock.
export function useNow(): string | null {
  const { lang } = useLang();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) return null;
  const locale = lang === "en" ? "en-GB" : "id-ID";
  const date = now.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
  const time = now.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  return `${date}, ${time}`;
}
