"use client";

import { usePathname, useRouter } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

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
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        value={locale}
        onChange={(event) => router.push(localizedPath(event.target.value as Locale))}
        className={cn("max-w-44 cursor-pointer rounded-sm border bg-card px-3 py-2 text-sm font-bold text-foreground outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary")}
        aria-label={label}
      >
        {locales.map((item) => <option key={item} value={item} lang={item}>{localeLabels[item]}</option>)}
      </select>
    </label>
  );
}
