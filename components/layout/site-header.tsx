import Link from "next/link";
import { Container } from "@/components/shared/container";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizedHref, siteConfig } from "@/config/site";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNavigation } from "./mobile-navigation";

export function SiteHeader({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const navigation = [["services", "services"], ["works", "works"], ["order", "order"], ["about", "about"], ["contacts", "contacts"]] as const;
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between gap-8">
        <Link href={localizedHref(locale)} className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-[#d52b1e] text-sm font-bold text-white">{siteConfig.shortName}</span>
          <span className="hidden leading-tight sm:block"><strong className="block text-sm">{siteConfig.name}</strong><span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{siteConfig.region}</span></span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <Link key={label} href={localizedHref(locale, href)} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {dictionary.navigation[label]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} label={dictionary.language} />
          <MobileNavigation locale={locale} dictionary={dictionary} navigation={navigation} />
        </div>
      </Container>
    </header>
  );
}
