"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Wrench,
  Settings,
  Zap,
  Award,
  Globe2,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { Gallery4Demo } from "@/components/ui/gallery4-demo";
import { CtaBlock } from "@shared/components/CtaBlock";
import { useCountUp } from "@shared/hooks/useCountUp";
import type { Locale } from "@/src/i18n/config";

const featureIcons = [Settings, Shield, Wrench, Zap];

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

  return (
    <>
      <FadeIn direction="up" delay={0.15}>
        <Gallery4Demo dictionary={dictionary} locale={locale} />
      </FadeIn>

      <FadeIn direction="up" delay={0.2}>
        <div className="border-b border-black bg-brand-red-600">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-16 md:py-24 items-center">
              <div>
                <span className="text-sm font-bold uppercase tracking-widest text-white mb-4 block">
                  {home.about.badge}
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase leading-[0.9] mb-6">
                  {home.about.titlePart1}
                  <span className="underline decoration-white/30 underline-offset-4">
                    {home.about.titleHighlight}
                  </span>
                </h2>
                <p className="text-base text-white leading-relaxed max-w-lg mb-8">
                  {home.about.description}
                </p>
                <Button className="bg-white text-brand-red-600 hover:bg-white/90 font-bold uppercase tracking-widest px-8 h-12 text-xs" asChild>
                  <Link href="/sobre">
                    {home.about.cta}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-0">
                {home.about.stats.map((stat: { value: string; description: string }, idx: number) => {
                  const Icon = [Award, Globe2, Cpu][idx];
                  return (
                    <div
                      key={stat.value}
                      className={`flex items-center gap-6 p-8 ${
                        idx < home.about.stats.length - 1 ? "border-b border-white" : ""
                      }`}
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-brand-red-600">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black tracking-tighter text-white">
                          {stat.value}
                        </h3>
                        <p className="text-sm font-bold uppercase tracking-widest text-white">
                          {stat.description}
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
      <FadeIn direction="up" delay={0.25}>
        <div className="border-b border-black py-20 md:py-28">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-sm font-bold uppercase tracking-widest text-brand-red-600 mb-3 block">
                {home.features.badge}
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-black uppercase leading-[0.9]">
                {home.features.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-black shadow-sm">
              {home.features.items.map((feat: { title: string; description: string }, idx: number) => {
                const Icon = featureIcons[idx];
                return (
                  <div
                    key={feat.title}
                    className={`p-8 md:p-10 flex flex-col gap-6 ${
                      idx < home.features.items.length - 1
                        ? "border-b md:border-b-0 md:border-r border-black"
                        : ""
                    }`}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase tracking-tight text-black mb-2">
                        {feat.title}
                      </h4>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.3}>
        <div className="border-b border-black py-16 md:py-20">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-12">
              <span className="text-2xl font-bold uppercase tracking-widest text-brand-red-600 mb-3 block">
                {home.clients.badge}
              </span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-black uppercase leading-[0.9]">
                {home.clients.title}
              </h2>
            </div>

            <div className="w-full overflow-hidden flex flex-col gap-8 py-4">
              <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                <div className="animate-marquee gap-8 flex">
                  {[...marqueeRow1, ...marqueeRow1].map((logo, index) => (
                    <div
                      key={`${logo.id}-${index}`}
                      className="flex shrink-0 items-center justify-center p-4 bg-white shadow border-black w-70 h-40"
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
                      className="flex shrink-0 items-center justify-center p-4 bg-white shadow border-black w-80 h-40"
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
      <CtaBlock
        variant="red"
        title={home.cta.titlePart1}
        highlight={home.cta.titleHighlight}
        buttonText={dictionary.common.requestBudget}
      />
    </>
  );
}
