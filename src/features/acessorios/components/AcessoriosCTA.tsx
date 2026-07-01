"use client";

import { Button } from "@/components/ui/button";

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
  const ctaContent = content ?? fallbackContent;
  return (
    <div className="mt-32">
      <div className="border-2 border-black bg-white p-12 md:p-20">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 md:col-span-8">
            <h3 className="text-4xl font-black tracking-tighter text-black lg:text-6xl leading-none">
              {ctaContent.title} <span className="text-brand-red-500">{ctaContent.highlight}</span>
            </h3>
            <p className="mt-4 text-base text-neutral-600 max-w-xl">{ctaContent.description}</p>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <Button className="inline-flex h-14 items-center justify-center bg-brand-red-500 px-8 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-red-600">
              {ctaContent.button}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
