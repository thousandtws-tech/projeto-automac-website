"use client";

import { AcessoriosHeader } from "@features/acessorios/components/AcessoriosHeader";
import { AcessoriosToolbar } from "@features/acessorios/components/AcessoriosToolbar";
import { AcessoriosGrid } from "@features/acessorios/components/AcessoriosGrid";
import { AcessoriosCTA } from "@features/acessorios/components/AcessoriosCTA";
import { useAcessorios } from "@features/acessorios/hooks/useAcessorios";
import { acessoriosMock } from "@features/acessorios/services/acessorioService";

export default function Acessorios() {
  const { 
    filteredAcessorios, 
    categories, 
    setSearchQuery, 
    setSelectedCategory 
  } = useAcessorios(acessoriosMock);



  return (
    <main className="min-h-screen bg-white text-slate-950">
      <AcessoriosHeader />
      <AcessoriosToolbar
          // @ts-ignore
        categories={categories} 
        onSearch={setSearchQuery} 
        onFilter={setSelectedCategory} 
      />
      <section className="py-24">
        <div className="container mx-auto px-6">
          <AcessoriosGrid items={filteredAcessorios} />
          <AcessoriosCTA />
        </div>
      </section>
    </main>
  );
}
