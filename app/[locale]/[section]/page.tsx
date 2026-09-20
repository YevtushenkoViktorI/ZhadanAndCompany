import { notFound } from "next/navigation";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const sections = ["music", "concerts", "about"] as const;
type SectionName = (typeof sections)[number];

export default async function SectionPage({ params }: { params: Promise<{ locale: string; section: string }> }) {
  const { locale, section } = await params;
  if (!isLocale(locale) || !sections.includes(section as SectionName)) notFound();
  const dictionary = await getDictionary(locale);
  return <Section className="min-h-[70vh]"><Container><SectionHeading title={dictionary.navigation[section as SectionName]} eyebrow={dictionary.hero.eyebrow} /></Container></Section>;
}
