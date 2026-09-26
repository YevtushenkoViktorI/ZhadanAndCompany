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
      <div aria-hidden className="absolute inset-y-0 end-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(213,43,30,0.12),transparent_64%)]" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="max-w-3xl text-balance text-[clamp(2.75rem,5vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.045em]">{content.title}</h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-[#68686d] sm:text-lg sm:leading-8">{description}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="mt-8 rounded-full bg-[#d52b1e] px-7 hover:bg-[#b62318]"><a href="#order">{content.primaryAction}</a></Button>
            <Button asChild size="lg" variant="outline" className="mt-8 rounded-full border-black/15 bg-transparent px-7"><a href="#works">{content.secondaryAction}<ArrowUpRight aria-hidden="true" /></a></Button>
          </div>
        </div>
        <div className="relative min-h-80 overflow-hidden rounded-3xl border border-black/10 bg-[#f0efeb] lg:col-span-5 lg:min-h-[32rem]">
          <div aria-hidden className="absolute inset-8 rounded-2xl border border-dashed border-black/15" />
          <div className="absolute inset-x-8 bottom-8 rounded-2xl bg-white p-5 shadow-sm">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#d52b1e]">{content.coverageLabel}</span>
            <strong className="mt-2 block text-lg">{content.coverage}</strong>
          </div>
        </div>
      </Container>
    </section>
  );
}
