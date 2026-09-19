"use client";
import { motion, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollHintProps {
  opacity: MotionValue<number>;
  dark?: boolean; // for light backgrounds
  className?: string;
}

// Decorative "keep scrolling" cue: a thin line with a bar sliding down it. Drive `opacity` from scroll to fade it out.
export default function ScrollHint({ opacity, dark, className }: ScrollHintProps) {
  return (
    <motion.div
      style={{ opacity }}
      className={cn("pointer-events-none flex flex-col items-center gap-2", className)}
      aria-hidden
    >
      <span className={cn("relative h-10 w-px overflow-hidden", dark ? "bg-slate-900/15" : "bg-white/20")}>
        <span className={cn("absolute inset-x-0 top-0 h-1/2 animate-scroll-hint", dark ? "bg-slate-900" : "bg-white")} />
      </span>
    </motion.div>
  );
}
