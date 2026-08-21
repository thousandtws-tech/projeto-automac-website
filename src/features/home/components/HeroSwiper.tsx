"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import dynamic from "next/dynamic";

import type { HeroSlide } from "./Hero";

// Swiper só entra no bundle quando existe mais de um slide.
const HeroCarousel = dynamic(
  () => import("./HeroCarousel").then((mod) => mod.HeroCarousel),
  { ssr: false },
);

interface HeroSwiperProps {
  slides: HeroSlide[];
  locale: string;
}

export function HeroSlideBackground({
  slide,
  priority = false,
}: {
  slide: HeroSlide;
  priority?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={slide.image}
        alt={slide.title ?? ""}
        fill
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        sizes="100vw"
        quality={70}
        className="animate-ken-burns object-cover object-center"
      />
    </div>
  );
}

export function HeroSwiper({ slides, locale }: HeroSwiperProps) {
  const firstSlide = slides[0];

  return (
    <div className="relative h-dvh w-full">
      {slides.length > 1 ? (
        <HeroCarousel slides={slides} />
      ) : (
        firstSlide && <HeroSlideBackground slide={firstSlide} priority />
      )}

      <HeroMetricsDock metrics={firstSlide?.metrics ?? []} locale={locale} />
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
  const dockedRef = useRef(false);

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
      const contentHeight = dockContentRef.current?.offsetHeight ?? 0;
      const stopLine = window.innerHeight - contentHeight;
      const shouldDock = dockRect.top <= stopLine;

      if (dockedRef.current !== shouldDock) {
        dockedRef.current = shouldDock;
        setDocked(shouldDock);
      }

      animationFrameId = null;
    };

    const handleUpdate = () => {
      if (animationFrameId !== null) return;
      animationFrameId = window.requestAnimationFrame(updateDockState);
    };

    updateDockState();
    window.addEventListener("scroll", handleUpdate, { passive: true });
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
    if (!mounted) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = "translate3d(0, 0, 0)";
      }
      return;
    }

    const maxOffset = 26;
    const easing = 0.085;

    let current = 0;
    let target = 0;
    let lastScrollY = window.scrollY;
    let frameId: number | null = null;

    const computeTarget = () => {
      if (dockedRef.current) return 0;

      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      lastScrollY = scrollY;

      const progress = Math.min(1, Math.max(0, scrollY / window.innerHeight));
      const directionBias = delta > 0 ? 1 : 0;

      return Math.min(maxOffset, progress * 16 + directionBias * 10);
    };

    const render = () => {
      const element = parallaxRef.current;
      const next = current + (target - current) * easing;
      const settled = Math.abs(target - next) < 0.05;

      current = settled ? target : next;

      if (element) {
        element.style.transform = `translate3d(0, ${current}px, 0)`;
      }

      frameId = settled ? null : window.requestAnimationFrame(render);
    };

    const start = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(render);
    };

    const handleScroll = () => {
      target = computeTarget();
      start();
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    const settleTimer = window.setInterval(() => {
      const idle = dockedRef.current ? 0 : Math.min(
        maxOffset,
        Math.min(1, Math.max(0, window.scrollY / window.innerHeight)) * 16,
      );

      if (Math.abs(idle - target) > 0.5) {
        target = idle;
        start();
      }
    }, 160);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.clearInterval(settleTimer);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [mounted]);

  useEffect(() => {
    const element = parallaxRef.current;
    if (!docked || !element) return;
    element.style.transform = "translate3d(0, 0, 0)";
  }, [docked]);

  if (!mounted) {
    return null;
  }

  const portalTarget =
    docked && dockElement ? dockElement : document.body;

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

          <div className="relative z-10 w-full px-4 py-4 sm:px-8 sm:py-6 lg:px-12">
              <h2 className="animate-metrics-title text-center text-[23px] font-light leading-tight tracking-tight text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.35),0_0_8px_rgba(0,0,0,0.18)] sm:text-2xl md:text-3xl lg:text-4xl">
                <span className="block sm:inline">Excelência em</span>{" "}
                <span className="block sm:inline">Cada Projeto</span>
              </h2>

            {metrics.length > 0 && (
              <div className="mx-auto mt-4 grid max-w-7xl grid-cols-2 gap-3 border-t border-white/15 pt-4 sm:mt-6 sm:gap-4 sm:pt-6 md:grid-cols-4">
                {metrics.map((metric) => (
                  <div
                    key={`${locale}-${metric.label}`}
                    className="text-center"
                  >
                    <strong className="block text-xl font-semibold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.85)] sm:text-2xl md:text-3xl">
                      {metric.value}
                    </strong>

                    <span className="mt-0.5 block text-[10px] uppercase tracking-widest text-white/75 [text-shadow:0_1px_5px_rgba(0,0,0,0.9)] sm:mt-1 sm:text-xs">
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
