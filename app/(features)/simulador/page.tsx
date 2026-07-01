"use client";

import { SimuladorHeader } from "@features/simulador/components/SimuladorHeader";
import { SimuladorGrid } from "@features/simulador/components/SimuladorGrid";
import { simuladoresMock } from "@features/simulador/services/simuladorService";

export default function Simulador() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SimuladorHeader />
      
      <section className="py-24">
        <div className="container mx-auto px-6">
          <SimuladorGrid items={simuladoresMock} />
          
          <div className="mt-32 rounded-[48px] bg-slate-900 p-16 lg:p-24 text-center">
            <h3 className="text-4xl lg:text-6xl font-black tracking-tighter text-white">
              PRECISA DE <span className="text-brand-red-500">SUPORTE?</span>
            </h3>
            <p className="mt-8 text-xl text-white/40 font-medium max-w-xl mx-auto">
              Nossa equipe técnica está pronta para auxiliar na configuração do seu projeto.
            </p>
            <div className="mt-16">
              <button className="bg-brand-red-600 hover:bg-brand-red-700 text-white rounded-2xl h-20 px-16 text-xl font-black shadow-red-glow transition-all active:scale-95">
                Contatar Engenharia
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
