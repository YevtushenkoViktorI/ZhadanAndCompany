import { ArrowUpRight, CheckCircle2, MapPin } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getContentCopy } from "@/i18n/content-copy";

export function WorksSection({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const copy = getContentCopy(locale);
  return (
    <Section id="works" className="bg-white text-[#1d1d1f]">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">{dictionary.navigation.works}</h2>
          <p className="mt-4 text-lg leading-relaxed text-[#68686d]">{copy.worksDescription}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {copy.workItems.map((item, index) => (
            <article key={`${item.city}-${item.title}`} className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
              <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-[linear-gradient(135deg,#f0efeb,#e5e3dd)]">
                <span className="text-7xl font-black text-black/[0.06]">{String(index + 1).padStart(2, "0")}</span>
                <div className="absolute inset-x-4 top-4 flex justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold shadow-sm"><MapPin className="size-3.5 text-[#d52b1e]" />{item.city}</span>
                  <span className="rounded-full bg-[#1d1d1f] px-3 py-1.5 text-xs font-semibold text-white">{item.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4"><h3 className="text-lg font-bold">{item.title}</h3><ArrowUpRight className="size-5 shrink-0 text-[#d52b1e] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div>
                <p className="mt-3 text-sm leading-relaxed text-[#68686d]">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function AboutSection({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const copy = getContentCopy(locale);
  return (
    <Section id="about" className="bg-[#f5f4f1] text-[#1d1d1f]">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="relative min-h-[28rem] overflow-hidden rounded-3xl border border-black/10 bg-[radial-gradient(circle_at_30%_20%,rgba(213,43,30,0.18),transparent_38%),linear-gradient(145deg,#fff,#e8e6e0)] lg:col-span-5">
          <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/90 p-5 shadow-sm backdrop-blur"><strong className="text-sm text-[#d52b1e]">{copy.geographyLabel}</strong><p className="mt-2 text-sm leading-relaxed text-[#68686d]">{copy.geography}</p></div>
        </div>
        <div className="lg:col-span-7">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#d52b1e]">{dictionary.navigation.about}</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{copy.aboutTitle}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#68686d]">{copy.aboutBody}</p>
          <div className="mt-8 space-y-4">
            {copy.benefits.map((item) => <p key={item} className="flex items-start gap-3 text-sm font-semibold"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />{item}</p>)}
          </div>
        </div>
      </Container>
    </Section>
  );
}
