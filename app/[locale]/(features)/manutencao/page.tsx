import { notFound } from "next/navigation";

import { ManutencaoContent } from "@features/manutencao/components/ManutencaoContent";
import { isLocale } from "@/src/i18n/config";

export default async function Manutencao({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <ManutencaoContent />
    </main>
  );
}
