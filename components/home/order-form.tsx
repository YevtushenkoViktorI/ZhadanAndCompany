"use client";

import { useEffect, useRef, useState } from "react";
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
import { getElectricalCopy } from "@/i18n/electrical-copy";
import type { ServiceId } from "@/types/service";

type OrderType = ServiceId | "combo";
const formEndpoint = "https://formsubmit.co/umzughilfe.schweiz@gmail.com";
const maxPhotoBytes = 10 * 1024 * 1024;
const maxPhotoDimension = 1920;

const photoCopy: Partial<Record<Locale, { hint: string; processing: string; ready: (count: number, size: string) => string }>> = {
  uk: {
    hint: "Максимум 10 МБ загалом. Перед надсиланням фотографії автоматично стискаються.",
    processing: "Оптимізуємо фотографії…",
    ready: (count, size) => `Підготовлено фото: ${count}, загальний розмір ${size} МБ.`,
  },
  de: {
    hint: "Maximal 10 MB insgesamt. Fotos werden vor dem Senden automatisch komprimiert.",
    processing: "Fotos werden optimiert…",
    ready: (count, size) => `${count} Foto(s) vorbereitet, insgesamt ${size} MB.`,
  },
  en: {
    hint: "Maximum 10 MB in total. Photos are compressed automatically before sending.",
    processing: "Optimizing photos…",
    ready: (count, size) => `${count} photo(s) prepared, ${size} MB total.`,
  },
};

const errorCopy: Partial<Record<Locale, { send: string; activation: string; files: string; sending: string }>> = {
  uk: {
    send: "Не вдалося надіслати запит. Перевірте з’єднання та спробуйте ще раз.",
    activation: "Форма очікує активації власником. Будь ласка, спробуйте трохи пізніше.",
    files: "Загальний розмір фотографій не повинен перевищувати 10 МБ.",
    sending: "Надсилаємо…",
  },
  de: {
    send: "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
    activation: "Das Formular wartet auf die Aktivierung durch den Inhaber. Bitte versuchen Sie es später erneut.",
    files: "Die Fotos dürfen zusammen höchstens 10 MB groß sein.",
    sending: "Wird gesendet…",
  },
  en: {
    send: "We could not send your request. Check your connection and try again.",
    activation: "The form is awaiting activation by the owner. Please try again a little later.",
    files: "The total size of the photos must not exceed 10 MB.",
    sending: "Sending…",
  },
};

export function OrderForm({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const formCardRef = useRef<HTMLDivElement>(null);
  const successTitleRef = useRef<HTMLHeadingElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLInputElement>(null);
  const sourceUrlRef = useRef<HTMLInputElement>(null);
  const photoSelectionRef = useRef(0);
  const [service, setService] = useState<OrderType>("moving");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [photoStatus, setPhotoStatus] = useState("");
  const [processingPhotos, setProcessingPhotos] = useState(false);
  const [photoLimitExceeded, setPhotoLimitExceeded] = useState(false);
  const copy = formCopy[locale];
  const fields = getOrderFieldCopy(locale);
  const electrical = getElectricalCopy(locale);
  const hasTwoAddresses = service === "moving" || service === "delivery" || service === "combo";
  const photoText = photoCopy[locale] ?? photoCopy.en!;
  const successUrl = `https://yevtushenkoviktori.github.io/ZhadanAndCompany/${locale}/submitted.html`;

  useEffect(() => {
    function selectService(event: Event) {
      const selectedService = (event as CustomEvent<unknown>).detail;
      if (services.some(({ id }) => id === selectedService)) {
        setService(selectedService as ServiceId);
      }
    }

    window.addEventListener("select-order-service", selectService);
    return () => window.removeEventListener("select-order-service", selectService);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("submitted") !== "1") return;
    url.searchParams.delete("submitted");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    const frame = window.requestAnimationFrame(() => setSubmitted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!submitted) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frame = window.requestAnimationFrame(() => {
      formCardRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    });
    const focusTimer = window.setTimeout(() => successTitleRef.current?.focus({ preventScroll: true }), reducedMotion ? 0 : 750);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(focusTimer);
    };
  }, [submitted]);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    if (!consent || !form.reportValidity() || submitting || processingPhotos || photoLimitExceeded) {
      event.preventDefault();
      return;
    }

    const formData = new FormData(form);
    const photos = formData.getAll("attachment").filter((value): value is File => value instanceof File && value.size > 0);
    const totalPhotoSize = photos.reduce((total, photo) => total + photo.size, 0);
    const status = errorCopy[locale] ?? errorCopy.en!;

    if (totalPhotoSize > maxPhotoBytes) {
      event.preventDefault();
      setSubmitError(status.files);
      setPhotoLimitExceeded(true);
      return;
    }

    const requestId = Date.now().toString(36).slice(-6).toUpperCase();
    const serviceTitle = service === "combo"
      ? copy.combo
      : service === "electrical"
        ? electrical.title
        : dictionary.services.items[service].title;
    const customerName = String(formData.get("name") ?? "").trim();
    const customerPhone = String(formData.get("phone") ?? "").trim();
    const requestedDate = String(formData.get("date") ?? "").trim();

    if (subjectRef.current) {
      subjectRef.current.value = [`Заявка #${requestId}`, serviceTitle, customerName, customerPhone, requestedDate].filter(Boolean).join(" · ");
    }
    if (summaryRef.current) {
      summaryRef.current.value = `${serviceTitle}; ${customerName}; ${customerPhone}; ${requestedDate}`;
    }
    if (sourceUrlRef.current) sourceUrlRef.current.value = window.location.href;

    setSubmitting(true);
    setSubmitError("");
  }

  async function preparePhotos(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const selectedFiles = Array.from(input.files ?? []);
    const selectionId = ++photoSelectionRef.current;
    setSubmitError("");
    setPhotoLimitExceeded(false);

    if (selectedFiles.length === 0) {
      setPhotoStatus("");
      input.setCustomValidity("");
      return;
    }

    setProcessingPhotos(true);
    setPhotoStatus(photoText.processing);

    try {
      const optimizedFiles = await Promise.all(selectedFiles.map(compressPhoto));
      if (selectionId !== photoSelectionRef.current) return;

      const transfer = new DataTransfer();
      optimizedFiles.forEach((file) => transfer.items.add(file));
      input.files = transfer.files;

      const totalSize = optimizedFiles.reduce((total, file) => total + file.size, 0);
      const exceedsLimit = totalSize > maxPhotoBytes;
      input.setCustomValidity(exceedsLimit ? (errorCopy[locale] ?? errorCopy.en!).files : "");
      setPhotoLimitExceeded(exceedsLimit);
      setPhotoStatus(exceedsLimit
        ? (errorCopy[locale] ?? errorCopy.en!).files
        : photoText.ready(optimizedFiles.length, (totalSize / 1024 / 1024).toFixed(1)));
    } catch {
      input.setCustomValidity((errorCopy[locale] ?? errorCopy.en!).files);
      setPhotoLimitExceeded(true);
      setPhotoStatus((errorCopy[locale] ?? errorCopy.en!).files);
    } finally {
      if (selectionId === photoSelectionRef.current) setProcessingPhotos(false);
    }
  }

  return (
    <section id="order" className="scroll-mt-20 bg-[#f5f4f1] py-16 text-[#1d1d1f] sm:py-24">
      <Container className="max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d52b1e]">{dictionary.hero.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{dictionary.order.title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-[#68686d]">{dictionary.order.description}</p>
        </div>

        <div ref={formCardRef} className="relative mt-10 min-h-[26rem] scroll-mt-24 overflow-hidden rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-10">
          <div
            className={`absolute inset-0 grid place-items-center p-5 text-center transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:p-10 ${submitted ? "scale-100 opacity-100 blur-0" : "pointer-events-none scale-[0.98] opacity-0 blur-[2px]"}`}
            aria-hidden={!submitted}
          >
              <div className="max-w-lg">
                <CheckCircle2 className={`mx-auto size-16 text-emerald-600 transition-[transform,opacity] delay-200 duration-500 motion-reduce:transition-none ${submitted ? "scale-100 opacity-100" : "scale-75 opacity-0"}`} aria-hidden="true" />
                <h3 ref={successTitleRef} tabIndex={-1} className="mt-6 text-2xl font-bold outline-none">{copy.successTitle}</h3>
                <p className="mt-3 text-[#68686d]">{copy.successDescription}</p>
                <Button className="mt-7 rounded-full" variant="outline" onClick={() => { setSubmitted(false); setConsent(false); }}>{copy.again}</Button>
              </div>
          </div>

          <div className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${submitted ? "grid-rows-[0fr]" : "grid-rows-[1fr]"}`}>
            <div className="min-h-0 overflow-hidden">
              <form
              onSubmit={submit}
              action={formEndpoint}
              method="POST"
              noValidate={false}
              encType="multipart/form-data"
              inert={submitted}
              aria-hidden={submitted}
              className={`transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${submitted ? "pointer-events-none scale-[0.985] opacity-0 blur-[2px]" : "scale-100 opacity-100 blur-0"}`}
            >
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <input ref={subjectRef} type="hidden" name="_subject" />
              <input ref={summaryRef} type="hidden" name="Короткий опис" />
              <input ref={sourceUrlRef} type="hidden" name="_url" />
              <input type="hidden" name="_next" value={successUrl} />
              <input type="hidden" name="_template" value="table" />
              <div className="flex flex-wrap gap-2" role="group" aria-label={dictionary.navigation.services}>
                {services.map(({ id }) => (
                  <button key={id} type="button" onClick={() => setService(id)} aria-pressed={service === id}
                    className="rounded-full border border-black/10 px-4 py-2.5 text-sm font-semibold transition-colors aria-pressed:border-[#1d1d1f] aria-pressed:bg-[#1d1d1f] aria-pressed:text-white">
                    {id === "electrical" ? electrical.title : dictionary.services.items[id].title}
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

                <ServiceFields service={service} fields={fields} electrical={electrical} />

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
                <Field label={copy.photos} className="sm:col-span-2">
                  <Input name="attachment" type="file" accept="image/*" multiple onChange={preparePhotos} disabled={processingPhotos} className="h-12 rounded-xl bg-[#fafaf8] file:me-3" />
                  <p className="mt-2 text-sm text-[#68686d]">{photoText.hint}</p>
                  {photoStatus ? (
                    <p className={`mt-1 text-sm font-medium ${photoLimitExceeded ? "text-[#b62318]" : "text-emerald-700"}`} role={photoLimitExceeded ? "alert" : "status"}>
                      {photoStatus}
                    </p>
                  ) : null}
                </Field>
                <Field label={fields.comment} className="sm:col-span-2"><Textarea name="details" rows={5} className="min-h-32 rounded-xl bg-[#fafaf8]" /></Field>
              </div>

              <div className="mt-6 flex items-start gap-3">
                <Checkbox id="privacy" checked={consent} onCheckedChange={(value) => setConsent(value === true)} aria-required="true" />
                <label htmlFor="privacy" className="cursor-pointer text-sm leading-relaxed text-[#68686d]">{copy.privacy}</label>
              </div>

              {submitError ? <p className="mt-5 text-sm font-semibold text-[#b62318]" role="alert">{submitError}</p> : null}

              <Button type="submit" size="lg" disabled={!consent || submitting || processingPhotos || photoLimitExceeded} className="mt-7 rounded-full bg-[#d52b1e] px-8 hover:bg-[#b62318]">
                {processingPhotos ? photoText.processing : submitting ? (errorCopy[locale] ?? errorCopy.en!).sending : copy.submit}
              </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return <label className={className}><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#4d4d50]">{label}</span>{children}</label>;
}

async function compressPhoto(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;

  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, maxPhotoDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");

  if (!context) {
    bitmap.close();
    return file;
  }

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
  if (!blob || blob.size >= file.size) return file;

  const filename = file.name.replace(/\.[^.]+$/, "") || "photo";
  return new File([blob], `${filename}.jpg`, { type: "image/jpeg", lastModified: file.lastModified });
}

function ServiceFields({ service, fields, electrical }: { service: OrderType; fields: ReturnType<typeof getOrderFieldCopy>; electrical: ReturnType<typeof getElectricalCopy> }) {
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

  if (service === "electrical") {
    return <>
      <Field label={electrical.workType} className="sm:col-span-2"><Input name="electricalWork" required className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
      <Field label={electrical.quantity}><Input name="fixtureQuantity" inputMode="numeric" className="h-12 rounded-xl bg-[#fafaf8]" /></Field>
      <div className="flex items-end pb-3"><label className="flex cursor-pointer items-center gap-2 text-sm text-[#4d4d50]"><Checkbox name="materialsReady" /><span>{electrical.materialsReady}</span></label></div>
      <p className="sm:col-span-2 text-sm leading-relaxed text-[#68686d]">{electrical.safetyNote}</p>
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
