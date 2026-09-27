import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getContactCopy } from "@/i18n/contact-copy";
import { Container } from "@/components/shared/container";

export function ContactSection({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const copy = getContactCopy(locale);
  const details = [
    { icon: Phone, label: copy.phone, value: siteConfig.phone, href: siteConfig.phoneUrl },
    { icon: Mail, label: copy.email, value: siteConfig.email, href: siteConfig.emailUrl },
    { icon: MapPin, label: copy.area, value: copy.areaValue },
    { icon: Clock3, label: copy.hours, value: copy.hoursValue },
  ];

  return (
    <section id="contacts" className="scroll-mt-20 bg-[#1d1d1f] py-16 text-white sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">{dictionary.navigation.contacts}</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/65 sm:text-lg">{copy.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={siteConfig.phoneUrl} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#d52b1e] px-6 text-sm font-bold transition hover:bg-[#eb392b]"><Phone className="size-4" />{copy.call}</a>
              <a href={siteConfig.whatsappUrl} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 px-6 text-sm font-bold transition hover:border-white/40 hover:bg-white/10"><MessageCircle className="size-4" />{copy.message}</a>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {details.map(({ icon: Icon, label, value, href }) => {
              const body = <><span className="grid size-10 place-items-center rounded-xl bg-white/10"><Icon className="size-5" /></span><span><span className="block text-xs font-bold uppercase tracking-wider text-white/45">{label}</span><strong className="mt-1 block text-base">{value}</strong></span></>;
              return href ? <a key={label} href={href} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/25 hover:bg-white/10">{body}</a> : <div key={label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">{body}</div>;
            })}
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-5 text-xs text-white/40">{copy.demo}</p>
      </Container>
    </section>
  );
}
