import { notFound } from "next/navigation";

import { ManutencaoContent } from "@features/manutencao/components/ManutencaoContent";
import { isLocale } from "@/src/i18n/config";
import { getDictionary } from "@/src/i18n/dictionaries";

export default async function Manutencao({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <main className="min-h-screen bg-white">
      <ManutencaoContent dictionary={dictionary} locale={locale} />
    </main>
  );
}
