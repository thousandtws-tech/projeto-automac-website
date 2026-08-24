"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { FormattedTrademark } from "@/src/shared/components/FormattedTrademark";

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
  acronymMeaning?: string;
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
    image: "/produtos/k-200r.png",
  },
  {
    id: "k-500r",
    category: "Porta Automática Deslizante",
    title: "K-500R®",
    description: "Porta deslizante para alto fluxo e cargas pesadas.",
    href: "#",
    image: "/produtos/k-500r.png",
  },
  {
    id: "sts-20",
    category: "Porta Automática Antipânico",
    title: "STS-20®",
    description: "Sistema antipânico com abertura integral das folhas.",
    href: "#",
    image: "/produtos/sts-20.png",
  },
  {
    id: "sth-70",
    category: "Porta Automática Ambientes Controlados",
    title: "STH-70®",
    description: "Porta hermética especial para ambientes cirúrgicos e laboratoriais.",
    href: "#",
    image: "/produtos/sth-70.png",
  },
  {
    id: "stc-40",
    category: "Porta Automática Telescópica",
    title: "STC-40®",
    description: "Abertura telescópica para vãos com espaço reduzido.",
    href: "#",
    image: "/produtos/stc-40.png",
  },
  {
    id: "b120-b300",
    category: "Porta Automática Deslizante",
    title: "B-120T® / B-300T®",
    description: "Mecanismo deslizante clássico de alta durabilidade.",
    href: "#",
    image: "/produtos/b-120t-b-300t.png",
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
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-4xl">
              {title}
            </h2>
            <p className="max-w-2xl text-slate-500 font-medium text-lg md:text-md">{description}</p>
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
          <CarouselContent className="ml-0 py-6 -my-3">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="flex h-full max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <a
                  href={item.href}
                  className={cn(
                    "relative flex flex-col h-full border border-neutral-200 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] group",
                    "after:absolute after:inset-0 after:from-brand-red-500/5 after:to-transparent after:opacity-0 group-hover:after:opacity-100 after:transition-opacity"
                  )}
                >
                  <div className="relative aspect-video w-full border-b border-neutral-200 bg-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 min-h-8">
                      <span className="line-clamp-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-red-500">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-black uppercase leading-tight tracking-tighter text-black transition-colors duration-300 group-hover:text-brand-red-500 sm:text-2xl mb-2 line-clamp-1">
                      <FormattedTrademark text={item.title} />
                    </h3>
                    {item.acronymMeaning && (
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                        {item.acronymMeaning}
                      </p>
                    )}
                    <p className="min-h-[2.75rem] text-sm leading-relaxed text-gray-600 line-clamp-2 mb-6">
                      {item.description}
                    </p>

                    <div className="mt-auto pt-6 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-red-500 opacity-0 transition-all duration-500 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0">
                        {viewDetails}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-colors duration-300 group-hover:bg-brand-red-500">
                        <ArrowRight className="h-5 w-5" />
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
