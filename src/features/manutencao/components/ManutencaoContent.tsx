"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Wrench,
  Shield,
  Clock,
  PhoneCall,
  ClipboardCheck,
  CheckCircle,
  ShieldCheck,
  HeartPulse,
  Building2,
  Factory,
  Stethoscope,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";

function useCountUp(end: number, duration: number = 2000, suffix: string = "") {
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

  return { count, ref, suffix };
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

export function ManutencaoContent() {
  const { count: countResponse, ref: refResponse } = useCountUp(4, 2000);
  const { count: countUptime, ref: refUptime } = useCountUp(99, 2000);
  const { count: countSLA, ref: refSLA } = useCountUp(100, 2000);
  const { count: countEquip, ref: refEquip } = useCountUp(120, 2000);

  return (
    <div className="w-full">
      {/* ═══════════════════════════════════════════════════════════════
          1. HEADER — Swiss grid pattern
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative border-b border-black bg-white pt-36 pb-16 md:pt-40 md:pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: "url('https://placehold.net/1920x600.png?text=Maintenance')" }}
        />
        <div className="relative container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.85] text-black uppercase">
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
        <div className="border-b border-black py-16 md:py-20">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div ref={refResponse} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">{countResponse}h</span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">Tempo de Resposta</p>
              </div>
              <div ref={refUptime} className="text-center md:text-left">
                <span className="text-5xl sm:text-6xl font-black text-brand-red-600 tracking-tighter">{countUptime}%</span>
                <p className="text-sm font-bold uppercase tracking-widest text-black mt-2">Uptime Garantido</p>
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
        <div className="border-b border-black">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            {/* Section label */}
            <div className="pt-20 pb-12">
              <span className="text-sm font-bold uppercase tracking-widest text-brand-red-600 mb-3 block">
                Nossos Serviços
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-black uppercase leading-[0.9]">
                Preventiva & Corretiva
              </h2>
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-black">
              {/* ── Preventiva ── */}
              <div className="border-b lg:border-b-0 lg:border-r border-black p-10 md:p-14 flex flex-col gap-8 group hover:bg-black transition-colors duration-300">
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 items-center justify-center bg-black text-white group-hover:bg-white group-hover:text-black transition-colors">
                    <Shield className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-black group-hover:text-white transition-colors">
                      Preventiva
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 group-hover:text-white/50 transition-colors">
                      Programa recorrente
                    </p>
                  </div>
                </div>

                <p className="text-base leading-relaxed text-neutral-600 group-hover:text-white/70 transition-colors">
                  Inspeções periódicas programadas para calibrar sensores, lubrificar engrenagens e testar barreiras de segurança. Reduz o índice de falhas em até 85%, estendendo a vida útil do automatizador.
                </p>

                <ul className="flex flex-col gap-3">
                  {[
                    "Alinhamento e folga das folhas de vidro",
                    "Calibração analítica de radares de presença",
                    "Inspeção de correias e rolamentos",
                    "Teste de baterias auxiliares de emergência",
                    "Lubrificação preventiva de trilhos e engrenagens",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-neutral-600 group-hover:text-white/70 transition-colors">
                      <CheckCircle className="h-4 w-4 mt-0.5 shrink-0 text-brand-red-600 group-hover:text-brand-red-500 transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4">
                  <Button className="bg-black text-white hover:bg-neutral-800 group-hover:bg-white group-hover:text-black font-bold uppercase tracking-widest px-8 h-12 text-xs transition-colors" asChild>
                    <Link href="/contato">
                      Agendar Preventiva
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* ── Corretiva ── */}
              <div className="p-10 md:p-14 flex flex-col gap-8 group hover:bg-brand-red-600 transition-colors duration-300">
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 items-center justify-center bg-brand-red-600 text-white group-hover:bg-white group-hover:text-brand-red-600 transition-colors">
                    <Zap className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-black group-hover:text-white transition-colors">
                      Corretiva 24h
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 group-hover:text-white/50 transition-colors">
                      Emergência imediata
                    </p>
                  </div>
                </div>

                <p className="text-base leading-relaxed text-neutral-600 group-hover:text-white/70 transition-colors">
                  Atendimento de emergência imediato para correção de pane técnica ou travamento mecânico. Técnicos carregam estoques de peças originais para resolução na primeira visita.
                </p>

                <ul className="flex flex-col gap-3">
                  {[
                    "Plantão técnico de suporte 24h por dia",
                    "Substituição de motores e placas de comando",
                    "Peças de reposição originais e certificadas",
                    "SLA rápido para hospitais e aeroportos",
                    "Relatório técnico pós-atendimento incluído",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-neutral-600 group-hover:text-white/70 transition-colors">
                      <CheckCircle className="h-4 w-4 mt-0.5 shrink-0 text-brand-red-600 group-hover:text-white transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4">
                  <Button className="bg-brand-red-600 text-white hover:bg-brand-red-700 group-hover:bg-white group-hover:text-brand-red-600 font-bold uppercase tracking-widest px-8 h-12 text-xs transition-colors" asChild>
                    <Link href="/contato">
                      Chamar Emergência
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
          4. PROCESS FLOW — Clean numbered steps
      ═══════════════════════════════════════════════════════════════ */}
      <FadeIn direction="up" delay={0.2}>
        <div className="border-b border-black py-20 md:py-28">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-sm font-bold uppercase tracking-widest text-brand-red-600 mb-3 block">
                Fluxo de Atendimento
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-black uppercase leading-[0.9]">
                Do Chamado à Resolução
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-black">
              {processSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className={`p-8 md:p-10 flex flex-col gap-6 ${
                      idx < processSteps.length - 1 ? "border-b md:border-b-0 md:border-r border-black" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-black text-brand-red-600 tracking-tighter leading-none">
                        {step.num}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center bg-black text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase tracking-tight text-black mb-2">
                        {step.title}
                      </h4>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {step.desc}
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
          5. INDUSTRIES — Who we serve
      ═══════════════════════════════════════════════════════════════ */}
      <FadeIn direction="up" delay={0.25}>
        <div className="border-b border-black py-20 md:py-28">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-stretch">
              {/* Left label */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-sm font-bold uppercase tracking-widest text-brand-red-600 mb-3 block">
                    Segmentos Atendidos
                  </span>
                  <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-black uppercase leading-[0.85] mb-8">
                    Portas que<br />não podem<br />parar
                  </h2>
                </div>
                <Button className="bg-black text-white hover:bg-neutral-800 font-bold uppercase tracking-widest px-8 h-12 text-xs self-start" asChild>
                  <Link href="/contato">
                    Ver Todos os Segmentos
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Right grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-black">
                {industries.map((ind, idx) => {
                  const Icon = ind.icon;
                  return (
                    <div
                      key={ind.title}
                      className={`p-8 flex flex-col gap-4 ${
                        idx < industries.length - 2 ? "border-b sm:border-b-0 sm:border-r border-black" : ""
                      } ${idx === industries.length - 2 ? "border-b border-black sm:border-b-0" : ""} ${idx % 2 === 0 ? "sm:border-r border-black" : ""}`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center bg-black text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h4 className="text-lg font-black uppercase tracking-tight text-black">
                        {ind.title}
                      </h4>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {ind.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ═══════════════════════════════════════════════════════════════
          6. CONTRACT SLA — Professional CTA
      ═══════════════════════════════════════════════════════════════ */}
      <FadeIn direction="up" delay={0.3}>
        <div className="py-20 md:py-28">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="border-2 border-black p-10 md:p-16 lg:p-20">
              <div className="grid grid-cols-12 gap-8 items-center">
                <div className="col-span-12 lg:col-span-7">
                  <span className="text-sm font-bold uppercase tracking-widest text-brand-red-600 mb-4 block">
                    Contrato Corporativo
                  </span>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-black uppercase leading-[0.9] mb-4">
                    SLA garantido em contrato e{" "}
                    <span className="text-brand-red-600">peças originais</span>
                  </h3>
                  <p className="text-base text-neutral-600 max-w-xl leading-relaxed">
                    Grandes redes necessitam de confiabilidade contínua. Solicite uma visita comercial para elaborarmos um contrato de manutenção personalizada com tempos de resposta garantidos.
                  </p>
                </div>
                <div className="col-span-12 lg:col-span-5 lg:text-right">
                  <Button className="bg-brand-red-600 text-white hover:bg-brand-red-700 font-bold uppercase tracking-widest px-10 h-14 text-sm" asChild>
                    <Link href="/contato">
                      Orçar Contrato
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
          7. CTA — Full-width red section
      ═══════════════════════════════════════════════════════════════ */}
      <FadeIn direction="up" delay={0.35}>
        <div className="border-t border-black bg-brand-red-600 py-20 md:py-28">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <h4 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[0.9] uppercase">
                  Portas que não podem parar<br />
                  <span className="text-white/80">precisam de manutenção que não falha</span>
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
