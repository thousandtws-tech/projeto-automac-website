import Image from "next/image";
import { Download, Eye, ExternalLink } from "lucide-react";
import { Dictionary } from "@/src/i18n/dictionaries";
import { ProdutoCatalogItem } from "../types";

interface ProdutosCatalogSectionProps {
  dictionary: Dictionary;
  catalog?: ProdutoCatalogItem[];
}

const iconMap = {
  download: Download,
  view: Eye,
  external: ExternalLink,
};

export function ProdutosCatalogSection({ dictionary, catalog }: ProdutosCatalogSectionProps) {
  if (!catalog || catalog.length === 0) return null;

  const t = dictionary.produtos.detail;

  return (
    <section className="border-b border-black">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="border-b border-black py-8">
          <h2 className="text-2xl md:text-3xl font-black tracking-[-0.02em] text-black uppercase">
            {t.resources}
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black">
          {catalog.map((item, index) => (
            <div
              key={index}
              className="flex flex-col p-8 md:p-10 group hover:bg-neutral-50 transition-colors"
            >
              <h3 className="text-base font-black tracking-[-0.01em] text-black uppercase mb-8">
                {item.title}
              </h3>

              <div className="relative w-full aspect-[4/3] mb-8 bg-neutral-100 border border-neutral-200">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-contain p-6"
                />
              </div>

              <div className="flex flex-col gap-3 mt-auto">
                {item.actions.map((action, actionIndex) => {
                  const Icon = iconMap[action.icon];
                  return (
                    <a
                      key={actionIndex}
                      href={action.href}
                      className="inline-flex items-center justify-center gap-2.5 bg-brand-red-500 hover:bg-brand-red-700 text-white px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors"
                    >
                      {action.label}
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
