import { notFound } from "next/navigation";

import { SobreContent } from "@features/sobre/components/SobreContent";
import { SobreHeader } from "@features/sobre/components/SobreHeader";
import { getDictionary } from "@/src/i18n/dictionaries";
import { isLocale } from "@/src/i18n/config";

export default async function Sobre({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <main className="min-h-screen bg-white">
      <SobreHeader content={dictionary.sobre.header} />
      <SobreContent content={dictionary.sobre} />
    </main>
  );
}
