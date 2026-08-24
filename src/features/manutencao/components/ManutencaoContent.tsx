"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Wrench,
  Shield,
  PhoneCall,
  ClipboardCheck,
  CheckCircle,
  ShieldCheck,
  Building2,
  Factory,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { CtaBlock } from "@shared/components/CtaBlock";
import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/dictionaries";
import { HistoryVideoSection } from "@features/sobre/components/HistoryVideoSection";

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const startTime = performance.now();
        const animate = (currentTime: number) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * end));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref };
}

const processSteps = [
  {
    num: "01",
    title: "Abertura",
    desc: "Registro do chamado técnico via telefone ou e-mail 24h.",
    icon: PhoneCall,
  },
  {
    num: "02",
    title: "Triagem",
    desc: "Diagnóstico remoto e classificação de prioridade por especialista.",
    icon: ClipboardCheck,
  },
  {
    num: "03",
    title: "Deslocamento",
    desc: "Equipe técnica enviada com maleta de peças originais certificadas.",
    icon: Wrench,
  },
  {
    num: "04",
    title: "Resolução",
    desc: "Porta testada, calibrada e liberada com relatório técnico completo.",
    icon: CheckCircle,
  },
];

const industries = [
  {
    icon: Stethoscope,
    title: "Hospitais & Saúde",
    desc: "Portas herméticas e antibacterianas para UTIs, salas cirúrgicas e laboratórios.",
  },
  {
    icon: Building2,
    title: "Shoppings & Varejo",
    desc: "Sistemas de alto fluxo com manutenção preventiva contínua.",
  },
  {
    icon: Factory,
    title: "Indústria & Logística",
    desc: "Portas industriais de alta velocidade e cortinas de vento.",
  },
  {
    icon: ShieldCheck,
    title: "Aeroportos & Metrô",
    desc: "Acessos de extrema segurança e durabilidade 24/7.",
  },
];

export function ManutencaoContent({ dictionary }: { dictionary: Dictionary; locale: Locale }) {
  const m = dictionary.manutencao;
  const { count: countResponse, ref: refResponse } = useCountUp(4);
  const { count: countUptime, ref: refUptime } = useCountUp(99);
  const { count: countSLA, ref: refSLA } = useCountUp(100);
  const { count: countEquip, ref: refEquip } = useCountUp(120);

  return (
    <div className="w-full">
      <HistoryVideoSection
        content={{
          ...dictionary.sobre,
          credibilityTitle: "Suporte especializado",
          historyTitle: "Assistência técnica",
          historySub:
            "Contratos de manutenção preventiva e corretiva para shopping centers, hospitais e aeroportos com SLA garantido em contrato.",
          historyButton: "Solicitar atendimento",
          credibilityDesc: "",
        }}
        playbackId="fqQI595jgub7G9N00NNa1iZjBryDxgBGEZWlDLlHBJ2o"
      />
      {/* ═══════════════════════════════════════════════════════════════
          1. HEADER — Swiss grid pattern
      ═══════════════════════════════════════════════════════════════ */}
      <section className="hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: "url('https://placehold.net/1920x600.png?text=Maintenance')" }}
        />
        <div className="relative container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-black uppercase">
                Manutenção
                <br />
                <span className="text-brand-red-600">Especializada</span>
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 md:pb-4">
              <div className="border-l-2 border-black pl-6">
                <p className="text-base md:text-lg leading-relaxed text-neutral-600 font-medium">
                  Contratos de manutenção preventiva e corretiva para shopping centers, hospitais e aeroportos com SLA garantido em contrato.
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
        <div className="hidden">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div ref={refResponse} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">{countResponse}h</span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">{m.stats[0].label}</p>
              </div>
              <div ref={refUptime} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">{countUptime}%</span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">{m.stats[1].label}</p>
              </div>
              <div ref={refSLA} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">{countSLA}%</span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">SLA Cumprido</p>
              </div>
              <div ref={refEquip} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">{countEquip}+</span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">Técnicos Especializados</p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ═══════════════════════════════════════════════════════════════
          3. SERVICES — Preventiva vs Corretiva split layout
      ═══════════════════════════════════════════════════════════════ */}
      <FadeIn direction="up" delay={0.15}>
        <div className="border-b shadow ">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            {/* Section label */}
            <div className="pt-20 pb-12">
              <span className="text-2xl font-bold uppercase tracking-widest text-brand-red-600 mb-3 block">
                Nossos Serviços
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-black uppercase leading-[0.9]">
                Preventiva & Corretiva
              </h2>
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 border-t shadow">
              {/* ── Preventiva ── */}
              <div className="border-b lg:border-b-0 lg:border-r border-black/20 p-10 md:p-14 flex flex-col gap-8 group hover:bg-black transition-colors duration-300">
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 items-center rounded-full justify-center bg-black text-white group-hover:bg-white group-hover:text-black transition-colors">
                    <Shield className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-black group-hover:text-white transition-colors">
                      Preventiva
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">
                      Programa recorrente
                    </p>
                  </div>
                </div>

                <p className="text-base leading-relaxed text-neutral-600 group-hover:text-white transition-colors">
                  Inspeções periódicas por programas para calibragem de sensores, lubrificação de engrenagens e teste de sensores e barreiras de segurança. Redução do índice de falhas em até 85%, prolongando a vida útil do automatizador.
                </p>

                <ul className="flex flex-col gap-3">
                  {[
                    "Alinhamento e ajuste das folhas móveis e fixas",
                    "Parametrização e Regulagens de Sensores",
                    "Inspeção de Peças Mecânicas",
                    "Teste de baterias auxiliares de emergência (Quando necessário)",
                    "Limpeza Tecnica",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-neutral-600 group-hover:text-white transition-colors">
                      <CheckCircle className="h-4 w-4 mt-0.5 shrink-0 text-brand-red-600 group-hover:text-brand-red-500 transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4">
                  <Button className="bg-black text-white hover:text-white group-hover:bg-white group-hover:text-black font-bold uppercase tracking-widest px-8 h-12 text-xs transition-colors" asChild>
                    <Link href="/contato">
                      Agendar Preventiva
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* ── Image Column (Quadrado de Assistência Técnica) ── */}
              <div className="relative min-h-[350px] sm:min-h-[450px] lg:min-h-full w-full overflow-hidden bg-neutral-900">
                <Image
                  src="https://res.cloudinary.com/lz9vero5/image/upload/v1787244162/05-85mm-detalhe-tecnico-master_bweaoa.png"
                  alt="Assistência Técnica Automec"
                  fill
                  quality={95}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
      <CtaBlock
        variant="bordered"
        title={m.contract.title}
        highlight={m.contract.highlight}
        highlightOnNewLine
        description={m.contract.description}
        buttonText={m.contract.cta}
      />
    </div>
  );
}
