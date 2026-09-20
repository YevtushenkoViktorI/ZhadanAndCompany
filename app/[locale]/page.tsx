import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/home/hero";
import { OrderForm } from "@/components/home/order-form";
import { ProcessSection } from "@/components/home/process-section";
import { ServicesSection } from "@/components/home/services-section";
import { AboutSection, ReviewsSection, WorksSection } from "@/components/home/company-sections";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.hero.title,
    description: dictionary.hero.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((item) => [item, `/${item}`])),
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  return <><Hero content={dictionary.hero} /><ServicesSection dictionary={dictionary} /><WorksSection dictionary={dictionary} /><OrderForm locale={locale} dictionary={dictionary} /><ProcessSection dictionary={dictionary} /><AboutSection dictionary={dictionary} /><ReviewsSection dictionary={dictionary} /></>;
}
