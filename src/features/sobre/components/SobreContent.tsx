"use client";

import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react/lazy";
import type { MuxPlayerCSSProperties } from "@mux/mux-player-react";
import { Play, Target, Eye, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { CtaBlock } from "@shared/components/CtaBlock";

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
  videoLabel: "Conheça nossa fábrica",
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
  const [isPlaying, setIsPlaying] = useState(false);
  const muxPlaybackId = process.env.NEXT_PUBLIC_MUX_PLAYBACK_ID;
  const muxPlayerStyle = {
    width: "100%",
    height: "100%",
    aspectRatio: "16 / 9",
    "--media-object-fit": "cover",
    "--media-object-position": "center",
    "--seek-backward-button": "none",
    "--seek-forward-button": "none",
  } satisfies MuxPlayerCSSProperties;

  return (
    <section className="bg-white">
      {/* 2. History Section */}
      <FadeIn direction="up" delay={0.2}>
        <div className="mt-0 border-b border-black pb-14 pt-[calc(7rem+3rem)] sm:pb-16 sm:pt-[calc(7rem+4rem)] md:mt-10 md:py-24">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-20">
              <div className="flex flex-col items-start text-left">
                <span className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-red-600 sm:mb-4 sm:text-base">
                  {c.credibilityTitle}
                </span>
                <h2 className="mb-5 whitespace-nowrap text-[clamp(1.75rem,8.5vw,2.25rem)] font-black uppercase leading-[0.95] tracking-tighter text-black sm:mb-6 sm:text-5xl lg:text-5xl">
                  {c.historyTitle}
                </h2>
                <div className="mb-7 border-l-2 border-brand-red-600 pl-4 sm:mb-8 sm:pl-6">
                  <p className="mb-4 text-lg font-medium leading-relaxed text-neutral-700 sm:text-xl">
                    {c.historySub}
                  </p>
                  <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">
                    {c.credibilityDesc}
                  </p>
                </div>
                <Button className="h-14 w-full bg-brand-red-600 px-5 text-xs font-bold uppercase tracking-wider text-white hover:bg-neutral-800 sm:w-auto sm:px-10 sm:text-sm sm:tracking-widest">
                  {c.historyButton}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-md border-2 border-black bg-neutral-900 shadow-lg">
                {muxPlaybackId ? (
                  <MuxPlayer
                    className="automec-mux-player"
                    playbackId={muxPlaybackId}
                    streamType="on-demand"
                    loading="viewport"
                    preload="metadata"
                    poster=""
                    videoTitle={c.videoLabel}
                    metadata={{
                      video_id: "automec-fabrica",
                      video_title: c.videoLabel,
                    }}
                    accentColor="#d01c24"
                    primaryColor="#ffffff"
                    secondaryColor="#171717"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                    style={muxPlayerStyle}
                  />
                ) : (
                  <button
                    type="button"
                    className="absolute inset-0 flex cursor-default items-center justify-center bg-neutral-900 text-white"
                    aria-label={`${c.videoLabel}: configure NEXT_PUBLIC_MUX_PLAYBACK_ID para reproduzir`}
                    disabled
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red-600 sm:h-20 sm:w-20">
                      <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" />
                    </span>
                  </button>
                )}

                {!isPlaying && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-16 sm:px-5 sm:pb-5">
                    <span className="text-xs font-bold uppercase tracking-widest text-white">
                      {c.videoLabel}
                    </span>
                    {!muxPlaybackId && (
                      <span className="absolute bottom-4 right-4 text-[10px] font-bold text-white/80 sm:bottom-5 sm:right-5">
                        {c.videoDuration}
                      </span>
                    )}
                  </div>
                )}
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
              <span className="text-md font-bold uppercase tracking-widest text-brand-red-600 mb-4 block">
                {c.diretrizesLabel}
              </span>
              <h3 className="text-4xl sm:text-5xl lg:text-5xl font-black tracking-tighter text-black">
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
