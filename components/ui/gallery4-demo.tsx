import { Gallery4, type Gallery4Props } from "@/components/ui/gallery4";
import { Locale, withLocale } from "@/src/i18n/config";

function Gallery4Demo({ dictionary, locale }: { dictionary: any; locale: Locale }) {
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
        image: "/produtos/K-200R®.png",
      },
      {
        id: "k-500r",
        category: gallery.categories.sliding,
        title: gallery.items[1].title,
        description: gallery.items[1].description,
        href: withLocale(locale, "/produtos/k-500r"),
        image: "/produtos/K-500R®.png",
      },
      {
        id: "sts-20",
        category: gallery.categories.antipanic,
        title: gallery.items[2].title,
        description: gallery.items[2].description,
        href: withLocale(locale, "/produtos/sts-20"),
        image: "/produtos/STS-20®.png",
      },
      {
        id: "sth-70",
        category: gallery.categories.controlled,
        title: gallery.items[3].title,
        description: gallery.items[3].description,
        href: withLocale(locale, "/produtos/sth-70"),
        image: "/produtos/STH-70®.png",
      },
      {
        id: "stc-40",
        category: gallery.categories.telescopic,
        title: gallery.items[4].title,
        description: gallery.items[4].description,
        href: withLocale(locale, "/produtos/stc-40"),
        image: "/produtos/STC-40®.png",
      },
      {
        id: "b120-b300",
        category: gallery.categories.sliding,
        title: gallery.items[5].title,
        description: gallery.items[5].description,
        href: withLocale(locale, "/produtos/b-120t-b-300t"),
        image: "/produtos/B-120T®  B-300T®.png",
      },
    ],
  };

  return <Gallery4 {...demoData} />;
}

export { Gallery4Demo };
