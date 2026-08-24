"use client";

interface SobreHeaderProps {
  content?: {
    titleLine1: string;
    titleLine2: string;
    description: string;
  };
}

const fallbackContent = {
  titleLine1: "SOBRE A",
  titleLine2: "AUTOMEC",
  description: "Desde 1993, lideramos a modernização de acessos no Brasil, projetando e instalando portas automáticas com tecnologia proprietária.",
};

export function SobreHeader({ content }: SobreHeaderProps) {
  const headerContent = content ?? fallbackContent;
  return (
    <section className="relative border-b border-black bg-white pt-36 pb-16 md:pt-40 md:pb-20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('https://placehold.net/1920x600.png?text=Automec+Since+1993')" }}
      />
      <div className="relative container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <h1 className="text-4xl font-bold uppercase leading-[1.2] tracking-tight text-black sm:text-5xl lg:text-5xl">
              {headerContent.titleLine1}
              <br />
              <span>{headerContent.titleLine2}</span>
            </h1>
          </div>
          <div className="col-span-12 md:col-span-4 md:pb-4">
            <div className="border-l-2 border-black pl-6">
              <p className="text-base md:text-lg leading-relaxed text-neutral-600 font-medium">
                {headerContent.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
