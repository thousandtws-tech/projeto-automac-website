"use client";

import { AcessoriosCTA } from "./AcessoriosCTA";
import { AcessoriosGrid } from "./AcessoriosGrid";
import { AcessoriosToolbar } from "./AcessoriosToolbar";
import { Acessorio } from "../types/acessorio";
import { useAcessorios } from "../hooks/useAcessorios";
import { FadeIn } from "@/components/fade-in";

interface AcessoriosPageClientProps {
  items: Acessorio[];
  toolbarLabels: {
    filter: string;
    searchPlaceholder: string;
    categories: Record<string, string>;
  };
  cardItems: ReadonlyArray<{
    title: string;
    description: string;
  }>;
  ctaContent: React.ComponentProps<typeof AcessoriosCTA>["content"];
}

export function AcessoriosPageClient({ items, toolbarLabels, cardItems, ctaContent }: AcessoriosPageClientProps) {
  const translatedItems = items.map((item, index) => ({
    ...item,
    title: cardItems[index]?.title ?? item.title,
    description: cardItems[index]?.description ?? item.description,
  }));
  const { filteredAcessorios, categories, setSearchQuery, setSelectedCategory } = useAcessorios(translatedItems);
  const translatedCategories = categories.map((category) => ({
    value: category,
    label: toolbarLabels.categories[category] ?? category,
  }));

  return (
    <>
      <AcessoriosToolbar categories={translatedCategories} onSearch={setSearchQuery} onFilter={setSelectedCategory} labels={toolbarLabels} />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <FadeIn direction="up" delay={0.1}>
            <AcessoriosGrid items={filteredAcessorios} categoryLabels={toolbarLabels.categories} />
          </FadeIn>
          <FadeIn direction="up" delay={0.3}>
            <AcessoriosCTA content={ctaContent} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
