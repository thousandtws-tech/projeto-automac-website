"use client";

import { useEffect, useRef, useState } from "react";

interface LazyMapProps {
  src: string;
  title: string;
  className?: string;
}

export function LazyMap({ src, title, className }: LazyMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={containerRef} className={className}>
      {visible ? (
        <iframe
          title={title}
          src={src}
          className="h-full w-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className="h-full w-full animate-pulse bg-neutral-100" />
      )}
    </div>
  );
}
