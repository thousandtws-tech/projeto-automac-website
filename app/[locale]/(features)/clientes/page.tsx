import {notFound} from "next/navigation";

import {ClientesContent} from "@features/clientes/components/ClientesContent";
import {isLocale} from "@/src/i18n/config";

export default async function Clientes({params}: { params: Promise<{ locale: string }> }) {
    const {locale} = await params;

    if (!isLocale(locale)) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <ClientesContent/>
        </main>
    );
}
