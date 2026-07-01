"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  HeartPulse,
  Building2,
  ShieldCheck,
  Truck,
  Stethoscope,
  ShoppingBag,
  Plane,
  Factory,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
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
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref };
}

const categories = [
  {
    id: "saude",
    icon: Stethoscope,
    title: "Saúde & Hospitais",
    desc: "Portas automáticas herméticas e antibacterianas para salas cirúrgicas, UTIs e laboratórios.",
    logos: [
      { name: "Einstein", text: "Einstein" },
      { name: "Sírio-Libanês", text: "Sírio Libanês" },
      { name: "Unimed", text: "Unimed" },
      { name: "Hospital São Luiz", text: "Hosp. São Luiz" },
      { name: "Hospital Moinhos", text: "Hosp. Moinhos" },
    ],
  },
  {
    id: "varejo",
    icon: ShoppingBag,
    title: "Varejo & Shoppings",
    desc: "Sistemas deslizantes e telescópicos de alto fluxo com design minimalista e economia de climatização.",
    logos: [
      { name: "Market Place", text: "Market Place" },
      { name: "Colinas Shopping", text: "Colinas" },
      { name: "Pátio Cianê", text: "Pátio Cianê" },
      { name: "Walmart", text: "Walmart" },
      { name: "Carrefour", text: "Carrefour" },
      { name: "Tok&Stok", text: "Tok&Stok" },
    ],
  },
  {
    id: "infra",
    icon: Plane,
    title: "Infraestrutura & Aeroportos",
    desc: "Acessos de extrema segurança e durabilidade para aeroportos, estações de metrô e terminais logísticos.",
    logos: [
      { name: "Viracopos", text: "Viracopos" },
      { name: "RioGaleão", text: "RioGaleão" },
      { name: "Metrô SP", text: "Metrô SP" },
      { name: "Aeroportos Brasil", text: "Aerop. Brasil" },
    ],
  },
  {
    id: "industria",
    icon: Factory,
    title: "Indústrias & Logística",
    desc: "Portas industriais automáticas de alta velocidade, cortinas de vento e trincos magnéticos integrados.",
    logos: [
      { name: "Bosch", text: "Bosch" },
      { name: "Goodyear", text: "Goodyear" },
      { name: "3M", text: "3M" },
      { name: "Lilly", text: "Lilly" },
      { name: "Odebrecht", text: "Odebrecht" },
      { name: "Natura", text: "Natura" },
    ],
  },
];

const trustItems = [
  "Fabricação 100% própria com controle total de qualidade",
  "Equipe técnica certificada com mais de 120 especialistas",
  "Peças originais e garantia de reposição por 5 anos",
  "SLA contratual com tempo de resposta garantido",
  "Projetos sob medida para cada necessidade arquitetônica",
  "Acompanhamento pós-instalação com manutenção contínua",
];

export function ClientesContent() {
  const { count: countClients, ref: refClients } = useCountUp(500, 2000);
  const { count: countSectors, ref: refSectors } = useCountUp(12, 2000);
  const { count: countInstall, ref: refInstall } = useCountUp(30, 2000);
  const { count: countCities, ref: refCities } = useCountUp(85, 2000);

  return (
    <div className="w-full">
      {/* ═══════════════════════════════════════════════════════════════
          1. HEADER — Swiss grid pattern
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative border-b border-black bg-white pt-36 pb-16 md:pt-40 md:pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: "url('https://placehold.net/1920x600.png?text=Clientes')" }}
        />
        <div className="relative container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.85] text-black uppercase">
                Grandes Marcas,
                <br />
                <span className="text-brand-red-600">Grandes Parceiros</span>
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 md:pb-4">
              <div className="border-l-2 border-black pl-6">
                <p className="text-base md:text-lg leading-relaxed text-neutral-600 font-medium">
                  A Automec orgulha-se de fazer parte da infraestrutura das maiores marcas de hospitais, shoppings e indústrias do Brasil.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. STATS — Counting animation on scroll
      ═══════════════════════════════════════════════════════════════ */}
      <FadeIn direction="up" delay={0.1}>
        <div className="border-b border-black py-16 md:py-20">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div ref={refClients} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">{countClients}+</span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">Clientes Ativos</p>
              </div>
              <div ref={refSectors} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">{countSectors}</span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">Segmentos</p>
              </div>
              <div ref={refInstall} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">{countInstall}k+</span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">Portas Instaladas</p>
              </div>
              <div ref={refCities} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">{countCities}+</span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">Cidades Atendidas</p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ═══════════════════════════════════════════════════════════════
          3. CLIENT CATEGORIES — Bordered grid with logos
      ═══════════════════════════════════════════════════════════════ */}
      <FadeIn direction="up" delay={0.15}>
        <div className="border-b border-black">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            {/* Section label */}
            <div className="pt-20 pb-12">
              <span className="text-sm font-bold uppercase tracking-widest text-brand-red-600 mb-3 block">
                Segmentos Atendidos
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-black uppercase leading-[0.9]">
                Quem Confia na Automec
              </h2>
            </div>

            {/* Categories list */}
            <div className="flex flex-col">
              {categories.map((cat, catIdx) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.id}
                    className={`grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0 ${
                      catIdx < categories.length - 1 ? "border-b border-black" : ""
                    }`}
                  >
                    {/* Left: category info */}
                    <div className="p-8 md:p-10 lg:border-r border-black flex flex-col gap-4">
                      <div className="flex h-12 w-12 items-center justify-center bg-black text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tight text-black">
                        {cat.title}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>

                    {/* Right: logos grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
                      {cat.logos.map((logo, logoIdx) => {
                        const isLastRow = logoIdx >= cat.logos.length - (cat.logos.length % 5 || 5);
                        const isLastCol = (logoIdx + 1) % 5 === 0 || logoIdx === cat.logos.length - 1;
                        return (
                          <div
                            key={`${cat.id}-${logoIdx}`}
                            className={`flex items-center justify-center p-6 md:p-8 bg-white transition-colors hover:bg-neutral-50 ${
                              !isLastCol ? "lg:border-r" : ""
                            } ${
                              !isLastRow ? "border-b" : ""
                            } border-neutral-200`}
                          >
                            <span className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">
                              {logo.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ═══════════════════════════════════════════════════════════════
          4. TRUST / WHY PARTNER — Split layout
      ═══════════════════════════════════════════════════════════════ */}
      <FadeIn direction="up" delay={0.2}>
        <div className="border-b border-black py-20 md:py-28">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left */}
              <div>
                <span className="text-sm font-bold uppercase tracking-widest text-brand-red-600 mb-3 block">
                  Por que a Automec
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-black uppercase leading-[0.9] mb-6">
                  Parceria que<br />gera resultado
                </h2>
                <p className="text-base text-neutral-600 leading-relaxed max-w-lg">
                  Mais de 35 anos de experiência consolidada em projetos de grande porte. Cada porta instalada é um compromisso com a excelência e a confiabilidade que nossos parceiros exigem.
                </p>
              </div>

              {/* Right — trust checklist */}
              <div className="border border-black p-8 md:p-10 flex flex-col gap-5">
                {trustItems.map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-brand-red-600 text-white mt-0.5">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-black leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ═══════════════════════════════════════════════════════════════
          5. CONTRACT CTA — Bordered box
      ═══════════════════════════════════════════════════════════════ */}
      <FadeIn direction="up" delay={0.25}>
        <div className="py-20 md:py-28">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="border-2 border-black p-10 md:p-16 lg:p-20">
              <div className="grid grid-cols-12 gap-8 items-center">
                <div className="col-span-12 lg:col-span-7">
                  <span className="text-sm font-bold uppercase tracking-widest text-brand-red-600 mb-4 block">
                    Seja Parceiro
                  </span>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-black uppercase leading-[0.9] mb-4">
                    Seu projeto merece{" "}
                    <span className="text-brand-red-600">execução impecável</span>
                  </h3>
                  <p className="text-base text-neutral-600 max-w-xl leading-relaxed">
                    Traga o seu desafio de arquitetura ou automação comercial. Nossa equipe técnica está pronta para orçar e instalar no seu estabelecimento.
                  </p>
                </div>
                <div className="col-span-12 lg:col-span-5 lg:text-right">
                  <Button className="bg-brand-red-600 text-white hover:bg-brand-red-700 font-bold uppercase tracking-widest px-10 h-14 text-sm" asChild>
                    <Link href="/contato">
                      Solicitar Orçamento
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ═══════════════════════════════════════════════════════════════
          6. CTA — Full-width red section
      ═══════════════════════════════════════════════════════════════ */}
      <FadeIn direction="up" delay={0.3}>
        <div className="border-t border-black bg-brand-red-600 py-20 md:py-28">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <h4 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[0.9] uppercase">
                  Mais de 30 mil portas<br />
                  <span className="text-white/80">instaladas em todo o Brasil</span>
                </h4>
              </div>
              <div className="lg:text-right">
                <Button className="bg-white text-brand-red-600 hover:bg-white/90 font-bold uppercase tracking-widest px-10 h-16 text-sm">
                  Falar com Especialista
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
