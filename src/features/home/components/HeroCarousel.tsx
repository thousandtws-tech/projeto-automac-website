"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import type { HeroSlide } from "./Hero";
import { HeroSlideBackground } from "./HeroSwiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  return (
    <Swiper
      speed={800}
      loop
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      modules={[Autoplay, Pagination, Navigation]}
      className="h-full w-full"
      style={
        {
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#dc2626",
          "--swiper-pagination-bullet-inactive-color": "#fff",
          "--swiper-pagination-bullet-inactive-opacity": "0.4",
          "--swiper-navigation-size": "28px",
        } as React.CSSProperties
      }
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={slide.id}>
          <HeroSlideBackground slide={slide} priority={index === 0} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
