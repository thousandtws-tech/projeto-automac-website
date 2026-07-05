export const locales = ["pt-BR", "en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt-BR";

export const localeLabels: Record<Locale, { label: string; flag: string; htmlLang: string }> = {
  "pt-BR": { label: "Português", flag: "PT", htmlLang: "pt-BR" },
  en: { label: "English", flag: "EN", htmlLang: "en" },
  es: { label: "Español", flag: "ES", htmlLang: "es" },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function withLocale(locale: Locale, href: string) {
  if (href === "#" || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }

  const normalizedHref = href.startsWith("/") ? href : `/${href}`;
  return `/${locale}${normalizedHref === "/" ? "" : normalizedHref}`;
}
