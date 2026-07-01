import "server-only";

import { Locale } from "./config";

const dictionaries = {
  "pt-BR": () => import("./locales/pt-BR").then((module) => module.dictionary),
  en: () => import("./locales/en").then((module) => module.dictionary),
  es: () => import("./locales/es").then((module) => module.dictionary),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
