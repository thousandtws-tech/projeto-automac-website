import { Target, Eye, Heart } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { CtaBlock } from "@shared/components/CtaBlock";
import { HistoryVideoSection } from "./HistoryVideoSection";

interface SobreContentProps {
  content?: {
    stats: readonly { readonly label: string }[];
    historyTitle: string;
    historySub: string;
    historyButton: string;
    credibilityTitle: string;
    credibilityDesc: string;
    videoLabel: string;
    videoDuration: string;
    diretrizesLabel: string;
    pilaresTitle: string;
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
    valuesTitle: string;
    valuesDesc: string;
    ctaTitle: string;
    ctaButton: string;
  };
}

const fallbackContent = {
  stats: [
    { label: "Anos de Mercado" },
    { label: "Portas Instaladas" },
    { label: "Fabricação Própria" },
    { label: "Suporte Técnico" },
  ],
  historyTitle: "Nossa História",
  historySub: "Veja neste vídeo o que a Automec consolidou nestes 35 anos de história",
  historyButton: "Conheça Nossa História",
  credibilityTitle: "Credibilidade",
  credibilityDesc: "A empresa é reconhecida por sua sólida credibilidade e pelo compromisso inequívoco em satisfazer plenamente seus clientes.",
  videoLabel: "Conheça nossa fábrica",
  videoDuration: "02:45",
  diretrizesLabel: "DIRETRIZES",
  pilaresTitle: "Pilares Corporativos",
  missionTitle: "Missão",
  missionDesc: "Facilitar o acesso de todas as pessoas com tecnologia e segurança.",
  visionTitle: "Visão",
  visionDesc: "Melhoria contínua de seus produtos, contribuindo com a modernização e acessibilidade.",
  valuesTitle: "Valores",
  valuesDesc: "Valorizamos pessoas e talentos; alicerçados com tecnologia e inovação.",
  ctaTitle: "Faça parte da história de mais de 30 mil portas instaladas",
  ctaButton: "Solicitar Orçamento",
};

export function SobreContent({ content }: SobreContentProps) {
  const c = content ?? fallbackContent;

  return (
    <section className="bg-white">
      {/* 2. History Section */}
      <HistoryVideoSection content={c} />

      {/* 3. Mission, Vision, Values */}
      <FadeIn direction="up" delay={0.3}>
        <div className="py-20 md:py-32">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-20">
              <span className="text-md font-bold uppercase tracking-widest text-brand-red-600 mb-4 block">
                {c.diretrizesLabel}
              </span>
              <h3 className="text-4xl sm:text-5xl lg:text-5xl font-black tracking-tighter text-black">
                {c.pilaresTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Missão */}
              <div className="border border-black bg-white p-10 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:bg-black hover:text-white group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white mb-8 group-hover:bg-white group-hover:text-black">
                  <Target className="h-8 w-8" />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-4">
                  {c.missionTitle}
                </h4>
                <p className="text-base leading-relaxed opacity-80">
                  {c.missionDesc}
                </p>
              </div>

              {/* Visão */}
              <div className="border border-black bg-white p-10 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:bg-black hover:text-white group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white mb-8 group-hover:bg-white group-hover:text-black">
                  <Eye className="h-8 w-8" />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-4">
                  {c.visionTitle}
                </h4>
                <p className="text-base leading-relaxed opacity-80">
                  {c.visionDesc}
                </p>
              </div>

              {/* Valores */}
              <div className="border border-black bg-white p-10 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:bg-brand-red-600 hover:text-white group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red-600 text-white mb-8 group-hover:bg-white group-hover:text-brand-red-600">
                  <Heart className="h-8 w-8" />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-4">
                  {c.valuesTitle}
                </h4>
                <p className="text-base leading-relaxed opacity-80">
                  {c.valuesDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 4. CTA Section */}
      <CtaBlock
        variant="red"
        title={c.ctaTitle}
        buttonText={c.ctaButton}
      />

    </section>
  );
}
