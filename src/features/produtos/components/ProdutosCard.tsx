import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProdutoItem } from "../types";

interface ProdutosCardProps {
  item: ProdutoItem;
  labels?: {
    badge: string;
    action: string;
  };
}

const fallbackLabels = {
  badge: "Produto Premium",
  action: "Ver Detalhes",
};

export function ProdutosCard({ item, labels }: ProdutosCardProps) {
  const cardLabels = labels ?? fallbackLabels;
  return (
    <div className="h-full group">
      <Link
        href={item.href}
        className={cn(
          "relative flex flex-col h-full border border-black bg-white transition-colors duration-300 hover:bg-neutral-50",
          "after:absolute after:inset-0 after:from-brand-red-500/5 after:to-transparent after:opacity-0 group-hover:after:opacity-100 after:transition-opacity"
        )}
      >
        <div className="relative aspect-video w-full border-b border-black bg-white">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              <Box className="h-3 w-3" />
              {cardLabels.badge}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-red-500">
              {item.title}
            </span>
          </div>
          <h3 className="text-2xl font-black tracking-tighter text-black transition-colors duration-300 group-hover:text-brand-red-500">
            {item.model}
          </h3>

          <div className="mt-auto pt-6 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-red-500 opacity-0 transition-all duration-500 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0">
              {cardLabels.action}
            </span>
            <div className="flex h-10 w-10 items-center justify-center bg-black text-white transition-colors duration-300 group-hover:bg-brand-red-500">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
