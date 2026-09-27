"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { localeLabels, locales, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const router = useRouter();

  function localizedPath(nextLocale: Locale) {
    const segments = pathname.split("/");
    const localeIndex = segments.findIndex((segment) => locales.includes(segment as Locale));
    if (localeIndex >= 0) {
      segments[localeIndex] = nextLocale;
      return segments.join("/");
    }
    return `/${nextLocale}/`;
  }

  return (
    <label className="relative inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-card px-3 py-2 text-sm font-bold text-foreground shadow-sm transition-all duration-200 hover:border-black/25 hover:shadow-md has-[:focus-visible]:border-black/30 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-black/15 has-[:focus-visible]:outline-offset-2">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">{localeLabels[locale]}</span>
      <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
      <select
        value={locale}
        onChange={(event) => router.push(localizedPath(event.target.value as Locale))}
        className="absolute inset-0 size-full cursor-pointer appearance-none opacity-0 focus-visible:!outline-none"
        aria-label={label}
      >
        {locales.map((item) => <option key={item} value={item} lang={item}>{localeLabels[item]}</option>)}
      </select>
    </label>
  );
}
