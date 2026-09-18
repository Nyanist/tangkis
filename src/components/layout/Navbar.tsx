"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { product } from "@/lib/data/product";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-extrabold tracking-widest text-slate-900">
          {product.name}
        </Link>
        <div className="hidden gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium text-slate-600 hover:text-slate-900",
                pathname === l.href && "text-slate-900 underline underline-offset-4"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
        {/* ponytail: plain useState dropdown instead of shadcn Sheet — Sheet if menu needs focus-trap/animation */}
        <button
          className="rounded p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          ☰
        </button>
      </nav>
      {open && (
        <div className="border-t bg-white px-4 py-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded px-2 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100",
                pathname === l.href && "text-slate-900"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
