import { Acessorio } from "../types/acessorio";
import { AcessoriosCard } from "@/components/shadcn-space/card/acessoriosCard";

interface AcessoriosGridProps {
  items: Acessorio[];
  categoryLabels?: Record<string, string>;
}

export function AcessoriosGrid({ items, categoryLabels }: AcessoriosGridProps) {
  return (
    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, index) => (
        <AcessoriosCard
          key={index}
          image={item.image}
          title={item.title}
          description={item.description}
          category={categoryLabels?.[item.category] ?? item.category}
          href="#"
        />
      ))}
    </div>
  );
}
