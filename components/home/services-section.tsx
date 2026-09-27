import { Box, Hammer, Lightbulb, Sparkles, Truck } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { services } from "@/content/services";
import { publicBasePath } from "@/config/site";
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
              <article
                key={service.id}
                className="group flex min-h-[30rem] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d52b1e]/35 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e7e3]">
                  <img
                    src={`${publicBasePath}${service.image}`}
                    alt={content.title}
                    className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute start-4 top-4 grid size-12 place-items-center rounded-xl bg-white/95 text-[#1d1d1f] shadow-sm backdrop-blur-sm">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold">{content.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#68686d]">{content.description}</p>
                  <a href="#order" className="mt-auto pt-8 text-sm font-bold text-[#d52b1e]">
                    {dictionary.hero.primaryAction} →
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
