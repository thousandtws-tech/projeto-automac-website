import { notFound } from "next/navigation";

import { SimuladorHeader } from "@features/simulador/components/SimuladorHeader";
import { SimuladorClient } from "@features/simulador/components/SimuladorClient";
import { getDictionary } from "@/src/i18n/dictionaries";
import { isLocale } from "@/src/i18n/config";

export default async function Simulador({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <main className="min-h-screen bg-white">
      <SimuladorHeader content={dictionary.simulador.header} />
      <SimuladorClient dictionary={dictionary} />
    </main>
  );
}
