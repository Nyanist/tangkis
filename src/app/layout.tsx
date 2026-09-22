import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "TANGKIS", template: "%s | TANGKIS" },
  description: "TANGKIS — Pemantauan Kesiapan Bahan Bakar Genset Cadangan.",
  icons: { icon: "/logo-img-hijau.webp" },
  openGraph: { type: "website", locale: "id_ID" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
