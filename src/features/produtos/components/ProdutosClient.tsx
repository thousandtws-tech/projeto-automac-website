"use client";

import { ProdutosGrid } from "@features/produtos/components/ProdutosGrid";
import { ProdutosVideoGrid } from "@features/produtos/components/ProdutosVideoGrid";
import { produtosMock } from "@features/produtos/services/produtoService";
import { FadeIn } from "@/components/fade-in";
import { CtaBlock } from "@shared/components/CtaBlock";
import type { Locale } from "@/src/i18n/config";

export function ProdutosClient({ locale, dictionary }: { locale: Locale; dictionary: any }) {
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <FadeIn direction="up" delay={0.1}>
            <div className="border-b border-black pb-16">
              <ProdutosVideoGrid
                locale={locale}
                items={produtosMock}
                labels={{
                  badge: "Vídeo",
                }}
              />
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <div className="pt-16">
              <ProdutosGrid locale={locale} items={produtosMock} labels={{ badge: dictionary.produtos.cardBadge, action: dictionary.produtos.cardAction }} />
            </div>
          </FadeIn>
        </div>
      </section>
      <CtaBlock
        variant="white"
        title={dictionary.produtos.ctaTitle}
        highlight={dictionary.produtos.ctaHighlight}
        description={dictionary.produtos.ctaDescription}
        buttonText={dictionary.produtos.ctaButton}
      />
    </>
  );
}
