"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/config/site";

type NavigationItem = readonly [keyof Dictionary["navigation"], string];

export function MobileNavigation({ locale, dictionary, navigation }: {
  locale: Locale;
  dictionary: Dictionary;
  navigation: readonly NavigationItem[];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden" aria-label="Open navigation">
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(88vw,26rem)] border-s bg-background p-6" showCloseButton>
        <SheetTitle className="text-sm font-bold">{siteConfig.name}</SheetTitle>
        <nav className="mt-12 flex flex-col" aria-label="Mobile navigation">
          {navigation.map(([label, href], index) => (
            <SheetClose key={label} asChild>
              <Link
                href={`/${locale}#${href}`}
                className="flex items-center gap-5 border-b py-5 text-xl font-semibold transition-colors hover:text-primary"
              >
                <span className="text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                {dictionary.navigation[label]}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
