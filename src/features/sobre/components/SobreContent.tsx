import { CtaBlock } from "@shared/components/CtaBlock";
import { HistoryVideoSection } from "./HistoryVideoSection";

interface SobreContentProps {
  content?: {
    historyTitle: string;
    historySub: string;
    historyButton: string;
    credibilityTitle: string;
    credibilityDesc: string;
    videoLabel: string;
    ctaTitle: string;
    ctaButton: string;
  };
}

const fallbackContent = {
  historyTitle: "Nossa História",
  historySub:
    "Veja neste vídeo o que a Automec consolidou\nnestes 35 anos de história",
  historyButton: "Conheça Nossa História",
  credibilityTitle: "Credibilidade",
  credibilityDesc:
    "A empresa é reconhecida por sua sólida credibilidade e pelo compromisso inequívoco em satisfazer plenamente seus clientes.",
  videoLabel: "Conheça nossa fábrica",
  ctaTitle: "Faça parte da história de mais de 30 mil portas instaladas",
  ctaButton: "Solicitar Orçamento",
};

export function SobreContent({ content }: SobreContentProps) {
  const currentContent = content ?? fallbackContent;

  return (
    <section className="bg-white">
      <HistoryVideoSection content={currentContent} />
      <CtaBlock
        variant="red"
        title={currentContent.ctaTitle}
        buttonText={currentContent.ctaButton}
      />
    </section>
  );
}
