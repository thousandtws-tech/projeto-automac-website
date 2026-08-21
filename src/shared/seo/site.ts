import { locales, type Locale } from "@/src/i18n/config";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.automec.com.br";

export const siteName = "Automec Portas Automáticas";

export const ogLocales: Record<Locale, string> = {
  "pt-BR": "pt_BR",
  en: "en_US",
  es: "es_ES",
};

export function localeAlternates(path = "") {
  const normalized = path && !path.startsWith("/") ? `/${path}` : path;

  return locales.reduce<Record<string, string>>((languages, locale) => {
    languages[locale] = `${siteUrl}/${locale}${normalized}`;
    return languages;
  }, {});
}
