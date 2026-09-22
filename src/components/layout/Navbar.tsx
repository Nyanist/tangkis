"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEscapeToClose } from "@/lib/useEscapeToClose";
import { product } from "@/lib/data/product";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Tentang Kami" },
  { href: "/dashboard", label: "Demo Dashboard" },
];

// Flip to false and save to hide the navbar on /dashboard* pages. Code-only switch, no UI control.
const SHOW_ON_DASHBOARD = true;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  // Pages that open with a dark hero let the docked navbar stay transparent; others dock solid.
  const darkHero = pathname === "/" || pathname === "/about";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);
  useEscapeToClose(closeMenu);

  // Close on outside click and whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  if (!SHOW_ON_DASHBOARD && pathname.startsWith("/dashboard")) return null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 lg:flex lg:justify-center",
        // Docked sits at pt-4 and eases down to pt-6 as it becomes an island.
        scrolled ? "bg-transparent lg:px-6 lg:pt-6" : cn("lg:px-0 lg:pt-4", darkHero ? "bg-transparent" : "bg-brand-950")
      )}
    >
      <nav
        className={cn(
          "relative flex h-16 w-full items-center justify-between border border-transparent px-4 text-[#f0f0f0] transition-all duration-500 lg:px-8",
          // Docked: merges with the page top. Scrolled: collapses into a floating island.
          scrolled
            ? "bg-brand-950/90 backdrop-blur-md lg:max-w-5xl lg:rounded-full lg:border-white/20 lg:px-6"
            : "bg-transparent lg:max-w-[100rem] lg:rounded-none"
        )}
      >
        {/* shrink-0 + a smaller logo below lg: w-auto can't compress, so at 1024–1150px
            the nav's min-content width used to exceed the viewport and clip the logo. */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image src="/logo-txt-hijau.webp" alt={product.name} width={180} height={40} className="h-8 w-auto lg:h-10" priority />
        </Link>
        <div className="hidden gap-6 md:flex lg:gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium text-white/70 hover:text-[#f0f0f0]",
                pathname === l.href && "text-[#f0f0f0] underline underline-offset-4"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link
          href="#"
          className="hidden shrink-0 rounded-full bg-[#f0f0f0] px-5 py-2 text-sm font-semibold text-brand-950 hover:bg-brand-100 md:block"
        >
          Login
        </Link>

        {/* ponytail: compact dropdown, no focus trap — Sheet if the menu ever needs one */}
        <div ref={menuRef} className="md:hidden">
          <button
            type="button"
            className="rounded p-2 text-[#f0f0f0] hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          {open && (
            <div className="absolute right-4 top-full z-50 mt-2 w-56 rounded-xl border border-white/20 bg-brand-950/95 p-2 shadow-lg backdrop-blur-md">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-[#f0f0f0]",
                    pathname === l.href && "bg-white/10 text-[#f0f0f0]"
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="#"
                onClick={closeMenu}
                className="mt-2 block rounded-lg bg-[#f0f0f0] px-3 py-2 text-center text-sm font-semibold text-brand-950 hover:bg-brand-100"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
