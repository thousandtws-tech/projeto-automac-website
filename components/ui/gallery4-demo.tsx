import { Gallery4, type Gallery4Props } from "@/components/ui/gallery4";
import { Locale, withLocale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/dictionaries";

function Gallery4Demo({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const gallery = dictionary.home.gallery;

  const demoData: Gallery4Props = {
    title: gallery.title,
    description: gallery.description,
    viewDetails: gallery.viewDetails,
    items: [
      {
        id: "k-200r",
        category: gallery.categories.sliding,
        title: gallery.items[0].title,
        description: gallery.items[0].description,
        href: withLocale(locale, "/produtos/k-200r"),
        image: "/produtos/k-200r.png",
      },
      {
        id: "k-500r",
        category: gallery.categories.sliding,
        title: gallery.items[1].title,
        description: gallery.items[1].description,
        href: withLocale(locale, "/produtos/k-500r"),
        image: "/produtos/k-500r.png",
      },
      {
        id: "sts-20",
        category: gallery.categories.antipanic,
        title: gallery.items[2].title,
        acronymMeaning: locale === "pt-BR" ? "Sistema de Tração Simultâneo" : locale === "es" ? "Sistema de Tracción Simultánea" : "Simultaneous Traction System",
        description: gallery.items[2].description,
        href: withLocale(locale, "/produtos/sts-20"),
        image: "/produtos/sts-20.png",
      },
      {
        id: "sth-70",
        category: gallery.categories.controlled,
        title: gallery.items[3].title,
        acronymMeaning: locale === "pt-BR" ? "Sistema de Tração Hermética" : locale === "es" ? "Sistema de Tracción Hermética" : "Hermetic Traction System",
        description: gallery.items[3].description,
        href: withLocale(locale, "/produtos/sth-70"),
        image: "/produtos/sth-70.png",
      },
      {
        id: "stc-40",
        category: gallery.categories.telescopic,
        title: gallery.items[4].title,
        acronymMeaning: locale === "pt-BR" ? "Sistema de Tração Telescópica" : locale === "es" ? "Sistema de Tracción Telescópica" : "Telescopic Traction System",
        description: gallery.items[4].description,
        href: withLocale(locale, "/produtos/stc-40"),
        image: "/produtos/stc-40.png",
      },
      {
        id: "b120-b300",
        category: gallery.categories.swing,
        title: gallery.items[5].title,
        description: gallery.items[5].description,
        href: withLocale(locale, "/produtos/b-120t-b-300t"),
        image: "/produtos/b-120t-b-300t.png",
      },
    ],
  };

  return <Gallery4 {...demoData} />;
}

export { Gallery4Demo };
