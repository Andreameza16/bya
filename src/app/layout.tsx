import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { business, canIndex, siteUrl } from "@/data/business";
import "./globals.css";
const display = localFont({
  src: [
    {
      path: "../assets/fonts/cormorant-garamond-latin-wght-normal.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../assets/fonts/cormorant-garamond-latin-wght-italic.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia"],
});
const interfaceFont = localFont({
  src: "../assets/fonts/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-interface",
  display: "swap",
  fallback: ["Arial"],
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Belleza y Armonía | Academia de Belleza en Masaya",
    template: "%s | Belleza y Armonía",
  },
  description:
    "Conocé cursos y seminarios de belleza y barbería en Masaya, Nicaragua. Explorá tu próxima formación y solicitá información en Belleza y Armonía.",
  applicationName: business.shortName,
  robots: { index: canIndex, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_NI",
    siteName: business.name,
    title: "Belleza y Armonía · Transformá tu talento en una profesión",
    description:
      "Academia de belleza y barbería. Cursos y seminarios desde Masaya, Nicaragua.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};
export const viewport: Viewport = {
  themeColor: "#FAF7F3",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-NI"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${interfaceFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
