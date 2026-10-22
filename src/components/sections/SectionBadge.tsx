import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  label: string;
  dark?: boolean;
  className?: string;
}

export default function SectionBadge({ label, dark, className }: SectionBadgeProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <span
        className={cn(
          "rounded-full border px-4 py-1.5 font-mono text-sm font-medium",
          dark ? "border-white/20 bg-white/10 text-[#f0f0f0]" : "bg-slate-100 text-slate-700"
        )}
      >
        {label}
      </span>
    </div>
  );
}
