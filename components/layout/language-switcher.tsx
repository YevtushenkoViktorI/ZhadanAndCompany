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
        className={cn("w-40 cursor-pointer appearance-none rounded-lg border border-black/10 bg-card py-2 ps-3 pe-11 text-sm font-bold text-foreground shadow-sm transition-all duration-200 hover:border-black/25 hover:shadow-md focus-visible:border-black/30 focus-visible:!outline-2 focus-visible:!outline-black/15 focus-visible:!outline-offset-2 focus-visible:ring-0")}
        aria-label={label}
      >
        {locales.map((item) => <option key={item} value={item} lang={item}>{localeLabels[item]}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute end-5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
    </label>
  );
}
