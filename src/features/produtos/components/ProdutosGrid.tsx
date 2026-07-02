import { Locale } from "@/src/i18n/config";
import { ProdutoItem } from "../types";
import { ProdutosCard } from "./ProdutosCard";

interface ProdutosGridProps {
  locale?: Locale;
  items: ProdutoItem[];
  labels?: {
    badge: string;
    action: string;
  };
}

export function ProdutosGrid({ locale = "pt-BR", items, labels }: ProdutosGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <ProdutosCard key={item.id} locale={locale} item={item} labels={labels} />
      ))}
    </div>
  );
}
