import { ProdutoItem } from "../types";
import { ProdutosCard } from "./ProdutosCard";

interface ProdutosGridProps {
  items: ProdutoItem[];
  labels?: {
    badge: string;
    action: string;
  };
}

export function ProdutosGrid({ items, labels }: ProdutosGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <ProdutosCard key={item.id} item={item} labels={labels} />
      ))}
    </div>
  );
}
