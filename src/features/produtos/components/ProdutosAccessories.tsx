import { Dictionary } from "@/src/i18n/dictionaries";

interface ProdutosAccessoriesProps {
  dictionary: Dictionary;
}

export function ProdutosAccessories({ dictionary }: ProdutosAccessoriesProps) {
  const t = dictionary.produtos.detail;

  return (
    <section className="border-b border-black">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-0">
          {/* Label */}
          <div className="col-span-12 md:col-span-4 bg-black p-8 md:p-12 flex items-center">
            <h2 className="text-2xl md:text-3xl font-black tracking-[-0.02em] text-white uppercase">
              {t.accessories}
            </h2>
          </div>
          {/* Content */}
          <div className="col-span-12 md:col-span-8 p-8 md:p-12">
            <p className="text-sm leading-relaxed text-neutral-600">
              {t.accessoriesDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
