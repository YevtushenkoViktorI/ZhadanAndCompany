import type { Locale } from "./config";

export type Dictionary = typeof import("./messages/uk.json");

const dictionaries = {
  uk: () => import("./messages/uk.json").then((module) => module.default),
  en: () => import("./messages/en.json").then((module) => module.default),
  de: () => import("./messages/de.json").then((module) => module.default),
  fr: () => import("./messages/fr.json").then((module) => module.default),
  it: () => import("./messages/it.json").then((module) => module.default),
  et: () => import("./messages/et.json").then((module) => module.default),
  pl: () => import("./messages/pl.json").then((module) => module.default),
  lt: () => import("./messages/lt.json").then((module) => module.default),
  lv: () => import("./messages/lv.json").then((module) => module.default),
  cs: () => import("./messages/cs.json").then((module) => module.default),
  es: () => import("./messages/es.json").then((module) => module.default),
  tr: () => import("./messages/tr.json").then((module) => module.default),
  ar: () => import("./messages/ar.json").then((module) => module.default),
  "nl-BE": () => import("./messages/nl-BE.json").then((module) => module.default),
  sk: () => import("./messages/sk.json").then((module) => module.default),
  hu: () => import("./messages/hu.json").then((module) => module.default),
  ro: () => import("./messages/ro.json").then((module) => module.default),
  sr: () => import("./messages/sr.json").then((module) => module.default),
  bg: () => import("./messages/bg.json").then((module) => module.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
