import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { getHeroDescription } from "@/i18n/hero-copy";

export function Hero({ locale, content }: { locale: Locale; content: Dictionary["hero"] }) {
  const description = getHeroDescription(locale);
  return (
    <section className="relative overflow-hidden bg-[#fafaf8] py-16 text-[#1d1d1f] sm:py-24 lg:py-32">
      <Container className="relative">
        <div className="max-w-5xl">
          <h1 className="max-w-3xl text-balance text-[clamp(2.75rem,5vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.045em]">{content.title}</h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-[#68686d] sm:text-lg sm:leading-8">{description}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="mt-8 rounded-full bg-[#d52b1e] px-7 hover:bg-[#b62318]"><a href="#order">{content.primaryAction}</a></Button>
            <Button asChild size="lg" variant="outline" className="mt-8 rounded-full border-black/15 bg-transparent px-7"><a href="#works">{content.secondaryAction}<ArrowUpRight aria-hidden="true" /></a></Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
