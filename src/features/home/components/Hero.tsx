import { Dictionary } from "@/src/i18n/dictionaries";
import { type Locale, withLocale } from "@/src/i18n/config";
import { HeroSwiper, type HeroSlide } from "./HeroSwiper";

interface HeroProps {
  locale: Locale;
  dictionary: Dictionary;
}

export function Hero({ locale, dictionary }: HeroProps) {
  const t = dictionary.hero;

  const slides: HeroSlide[] = [
    {
      id: "slide-1",
      image: "https://placehold.net/8-600x800.png",
      title: t.heading,
      subtitle: t.subheading,
      ctaText: t.ctaPrimary,
      ctaHref: withLocale(locale, "/contato"),
    },

  ];

  return <HeroSwiper slides={slides} watermarkText="AUTOMEC" />;
}
