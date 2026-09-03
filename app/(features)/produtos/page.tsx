"use client";

import { ProdutosHeader } from "@features/produtos/components/ProdutosHeader";
import { ProdutosGrid } from "@features/produtos/components/ProdutosGrid";
import { produtosMock } from "@features/produtos/services/produtoService";

export default function Produtos() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <ProdutosHeader />
      
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ProdutosGrid items={produtosMock} />
          
          <div className="mt-32 rounded-[48px] bg-slate-900 p-16 lg:p-24 text-center">
            <h3 className="text-4xl lg:text-6xl font-black tracking-tighter text-white">
              TECNOLOGIA PARA <span className="text-brand-red-500">ACESSOS</span>
            </h3>
            <p className="mt-8 text-xl text-white/40 font-medium max-w-xl mx-auto">
              Tecnologia, segurança e design para o seu projeto de automação.
            </p>
            <div className="mt-16">
              <button className="bg-brand-red-600 hover:bg-brand-red-700 text-white rounded-2xl h-20 px-16 text-xl font-black shadow-red-glow transition-all active:scale-95">
                Solicitar Orçamento
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
