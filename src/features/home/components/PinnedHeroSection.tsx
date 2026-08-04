"use client";

import React from "react";
import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/dictionaries";
import { HeroSlide } from "./Hero";
import { HeroSwiper } from "./HeroSwiper";

interface PinnedHeroSectionProps {
  locale: Locale;
  dictionary: Dictionary;
}

export function PinnedHeroSection({ locale, dictionary }: PinnedHeroSectionProps) {
  const t = dictionary.hero;

  const slides: HeroSlide[] = [
    {
      id: "slide-1",
      image: "/hero-bg.png",
      title: t.heading,
      subtitle: t.subheading,
      ctaText: t.ctaPrimary,
      ctaHref: `/${locale}/contato`,
      ctaSecondaryText: t.ctaSecondary,
      ctaSecondaryHref: `/${locale}/sobre`,
      metrics: [],
    },
  ];
  
  return (
    <div className="sticky top-0 z-0 h-dvh overflow-hidden">
      <HeroSwiper slides={slides} locale={locale} />
    </div>
  );
}
