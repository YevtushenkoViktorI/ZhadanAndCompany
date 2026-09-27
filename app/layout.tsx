import type { Metadata } from "next";
import localFont from "next/font/local";
import { publicBasePath, siteConfig } from "@/config/site";
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
    default: `${siteConfig.name} — переїзди у Швейцарії та за кордон`,
    template: `%s — ${siteConfig.name}`,
  },
  description: "Переїзди у Швейцарії та за кордон, доставка, складання меблів, прибирання й побутова допомога.",
  icons: {
    icon: `${publicBasePath}/favicon.svg`,
    shortcut: `${publicBasePath}/favicon.svg`,
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
