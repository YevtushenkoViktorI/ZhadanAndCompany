export const siteConfig = {
  name: "Назва компанії",
  shortName: "NC",
  region: "Bern · Switzerland",
  whatsappUrl: "https://wa.me/41000000000",
} as const;

export const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function localizedHref(locale: string, hash?: string) {
  return `${publicBasePath}/${locale}${hash ? `#${hash}` : ""}`;
}
