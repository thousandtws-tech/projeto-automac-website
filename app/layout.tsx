import type {Metadata} from "next";
import "./globals.css";
import {cn} from "@/lib/utils";

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
        <html className={cn("h-full antialiased", "font-sans")}>
        <body className="min-h-full">{children}</body>
        </html>
    );
}
