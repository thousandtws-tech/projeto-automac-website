import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Dictionary } from "@/src/i18n/dictionaries";

interface ProdutosIdealForProps {
  dictionary: Dictionary;
  items?: string[];
}

export function ProdutosIdealFor({ dictionary, items }: ProdutosIdealForProps) {
  if (!items || items.length === 0) return null;

  const t = dictionary.produtos.detail;

  return (
    <section className="border-b  border-zinc-300">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-0">
          {/* Label */}
          <div className="col-span-12 md:col-span-4 bg-brand-red-500 p-8 md:p-12 flex items-center">
            <h2 className="text-2xl md:text-3xl font-black tracking-[-0.02em] text-white uppercase">
              {t.idealFor}
            </h2>
          </div>
          {/* Items grid */}
          <div className="col-span-12 md:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3">
              {items.map((item, index) => {
                const isLastRow = index >= items.length - (items.length % 3 || 3);
                const isLastInRow = (index + 1) % 3 === 0;
                return (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-3 p-6 md:p-8 border-b border-r border-neutral-200 hover:bg-neutral-50 transition-colors",
                      isLastInRow && "border-r-0",
                      isLastRow && "border-b-0"
                    )}
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-red-500">
                      <Check className="h-3.5 w-3.5 text-brand-red-500" />
                    </div>
                    <span className="text-[13px] font-bold text-black">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
