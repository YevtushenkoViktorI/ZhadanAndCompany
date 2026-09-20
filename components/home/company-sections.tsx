import { CheckCircle2, Quote } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import type { Dictionary } from "@/i18n/dictionaries";

export function WorksSection({ dictionary }: { dictionary: Dictionary }) {
  return (
    <Section id="works" className="bg-white text-[#1d1d1f]">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">{dictionary.navigation.works}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((item) => <div key={item} className="aspect-[4/3] rounded-2xl border border-black/10 bg-[#f2f1ee]" aria-hidden="true" />)}
        </div>
      </Container>
    </Section>
  );
}

export function AboutSection({ dictionary }: { dictionary: Dictionary }) {
  return (
    <Section id="about" className="bg-[#f5f4f1] text-[#1d1d1f]">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="min-h-80 rounded-3xl border border-black/10 bg-white" aria-hidden="true" />
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">{dictionary.navigation.about}</h2>
          <p className="mt-6 text-lg leading-relaxed text-[#68686d]">{dictionary.hero.description}</p>
          <div className="mt-8 space-y-4">
            {[dictionary.services.items.moving.title, dictionary.services.items.assembly.title, dictionary.services.items.cleaning.title].map((item) => (
              <p key={item} className="flex items-center gap-3 text-sm font-semibold"><CheckCircle2 className="size-5 text-emerald-600" aria-hidden="true" />{item}</p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function ReviewsSection({ dictionary }: { dictionary: Dictionary }) {
  return (
    <Section id="reviews" className="bg-white text-[#1d1d1f]">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">{dictionary.navigation.reviews}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <article key={item} className="min-h-52 rounded-2xl border border-black/10 p-6">
              <Quote className="size-6 text-[#d52b1e]" aria-hidden="true" />
              <div className="mt-8 h-2 w-full rounded bg-black/5" /><div className="mt-3 h-2 w-4/5 rounded bg-black/5" /><div className="mt-3 h-2 w-2/3 rounded bg-black/5" />
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
