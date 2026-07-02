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

const clientLogos = [
  { id: "accor", src: "/clientes/accor.svg", alt: "Accor" },
  { id: "bosch", src: "/clientes/bosch.svg", alt: "Bosch" },
  { id: "carrefour", src: "/clientes/carrefour.svg", alt: "Carrefour" },
  { id: "colinas", src: "/clientes/Colinas  Shopping (1).svg", alt: "Colinas Shopping" },
  { id: "droga-raia", src: "/clientes/droga-raia.svg", alt: "Droga Raia" },
  { id: "drogasil", src: "/clientes/drogasil.svg", alt: "Drogasil" },
  { id: "ems", src: "/clientes/EMS.svg", alt: "EMS" },
  { id: "graal", src: "/clientes/graal.svg", alt: "Graal" },
  { id: "sirioli", src: "/clientes/hospital sirioli banes.svg", alt: "Hospital Sirioli" },
  { id: "lilly", src: "/clientes/Lilly.svg", alt: "Lilly" },
  { id: "odebrecht", src: "/clientes/odebrecht.svg", alt: "Odebrecht" },
  { id: "patio-ciane", src: "/clientes/Pátio Cianê.svg", alt: "Pátio Cianê" },
  { id: "rio-galeao", src: "/clientes/Rio Galeão.svg", alt: "Rio Galeão" },
  { id: "royal-palm", src: "/clientes/royal palm plaza.svg", alt: "Royal Palm Plaza" },
  { id: "saint-gobain", src: "/clientes/saint gobain.svg", alt: "Saint Gobain" },
  { id: "market-place", src: "/clientes/Shopping Market Place.svg", alt: "Shopping Market Place" },
  { id: "smart-fit", src: "/clientes/Smart Fit.svg", alt: "Smart Fit" },
  { id: "tetra-pak", src: "/clientes/tetra-pak.svg", alt: "Tetra Pak" },
  { id: "royal-palm-v2", src: "/clientes/The Royal Palm Plaza - V2.svg", alt: "The Royal Palm Plaza" },
  { id: "viracopos", src: "/clientes/Viracopos.svg", alt: "Viracopos" },
];

export function ClientsSection() {
  const { count, ref } = useCountUp(30000, 2500);

  const row1 = clientLogos.slice(0, 10);
  const row2 = clientLogos.slice(10, 20);

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
              {[...row1, ...row1].map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="flex shrink-0 items-center justify-center p-3 bg-white border border-black w-36 h-18"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-full object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <div className="animate-marquee-reverse gap-5 flex">
              {[...row2, ...row2].map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="flex shrink-0 items-center justify-center p-3 bg-white border border-black w-36 h-18"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
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
