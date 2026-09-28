import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { HeroGallery } from "@/components/home/hero-gallery";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { getHeroDescription } from "@/i18n/hero-copy";

export function Hero({ locale, content }: { locale: Locale; content: Dictionary["hero"] }) {
  const description = getHeroDescription(locale);
  return (
    <section className="relative overflow-hidden bg-[#fafaf8] py-5 text-[#1d1d1f] sm:py-8 lg:py-10">
      <Container className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(32rem,1.1fr)] lg:gap-10">
        <div className="max-w-3xl">
          <h1 className="max-w-3xl text-balance text-[clamp(2.1rem,2.88vw,3.06rem)] font-bold leading-[1.08] tracking-[-0.035em]">{content.title}</h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-[#68686d] sm:text-lg sm:leading-8">{description}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="mt-8 rounded-full bg-[#d52b1e] px-7 hover:bg-[#b62318]"><a href="#order">{content.primaryAction}</a></Button>
            <Button asChild size="lg" variant="outline" className="mt-8 rounded-full border-black/15 bg-transparent px-7"><a href="#works">{content.secondaryAction}<ArrowUpRight aria-hidden="true" /></a></Button>
          </div>
        </div>
        <HeroGallery />
      </Container>
    </section>
  );
}
