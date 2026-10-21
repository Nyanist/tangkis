import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/lib/i18n";

// Google Fonts, self-hosted by next/font at build time (no runtime request, no CLS).
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta-sans" });
// Headings: h1 is Geist Sans (the variable file already bundled in ./fonts), h2 and below are Inter.
const geistSans = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-geist-sans", weight: "100 900" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Serif display face for the closing call-to-action headline.
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", style: ["normal", "italic"], axes: ["opsz"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: { default: "TANGKIS", template: "%s | TANGKIS" },
  description: "TANGKIS — Pemantauan Kesiapan Bahan Bakar Genset Cadangan.",
  icons: { icon: "/logo-img-hijau.webp" },
  openGraph: { type: "website", locale: "id_ID" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        {/* Satoshi isn't on Google Fonts, so it can't go through next/font — Fontshare
            is its official free host; swap for a self-hosted woff2 if the CDN dependency matters. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=general-sans@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${geistSans.variable} ${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
