import { Box, Hammer, Lightbulb, Sparkles, Truck } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { services } from "@/content/services";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { getElectricalCopy } from "@/i18n/electrical-copy";

const icons = { truck: Truck, package: Box, tool: Hammer, sparkles: Sparkles, lightbulb: Lightbulb };

export function ServicesSection({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const electrical = getElectricalCopy(locale);
  return (
    <Section id="services" className="bg-[#f5f4f1] text-[#1d1d1f]">
      <Container>
        <div className="mb-10 max-w-2xl sm:mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">{dictionary.services.title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-[#68686d]">{dictionary.services.description}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((service) => {
            const Icon = icons[service.icon];
            const content = service.id === "electrical" ? electrical : dictionary.services.items[service.id];
            return (
              <article key={service.id} className="flex min-h-80 flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <span className="grid size-12 place-items-center rounded-xl bg-[#f2f2f0] text-[#1d1d1f]"><Icon className="size-5" aria-hidden="true" /></span>
                <h3 className="mt-8 text-xl font-bold">{content.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#68686d]">{content.description}</p>
                <a href="#order" className="mt-auto pt-8 text-sm font-bold text-[#d52b1e]">{dictionary.hero.primaryAction} →</a>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
