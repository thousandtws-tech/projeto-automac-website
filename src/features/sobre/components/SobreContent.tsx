"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Target, Eye, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";

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

interface SobreContentProps {
  content?: {
    historyTitle: string;
    historySub: string;
    credibilityTitle: string;
    credibilityDesc: string;
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
    valuesTitle: string;
    valuesDesc: string;
  };
}

const fallbackContent = {
  historyTitle: "Nossa História",
  historySub: "Veja neste vídeo o que a Automec consolidou nestes 35 anos de história",
  credibilityTitle: "Credibilidade",
  credibilityDesc: "A empresa é reconhecida por sua sólida credibilidade e pelo compromisso inequívoco em satisfazer plenamente seus clientes.",
  missionTitle: "Missão",
  missionDesc: "Facilitar o acesso de todas as pessoas com tecnologia e segurança.",
  visionTitle: "Visão",
  visionDesc: "Melhoria contínua de seus produtos, contribuindo com a modernização e acessibilidade.",
  valuesTitle: "Valores",
  valuesDesc: "Valorizamos pessoas e talentos; alicerçados com tecnologia e inovação.",
};

export function SobreContent({ content }: SobreContentProps) {
  const c = content ?? fallbackContent;

  const { count: count35, ref: ref35 } = useCountUp(35, 2000);
  const { count: count30, ref: ref30 } = useCountUp(30, 2000);
  const { count: count100, ref: ref100 } = useCountUp(100, 2000);
  const { count: count24, ref: ref24 } = useCountUp(24, 2000);

  return (
    <section className="bg-white">

      {/* 1. Stats Section */}
      <FadeIn direction="up" delay={0.1}>
        <div className="border-b border-black py-16 md:py-20">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div ref={ref35} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">{count35}+</span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">Anos de Mercado</p>
              </div>
              <div ref={ref30} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">{count30}k+</span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">Portas Instaladas</p>
              </div>
              <div ref={ref100} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">{count100}%</span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">Fabricação Própria</p>
              </div>
              <div ref={ref24} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">{count24}h</span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">Suporte Técnico</p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 2. History Section */}
      <FadeIn direction="up" delay={0.2}>
        <div className="border-b border-black py-16 md:py-24">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-bold uppercase tracking-widest text-brand-red-600 mb-4">
                  {c.credibilityTitle}
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tighter text-black mb-6 uppercase">
                  {c.historyTitle}
                </h2>
                <div className="border-l-2 border-brand-red-600 pl-6 mb-8">
                  <p className="text-xl sm:text-2xl text-neutral-700 leading-relaxed mb-4 font-medium">
                    {c.historySub}
                  </p>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    {c.credibilityDesc}
                  </p>
                </div>
                <Button className="bg-black hover:bg-neutral-800 text-white font-bold uppercase tracking-widest px-10 h-14 text-sm">
                  Conheça Nossa História
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="relative w-full aspect-video border-2 border-black overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-neutral-200" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center bg-brand-red-600 text-white transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-8 w-8 fill-current ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between text-white bg-gradient-to-t from-black/60 to-transparent p-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-black/60 px-3 py-1.5">
                    Vídeo Institucional
                  </span>
                  <span className="text-[10px] font-bold opacity-80">
                    02:45
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 3. Mission, Vision, Values */}
      <FadeIn direction="up" delay={0.3}>
        <div className="py-20 md:py-32">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-20">
              <span className="text-sm font-bold uppercase tracking-widest text-brand-red-600 mb-4 block">
                DIRETRIZES
              </span>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-black">
                Pilares Corporativos
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Missão */}
              <div className="border border-black bg-white p-10 transition-all duration-300 hover:bg-black hover:text-white group">
                <div className="flex h-16 w-16 items-center justify-center bg-black text-white mb-8 group-hover:bg-white group-hover:text-black">
                  <Target className="h-8 w-8" />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-4">
                  {c.missionTitle}
                </h4>
                <p className="text-base leading-relaxed opacity-80">
                  {c.missionDesc}
                </p>
              </div>

              {/* Visão */}
              <div className="border border-black bg-white p-10 transition-all duration-300 hover:bg-black hover:text-white group">
                <div className="flex h-16 w-16 items-center justify-center bg-black text-white mb-8 group-hover:bg-white group-hover:text-black">
                  <Eye className="h-8 w-8" />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-4">
                  {c.visionTitle}
                </h4>
                <p className="text-base leading-relaxed opacity-80">
                  {c.visionDesc}
                </p>
              </div>

              {/* Valores */}
              <div className="border border-black bg-white p-10 transition-all duration-300 hover:bg-brand-red-600 hover:text-white group">
                <div className="flex h-16 w-16 items-center justify-center bg-brand-red-600 text-white mb-8 group-hover:bg-white group-hover:text-brand-red-600">
                  <Heart className="h-8 w-8" />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-4">
                  {c.valuesTitle}
                </h4>
                <p className="text-base leading-relaxed opacity-80">
                  {c.valuesDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 4. CTA Section */}
      <FadeIn direction="up" delay={0.4}>
        <div className="border-t border-black bg-brand-red-600 py-20 md:py-28">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <h4 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[0.9]">
                  Faça parte da história de mais de 30 mil portas instaladas
                </h4>
              </div>
              <div className="lg:text-right">
                <Button className="bg-white text-brand-red-600 hover:bg-white/90 font-bold uppercase tracking-widest px-10 h-16 text-sm">
                  Solicitar Orçamento
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

    </section>
  );
}
