import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { localizedHref } from "@/config/site";
import { formCopy } from "@/i18n/form-copy";
import { isLocale, locales } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function SubmittedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = formCopy[locale];

  return (
    <section className="grid min-h-[calc(100vh-5rem)] place-items-center bg-[#f5f4f1] py-16 text-[#1d1d1f]">
      <Container className="max-w-5xl">
        <div className="grid min-h-[26rem] place-items-center rounded-3xl border border-black/10 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="max-w-lg animate-in fade-in zoom-in-95 duration-700">
            <CheckCircle2 className="mx-auto size-16 text-emerald-600" aria-hidden="true" />
            <h1 className="mt-6 text-2xl font-bold sm:text-3xl">{copy.successTitle}</h1>
            <p className="mt-3 text-[#68686d]">{copy.successDescription}</p>
            <Button asChild className="mt-7 rounded-full" variant="outline">
              <Link href={localizedHref(locale, "order")}>{copy.again}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
