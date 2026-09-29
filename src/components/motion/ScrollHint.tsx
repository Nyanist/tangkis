"use client";
import { motion, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollHintProps {
  opacity?: MotionValue<number>;
  dark?: boolean; // for light backgrounds
  className?: string;
}

// Decorative "keep scrolling" cue: a mouse outline with a wheel dot sliding down it. Optionally drive `opacity` from scroll to fade it out.
export default function ScrollHint({ opacity, dark, className }: ScrollHintProps) {
  return (
    <motion.div
      style={opacity ? { opacity } : undefined}
      className={cn("pointer-events-none flex flex-col items-center gap-2", className)}
      aria-hidden
    >
      <span className={cn("flex h-8 w-5 justify-center rounded-full ring-2 ring-inset", dark ? "ring-slate-900/60" : "ring-white/60")}>
        <span
          className={cn(
            // flex centering, not translate: the animation owns `transform`
            "relative left-[0.25px] mt-1.5 h-[5px] w-[5px] rounded-full animate-scroll-hint",
            dark ? "bg-slate-900" : "bg-[#f0f0f0]"
          )}
        />
      </span>
    </motion.div>
  );
}
