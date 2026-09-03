"use client";

import { ProdutosGrid } from "@features/produtos/components/ProdutosGrid";
import { produtosMock } from "@features/produtos/services/produtoService";
import { FadeIn } from "@/components/fade-in";
import { CtaBlock } from "@shared/components/CtaBlock";
import type { Locale } from "@/src/i18n/config";

export function ProdutosClient({ locale, dictionary }: { locale: Locale; dictionary: any }) {
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <FadeIn direction="up" delay={0.15}>
            <div>
              <ProdutosGrid locale={locale} items={produtosMock} labels={{ badge: dictionary.produtos.cardBadge, action: dictionary.produtos.cardAction }} />
            </div>
          </FadeIn>
        </div>
      </section>
      <CtaBlock
        variant="white"
        title={dictionary.produtos.productPageCtaTitle}
        highlight={dictionary.produtos.productPageCtaHighlight}
        description={dictionary.produtos.ctaDescription}
        buttonText={dictionary.produtos.ctaButton}
      />
    </>
  );
}
