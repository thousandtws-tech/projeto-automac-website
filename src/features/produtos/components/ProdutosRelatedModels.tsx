import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Dictionary } from "@/src/i18n/dictionaries";

interface ProdutosRelatedModelsProps {
  dictionary: Dictionary;
  categoryLabel?: string;
  categoryHref?: string;
}

export function ProdutosRelatedModels({ dictionary, categoryLabel, categoryHref }: ProdutosRelatedModelsProps) {
  if (!categoryLabel || !categoryHref) return null;

  const t = dictionary.produtos.detail;

  return (
    <section className="border-b border-black">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-0">
          {/* Label */}
          <div className="col-span-12 md:col-span-4 bg-black p-8 md:p-12 flex items-center">
            <h2 className="text-2xl md:text-3xl font-black tracking-[-0.02em] text-white uppercase">
              {t.otherModels}
            </h2>
          </div>
          {/* CTA */}
          <div className="col-span-12 md:col-span-8 p-8 md:p-12 flex flex-col justify-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">
              {t.confiraOutros}
            </p>
            <Link
              href={categoryHref}
              className="group inline-flex items-center gap-4 text-3xl md:text-4xl font-black tracking-[-0.02em] text-brand-red-500 hover:text-brand-red-700 transition-colors uppercase"
            >
              {categoryLabel}
              <ArrowRight className="h-8 w-8 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
