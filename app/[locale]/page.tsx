import { getDictionary } from "@/src/i18n/dictionaries";
import { isLocale, type Locale } from "@/src/i18n/config";
import { notFound } from "next/navigation";
import { Hero } from "@/src/features/home/components/Hero";
import { HomeClientSections } from "@/src/features/home/components/HomeClientSections";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Hero locale={locale} dictionary={dictionary} />
      <HomeClientSections dictionary={dictionary} locale={locale as Locale} />
    </div>
  );
}
