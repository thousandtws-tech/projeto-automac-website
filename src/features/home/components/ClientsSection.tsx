"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!startOnView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, startOnView]);

  return { count, ref };
}

export function ClientsSection() {
  const { count, ref } = useCountUp(30000, 2500);

  const row1 = Array.from({ length: 15 }, (_, i) => ({
    id: `logo-a-${i}`,
    url: `https://placehold.net/120x60.png?text=Logo+${i + 1}`,
  }));

  const row2 = Array.from({ length: 15 }, (_, i) => ({
    id: `logo-b-${i}`,
    url: `https://placehold.net/120x60.png?text=Logo+${i + 16}`,
  }));

  const formatNumber = (num: number) =>
    num.toLocaleString("pt-BR");

  return (
    <section className="border-b border-black bg-neutral-50 py-20 md:py-28">

      <div className="container mx-auto px-6 sm:px-8 lg:px-12">

        <div ref={ref} className="max-w-4xl mx-auto text-center mb-14">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red-500 mb-3 block">
            CLIENTES ATENDIDOS
          </span>
          <h3 className="text-6xl sm:text-8xl lg:text-9xl font-black text-brand-red-500 leading-none tracking-tighter">
            + de {formatNumber(count)}
          </h3>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-black mt-3 leading-tight tracking-tight max-w-2xl mx-auto">
            portas em todo território nacional.
          </p>
        </div>

        <div className="w-full overflow-hidden flex flex-col gap-5 py-4">

          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <div className="animate-marquee gap-5 flex">
              {row1.map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="flex shrink-0 items-center justify-center p-3 bg-white border border-black w-36 h-18"
                >
                  <img
                    src={logo.url}
                    alt="Cliente Automec"
                    className="max-h-full max-w-full object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
              {row1.map((logo, index) => (
                <div
                  key={`${logo.id}-dup-${index}`}
                  className="flex shrink-0 items-center justify-center p-3 bg-white border border-black w-36 h-18"
                >
                  <img
                    src={logo.url}
                    alt="Cliente Automec"
                    className="max-h-full max-w-full object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <div className="animate-marquee-reverse gap-5 flex">
              {row2.map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="flex shrink-0 items-center justify-center p-3 bg-white border border-black w-36 h-18"
                >
                  <img
                    src={logo.url}
                    alt="Cliente Automec"
                    className="max-h-full max-w-full object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
              {row2.map((logo, index) => (
                <div
                  key={`${logo.id}-dup-${index}`}
                  className="flex shrink-0 items-center justify-center p-3 bg-white border border-black w-36 h-18"
                >
                  <img
                    src={logo.url}
                    alt="Cliente Automec"
                    className="max-h-full max-w-full object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
