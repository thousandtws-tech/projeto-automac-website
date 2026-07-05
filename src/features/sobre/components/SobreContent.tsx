"use client";

import { useRef, useState } from "react";
import { Play, Pause, Target, Eye, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { CtaBlock } from "@shared/components/CtaBlock";
import { useCountUp } from "@shared/hooks/useCountUp";

interface SobreContentProps {
  content?: {
    stats: readonly { readonly label: string }[];
    historyTitle: string;
    historySub: string;
    historyButton: string;
    credibilityTitle: string;
    credibilityDesc: string;
    videoLabel: string;
    videoDuration: string;
    diretrizesLabel: string;
    pilaresTitle: string;
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
    valuesTitle: string;
    valuesDesc: string;
    ctaTitle: string;
    ctaButton: string;
  };
}

const fallbackContent = {
  stats: [
    { label: "Anos de Mercado" },
    { label: "Portas Instaladas" },
    { label: "Fabricação Própria" },
    { label: "Suporte Técnico" },
  ],
  historyTitle: "Nossa História",
  historySub: "Veja neste vídeo o que a Automec consolidou nestes 35 anos de história",
  historyButton: "Conheça Nossa História",
  credibilityTitle: "Credibilidade",
  credibilityDesc: "A empresa é reconhecida por sua sólida credibilidade e pelo compromisso inequívoco em satisfazer plenamente seus clientes.",
  videoLabel: "Vídeo Institucional",
  videoDuration: "02:45",
  diretrizesLabel: "DIRETRIZES",
  pilaresTitle: "Pilares Corporativos",
  missionTitle: "Missão",
  missionDesc: "Facilitar o acesso de todas as pessoas com tecnologia e segurança.",
  visionTitle: "Visão",
  visionDesc: "Melhoria contínua de seus produtos, contribuindo com a modernização e acessibilidade.",
  valuesTitle: "Valores",
  valuesDesc: "Valorizamos pessoas e talentos; alicerçados com tecnologia e inovação.",
  ctaTitle: "Faça parte da história de mais de 30 mil portas instaladas",
  ctaButton: "Solicitar Orçamento",
};

export function SobreContent({ content }: SobreContentProps) {
  const c = content ?? fallbackContent;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleVideoToggle = () => {
    if (!videoRef.current || videoError) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const { displayValue: count35, ref: ref35 } = useCountUp(35, 2000);
  const { displayValue: count30, ref: ref30 } = useCountUp(30, 2000);
  const { displayValue: count100, ref: ref100 } = useCountUp(100, 2000);
  const { displayValue: count24, ref: ref24 } = useCountUp(24, 2000);

  return (
    <section className="bg-white">

      {/* 1. Stats Section */}
      <FadeIn direction="up" delay={0.1}>
        <div className="border-b border-black py-16 md:py-20">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div ref={ref35} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">{count35}+</span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">{c.stats[0].label}</p>
              </div>
              <div ref={ref30} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">{count30}k+</span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">{c.stats[1].label}</p>
              </div>
              <div ref={ref100} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">{count100}%</span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">{c.stats[2].label}</p>
              </div>
              <div ref={ref24} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">{count24}h</span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">{c.stats[3].label}</p>
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
                <span className="text-2xl font-bold uppercase tracking-widest text-brand-red-600 mb-4">
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
                <Button className="bg-brand-red-600 hover:bg-neutral-800 text-white font-bold uppercase tracking-widest px-10 h-14 text-sm">
                  {c.historyButton}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="relative w-full aspect-video border-2 border-black rounded-md overflow-hidden bg-black">
                {videoError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 text-white gap-4">
                    <Play className="h-12 w-12 text-white/40" />
                    <span className="text-xs uppercase tracking-widest text-white/40">{c.videoLabel}</span>
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                    onClick={handleVideoToggle}
                    onError={() => setVideoError(true)}
                  >
                    <source src="#" type="video/mp4" />
                  </video>
                )}

                {!videoError && !isPlaying && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 cursor-pointer"
                    onClick={handleVideoToggle}
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-red-600 text-white transition-transform duration-300 hover:scale-110">
                      <Play className="h-8 w-8 fill-current ml-1" />
                    </div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between text-white bg-gradient-to-t from-black/60 to-transparent p-6 pointer-events-none">
                  <span className="text-[10px] font-bold uppercase tracking-widest rounded-md bg-black/60 px-3 py-1.5">
                    {videoError ? (
                      c.videoLabel
                    ) : isPlaying ? (
                      <span className="flex items-center gap-1.5">
                        <span className="w-1 h-3 bg-white rounded-full animate-pulse" />
                        <span className="w-1 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <span className="w-1 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                        Reproduzindo
                      </span>
                    ) : (
                      c.videoLabel
                    )}
                  </span>
                  <span className="text-[10px] font-bold opacity-80">
                    {c.videoDuration}
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
                {c.diretrizesLabel}
              </span>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-black">
                {c.pilaresTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Missão */}
              <div className="border border-black bg-white p-10 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:bg-black hover:text-white group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white mb-8 group-hover:bg-white group-hover:text-black">
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
              <div className="border border-black bg-white p-10 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:bg-black hover:text-white group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white mb-8 group-hover:bg-white group-hover:text-black">
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
              <div className="border border-black bg-white p-10 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:bg-brand-red-600 hover:text-white group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red-600 text-white mb-8 group-hover:bg-white group-hover:text-brand-red-600">
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
      <CtaBlock
        variant="red"
        title={c.ctaTitle}
        buttonText={c.ctaButton}
      />

    </section>
  );
}