import { notFound } from "next/navigation";
import { ProdutoDetail } from "@features/produtos/components/ProdutoDetail";
import { getProdutoBySlug } from "@features/produtos/services/produtoService";
import { isLocale } from "@/src/i18n/config";
import { getDictionary } from "@/src/i18n/dictionaries";
import { Locale } from "@/src/i18n/config";

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const [produto, dictionary] = await Promise.all([
    getProdutoBySlug(slug),
    getDictionary(locale as Locale),
  ]);

  if (!produto) {
    notFound();
  }

  return <ProdutoDetail locale={locale as Locale} dictionary={dictionary} produto={produto} />;
}
