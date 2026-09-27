export const siteConfig = {
  name: "Umzughilfe",
  shortName: "U",
  region: "Switzerland",
  whatsappUrl: "https://wa.me/41000000000",
  phone: "+41 79 000 00 00",
  phoneUrl: "tel:+41790000000",
  email: "hello@example.ch",
  emailUrl: "mailto:hello@example.ch",
} as const;

export const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function localizedHref(locale: string, hash?: string) {
  return `${publicBasePath}/${locale}${hash ? `#${hash}` : ""}`;
}
