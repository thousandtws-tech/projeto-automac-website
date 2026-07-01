import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/ui/cta-section-with-gallery";
import { Button } from "@/components/ui/button";

const IMAGES = [
  "https://placehold.net/600x400.png",
  "https://placehold.net/600x400.png",
  "https://placehold.net/600x400.png",
  "https://placehold.net/600x400.png",
];

export const AboutDemo = () => {
  return (
    <section className="border-b border-black bg-brand-red-600 py-12 md:py-16 lg:py-20">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <ContainerStagger className="flex flex-col items-start text-left">
          <ContainerAnimated className="mb-3 block text-xs md:text-sm font-bold uppercase tracking-widest text-white/70">
            TECNOLOGIA & SEGURANÇA
          </ContainerAnimated>

          <ContainerAnimated className="text-3xl md:text-5xl lg:text-6xl font-black leading-none tracking-tighter text-white uppercase">
            Inovando acessos com <span className="text-white underline decoration-white/30 underline-offset-4">alta performance</span>
          </ContainerAnimated>

          <ContainerAnimated className="my-5 text-sm text-white/80 leading-relaxed md:text-lg lg:text-xl">
            Desde 1993, a Automec desenvolve soluções sob medida em portas automáticas
            deslizantes, telescópicas e herméticas. Combinamos mecânica de alta precisão
            e design premium para valorizar a arquitetura e otimizar fluxos corporativos.
          </ContainerAnimated>

          <ContainerAnimated>
            <Button className="bg-white text-brand-red-600 hover:bg-white/90 font-bold uppercase tracking-widest px-8 h-12 transition-colors">
              Solicitar Orçamento
            </Button>
          </ContainerAnimated>
        </ContainerStagger>

        <GalleryGrid className="p-2">
          {IMAGES.map((imageUrl, index) => (
            <GalleryGridCell
              index={index}
              key={index}
              className="relative overflow-hidden border border-white/30 transition-all duration-300 hover:border-white hover:scale-[1.02]"
            >
              <img
                className="size-full object-cover object-center"
                width="100%"
                height="100%"
                src={imageUrl}
                alt="Galeria Automec"
              />
            </GalleryGridCell>
          ))}
        </GalleryGrid>
      </div>
    </section>
  );
};
