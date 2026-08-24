import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { Locale, withLocale } from "@/src/i18n/config";
import { ProdutoItem } from "../types";
import { FormattedTrademark } from "@shared/components/FormattedTrademark";

interface ProdutosCardProps {
  locale: Locale;
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

export function ProdutosCard({ locale, item, labels }: ProdutosCardProps) {
  const cardLabels = labels ?? fallbackLabels;
  const p = item.i18n[locale] || item.i18n["pt-BR"];

  return (
    <div className="h-full group">
      <Link
        href={withLocale(locale, item.href)}
        className={cn(
          "relative flex flex-col h-full border border-neutral-200 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
          "after:absolute after:inset-0 after:from-brand-red-500/5 after:to-transparent after:opacity-0 group-hover:after:opacity-100 after:transition-opacity"
        )}
      >
        <div className="relative aspect-video w-full border-b border-neutral-200 bg-white">
          <Image
            src={item.image}
            alt={p.title}
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
          <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-red-500">
            <FormattedTrademark text={item.model} />
          </span>
          <h3 className="text-xl font-black uppercase leading-tight tracking-tighter text-black transition-colors duration-300 group-hover:text-brand-red-500 sm:text-2xl">
            {p.title}
          </h3>
          {p.acronymMeaning && (
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {p.acronymMeaning}
            </p>
          )}
          {p.description && (
            <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-2">
              {p.description}
            </p>
          )}

          <div className="mt-auto pt-6 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-red-500 opacity-0 transition-all duration-500 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0">
              {cardLabels.action}
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-colors duration-300 group-hover:bg-brand-red-500">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
