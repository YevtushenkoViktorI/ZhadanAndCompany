export const locales = [
  "uk", "en", "de", "fr", "it", "et", "pl", "lt", "lv", "cs", "es",
  "tr", "ar", "nl-BE", "sk", "hu", "ro", "sr", "bg",
] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uk";
export const localeLabels: Record<Locale, string> = {
  uk: "Українська", en: "English", de: "Deutsch", fr: "Français",
  it: "Italiano", et: "Eesti", pl: "Polski", lt: "Lietuvių", lv: "Latviešu",
  cs: "Čeština", es: "Español", tr: "Türkçe", ar: "العربية",
  "nl-BE": "Nederlands (BE)", sk: "Slovenčina", hu: "Magyar", ro: "Română",
  sr: "Српски", bg: "Български",
};

export const rtlLocales: readonly Locale[] = ["ar"];

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
