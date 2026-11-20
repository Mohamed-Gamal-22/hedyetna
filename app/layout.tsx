import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/lib/site-config";
import { MetaPixel } from "@/components/meta-pixel";
import "./globals.css";

const cairo = localFont({ src: "./fonts/cairo-arabic.woff2", variable: "--font-cairo", display: "swap", weight: "500 800", fallback: ["Tahoma", "Arial", "sans-serif"] });
const tajawal = localFont({ src: [
  { path: "./fonts/tajawal-arabic-400.woff2", weight: "400" },
  { path: "./fonts/tajawal-arabic-500.woff2", weight: "500" },
  { path: "./fonts/tajawal-arabic-700.woff2", weight: "700" },
], variable: "--font-tajawal", display: "swap", fallback: ["Tahoma", "Arial", "sans-serif"] });

export const metadata: Metadata = {
  title: "هديتنا | بوكس رمضان اللي يفرّح القلب",
  description: "هدية رمضانية تجمع سجادة الصلاة والسبحة والمصلية والمبخرة والبخور في بوكس واحد.",
  applicationName: siteConfig.brandName,
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#153f35" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl" className={`${cairo.variable} ${tajawal.variable}`}><body><MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />{children}</body></html>;
}
