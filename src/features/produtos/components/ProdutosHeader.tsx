interface ProdutosHeaderProps {
  content?: {
    titleLine1: string;
    titleLine2: string;
    description: string;
  };
}

const fallbackContent = {
  titleLine1: "MODELOS",
  titleLine2: "DISPONÍVEIS",
  description:
    "Conheça nossa gama completa de portas automáticas, desenvolvidas com tecnologia de ponta para atender aos mais diversos segmentos e necessidades arquitetônicas.",
};

export function ProdutosHeader({ content }: ProdutosHeaderProps) {
  const headerContent = content ?? fallbackContent;
  return (
    <section className="relative border-b border-neutral-200 bg-white pt-50 pb-10 shadow-[0_4px_16px_rgba(0,0,0,0.025)] md:pt-50 md:pb-10">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('https://placehold.net/1920x600.png?text=Automec')" }}
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
            <div className="border-l-2 border-neutral-300 pl-6">
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
