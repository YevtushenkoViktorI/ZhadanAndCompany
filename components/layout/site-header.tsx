import Link from "next/link";
import { Container } from "@/components/shared/container";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const navigation = [["home", ""], ["music", "music"], ["concerts", "concerts"], ["about", "about"]] as const;
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between gap-8">
        <Link href={`/${locale}`} className="font-display text-sm font-bold uppercase leading-tight">Жадан<br />і Компанія</Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <Link key={label} href={`/${locale}${href ? `/${href}` : ""}`} className="text-sm font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground">
              {dictionary.navigation[label]}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher locale={locale} label={dictionary.language} />
      </Container>
    </header>
  );
}
