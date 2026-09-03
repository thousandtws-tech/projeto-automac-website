import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, ChevronRight} from "lucide-react";
import {FadeIn} from "@/components/fade-in";
import {Locale, withLocale} from "@/src/i18n/config";
import {Dictionary} from "@/src/i18n/dictionaries";
import {ProdutoItem} from "../types";
import {ProdutosTechnicalSpecs} from "./ProdutosTechnicalSpecs";
import {ProdutosIdealFor} from "./ProdutosIdealFor";
import {ProdutosAccessories} from "./ProdutosAccessories";
import { FormattedTrademark } from "@shared/components/FormattedTrademark";
import MuxPlayer from "@mux/mux-player-react/lazy";
import type { MuxPlayerCSSProperties } from "@mux/mux-player-react";

interface ProdutoDetailProps {
    locale: Locale;
    dictionary: Dictionary;
    produto: ProdutoItem;
}

export function ProdutoDetail({locale, dictionary, produto}: ProdutoDetailProps) {
    const t = dictionary.produtos.detail;
    const p = produto.i18n[locale] || produto.i18n["pt-BR"];
    const productVideoStyle = {
        width: "100%",
        aspectRatio: "16 / 9",
        "--media-object-fit": "cover",
        "--media-object-position": "center",
    } satisfies MuxPlayerCSSProperties;

    return (
        <main className="min-h-screen bg-white">
            {/* Breadcrumb bar */}
            <div className="border-b  border-zinc-300 bg-white pt-28 md:pt-30">
                <div className="container mx-auto px-6 sm:px-8 lg:px-12">
                    <nav className="flex items-center gap-2 py-4">
                        <Link
                            href={withLocale(locale, "/produtos")}
                            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 hover:text-black transition-colors"
                        >
                            <ArrowLeft className="h-3 w-3"/>
                            {t.backToProducts}
                        </Link>
                        <ChevronRight className="h-3 w-3 text-neutral-300"/>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red-500">
              {p.title}
            </span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <FadeIn direction="up" delay={0.1}>
                <section className="border-b  border-zinc-300 bg-white">
                    <div className="container mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="grid grid-cols-12 gap-0">
                            <div className="col-span-12 md:col-span-7 border-b md:border-b-0 md:border-r  border-zinc-300">
                                <div className="relative aspect-[4/3] w-full bg-neutral-50">
                                    <Image src={produto.image} alt={p.title} fill sizes="(min-width: 768px) 50vw, 100vw"
                                           className="object-contain p-12 md:p-16" priority/>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-5">
                                <div className="flex flex-col justify-center h-full p-8 md:p-12">
                                    <div className="mb-8">
                                        <span
                                            className="inline-block bg-brand-red-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 mb-6">{t.automec}</span>
                                        <h1 className="mb-4 text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-black sm:text-6xl lg:text-7xl whitespace-nowrap"><FormattedTrademark text={produto.model} /></h1>
                                        <p className="text-sm font-bold uppercase tracking-[0.15em] text-neutral-400">{p.title}</p>
                                    </div>
                                    <div className="border-t  border-zinc-300 pt-8">
                                        <p className="text-sm leading-relaxed text-neutral-600 line-clamp-4">{p.description.split("\n")[0]}</p>
                                        <a href="#especificacao"
                                           className="inline-flex items-center gap-2 mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red-500 hover:text-brand-red-700 transition-colors">
                                            {t.viewFullSpec}<ChevronRight className="h-3 w-3"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </FadeIn>

            {produto.videoPlaybackId && (
                <FadeIn direction="up" delay={0.12}>
                    <section className="border-b  border-zinc-300 bg-white">
                        <div className="w-full px-5 py-8 sm:px-8 sm:py-12">
                            <div className="mx-auto aspect-video w-full max-w-[850px] overflow-hidden rounded-lg border border-neutral-300 bg-black shadow-[0_6px_20px_rgba(0,0,0,0.10)]">
                                <MuxPlayer
                                    className="block h-full w-full"
                                    playbackId={produto.videoPlaybackId}
                                    streamType="on-demand"
                                    maxResolution="1080p"
                                    maxAutoResolution="1080p"
                                    loading="viewport"
                                    preload="metadata"
                                    videoTitle={`${p.title} ${produto.model}`}
                                    metadata={{
                                        video_id: `produto-${produto.id}`,
                                        video_title: `${p.title} ${produto.model}`,
                                    }}
                                    style={productVideoStyle}
                                />
                            </div>
                        </div>
                    </section>
                </FadeIn>
            )}

            {/* Especificação */}
            <FadeIn direction="up" delay={0.15}>
                <section id="especificacao" className="scroll-mt-32">
                    <div className="container mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="grid grid-cols-12 gap-0 border-b  border-zinc-300">
                            <div className="col-span-12 md:col-span-4 bg-brand-red-500 p-8 md:p-12 flex items-center">
                                <h2 className="text-2xl md:text-3xl font-black tracking-[-0.02em] text-white uppercase">{t.specification}</h2>
                            </div>
                            <div className="col-span-12 md:col-span-8 p-8 md:p-12">
                                <div
                                    className="text-base leading-[1.8] text-neutral-700 whitespace-pre-line">{p.description}</div>
                            </div>
                        </div>
                    </div>
                </section>
            </FadeIn>

            <FadeIn direction="up" delay={0.15}>
                <ProdutosAccessories dictionary={dictionary}/>
            </FadeIn>

            <FadeIn direction="up" delay={0.15}>
                <ProdutosIdealFor dictionary={dictionary} items={p.idealFor}/>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
                <ProdutosTechnicalSpecs dictionary={dictionary} specs={p.technicalSpecs} model={produto.model}/>
            </FadeIn>

           
        </main>
    );
}
