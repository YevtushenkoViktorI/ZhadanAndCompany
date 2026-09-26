"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
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
    <label className="relative inline-flex">
      <span className="sr-only">{label}</span>
      <select
        value={locale}
        onChange={(event) => router.push(localizedPath(event.target.value as Locale))}
        className={cn("max-w-48 cursor-pointer appearance-none rounded-xl border border-black/10 bg-card py-2.5 ps-4 pe-12 text-sm font-bold text-foreground shadow-sm transition-all duration-200 hover:border-black/25 hover:shadow-md focus-visible:border-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10")}
        aria-label={label}
      >
        {locales.map((item) => <option key={item} value={item} lang={item}>{localeLabels[item]}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
    </label>
  );
}
