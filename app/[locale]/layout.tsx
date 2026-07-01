import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@shared/components/Footer";
import { Navbar } from "@shared/components/Navbar";
import { FloatingContactButton } from "@shared/components/FloatingContactButton";
import { ResponsiveWrapper } from "@/src/core/responsive/ResponsiveWrapper";
import { LenisProvider } from "@/components/lenis-provider";
import { getDictionary } from "@/src/i18n/dictionaries";
import { isLocale, localeLabels, locales, type Locale } from "@/src/i18n/config";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale: Locale = locale;
  const dictionary = await getDictionary(currentLocale);

  return (
    <ResponsiveWrapper>
      <LenisProvider>
        <div lang={localeLabels[currentLocale].htmlLang} className="flex min-h-screen flex-col">
          <Navbar locale={currentLocale} dictionary={dictionary} />

          <main className="grow">{children}</main>
          <Footer locale={currentLocale} dictionary={dictionary} />
          <FloatingContactButton />
        </div>
      </LenisProvider>
    </ResponsiveWrapper>
  );
}
