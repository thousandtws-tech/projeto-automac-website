"use client";

import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react/lazy";
import type { MuxPlayerCSSProperties } from "@mux/mux-player-react";
import { Play, Video } from "lucide-react";
import type { Locale } from "@/src/i18n/config";
import type { ProdutoItem } from "../types";

interface ProdutosVideoGridProps {
  locale: Locale;
  items: ProdutoItem[];
  labels: {
    badge: string;
  };
}

const productPlaybackIds = [
  process.env.NEXT_PUBLIC_MUX_PRODUCT_1_PLAYBACK_ID,
  process.env.NEXT_PUBLIC_MUX_PRODUCT_2_PLAYBACK_ID,
  process.env.NEXT_PUBLIC_MUX_PRODUCT_3_PLAYBACK_ID,
  process.env.NEXT_PUBLIC_MUX_PRODUCT_4_PLAYBACK_ID,
];
const muxEnvironmentKey =
  process.env.NEXT_PUBLIC_MUX_ENV_KEY || "46vll6nbo38t3aj8cd8pip23o";

const muxPlayerStyle = {
  width: "100%",
  height: "100%",
  "--media-object-fit": "cover",
  "--media-object-position": "center",
  "--seek-backward-button": "none",
  "--seek-forward-button": "none",
} satisfies MuxPlayerCSSProperties;

function ProdutoVideoCard({
  item,
  locale,
  playbackId,
  envKey,
  labels,
}: {
  item: ProdutoItem;
  locale: Locale;
  playbackId?: string;
  envKey?: string;
  labels: ProdutosVideoGridProps["labels"];
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const content = item.i18n[locale] || item.i18n["pt-BR"];
  const thumbnailUrl = playbackId
    ? `https://image.mux.com/${playbackId}/thumbnail.webp?time=1&width=850&fit_mode=smartcrop`
    : undefined;

  return (
    <article className="group relative aspect-[425/713] w-full max-w-[425px] overflow-hidden border border-black bg-neutral-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="absolute inset-0 overflow-hidden bg-neutral-900">
        {playbackId ? (
          <MuxPlayer
            className="automec-mux-player"
            playbackId={playbackId}
            envKey={envKey}
            streamType="on-demand"
            muted
            loading="viewport"
            preload="metadata"
            poster={thumbnailUrl}
            videoTitle={`${content.title} ${item.model}`}
            metadata={{
              video_id: `produto-${item.id}`,
              video_title: `${content.title} ${item.model}`,
            }}
            accentColor="#d01c24"
            primaryColor="#ffffff"
            secondaryColor="#171717"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            style={muxPlayerStyle}
          />
        ) : (
          <button
            type="button"
            className="absolute inset-0 flex cursor-default items-center justify-center bg-neutral-900 text-white"
            aria-label={`${item.model}: configure o Playback ID do Mux para reproduzir`}
            disabled
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red-600 sm:h-20 sm:w-20">
              <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" />
            </span>
          </button>
        )}

        {!isPlaying && (
          <>
            <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 bg-black px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white">
              <Video className="h-3.5 w-3.5" />
              {labels.badge}
            </span>
           
          </>
        )}
      </div>
    </article>
  );
}

export function ProdutosVideoGrid({
  locale,
  items,
  labels,
}: ProdutosVideoGridProps) {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 2xl:grid-cols-4">
      {items.slice(0, 4).map((item, index) => (
        <ProdutoVideoCard
          key={item.id}
          item={item}
          locale={locale}
          playbackId={productPlaybackIds[index]}
          envKey={productPlaybackIds[index] ? muxEnvironmentKey : undefined}
          labels={labels}
        />
      ))}
    </div>
  );
}
