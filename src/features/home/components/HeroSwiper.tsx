"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, EffectFade, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

interface HeroSwiperProps {
  slides: HeroSlide[];
  watermarkText: string;
}

export function HeroSwiper({ slides, watermarkText }: HeroSwiperProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  return (
      <section className="relative h-196 w-full overflow-hidden">
        <Swiper
            modules={[Navigation, Thumbs, EffectFade, Autoplay]}
            effect="fade"
            speed={1000}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            navigation={{
              prevEl: ".hero-prev-btn",
              nextEl: ".hero-next-btn",
            }}
            thumbs={{
              swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            onSlideChange={handleSlideChange}
            className="h-full w-full"
        >
          {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative h-full w-full">
                  <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority
                      quality={90}
                      sizes="100vw"
                      className="object-cover object-center scale-[1.02]"
                  />

                  <div className="absolute inset-0 bg-black/20" />

                  <div
                      className="absolute inset-0"
                      style={{
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8) 100%)",
                      }}
                  />
                </div>
              </SwiperSlide>
          ))}

          {/* WATERMARK */}
          <div className="pointer-events-none absolute left-0 top-[25%] z-10 w-full select-none text-center lg:top-1/3 lg:-translate-y-1/2">
          <span className="font-display text-[15vw] font-bold leading-none tracking-tighter text-white opacity-[0.08] mix-blend-overlay md:text-[18vw]">
            {watermarkText}
          </span>
          </div>

          {/* CONTENT */}
          <div className="absolute bottom-0 z-20 flex w-full flex-col justify-between gap-8 px-6 pb-12 pt-8 sm:px-10 md:flex-row md:items-end md:px-16 lg:px-20 xl:px-24">
            <div className="flex max-w-2xl flex-col items-start gap-4">
              <h1 className="text-4xl font-bold leading-none tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {slides[activeIndex]?.title}
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
                {slides[activeIndex]?.subtitle}
              </p>

              <Link
                  href={slides[activeIndex]?.ctaHref || "#"}
                  className="group inline-flex items-center gap-3 bg-brand-red-500 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-red-600"
              >
                {slides[activeIndex]?.ctaText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* NAV + THUMBS */}
            <div className="flex shrink-0 items-center gap-4 border border-white/20 bg-white/5 p-2">
              <button className="hero-prev-btn flex h-10 w-10 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/30">
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="w-40 overflow-hidden sm:w-56">
                <Swiper
                    modules={[Thumbs]}
                    onSwiper={setThumbsSwiper}
                    watchSlidesProgress
                    slidesPerView={3}
                    spaceBetween={8}
                    className="h-10 w-full sm:h-12"
                >
                  {slides.map((slide) => (
                      <SwiperSlide
                          key={`thumb-${slide.id}`}
                          className="cursor-pointer overflow-hidden border-2 border-transparent opacity-40 transition-all duration-300 [&.swiper-slide-thumb-active]:border-white [&.swiper-slide-thumb-active]:opacity-100"
                      >
                        <div className="relative h-full w-full">
                          <Image
                              src={slide.image}
                              alt={slide.title}
                              fill
                              quality={100}
                              className="object-cover"
                              sizes="100px"
                          />
                        </div>
                      </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <button className="hero-next-btn flex h-10 w-10 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/30">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Swiper>
      </section>
  );
}