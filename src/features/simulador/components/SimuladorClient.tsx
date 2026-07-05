"use client";

import { SimuladorGrid } from "@features/simulador/components/SimuladorGrid";
import { simuladoresMock } from "@features/simulador/services/simuladorService";
import { FadeIn } from "@/components/fade-in";
import { CtaBlock } from "@shared/components/CtaBlock";

export function SimuladorClient({ dictionary }: { dictionary: any }) {
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <FadeIn direction="up" delay={0.1}>
            <SimuladorGrid
              items={simuladoresMock}
              labels={{ badge: dictionary.simulador.cardBadge, action: dictionary.simulador.cardAction }}
              categories={dictionary.simulador.categories}
            />
          </FadeIn>
        </div>
      </section>
      <CtaBlock
        variant="white"
        title={dictionary.simulador.ctaTitle}
        highlight={dictionary.simulador.ctaHighlight}
        description={dictionary.simulador.ctaDescription}
        buttonText={dictionary.simulador.ctaButton}
      />
    </>
  );
}
