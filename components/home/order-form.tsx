"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { formCopy } from "@/i18n/form-copy";
import { getOrderFieldCopy } from "@/i18n/order-field-copy";
import type { ServiceId } from "@/types/service";

type OrderType = ServiceId | "combo";

export function OrderForm({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const [service, setService] = useState<OrderType>("moving");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const copy = formCopy[locale];
  const fields = getOrderFieldCopy(locale);
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

                <ServiceFields service={service} fields={fields} />

                <Field label={copy.name}><Input name="name" autoComplete="name" required className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
                <Field label={copy.phone}><Input name="phone" type="tel" autoComplete="tel" required className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
                <Field label={copy.date}><Input name="date" type="date" required className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
                <Field label={fields.emailLabel}><Input name="email" type="email" autoComplete="email" className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
                <Field label={fields.contactMethod} className="sm:col-span-2">
                  <RadioGroup name="contactMethod" defaultValue="whatsapp" className="grid grid-cols-3 gap-2">
                    {[["whatsapp", fields.whatsapp], ["phone", fields.phoneCall], ["email", fields.email]] .map(([value, label]) => (
                      <label key={value} className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-black/10 bg-[#fafaf8] px-3 text-sm font-semibold has-[[data-state=checked]]:border-[#d52b1e] has-[[data-state=checked]]:text-[#d52b1e]">
                        <RadioGroupItem value={value} /><span>{label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </Field>
                <Field label={copy.photos} className="sm:col-span-2"><Input name="photos" type="file" accept="image/*" multiple className="h-12 rounded-xl bg-[#fafaf8] file:me-3" /></Field>
                <Field label={fields.comment} className="sm:col-span-2"><Textarea name="details" rows={5} className="min-h-32 rounded-xl bg-[#fafaf8]" /></Field>
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

function ServiceFields({ service, fields }: { service: OrderType; fields: ReturnType<typeof getOrderFieldCopy> }) {
  if (service === "moving") {
    return <>
      <Field label={fields.rooms}><Input name="rooms" className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
      <Field label={fields.floor}><Input name="floor" className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
      <Field label={fields.boxes}><Input name="boxes" inputMode="numeric" className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
      <Field label={fields.heavyItems}><Input name="heavyItems" className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
      <OptionFields options={[["packing", fields.needPacking], ["assembly", fields.needAssembly], ["lift", fields.hasLift]]} />
    </>;
  }

  if (service === "combo") {
    return <>
      <Field label={fields.rooms}><Input name="rooms" className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
      <Field label={fields.area}><Input name="area" type="number" min="1" className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
      <Field label={fields.floor}><Input name="floor" className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
      <Field label={fields.boxes}><Input name="boxes" inputMode="numeric" className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
      <OptionFields options={[["packing", fields.needPacking], ["assembly", fields.needAssembly], ["windows", fields.windows], ["handover", fields.handover]]} />
    </>;
  }

  if (service === "delivery") {
    return <>
      <Field label={fields.pickup}><Input name="pickup" required className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
      <Field label={fields.goods}><Input name="goods" className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
      <OptionFields options={[["assembly", fields.needAssembly], ["lift", fields.hasLift]]} />
    </>;
  }

  if (service === "assembly") {
    return <>
      <Field label={fields.furnitureType}><Input name="furnitureType" required className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
      <Field label={fields.manufacturer}><Input name="manufacturer" className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
      <Field label={fields.quantity}><Input name="quantity" inputMode="numeric" className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
    </>;
  }

  return <>
    <Field label={fields.cleaningType}>
      <select name="cleaningType" className="h-12 w-full rounded-xl border border-input bg-[#fafaf8] px-3 text-sm">
        <option value="handover">{fields.handover}</option><option value="general">{fields.cleaningType}</option>
      </select>
    </Field>
    <Field label={fields.area}><Input name="area" type="number" min="1" className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
    <OptionFields options={[["windows", fields.windows], ["handover", fields.handover]]} />
  </>;
}

function OptionFields({ options }: { options: Array<[string, string]> }) {
  return <div className="flex flex-wrap gap-5 sm:col-span-2">
    {options.map(([name, label]) => <label key={name} className="flex cursor-pointer items-center gap-2 text-sm text-[#4d4d50]"><Checkbox name={name} /><span>{label}</span></label>)}
  </div>;
}
