import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="border-b border-black bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-20 items-center">
          
          <div className="flex flex-col items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-red-500 mb-3">
              Suporte Técnico
            </span>
            <h2 className="text-3xl sm:text-4xl font-black leading-none tracking-tighter text-black mb-5">
              MANUTENÇÃO <br />
              <span className="text-brand-red-500">RÁPIDA E EFICAZ</span>
            </h2>
            
            <p className="text-sm text-neutral-700 leading-relaxed max-w-xl mb-3">
              Nossa manutenção é rápida e eficaz, com um excelente pós-venda. 
              Oferecemos aos nossos clientes uma assistência técnica premium em todo o Brasil.
            </p>
            
            <p className="text-sm text-neutral-500 leading-relaxed max-w-xl mb-6">
              Garantimos o pleno funcionamento de suas portas automáticas com visitas preventivas 
              e atendimento corretivo emergencial. Conte com peças originais e técnicos homologados.
            </p>

            <div className="flex items-center gap-5">
              <Link
                href="/contato"
                className="inline-flex h-11 items-center justify-center gap-2 bg-brand-red-500 px-6 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-red-600"
              >
                <span>Saiba mais</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/servicos"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black hover:text-brand-red-500 transition-colors"
              >
                <span>Assistência</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="flex justify-center xl:justify-end items-center relative py-8 xl:py-0">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 overflow-hidden rotate-45 border-2 border-black bg-neutral-100">
              <div className="absolute w-[142%] h-[142%] -top-[21%] -left-[21%] -rotate-45">
                <Image
                  src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80"
                  alt="Técnico de Manutenção Automec"
                  fill
                  quality={100}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            
            <div className="absolute bottom-6 left-1/3 z-20 flex h-14 w-14 items-center justify-center bg-brand-red-500 text-white text-3xl font-black">
              A
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
