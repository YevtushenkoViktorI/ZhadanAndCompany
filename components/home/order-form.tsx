"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { formCopy } from "@/i18n/form-copy";
import type { ServiceId } from "@/types/service";

type OrderType = ServiceId | "combo";

export function OrderForm({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const [service, setService] = useState<OrderType>("moving");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const copy = formCopy[locale];
  const hasTwoAddresses = service === "moving" || service === "delivery" || service === "combo";

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent || !event.currentTarget.reportValidity()) return;
    setSubmitted(true);
  }

  return (
    <section id="order" className="bg-[#f5f4f1] py-16 text-[#1d1d1f] sm:py-24">
      <Container className="max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d52b1e]">{dictionary.hero.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{dictionary.order.title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-[#68686d]">{dictionary.order.description}</p>
        </div>

        <div className="mt-10 rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-10">
          {submitted ? (
            <div className="grid min-h-96 place-items-center text-center">
              <div className="max-w-lg">
                <CheckCircle2 className="mx-auto size-16 text-emerald-600" aria-hidden="true" />
                <h3 className="mt-6 text-2xl font-bold">{copy.successTitle}</h3>
                <p className="mt-3 text-[#68686d]">{copy.successDescription}</p>
                <Button className="mt-7 rounded-full" variant="outline" onClick={() => { setSubmitted(false); setConsent(false); }}>{copy.again}</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate={false}>
              <div className="flex flex-wrap gap-2" role="group" aria-label={dictionary.navigation.services}>
                {services.map(({ id }) => (
                  <button key={id} type="button" onClick={() => setService(id)} aria-pressed={service === id}
                    className="rounded-full border border-black/10 px-4 py-2.5 text-sm font-semibold transition-colors aria-pressed:border-[#1d1d1f] aria-pressed:bg-[#1d1d1f] aria-pressed:text-white">
                    {dictionary.services.items[id].title}
                  </button>
                ))}
                <button type="button" onClick={() => setService("combo")} aria-pressed={service === "combo"}
                  className="rounded-full border border-black/10 px-4 py-2.5 text-sm font-semibold transition-colors aria-pressed:border-[#1d1d1f] aria-pressed:bg-[#1d1d1f] aria-pressed:text-white">
                  {copy.combo}
                </button>
              </div>

              <input type="hidden" name="service" value={service} />
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {hasTwoAddresses ? (
                  <>
                    <Field label={copy.from}><Input name="from" required className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
                    <Field label={copy.to}><Input name="to" required className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
                  </>
                ) : <Field label={copy.address} className="sm:col-span-2"><Input name="address" required className="h-12 rounded-xl bg-[#fafaf8]" /></Field>}

                <Field label={copy.name}><Input name="name" autoComplete="name" required className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
                <Field label={copy.phone}><Input name="phone" type="tel" autoComplete="tel" required className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
                <Field label={copy.date}><Input name="date" type="date" required className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
                <Field label={copy.photos}><Input name="photos" type="file" accept="image/*" multiple className="h-12 rounded-xl bg-[#fafaf8] file:me-3" /></Field>
                <Field label={copy.details} className="sm:col-span-2"><Textarea name="details" rows={5} className="min-h-32 rounded-xl bg-[#fafaf8]" /></Field>
              </div>

              <div className="mt-6 flex items-start gap-3">
                <Checkbox id="privacy" checked={consent} onCheckedChange={(value) => setConsent(value === true)} aria-required="true" />
                <label htmlFor="privacy" className="cursor-pointer text-sm leading-relaxed text-[#68686d]">{copy.privacy}</label>
              </div>

              <Button type="submit" size="lg" disabled={!consent} className="mt-7 rounded-full bg-[#d52b1e] px-8 hover:bg-[#b62318]">
                {copy.submit}
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}

function Field({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return <label className={className}><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#4d4d50]">{label}</span>{children}</label>;
}
