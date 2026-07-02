import { notFound } from "next/navigation";

import { ProdutosHeader } from "@features/produtos/components/ProdutosHeader";
import { ProdutosGrid } from "@features/produtos/components/ProdutosGrid";
import { ProdutosClient } from "@features/produtos/components/ProdutosClient";
import { produtosMock } from "@features/produtos/services/produtoService";
import { getDictionary } from "@/src/i18n/dictionaries";
import { isLocale } from "@/src/i18n/config";

export default async function Produtos({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <main className="min-h-screen bg-white">
      <ProdutosHeader content={dictionary.produtos.header} />
      <ProdutosClient locale={locale} dictionary={dictionary} />
    </main>
  );
}
