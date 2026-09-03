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
  historySub: `Desde 1991, fomos construindo uma empresa sólida, sempre com o propósito de atender projetos mais elaborados e mais exigentes — hospitais, indústrias, shoppings, hotéis e empresas de todo o Brasil.

Chegamos até aqui acreditando em nosso maior patrimônio: PESSOAS.

Agradecemos profundamente a todos os profissionais que fizeram parte da nossa história e, especialmente, àqueles que permanecem conosco ao longo desses anos.

Hoje, contamos com uma equipe de 70 técnicos especializados, presente em todas as capitais do Brasil, com forte atuação no Estado de São Paulo.

São 35 anos de experiência, aprendizado e confiança construída dia após dia.

Nosso eterno agradecimento a todos os nossos colaboradores.
Vocês são, e sempre serão, o nosso maior patrimônio.`,
  historyButton: "Conheça Nossa História",
  credibilityTitle: "Credibilidade",
  credibilityDesc: "",
  videoLabel: "Conheça nossa fábrica",
  ctaTitle: "Seu projeto pode ser o nosso próximo case de sucesso.",
  ctaButton: "Solicite um orçamento",
};

export function SobreContent({ content }: SobreContentProps) {
  const currentContent = content ?? fallbackContent;

  return (
    <section className="bg-white">
      <HistoryVideoSection content={currentContent} splitStory />
      <CtaBlock
        variant="red"
        title={currentContent.ctaTitle}
        buttonText={currentContent.ctaButton}
      />
    </section>
  );
}
