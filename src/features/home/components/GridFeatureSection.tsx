import React from "react";
import Image from "next/image";
import { Settings, ShieldCheck } from "lucide-react";

export function GridFeatureSection() {
  // Minimalist design system technical node
  const Node = ({ className }: { className: string }) => (
    <div className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 hidden xl:flex items-center justify-center ${className}`}>
      <div className="h-6 w-6 rounded-full border border-[#E5E7EB] bg-[#F5F5F5] flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-black" />
      </div>
    </div>
  );

  return (
    <section className="border-b border-black bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 xl:grid-cols-2 border border-black">
          
          {/* QUADRANT 1: Top-Left */}
          <div className="relative w-full h-[300px] sm:h-[380px] xl:h-[500px] overflow-hidden border-b border-black xl:border-b-0 xl:border-r border-black">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
              alt="Arquitetura de Precisão Automec"
              fill
              quality={100}
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 50vw"
            />
          </div>

          {/* QUADRANT 2: Top-Right */}
          <div className="flex flex-col justify-center items-start p-8 sm:p-10 xl:p-16 bg-white border-b border-black xl:border-b-0">
            <div className="inline-flex items-center gap-2 border border-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black mb-5">
              <Settings className="h-3 w-3" />
              Alta Engenharia
            </div>
            
            <h3 className="text-2xl sm:text-3xl xl:text-4xl font-black tracking-tighter text-black leading-none mb-4">
              Projetos sob medida para ambientes exigentes.
            </h3>
            
            <p className="text-sm text-neutral-600 leading-relaxed max-w-md">
              Aliamos estética minimalista com mecânica industrial de alta precisão para garantir fluxos contínuos e seguros.
            </p>
          </div>

          {/* QUADRANT 3: Bottom-Left */}
          <div className="flex flex-col justify-center items-start p-8 sm:p-10 xl:p-16 bg-white border-b border-black xl:border-b-0 xl:border-r border-black">
            <div className="inline-flex items-center gap-2 border border-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black mb-5">
              <ShieldCheck className="h-3 w-3" />
              Durabilidade
            </div>
            
            <h3 className="text-2xl sm:text-3xl xl:text-4xl font-black tracking-tighter text-black leading-none mb-4">
              Materiais rigorosamente testados e homologados.
            </h3>
            
            <p className="text-sm text-neutral-600 leading-relaxed max-w-md">
              Estruturas robustas projetadas para suportar milhões de ciclos ininterruptos com máxima eficiência energética.
            </p>
          </div>

          {/* QUADRANT 4: Bottom-Right */}
          <div className="relative w-full h-[300px] sm:h-[380px] xl:h-[500px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
              alt="Performance e Tecnologia Automec"
              fill
              quality={100}
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 50vw"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
