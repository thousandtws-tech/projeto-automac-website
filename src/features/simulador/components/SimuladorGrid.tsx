import { SimuladorItem } from "../types";
import { SimuladorCard } from "./SimuladorCard";

interface SimuladorGridProps {
  items: SimuladorItem[];
  labels?: {
    badge: string;
    action: string;
  };
  categories?: Record<string, string>;
}

export function SimuladorGrid({ items, labels, categories }: SimuladorGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <SimuladorCard key={item.id} item={item} labels={labels} categories={categories} />
      ))}
    </div>
  );
}
