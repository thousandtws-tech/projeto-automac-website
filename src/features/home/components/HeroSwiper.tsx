"use client"

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
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
    <div className="relative h-dvh w-full">
      <Swiper
        speed={800}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full w-full"
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
            <div className="relative h-full w-full overflow-hidden">
              <div
                className="absolute inset-0 animate-ken-burns bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-6 sm:px-8 lg:px-12">
                <div className="max-w-2xl">
                  <h1 className="mb-6 text-4xl font-medium  uppercase prelin leading-[0.9] tracking-tighter text-white sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mb-8 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <HeroMetricsDock metrics={slides[0]?.metrics ?? []} locale={locale} />
    </div>
  );
}

const subscribe = () => () => undefined;

function HeroMetricsDock({
  metrics,
  locale,
}: {
  metrics: readonly { value: string; label: string }[];
  locale: string;
}) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    const dock = document.getElementById("home-metrics-dock");
    if (!dock) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setDocked(entry.isIntersecting || entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );

    observer.observe(dock);
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  const dock = document.getElementById("home-metrics-dock");
  const portalTarget = docked && dock ? dock : document.body;

  return createPortal(
    <div
      className={`inset-x-0 bottom-0 z-[45] border-t border-white/10 bg-neutral-900/95 ${
        docked
          ? "animate-metrics-dock relative h-full w-full"
          : "animate-metrics-undock fixed"
      }`}
    >
      <div className="container mx-auto h-full px-6 sm:px-8 lg:px-12">
        <div className="grid h-full grid-cols-2 content-center gap-4 py-4 md:grid-cols-4 md:gap-6 md:py-6">
          {metrics.map((metric) => (
            <MetricCounter
              key={`${metric.value}-${metric.label}`}
              value={metric.value}
              label={metric.label}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </div>,
    portalTarget,
  );
}
