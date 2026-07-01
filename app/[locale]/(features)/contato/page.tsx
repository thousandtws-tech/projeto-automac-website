import { notFound } from "next/navigation";

import { ContatoForm } from "@features/contato/components/ContatoForm";
import { isLocale } from "@/src/i18n/config";

export default async function Contato({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <main className="bg-white">
      <ContatoForm />
    </main>
  );
}
