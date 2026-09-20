import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function Hero({ locale, content }: { locale: Locale; content: Dictionary["hero"] }) {
  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] items-end overflow-hidden py-12 sm:py-20">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(225,74,45,0.35),transparent_34%),linear-gradient(135deg,#111_0%,#090909_65%)]" />
      <Container className="relative">
        <p className="mb-5 text-sm font-extrabold uppercase tracking-[0.22em] text-primary">{content.eyebrow}</p>
        <h1 className="max-w-6xl font-display text-[clamp(3.2rem,10vw,9.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.06em]">{content.title}</h1>
        <div className="mt-8 flex max-w-3xl flex-col justify-between gap-8 border-t pt-7 sm:flex-row sm:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{content.description}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href={`/${locale}/concerts`}>{content.primaryAction}</Link></Button>
            <Button asChild size="lg" variant="outline"><Link href={`/${locale}/music`}>{content.secondaryAction}</Link></Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
