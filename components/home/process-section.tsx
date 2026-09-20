import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import type { Dictionary } from "@/i18n/dictionaries";

export function ProcessSection({ dictionary }: { dictionary: Dictionary }) {
  const steps = [dictionary.process.steps.request, dictionary.process.steps.details, dictionary.process.steps.service];
  return (
    <Section id="how-it-works" className="bg-white text-[#1d1d1f]">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">{dictionary.process.title}</h2>
        <p className="mt-4 text-lg text-[#68686d]">{dictionary.process.description}</p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-2xl border border-black/10 p-7">
              <span className="text-4xl font-extrabold text-[#d52b1e]">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#68686d]">{step.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
