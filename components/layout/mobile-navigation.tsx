"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Dictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/config/site";

type NavigationItem = readonly [keyof Dictionary["navigation"], string];

export function MobileNavigation({ dictionary, navigation }: {
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
              <a
                href={`#${href}`}
                className="flex items-center gap-5 rounded-xl border border-transparent px-3 py-5 text-xl font-semibold transition-all duration-300 hover:border-[#d52b1e]/35 hover:bg-[#d52b1e]/5 hover:text-primary"
              >
                <span className="text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                {dictionary.navigation[label]}
              </a>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
