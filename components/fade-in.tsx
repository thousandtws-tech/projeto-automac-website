"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const delayMs = Math.round(delay * 1000);
    const durationMs = Math.round(duration * 1000);

    el.style.opacity = "0";
    el.style.transition = `opacity ${durationMs}ms ease ${delayMs}ms, transform ${durationMs}ms ease ${delayMs}ms`;

    if (direction === "up") el.style.transform = "translateY(24px)";
    else if (direction === "down") el.style.transform = "translateY(-24px)";
    else if (direction === "left") el.style.transform = "translateX(24px)";
    else if (direction === "right") el.style.transform = "translateX(-24px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            el.style.opacity = "1";
            el.style.transform = "translate(0,0)";
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [delay, direction, duration]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
