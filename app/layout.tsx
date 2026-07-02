import type {Metadata} from "next";
import "./globals.css";
import {Geist} from "next/font/google";
import {cn} from "@/lib/utils";

const geist = Geist({subsets: ['latin'], variable: '--font-sans'});

export const metadata: Metadata = {
    title: "Automec Portas Automáticas | Engenharia de acesso seguro",
    description:
        "Portas automáticas com tecnologia avançada, segurança e atendimento técnico para projetos em todo o Brasil e América do Sul.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className={cn("h-full antialiased", "font-sans", geist.variable)}>
        <body className="min-h-full">{children}</body>
        </html>
    );
}
