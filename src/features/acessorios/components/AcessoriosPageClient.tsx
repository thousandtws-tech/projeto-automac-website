"use client";

import { AcessoriosGrid } from "./AcessoriosGrid";
import { AcessoriosToolbar } from "./AcessoriosToolbar";
import { Acessorio } from "../types/acessorio";
import { useAcessorios } from "../hooks/useAcessorios";
import { FadeIn } from "@/components/fade-in";
import { CtaBlock } from "@shared/components/CtaBlock";

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
    viewDetails?: string;
    ctaContent: {
        title: string;
        highlight: string;
        description: string;
        button: string;
    };
}

export function AcessoriosPageClient({ items, toolbarLabels, cardItems, viewDetails, ctaContent }: AcessoriosPageClientProps) {
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
            <AcessoriosToolbar categories={translatedCategories} onSearch={setSearchQuery}
                onFilter={setSelectedCategory} labels={toolbarLabels} />
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <FadeIn direction="up" delay={0.1}>
                        <AcessoriosGrid items={filteredAcessorios} categoryLabels={toolbarLabels.categories} viewDetails={viewDetails} />
                    </FadeIn>
                </div>
            </section>
            <CtaBlock
                variant="white"
                title={ctaContent.title}
                highlight={ctaContent.highlight}
                description={ctaContent.description}
                buttonText={ctaContent.button}
            />
        </>
    );
}
