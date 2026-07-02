import { notFound } from "next/navigation";
import { ContatoForm } from "@features/contato/components/ContatoForm";
import { isLocale } from "@/src/i18n/config";
import { getDictionary } from "@/src/i18n/dictionaries";

export default async function Contato({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <main className="bg-white">
      <ContatoForm dictionary={dictionary} />
    </main>
  );
}
