import { Dictionary } from "@/src/i18n/dictionaries";
import { type Locale, withLocale } from "@/src/i18n/config";
import { HeroSwiper } from "@features/home/components/HeroSwiper";

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  ctaSecondaryText: string;
  ctaSecondaryHref: string;
  metrics: readonly { value: string; label: string }[];
}

interface HeroProps {
  locale: Locale;
  dictionary: Dictionary;
}

export function Hero({ locale, dictionary }: HeroProps) {
  const t = dictionary.hero;

  const slides: HeroSlide[] = [
    {
      id: "slide-1",
      image: "/hero-bg.png",
      title: t.heading,
      subtitle: t.subheading,
      ctaText: t.ctaPrimary,
      ctaHref: withLocale(locale, "/contato"),
      ctaSecondaryText: t.ctaSecondary,
      ctaSecondaryHref: withLocale(locale, "/sobre"),
      metrics: [],
    },

  ];

  return <HeroSwiper slides={slides} locale={locale} />;
}
