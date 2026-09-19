"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { product } from "@/lib/data/product";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // Pages that open with a dark hero let the docked navbar stay transparent; others dock solid.
  const darkHero = pathname === "/" || pathname === "/about";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 lg:flex lg:justify-center",
          // Docked sits at pt-4 and eases down to pt-6 as it becomes an island.
          scrolled ? "bg-transparent lg:px-6 lg:pt-6" : cn("lg:px-0 lg:pt-4", darkHero ? "bg-transparent" : "bg-slate-900")
        )}
      >
        <nav
          className={cn(
            "flex h-16 w-full items-center justify-between border border-transparent px-4 text-white transition-all duration-500 lg:px-8",
            // Docked: merges with the page top. Scrolled: collapses into a floating island.
            scrolled
              ? "bg-slate-900/90 backdrop-blur-md lg:max-w-5xl lg:rounded-full lg:border-white/20 lg:px-6"
              : "bg-transparent lg:max-w-[100rem] lg:rounded-none"
          )}
        >
          <Link href="/" className="text-lg font-extrabold tracking-widest">
            {product.name}
          </Link>
          <div className="hidden gap-8 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm font-medium text-white/70 hover:text-white",
                  pathname === l.href && "text-white underline underline-offset-4"
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            href="/dashboard"
            className="hidden rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200 md:block"
          >
            Lihat Dashboard
          </Link>
          {/* ponytail: plain useState overlay instead of shadcn Sheet — Sheet if menu needs focus-trap */}
          <button
            className="rounded p-2 text-white hover:bg-white/10 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-slate-900 px-8 pt-16 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "py-3 text-3xl font-bold text-white/70 hover:text-white",
                pathname === l.href && "text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
