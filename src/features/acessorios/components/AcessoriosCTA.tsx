import { CtaBlock } from "@shared/components/CtaBlock";

interface AcessoriosCTAProps {
  content?: {
    title: string;
    highlight: string;
    description: string;
    button: string;
  };
}

const fallbackContent = {
  title: "PROJETOS",
  highlight: "CUSTOMIZADOS",
  description: "Temos soluções personalizadas para desafios complexos de engenharia de acesso.",
  button: "Falar com Especialista",
};

export function AcessoriosCTA({ content }: AcessoriosCTAProps) {
  const c = content ?? fallbackContent;
  return (
    <CtaBlock
      variant="white"
      title={c.title}
      highlight={c.highlight}
      description={c.description}
      buttonText={c.button}
    />
  );
}
