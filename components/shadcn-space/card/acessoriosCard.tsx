import { ArrowRight, Box } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  href: string;
  category?: string;
  viewDetails?: string;
}

export function AcessoriosCard({
  image,
  title,
  description,
  href,
  category = "Acessórios",
  viewDetails = "Ver Detalhes",
}: ProductCardProps) {
  return (
    <div className="h-full group">
      <Link
        href={href}
        className={cn(
          "relative flex flex-col h-full border border-neutral-200 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
          "after:absolute after:inset-0 after:from-brand-red-500/5 after:to-transparent after:opacity-0 group-hover:after:opacity-100 after:transition-opacity"
        )}
      >
        <div className="relative aspect-square w-full border-b border-neutral-200 bg-white">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              <Box className="h-3 w-3" />
              {category}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-black tracking-tight text-black transition-colors duration-300 group-hover:text-brand-red-500">
            {title}
          </h3>

          <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-neutral-600">
            {description}
          </p>

          <div className="mt-auto pt-6 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-red-500 opacity-0 transition-all duration-500 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0">
              {viewDetails}
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
