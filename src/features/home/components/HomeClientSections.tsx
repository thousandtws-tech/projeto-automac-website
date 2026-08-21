"use client";

import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Wrench,
  Settings,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { Gallery4Demo } from "@/components/ui/gallery4-demo";
import { VideoSection } from "./VideoSection";
import MuxPlayer from "@mux/mux-player-react";
import type { MuxPlayerCSSProperties } from "@mux/mux-player-react";
import { useCountUp } from "@shared/hooks/useCountUp";
import type { Locale } from "@/src/i18n/config";


const featureIcons = [Settings, Shield, Wrench, Zap];

const clientLogos = [
  { id: "accor", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323953/accor_kzdm1c.svg", alt: "" },
  { id: "bosch", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323954/Colinas_Shopping_1_h4jrxk.svg", alt: "" },
  { id: "carrefour", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323949/graal_cexivn.svg", alt: "" },
  { id: "colinas", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323951/itau-unibanco_lywegl.svg", alt: "" },
  { id: "droga-raia", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323952/hines_zdvih6.svg", alt: "" },
  { id: "drogasil", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323952/bosch_qrqqv7.svg", alt: "" },
  { id: "ems", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323949/droga-raia_okln3u.svg", alt: "" },
  { id: "graal", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323950/Shopping_Market_Place_wdor9s.svg", alt: "" },
  { id: "sirioli", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323950/hospital_sirioli_banes_oo43mn.svg", alt: " " },
  { id: "lilly", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323949/royal_palm_plaza_ajbs5b.svg", alt: "" },
  { id: "odebrecht", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323949/Viracopos_amaang.svg", alt: "" },
  { id: "patio-ciane", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323948/odebrecht_o5b1cg.svg", alt: "" },
  { id: "rio-galeao", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323947/Lilly_akcs2e.svg", alt: "" },
  { id: "royal-palm", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323947/P%C3%A1tio_Cian%C3%AA_u1ct1u.svg", alt: "" },
  { id: "saint-gobain", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323946/Rio_Gale%C3%A3o_vl7ntr.svg", alt: "" },
  { id: "market-place", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323946/Smart_Fit_jujwc9.svg", alt: "" },
  { id: "smart-fit", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323943/tetra-pak_jdi6gg.svg", alt: "" },
  { id: "tetra-pak", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323945/The_Royal_Palm_Plaza_-_V2_jlvuvz.svg", alt: "" },
  { id: "royal-palm-v2", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323945/drogasil_ragsda.svg", alt: "" },
  { id: "viracopos", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323944/saint_gobain_dpai7b.svg", alt: "" },
  {id: "carrefour", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323943/carrefour_ncyzjl.svg", alt: "" },
  {id: "unimed", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323942/unimed_fp7npm.svg", alt: "" },
  {id: "good-year", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323941/goodyear_djhjt6.svg", alt: "" },
  {id: "natura", src: "https://res.cloudinary.com/lz9vero5/image/upload/v1787323941/natura_ulldkj.svg", alt: "" },
];

const marqueeRow1 = clientLogos.slice(0, 10);
const marqueeRow2 = clientLogos.slice(10, 20);

export function HomeClientSections({ dictionary, locale }: { dictionary: any; locale: Locale }) {
  const home = dictionary.home;
  const { displayValue: doorsDisplay, ref: refDoors } = useCountUp(30000, 2500, { suffix: '+', startOnView: true, locale });
  const { displayValue: clientsDisplay, ref: refClients } = useCountUp(500, 2000, { suffix: '+', startOnView: true, locale });
  const { displayValue: projectsDisplay, ref: refProjects } = useCountUp(3000, 2000, { suffix: '+', startOnView: true, locale });
  const { displayValue: hoursDisplay, ref: refHours } = useCountUp(24, 1500, { suffix: 'h', startOnView: true, locale });

  const counters = [
    { ref: refDoors, value: `+${doorsDisplay}`, label: home.counters.doorsInstalled },
    { ref: refClients, value: `${clientsDisplay}+`, label: home.counters.activeClients },
    { ref: refProjects, value: `+${projectsDisplay}`, label: home.counters.projectsDelivered },
    { ref: refHours, value: `${hoursDisplay}h`, label: home.counters.technicalSupport },
  ];

  const mapVideoStyle = {
    width: "100%",
    height: "100%",
    aspectRatio: "auto",
    "--media-object-fit": "cover",
    "--media-object-position": "center",
  } satisfies MuxPlayerCSSProperties;

  return (
    <>
      <FadeIn direction="up" delay={0.1}>
        <VideoSection locale={locale} dictionary={dictionary} />
      </FadeIn>

      <FadeIn direction="up" delay={0.15}>
        <Gallery4Demo dictionary={dictionary} locale={locale} />
      </FadeIn>

      <FadeIn direction="up" delay={0.2}>
        <section className="relative border-b border-black overflow-hidden">
          {/* Fundos divididos no desktop */}
          <div className="absolute inset-0 hidden lg:grid lg:grid-cols-2">
            <div className="bg-brand-red-600" />
            <div className="bg-white" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-none px-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Lado esquerdo vermelho */}
              <div className="lg:col-span-6 bg-brand-red-600 lg:bg-transparent px-6 sm:px-8 lg:pr-16 py-16 md:py-24 flex flex-col justify-center">
                <span className="text-xs font-medium uppercase tracking-widest text-white mb-4 inline-block px-4 py-1.5 bg-white/10 rounded-full w-fit border border-white/20">
                  {home.about.badge}
                </span>

                <h2 className="mb-8 text-[clamp(2rem,9vw,3rem)] font-medium uppercase leading-tight tracking-tighter text-white sm:mb-12">
                  {home.about.titlePart1}{" "}
                  <span>{home.about.titleHighlight}</span>
                </h2>

                <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mb-8">
                  {home.about.description ||
                    "Com mais de 35 anos de atuação, a Automec oferece cobertura nacional completa com engenharia própria, estoque estratégico de peças e atendimento rápido em todo o Brasil."}
                </p>

                <Button
                  className="h-12 w-full bg-white px-5 text-xs font-bold uppercase tracking-widest text-brand-red-600 shadow-md hover:bg-white/90 sm:w-fit sm:px-8"
                  asChild
                >
                  <Link href="/sobre">
                    {home.about.cta}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Lado direito branco */}
              <div className="lg:col-span-6 min-h-[280px] w-full bg-white lg:min-h-0 lg:bg-transparent p-0 flex items-stretch justify-center">
                <div className="h-full min-h-[280px] w-full overflow-hidden border border-black bg-neutral-950 shadow-lg lg:min-h-0">
                  <MuxPlayer
                    className="automec-map-video block h-full w-full"
                    playbackId="fqQI595jgub7G9N00NNa1iZjBryDxgBGEZWlDLlHBJ2o"
                    streamType="on-demand"
                    autoPlay="muted"
                    muted
                    loop
                    playsInline
                    videoTitle="Portas automáticas Automec com segurança garantida"
                    style={mapVideoStyle}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn direction="up" delay={0.3}>
        <div className="border-b border-black py-16 md:py-20">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-12">
              <span className="text-2xl font-bold uppercase tracking-widest text-brand-red-600 mb-3 block">
                {home.clients.badge}
              </span>
              <h2 className="text-4xl sm:text-4xl font-black tracking-tighter text-black uppercase leading-[0.9]">
                {home.clients.title}
              </h2>
            </div>

            <div className="w-full overflow-hidden flex flex-col gap-8 py-4">
              <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                <div className="animate-marquee gap-8 flex">
                  {[...marqueeRow1, ...marqueeRow1].map((logo, index) => (
                    <div
                      key={`${logo.id}-${index}`}
                      className="flex h-28 w-48 shrink-0 items-center justify-center border-black bg-white p-4 shadow sm:h-40 sm:w-70"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        width={200}
                        className="max-h-full max-w-full object-contain hover:scale-105 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                <div className="animate-marquee-reverse gap-8 flex">
                  {[...marqueeRow2, ...marqueeRow2].map((logo, index) => (
                    <div
                      key={`${logo.id}-${index}`}
                      className="flex h-28 w-52 shrink-0 items-center justify-center border-black bg-white p-4 shadow sm:h-40 sm:w-80"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        width={200}
                        className="max-h-full max-w-full object-contain hover:scale-105 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );
}
