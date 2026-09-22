// Split out of utils.ts: this hook needs useEffect, which pulls React's client
// runtime into any module graph that imports it — utils.ts is also imported by
// Server Components (for `cn`), so a client-only hook can't safely live there.
import { useEffect } from "react";

export function useEscapeToClose(onClose: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
}
