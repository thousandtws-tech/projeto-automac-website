"use client";

import { ProdutosGrid } from "@features/produtos/components/ProdutosGrid";
import { produtosMock } from "@features/produtos/services/produtoService";
import { FadeIn } from "@/components/fade-in";

export function ProdutosClient({ dictionary }: { dictionary: any }) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <FadeIn direction="up" delay={0.1}>
          <ProdutosGrid items={produtosMock} labels={{ badge: dictionary.produtos.cardBadge, action: dictionary.produtos.cardAction }} />
        </FadeIn>

        <FadeIn direction="up" delay={0.3}>
          <div className="mt-32 border-2 border-black bg-white p-12 md:p-20">
            <div className="grid grid-cols-12 gap-6 items-center">
              <div className="col-span-12 md:col-span-8">
                <h3 className="text-4xl font-black tracking-tighter text-black lg:text-6xl leading-none">
                  {dictionary.produtos.ctaTitle} <span className="text-brand-red-500">{dictionary.produtos.ctaHighlight}</span>
                </h3>
                <p className="mt-4 text-base text-neutral-600 max-w-xl">{dictionary.produtos.ctaDescription}</p>
              </div>
              <div className="col-span-12 md:col-span-4 md:text-right">
                <button className="inline-flex h-14 items-center cursor-pointer justify-center bg-brand-red-500 px-8 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-red-600">
                  {dictionary.produtos.ctaButton}
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
