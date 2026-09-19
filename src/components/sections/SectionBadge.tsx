import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  number: string;
  label: string;
  dark?: boolean;
  className?: string;
}

export default function SectionBadge({ number, label, dark, className }: SectionBadgeProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <span className="z-10 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
        {number}
      </span>
      <span
        className={cn(
          "-ml-3 rounded-full border py-1.5 pl-6 pr-4 text-sm font-medium",
          dark ? "border-white/20 bg-white/10 text-white" : "bg-slate-100 text-slate-700"
        )}
      >
        {label}
      </span>
    </div>
  );
}
