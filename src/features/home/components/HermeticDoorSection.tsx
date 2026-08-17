import React from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

export function HermeticDoorSection() {
  return (
    <section className="border-b border-black bg-white py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 border border-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
              <span className="h-2 w-2 bg-black" />
              Tecnologia Exclusiva
            </div>
            
            <h2 className="text-3xl font-black tracking-tighter text-black md:text-4xl lg:text-5xl leading-none">
              A única porta automática<br />
              100% hermética do Brasil!
            </h2>
            
            <p className="text-sm text-neutral-600 leading-relaxed max-w-xl">
              Desenvolvida com a mais alta tecnologia de engenharia, nossas portas herméticas garantem 
              vedação absoluta. A escolha número um para centros cirúrgicos, laboratórios e indústrias 
              que exigem controle rigoroso.
            </p>

            <ul className="flex flex-col gap-3">
              {[
                "Vedação total contra ar, pó e bactérias",
                "Mecanismo de alta durabilidade",
                "Certificação internacional de segurança"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-neutral-700">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white shrink-0">
                    <Check className="h-3 w-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-black px-5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-neutral-800 sm:w-auto sm:px-6">
              <span>Solicitar Orçamento</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-square border-2 border-black bg-white flex items-center justify-center overflow-hidden">
              <Image
                src="https://automec.com.br/wp-content/uploads/2022/05/abnt-tecnologia-automec.png"
                alt="Porta 100% hermética"
                fill
                quality={100}
                className="object-contain p-8 md:p-12"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            <div className="absolute bottom-2 left-2 border-2 border-black bg-white p-3 sm:-bottom-4 sm:-left-4 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-black">ABNT</p>
                  <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Qualidade</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
