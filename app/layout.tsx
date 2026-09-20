import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "./fonts/Manrope-Variable.ttf",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

const unbounded = localFont({
  src: "./fonts/Unbounded-Variable.ttf",
  variable: "--font-unbounded",
  display: "swap",
  weight: "200 900",
});

const notoSansArabic = localFont({
  src: "./fonts/NotoSansArabic-Variable.ttf",
  variable: "--font-arabic",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Послуги переїзду та прибирання в Берні",
    template: "%s — Берн",
  },
  description: "Переїзди, доставка, складання меблів і прибирання в кантоні Берн.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${manrope.variable} ${unbounded.variable} ${notoSansArabic.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
