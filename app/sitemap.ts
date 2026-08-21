import type { MetadataRoute } from "next";

import { locales } from "@/src/i18n/config";
import { localeAlternates, siteUrl } from "@shared/seo/site";

const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/produtos", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/acessorios", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/sobre", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/clientes", priority: 0.6, changeFrequency: "monthly" as const },
  {
    path: "/assistencia-tecnica",
    priority: 0.7,
    changeFrequency: "monthly" as const,
  },
  { path: "/contato", priority: 0.8, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: localeAlternates(route.path),
      },
    })),
  );
}
