"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Wrench,
  Clock,
  Settings,
  CheckCircle,
  Zap,
  Award,
  Globe2,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { Gallery4Demo } from "@/components/ui/gallery4-demo";

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

const features = [
  {
    icon: Settings,
    title: "Engenharia de Precisão",
    desc: "Projetos sob medida com mecânica industrial de alta performance para ambientes exigentes.",
  },
  {
    icon: Shield,
    title: "Segurança Certificada",
    desc: "Portas homologadas por ABNT com sistemas antipânico e vedação hermética garantida.",
  },
  {
    icon: Wrench,
    title: "Manutenção Contínua",
    desc: "Suporte técnico 24h com peças originais e SLA garantido em contrato para grandes redes.",
  },
  {
    icon: Zap,
    title: "Tecnologia Avançada",
    desc: "Automatizadores de última geração com sensores inteligentes e integração BMS.",
  },
];

const stats = [
  { icon: Award, title: "+ de 35 anos", desc: "Fazendo História" },
  { icon: Globe2, title: "Todo o Brasil", desc: "E América do Sul" },
  { icon: Cpu, title: "100%", desc: "Tecnologia Nacional" },
];

const marqueeRow1 = Array.from({ length: 15 }, (_, i) => ({
  id: `logo-a-${i}`,
  url: `https://placehold.net/120x60.png?text=Logo+${i + 1}`,
}));

const marqueeRow2 = Array.from({ length: 15 }, (_, i) => ({
  id: `logo-b-${i}`,
  url: `https://placehold.net/120x60.png?text=Logo+${i + 16}`,
}));

export function HomeClientSections({ dictionary }: { dictionary: any }) {
  const { count: countDoors, ref: refDoors } = useCountUp(30000, 2500);
  const { count: countClients, ref: refClients } = useCountUp(500, 2000);
  const { count: countProjects, ref: refProjects } = useCountUp(3000, 2000);
  const { count: countHours, ref: refHours } = useCountUp(24, 1500);

  const formatNumber = (num: number) => num.toLocaleString("pt-BR");

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          1. STATS — Counting animation
      ═══════════════════════════════════════════════════════════════ */}
      <FadeIn direction="up" delay={0.1}>
        <div className="border-b border-black py-16 md:py-20">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div ref={refDoors} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">
                  +{formatNumber(countDoors)}
                </span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">
                  Portas Instaladas
                </p>
              </div>
              <div ref={refClients} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">
                  {countClients}+
                </span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">
                  Clientes Ativos
                </p>
              </div>
              <div ref={refProjects} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">
                  {formatNumber(countProjects)}+
                </span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">
                  Projetos Entregues
                </p>
              </div>
              <div ref={refHours} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">
                  {countHours}h
                </span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">
                  Suporte Técnico
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ═══════════════════════════════════════════════════════════════
          2. PRODUCTS CAROUSEL
      ═══════════════════════════════════════════════════════════════ */}
      <FadeIn direction="up" delay={0.15}>
        <Gallery4Demo />
      </FadeIn>

      {/* ═══════════════════════════════════════════════════════════════
          3. ABOUT — Red Swiss section (like Contato split)
      ═══════════════════════════════════════════════════════════════ */}
      <FadeIn direction="up" delay={0.2}>
        <div className="border-b border-black bg-brand-red-600">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-16 md:py-24 items-center">
              {/* Left */}
              <div>
                <span className="text-sm font-bold uppercase tracking-widest text-white/70 mb-4 block">
                  Tecnologia & Segurança
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase leading-[0.9] mb-6">
                  Inovando acessos com{" "}
                  <span className="underline decoration-white/30 underline-offset-4">
                    alta performance
                  </span>
                </h2>
                <p className="text-base text-white/80 leading-relaxed max-w-lg mb-8">
                  Desde 1993, a Automec desenvolve soluções sob medida em portas automáticas
                  deslizantes, telescópicas e herméticas. Combinamos mecânica de alta precisão
                  e design premium para valorizar a arquitetura e otimizar fluxos corporativos.
                </p>
                <Button className="bg-white text-brand-red-600 hover:bg-white/90 font-bold uppercase tracking-widest px-8 h-12 text-xs" asChild>
                  <Link href="/sobre">
                    Conheça a Automec
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Right — Stats grid */}
              <div className="grid grid-cols-1 gap-0">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.title}
                      className={`flex items-center gap-6 p-8 ${
                        idx < stats.length - 1 ? "border-b border-white/20" : ""
                      }`}
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-white text-brand-red-600">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black tracking-tighter text-white">
                          {stat.title}
                        </h3>
                        <p className="text-sm font-bold uppercase tracking-widest text-white/60">
                          {stat.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ═══════════════════════════════════════════════════════════════
          4. FEATURES — 4-column bordered grid
      ═══════════════════════════════════════════════════════════════ */}
      <FadeIn direction="up" delay={0.25}>
        <div className="border-b border-black py-20 md:py-28">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-sm font-bold uppercase tracking-widest text-brand-red-600 mb-3 block">
                Por que a Automec
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-black uppercase leading-[0.9]">
                Diferenciais
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-black">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className={`p-8 md:p-10 flex flex-col gap-6 ${
                      idx < features.length - 1
                        ? "border-b md:border-b-0 md:border-r border-black"
                        : ""
                    }`}
                  >
                    <div className="flex h-14 w-14 items-center justify-center bg-black text-white">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase tracking-tight text-black mb-2">
                        {feat.title}
                      </h4>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ═══════════════════════════════════════════════════════════════
          5. CLIENTS MARQUEE
      ═══════════════════════════════════════════════════════════════ */}
      <FadeIn direction="up" delay={0.3}>
        <div className="border-b border-black py-16 md:py-20">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-12">
              <span className="text-sm font-bold uppercase tracking-widest text-brand-red-600 mb-3 block">
                Nossos Parceiros
              </span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-black uppercase leading-[0.9]">
                Quem Confia na Automec
              </h2>
            </div>

            <div className="w-full overflow-hidden flex flex-col gap-5 py-4">
              <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                <div className="animate-marquee gap-5 flex">
                  {[...marqueeRow1, ...marqueeRow1].map((logo, index) => (
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
                </div>
              </div>

              <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                <div className="animate-marquee-reverse gap-5 flex">
                  {[...marqueeRow2, ...marqueeRow2].map((logo, index) => (
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ═══════════════════════════════════════════════════════════════
          6. CTA — Full-width red
      ═══════════════════════════════════════════════════════════════ */}
      <FadeIn direction="up" delay={0.35}>
        <div className="bg-brand-red-600 py-20 md:py-28">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <h4 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[0.9] uppercase">
                  Portas automáticas com{" "}
                  <span className="text-white/80">engenharia de precisão</span>
                </h4>
              </div>
              <div className="lg:text-right">
                <Button className="bg-white text-brand-red-600 hover:bg-white/90 font-bold uppercase tracking-widest px-10 h-16 text-sm" asChild>
                  <Link href="/contato">
                    Solicitar Orçamento
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );
}
