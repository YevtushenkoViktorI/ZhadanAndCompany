"use client";

import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { services } from "@/content/services";
import { publicBasePath } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { getElectricalCopy } from "@/i18n/electrical-copy";
import { getMovingCopy } from "@/i18n/moving-copy";

export function ServicesSection({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const electrical = getElectricalCopy(locale);
  const moving = getMovingCopy(locale);
  return (
    <Section id="services" className="bg-[#f5f4f1] text-[#1d1d1f]">
      <Container>
        <div className="mb-10 max-w-2xl sm:mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">{dictionary.services.title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-[#68686d]">{dictionary.services.description}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((service) => {
            const content = service.id === "electrical"
              ? electrical
              : service.id === "moving"
                ? moving
                : dictionary.services.items[service.id];
            return (
              <article
                key={service.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d52b1e]/35 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e7e3]">
                  <img
                    src={`${publicBasePath}${service.image}`}
                    alt={content.title}
                    className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold">{content.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#68686d]">{content.description}</p>
                  <a
                    href="#order"
                    onClick={() => window.dispatchEvent(new CustomEvent("select-order-service", { detail: service.id }))}
                    className="mt-auto inline-block pt-5 text-sm font-bold text-[#d52b1e]"
                  >
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
