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
import MuxPlayer from "@mux/mux-player-react/lazy";
import type { MuxPlayerCSSProperties } from "@mux/mux-player-react";
import { useCountUp } from "@shared/hooks/useCountUp";
import type { Locale } from "@/src/i18n/config";
import { HomeScrollReveal } from "./HomeScrollReveal";


const featureIcons = [Settings, Shield, Wrench, Zap];

const clientLogos = [
  { id: "group-4", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207687/Group_4_twnv4q.svg", alt: "" },
  { id: "frame-9", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207686/Frame_9_hp3git.svg", alt: "" },
  { id: "frame-8", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207685/Frame_8_so1atf.svg", alt: "" },
  { id: "frame-7", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207684/Frame_7_kokcqv.svg", alt: "" },
  { id: "frame-6", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207683/Frame_6_q4mzco.svg", alt: "" },
  { id: "frame-5", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207682/Frame_5_swux4z.svg", alt: "" },
  { id: "frame-4", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207681/Frame_4_eryfqi.svg", alt: "" },
  { id: "frame-3", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207680/Frame_3_gqjrhc.svg", alt: "" },
  { id: "frame-31", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207680/Frame_31_nvbqmc.svg", alt: "" },
  { id: "frame-30", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207680/Frame_30_z5n1pp.svg", alt: "" },
  { id: "frame-29", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207678/Frame_29_nlhytk.svg", alt: "" },
  { id: "frame-28", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207677/Frame_28_roaycp.svg", alt: "" },
  { id: "frame-27", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207676/Frame_27_ozfm2n.svg", alt: "" },
  { id: "frame-26", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207675/Frame_26_f0zh2q.svg", alt: "" },
  { id: "frame-25", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207675/Frame_25_ysbbxj.svg", alt: "" },
  { id: "frame-24", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207674/Frame_24_acdrrr.svg", alt: "" },
  { id: "frame-23", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207673/Frame_23_asidg4.svg", alt: "" },
  { id: "frame-22", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207672/Frame_22_ivbdmn.svg", alt: "" },
  { id: "frame-20", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207672/Frame_20_zmegh4.svg", alt: "" },
  { id: "frame-21", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207671/Frame_21_q9ekqh.svg", alt: "" },
  { id: "frame-2", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207670/Frame_2_zk6hnt.svg", alt: "" },
  { id: "frame-19", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207670/Frame_19_irwoep.svg", alt: "" },
  { id: "frame-18", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207668/Frame_18_jlgb9r.svg", alt: "" },
  { id: "frame-10", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207668/Frame_10_eunk0u.svg", alt: "" },
  { id: "frame-16", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207666/Frame_16_zbgfeb.svg", alt: "" },
  { id: "frame-17", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207666/Frame_17_g2izwj.svg", alt: "" },
  { id: "frame-14", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207665/Frame_14_fpmzzl.svg", alt: "" },
  { id: "frame-13", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207664/Frame_13_ppxxmz.svg", alt: "" },
  { id: "frame-12", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207663/Frame_12_pmfjsz.svg", alt: "" },
  { id: "frame-1", src: "https://res.cloudinary.com/dpgslwy15/image/upload/v1788207663/Frame_1_g63ckk.svg", alt: "" },
];

const half = Math.ceil(clientLogos.length / 2);
const marqueeRow1 = clientLogos.slice(0, half);
const marqueeRow2 = clientLogos.slice(half);

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
      <HomeScrollReveal>
        <FadeIn direction="up" delay={0.1}>
          <VideoSection locale={locale} dictionary={dictionary} />
        </FadeIn>
      </HomeScrollReveal>

      <HomeScrollReveal>
        <FadeIn direction="up" delay={0.15}>
          <Gallery4Demo dictionary={dictionary} locale={locale} />
        </FadeIn>
      </HomeScrollReveal>

      <HomeScrollReveal>
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
                <span className="text-xs font-bold uppercase tracking-widest text-white mb-4 inline-block px-4 py-1.5 bg-white/10 rounded-full w-fit border border-white/20">
                  {home.about.badge}
                </span>

                <h2 className="mb-8 text-[clamp(1.75rem,7vw,2.5rem)] font-bold uppercase leading-[1.2] tracking-tight text-white sm:mb-12">
                  {home.about.titlePart1}{" "}
                  <span>{home.about.titleHighlight}</span>
                </h2>

                <p className="text-base sm:text-lg font-semibold text-white/90 leading-relaxed max-w-xl mb-8">
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
                    loading="viewport"
                    preload="none"
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
      </HomeScrollReveal>

      <HomeScrollReveal>
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
                        height={100}
                        loading="lazy"
                        decoding="async"
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
                        height={100}
                        loading="lazy"
                        decoding="async"
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
      </HomeScrollReveal>
    </>
  );
}
