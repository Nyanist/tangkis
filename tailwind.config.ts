import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f8ef",
          100: "#d9ead3",
          300: "#b6d7a8",
          500: "#93c47d",
          600: "#6aa84f",
          700: "#38761d",
          800: "#2b5a17",
          900: "#1f3d12",
          950: "#12260a",
          // Dim gray, from public/color-scheme.jpeg — a deliberate off-scale dark accent.
          dark: "#596869",
        },
        // Same values, kept as a second name for reference — not used by any component.
        "old-brand": {
          50: "#f3f8ef",
          100: "#d9ead3",
          300: "#b6d7a8",
          500: "#93c47d",
          600: "#6aa84f",
          700: "#38761d",
          800: "#2b5a17",
          900: "#1f3d12",
          950: "#12260a",
        },
      },
      fontFamily: {
        // body + heading 2
        sans: ["var(--font-plus-jakarta-sans)", "sans-serif"],
        // heading 1: Geist Sans
        heading: ["var(--font-geist-sans)", "sans-serif"],
        // closing CTA headline: serif display
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        // tags / badges
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        // Cara Kerja section: same heading faces as the rest of the site (h1 Geist Sans, h2 Inter), body General Sans Regular
        "hiw-h1": ["var(--font-geist-sans)", "sans-serif"],
        "hiw-h2": ["var(--font-inter)", "sans-serif"],
        "hiw-body": ["General Sans", "var(--font-plus-jakarta-sans)", "sans-serif"],
        // description / lead copy — Satoshi loaded via Fontshare <link>, not next/font
        description: ["Satoshi", "var(--font-plus-jakarta-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
