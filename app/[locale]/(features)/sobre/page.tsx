import { notFound } from "next/navigation";

import { SobreContent } from "@features/sobre/components/SobreContent";
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
      <SobreContent content={dictionary.sobre} />
    </main>
  );
}
