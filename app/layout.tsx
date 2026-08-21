import type {Metadata, Viewport} from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import {siteName, siteUrl} from "@shared/seo/site";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
    preload: true,
    adjustFontFallback: true,
    fallback: ["system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
    variable: "--font-poppins",
});

const title = "Automec Portas Automáticas | Engenharia de acesso seguro";
const description =
    "Portas automáticas com tecnologia avançada, segurança e atendimento técnico para projetos em todo o Brasil e América do Sul.";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: title,
        template: `%s | ${siteName}`,
    },
    description,
    applicationName: siteName,
    referrer: "origin-when-cross-origin",
    keywords: [
        "portas automáticas",
        "porta automática de vidro",
        "porta hermética hospitalar",
        "controle de acesso",
        "manutenção de portas automáticas",
        "Automec",
    ],
    authors: [{name: siteName, url: siteUrl}],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
        telephone: true,
        email: true,
        address: true,
    },
    openGraph: {
        type: "website",
        siteName,
        title,
        description,
        url: siteUrl,
        locale: "pt_BR",
        alternateLocale: ["en_US", "es_ES"],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    alternates: {
        canonical: siteUrl,
    },
};

export const viewport: Viewport = {
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "#ffffff"},
        {media: "(prefers-color-scheme: dark)", color: "#0a0a0a"},
    ],
    colorScheme: "light",
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
};

export default function RootLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className={cn("h-full antialiased", poppins.variable, "font-sans")}>
        <head>
            <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin=""/>
            <link rel="preconnect" href="https://image.mux.com" crossOrigin=""/>
            <link rel="dns-prefetch" href="https://stream.mux.com"/>
            <link rel="dns-prefetch" href="https://flagcdn.com"/>
        </head>
        <body className="min-h-full">{children}</body>
        </html>
    );
}
