"use client";

import { Filter, Search } from "lucide-react";

interface AcessoriosToolbarProps {
  categories: Array<{
    label: string;
    value: string;
  }>;
  onSearch: (query: string) => void;
  onFilter: (category: string) => void;
  labels?: {
    filter: string;
    searchPlaceholder: string;
  };
}

const fallbackLabels = {
  filter: "Filtrar",
  searchPlaceholder: "PESQUISAR...",
};

export function AcessoriosToolbar({ categories, onSearch, onFilter, labels }: AcessoriosToolbarProps) {
  const toolbarLabels = labels ?? fallbackLabels;
  return (
    <div className="sticky top-29 z-40 border-b border-neutral-200 bg-white shadow-[0_4px_14px_rgba(0,0,0,0.04)]">
      <div className="container mx-auto px-6 flex items-center justify-between gap-6 py-3">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-red-500 hover:text-brand-red-500 transition-colors">
            <Filter className="h-4 w-4" />
            {toolbarLabels.filter}
          </button>
          <div className="h-5 w-px bg-neutral-300" />
          <div className="hidden items-center gap-6 lg:flex">
            {categories.map((cat) => (
              <button 
                key={cat.value} 
                onClick={() => onFilter(cat.value)}
                className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 transition-colors hover:text-black cursor-pointer"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />
          <input 
            type="text" 
            placeholder={toolbarLabels.searchPlaceholder} 
            onChange={(e) => onSearch(e.target.value)}
            className="w-full border border-neutral-300 bg-white py-2 pl-10 pr-4 text-[10px] font-bold tracking-widest text-black shadow-[0_2px_8px_rgba(0,0,0,0.04)] outline-none focus:border-brand-red-500 focus:shadow-[0_3px_12px_rgba(0,0,0,0.07)]"
          />
        </div>
      </div>
    </div>
  );
}
