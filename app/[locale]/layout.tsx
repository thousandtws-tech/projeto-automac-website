import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@shared/components/Footer";
import { Navbar } from "@shared/components/Navbar";
import Whatsapp from "@shared/components/FloatingContactButton";
import { ResponsiveWrapper } from "@/src/core/responsive/ResponsiveWrapper";
import { CookieConsent } from "@shared/components/CookieConsent";
import { getDictionary } from "@/src/i18n/dictionaries";
import { isLocale, localeLabels, locales, type Locale } from "@/src/i18n/config";
import { localeAlternates, ogLocales, siteName, siteUrl } from "@shared/seo/site";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = await getDictionary(locale);
  const url = `${siteUrl}/${locale}`;

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    alternates: {
      canonical: url,
      languages: {
        ...localeAlternates(),
        "x-default": `${siteUrl}/${locales[0]}`,
      },
    },
    openGraph: {
      type: "website",
      siteName,
      url,
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      locale: ogLocales[locale],
      alternateLocale: locales
        .filter((item) => item !== locale)
        .map((item) => ogLocales[item]),
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
    },
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

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: `${siteUrl}/${currentLocale}`,
    logo: `${siteUrl}/logo-png/Artboard-1.png`,
    description: dictionary.metadata.description,
    telephone: "+55-19-3213-8251",
    email: "atendimento@automec.com.br",
    address: {
      "@type": "PostalAddress",
      streetAddress: "R. Estácia de Sá, 976 - Jd. Sta. Genebra",
      addressLocality: "Campinas",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    sameAs: [
      "https://www.facebook.com/automecportasautomaticas",
      "https://www.instagram.com/automecportas",
      "https://www.youtube.com/user/AutomecPortas",
    ],
  };

  return (
    <ResponsiveWrapper>
      <div lang={localeLabels[currentLocale].htmlLang} className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar locale={currentLocale} dictionary={dictionary} />

        <main className="grow">{children}</main>
        <Footer locale={currentLocale} dictionary={dictionary} />
        <Whatsapp />
        <CookieConsent locale={currentLocale} />
      </div>
    </ResponsiveWrapper>
  );
}
