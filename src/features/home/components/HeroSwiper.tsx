"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import type { HeroSlide } from "./Hero";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface HeroSwiperProps {
  slides: HeroSlide[];
  locale: string;
}

export function HeroSwiper({
  slides,
  locale,
}: HeroSwiperProps) {
  return (
    <div className="relative h-dvh w-full">
      <Swiper
        speed={800}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
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
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full overflow-hidden">
              <div
                className="absolute inset-0 animate-ken-burns bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

              <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-6 sm:px-8 lg:px-12">
                <div className="max-w-2xl">
                  <h1 className="mb-6 text-4xl font-medium uppercase leading-[0.9] tracking-tighter text-white sm:text-5xl lg:text-6xl">
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

      <HeroMetricsDock
        metrics={slides[0]?.metrics ?? []}
        locale={locale}
      />
    </div>
  );
}

type HeroMetricsDockProps = {
  metrics: readonly {
    value: string;
    label: string;
  }[];
  locale: string;
};

export function HeroMetricsDock({
  metrics,
  locale,
}: HeroMetricsDockProps) {
  const [mounted, setMounted] = useState(false);
  const [docked, setDocked] = useState(false);
  const [dockElement, setDockElement] =
    useState<HTMLElement | null>(null);

  const parallaxRef = useRef<HTMLDivElement>(null);
  const dockContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = document.getElementById("home-metrics-dock");

    setDockElement(element);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!dockElement) return;

    let animationFrameId: number | null = null;

    const updateDockState = () => {
      const dockRect = dockElement.getBoundingClientRect();

      const contentHeight =
        dockContentRef.current?.offsetHeight ?? 0;

      const stopLine = window.innerHeight - contentHeight;
      const shouldDock = dockRect.top <= stopLine;

      setDocked((current) =>
        current === shouldDock ? current : shouldDock,
      );

      animationFrameId = null;
    };

    const handleUpdate = () => {
      if (animationFrameId !== null) return;

      animationFrameId =
        window.requestAnimationFrame(updateDockState);
    };

    updateDockState();

    window.addEventListener("scroll", handleUpdate, {
      passive: true,
    });

    window.addEventListener("resize", handleUpdate);

    return () => {
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [dockElement]);

  useEffect(() => {
    if (!mounted || docked) return;

    let animationFrameId: number | null = null;

    const updateParallax = () => {
      const element = parallaxRef.current;

      if (!element) {
        animationFrameId = null;
        return;
      }

      const progress = Math.min(
        1,
        window.scrollY / window.innerHeight,
      );

      const offset = progress * 12;

      element.style.transform =
        `translate3d(0, ${offset}px, 0)`;

      animationFrameId = null;
    };

    const handleScroll = () => {
      if (animationFrameId !== null) return;

      animationFrameId =
        window.requestAnimationFrame(updateParallax);
    };

    updateParallax();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mounted, docked]);

  useEffect(() => {
    if (!docked || !parallaxRef.current) return;

    parallaxRef.current.style.transform =
      "translate3d(0, 0, 0)";
  }, [docked]);

  if (!mounted) {
    return null;
  }

  const portalTarget =
    docked && dockElement
      ? dockElement
      : document.body;

  return createPortal(
    <div
      ref={dockContentRef}
      className={[
        "inset-x-0 z-[45] w-full",
        docked
          ? "absolute bottom-0"
          : "fixed bottom-0",
      ].join(" ")}
    >
      <div
        ref={parallaxRef}
        className="w-full transform-gpu will-change-transform"
      >
        <div className="relative w-full overflow-hidden border-y  border-white/10 shadow-2xl shadow-black/20">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient from-black/70 via-neutral-900/55 to-amber-950/35 "
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-neutral-950/25 backdrop-blur-xl"
          />

          <div className="relative z-10 w-full px-6 py-6 sm:px-8 lg:px-12">
            <div className="mx-auto w-fit overflow-hidden">
              <h2 className="animate-metrics-title text-center text-3xl font-semibold tracking-tight text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.25)] sm:text-4xl">
                Excelência em Cada Projeto
              </h2>
            </div>

            {metrics.length > 0 && (
              <div className="mx-auto mt-6 grid max-w-7xl grid-cols-2 gap-4 border-t border-white/15 pt-6 md:grid-cols-4">
                {metrics.map((metric) => (
                  <div
                    key={`${locale}-${metric.label}`}
                    className="text-center"
                  >
                    <strong className="block text-2xl font-semibold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.85)] md:text-3xl">
                      {metric.value}
                    </strong>

                    <span className="mt-1 block text-xs uppercase tracking-widest text-white/75 [text-shadow:0_1px_5px_rgba(0,0,0,0.9)]">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    portalTarget,
  );
}