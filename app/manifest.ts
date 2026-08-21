import type { MetadataRoute } from "next";

import { siteName } from "@shared/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "Automec",
    description:
      "Portas automáticas com tecnologia avançada, segurança e atendimento técnico em todo o Brasil.",
    start_url: "/pt-BR",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#c41a20",
    orientation: "portrait-primary",
    lang: "pt-BR",
    categories: ["business", "productivity"],
    icons: [
      {
        src: "/logo-png/Artboard-1.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
