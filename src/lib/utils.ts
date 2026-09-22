import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Activity, Cpu, Radio, ShieldCheck, type LucideIcon } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// The gutter/max-width every marketing section shares, so their left edges line
// up down the page. Was copy-pasted across Background/Features/Problem sections.
export const KONTEN_SECTION =
  "mx-auto min-mx-[4%] w-full max-w-[95%] px-4 md:px-6 lg:max-w-[92%] xl:max-w-[1400px]";

export function computeStatusCounts(tanks: { status: string }[]) {
  return {
    hijau: tanks.filter((t) => t.status === "HIJAU").length,
    kuning: tanks.filter((t) => t.status === "KUNING").length,
    merah: tanks.filter((t) => t.status === "MERAH").length,
  };
}

export const IKON_KESEHATAN: Record<string, LucideIcon> = {
  sensor: Radio,
  gateway: Cpu,
  aliran: Activity,
  pantau: ShieldCheck,
};

export const KELAS_PIL_STATUS: Record<string, string> = {
  HIJAU: "bg-brand-100/60 border-brand-300/60 text-brand-800",
  KUNING: "bg-[#E9A21B]/[.15] border-[#E9A21B]/50 text-[#8A5A00]",
  MERAH: "bg-[#B83232] border-[#B83232] text-white",
};

export function kelasLed(status: string) {
  return status === "MERAH" ? "led--putih" : status === "HIJAU" ? "led--ok" : "led--warn";
}
