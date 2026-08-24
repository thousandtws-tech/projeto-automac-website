import {notFound} from "next/navigation";

import {AcessoriosHeader} from "@features/acessorios/components/AcessoriosHeader";
import {AcessoriosPageClient} from "@features/acessorios/components/AcessoriosPageClient";
import {acessoriosMock} from "@features/acessorios/services/acessorioService";
import {getDictionary} from "@/src/i18n/dictionaries";
import {isLocale} from "@/src/i18n/config";

export default async function Acessorios({params}: { params: Promise<{ locale: string }> }) {
    const {locale} = await params;

    if (!isLocale(locale)) {
        notFound();
    }

    const dictionary = await getDictionary(locale);

    return (
        <main className="min-h-screen bg-white">
            <AcessoriosHeader content={dictionary.acessorios.header}/>
            <AcessoriosPageClient
                items={acessoriosMock}
                toolbarLabels={dictionary.acessorios.toolbar}
                cardItems={dictionary.acessorios.items}
                ctaContent={dictionary.acessorios.cta}
            />
        </main>
    );
}
