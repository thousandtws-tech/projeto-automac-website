"use client"

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useCountUp } from '@shared/hooks/useCountUp';
import type { HeroSlide } from './Hero';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface HeroSwiperProps {
  slides: HeroSlide[];
  locale: string;
}

function parseMetric(value: string): { num: number; suffix: string } {
  const match = value.match(/^([\d.,]+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  const raw = match[1].replace(/\./g, '').replace(/,/g, '');
  return { num: parseInt(raw, 10) || 0, suffix: match[2] };
}

function MetricCounter({ value, label, locale }: { value: string; label: string; locale: string }) {
  const { num, suffix } = parseMetric(value);
  const { displayValue, ref } = useCountUp(num, 2000, { suffix, startOnView: true, locale });
  return (
    <div ref={ref} className="text-center">
      <span className="block text-2xl sm:text-3xl font-black text-white tracking-tighter">{displayValue}</span>
      <span className="block text-xs uppercase tracking-widest text-white/60 mt-1 leading-relaxed">{label}</span>
    </div>
  );
}

export function HeroSwiper({ slides, locale }: HeroSwiperProps) {

  return (
    <Swiper
      speed={800}
      loop={true}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="w-full h-dvh"
      style={{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#dc2626',
        '--swiper-pagination-bullet-inactive-color': '#fff',
        '--swiper-pagination-bullet-inactive-opacity': '0.4',
        '--swiper-navigation-size': '28px',
      } as React.CSSProperties}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative w-full h-full overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-ken-burns"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex flex-col justify-center h-full container mx-auto px-6 sm:px-8 lg:px-12">
              <div className="max-w-2xl">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-[0.9] mb-6">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed mb-8">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={slide.ctaHref}
                    className="inline-flex items-center gap-2 rounded-md bg-brand-red-500 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-brand-red-600 hover:scale-105"
                  >
                    {slide.ctaText}
                  </Link>
                  <Link
                    href={slide.ctaSecondaryHref}
                    className="inline-flex items-center gap-2 rounded-md border-2 border-white/30 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:border-white hover:bg-white/10"
                  >
                    {slide.ctaSecondaryText}
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/40 backdrop-blur-sm">
              <div className="container mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
                  {slide.metrics.map((metric, idx) => (
                    <MetricCounter key={idx} value={metric.value} label={metric.label} locale={locale} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
