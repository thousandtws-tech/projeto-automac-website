"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface Gallery4Item {
  id: string;
  title: string;
  category: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  viewDetails?: string;
  items: Gallery4Item[];
}

const data: Gallery4Item[] = [
  {
    id: "k-200r",
    category: "Porta Automática Deslizante",
    title: "K-200R®",
    description: "Porta deslizante de alta performance e fluxo contínuo.",
    href: "#",
    image: "/produtos/K-200R®.png",
  },
  {
    id: "k-500r",
    category: "Porta Automática Deslizante",
    title: "K-500R®",
    description: "Porta deslizante para alto fluxo e cargas pesadas.",
    href: "#",
    image: "/produtos/K-500R®.png",
  },
  {
    id: "sts-20",
    category: "Porta Automática Antipânico",
    title: "STS-20®",
    description: "Sistema antipânico com abertura integral das folhas.",
    href: "#",
    image: "/produtos/STS-20®.png",
  },
  {
    id: "sth-70",
    category: "Porta Automática Ambientes Controlados",
    title: "STH-70®",
    description: "Porta hermética especial para ambientes cirúrgicos e laboratoriais.",
    href: "#",
    image: "/produtos/STH-70®.png",
  },
  {
    id: "stc-40",
    category: "Porta Automática Telescópica",
    title: "STC-40®",
    description: "Abertura telescópica para vãos com espaço reduzido.",
    href: "#",
    image: "/produtos/STC-40®.png",
  },
  {
    id: "b120-b300",
    category: "Porta Automática Deslizante",
    title: "B-120T® / B-300T®",
    description: "Mecanismo deslizante clássico de alta durabilidade.",
    href: "#",
    image: "/produtos/B-120T®  B-300T®.png",
  },
];

const Gallery4 = ({
  title = "Modelos de Portas",
  description = "Conheça nossa gama completa de portas automáticas, desenvolvidas com tecnologia de ponta para atender aos mais diversos segmentos e necessidades arquitetônicas.",
  viewDetails = "Saiba Mais",
  items = data,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!carouselApi || isPaused) return;

    const interval = setInterval(() => {
      const totalSlides = items.length;
      const current = carouselApi.selectedScrollSnap();
      if (current >= totalSlides - 1) {
        carouselApi.scrollTo(0);
      } else {
        carouselApi.scrollNext();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [carouselApi, isPaused, items.length]);

  return (
    <section
      className="border-b border-black py-24 md:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-col items-center text-center gap-6 md:mb-14 lg:mb-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-5xl font-black tracking-tighter text-slate-900 sm:text-6xl lg:text-7xl">
              {title}
            </h2>
            <p className="max-w-2xl text-slate-500 font-medium text-lg md:text-xl">{description}</p>
          </div>
        </div>
      </div>
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            loop: true,
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <a
                  href={item.href}
                  className={cn(
                    "relative flex flex-col h-full overflow-hidden border border-black bg-white p-2 transition-all duration-300 hover:border-brand-red-500 group"
                  )}
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-white border border-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col p-6">
                    <div className="mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-red-500">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tighter text-slate-900 transition-colors duration-300 group-hover:text-brand-red-600 mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-medium">
                      {item.description}
                    </p>

                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-red-500 opacity-0 transition-all duration-300 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0">
                        {viewDetails}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center border border-black bg-white text-slate-900 transition-all duration-300 group-hover:bg-slate-950 group-hover:text-white">
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery4 };
