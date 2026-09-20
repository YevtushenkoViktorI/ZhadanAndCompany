import { notFound } from "next/navigation";
import { Hero } from "@/components/home/hero";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  return <Hero locale={locale} content={dictionary.hero} />;
}
