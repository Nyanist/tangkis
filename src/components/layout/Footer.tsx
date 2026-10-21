"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { product } from "@/lib/data/product";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { EMAIL_TANGKIS, mailtoTangkis } from "@/lib/mailto";
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";

// ponytail: lucide-react dropped brand/logo icons (trademark policy) — hand-rolled
// minimal marks instead of pulling in a whole icon pack for two glyphs.
function InstagramMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

// Every page ends on the "Hubungi Kami" contact block (globe + form). Tentang Kami renders it itself
// right above the footer, so the footer must not repeat it there.
// d3 + topojson only run client-side, so keep that weight out of the initial bundle.
const ContactWithGlobe = dynamic(() => import("@/components/ui/contact-with-globe"), { ssr: false });
const HIDE_CTA_ON = ["/about"];

// Every page ends on the halftone wordmark footer (dots spelling "tangkis"), under the contact block.
function HomeFooter({ showCta }: { showCta: boolean }) {
  const { t, lang } = useLang();
  // The wordmark is painted on a canvas, which can't read CSS variables, so take the page's already-loaded face by its
  // real (hashed) family name.
  const [face, setFace] = useState<string | undefined>(undefined);
  useEffect(() => {
    setFace(getComputedStyle(document.body).fontFamily);
  }, []);

  return (
    <footer className="overflow-hidden bg-brand-950 text-[#f0f0f0]">
      {showCta && (
        <div className="mx-auto max-w-[1800px] px-6 pt-20 lg:px-12 lg:pt-28">
          <ContactWithGlobe />
        </div>
      )}
      <div className={cn("border-t border-white/10", showCta ? "mt-16" : "mt-0")}>
        <HalftoneWordmarkFooter
          wordmark="tangkis"
          brand={
            <div>
              <Link href="/" aria-label={product.name} className="inline-block">
                <Image src="/logo-horizontal-2.png" alt={product.name} width={1669} height={411} className="h-9 w-auto md:h-11" />
              </Link>
              <p className="mt-5 max-w-xs opacity-60">{t(product.tagline)}</p>
              <p className="mt-4 text-sm opacity-60">© 2026 Tangkis. {t("Hak Cipta Dilindungi.", "All rights reserved.")}</p>
            </div>
          }
          columns={[
            {
              title: t("Navigasi", "Navigation"),
              links: [
                { label: t("Beranda", "Home"), href: "/" },
                { label: t("Tentang Kami", "About Us"), href: "/about" },
                { label: t("Demo Dashboard", "Dashboard Demo"), href: "/dashboard" },
                { label: "FAQ", href: "/faq" },
              ],
            },
            {
              title: t("Legal", "Legal"),
              links: [
                { label: t("Syarat & Ketentuan", "Terms & Conditions") },
                { label: t("Kebijakan Privasi", "Privacy Policy") },
              ],
            },
            {
              title: t("Sosial", "Social"),
              links: [
                { label: "Instagram", href: "https://instagram.com/tangkis.tech", icon: <InstagramMark className="h-4 w-4" /> },
                { label: "Email", href: mailtoTangkis(lang), icon: <Mail className="h-4 w-4" /> },
              ],
            },
            {
              title: t("Kontak", "Contact"),
              links: [
                { label: EMAIL_TANGKIS, href: mailtoTangkis(lang) },
                { label: "+62 813 1614 9609", href: "tel:+6281316149609" },
              ],
            },
          ]}
          backToTopLabel={t("Kembali ke atas ↑", "Back to top ↑")}
          palette={{ background: "#12260a", ink: "#d9ead3", warm: "#6aa84f" }}
          fontFamily={face}
          fontWeight={800}
          height="clamp(380px, 46vw, 620px)"
          className="max-md:!h-[700px]"
        />
      </div>
    </footer>
  );
}

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/login") return null;
  return <HomeFooter showCta={!HIDE_CTA_ON.includes(pathname)} />;
}
