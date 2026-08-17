"use client";

import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react/lazy";
import type { MuxPlayerCSSProperties } from "@mux/mux-player-react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";

const defaultPlaybackId =
  "Se57ug001px3tdXw00quRrSUi004FYqlK1QoxD1Vks3lrI";

export interface HistoryVideoContent {
  historyTitle: string;
  historySub: string;
  historyButton: string;
  credibilityTitle: string;
  credibilityDesc: string;
  videoLabel: string;
}

const muxPlayerStyle = {
  width: "100%",
  height: "100%",
  aspectRatio: "16 / 9",
  "--media-object-fit": "cover",
  "--media-object-position": "center",
  "--seek-backward-button": "none",
  "--seek-forward-button": "none",
} satisfies MuxPlayerCSSProperties;

export function HistoryVideoSection({
  content,
  playbackId: playbackIdOverride,
}: {
  content: HistoryVideoContent;
  playbackId?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playbackId =
    playbackIdOverride ||
    process.env.NEXT_PUBLIC_MUX_HOME_PLAYBACK_ID ||
    process.env.NEXT_PUBLIC_MUX_PLAYBACK_ID ||
    defaultPlaybackId;
  const poster = `https://image.mux.com/${playbackId}/thumbnail.png?width=2560&height=1440&time=18&fit_mode=smartcrop`;

  return (
    <FadeIn direction="up" delay={0.2}>
      <div className="mt-0 border-b border-black pb-14 pt-[calc(7rem+3rem)] sm:pb-16 sm:pt-[calc(7rem+4rem)] md:mt-10 md:py-24">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-20">
            <div className="min-w-0 flex flex-col items-start text-left">
              <span className="mb-3 text-sm font- uppercase tracking-widest text-brand-red-600 sm:mb-4 sm:text-base">
                {content.credibilityTitle}
              </span>
              <h2 className="mb-5 max-w-full text-balance text-[clamp(1.75rem,5vw,3rem)] font-medium uppercase leading-[0.95] tracking-tighter text-black sm:mb-6 2xl:whitespace-nowrap">
                {content.historyTitle}
              </h2>
              <div className="mb-7 border-l-2 border-brand-red-600 pl-4 sm:mb-8 sm:pl-6">
                <p className="mb-4 whitespace-pre-line text-lg font-medium leading-relaxed text-neutral-700 sm:text-xl">
                  {content.historySub}
                </p>
                {content.credibilityDesc && (
                  <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">
                    {content.credibilityDesc}
                  </p>
                )}
              </div>
              <Button className="h-14 w-full bg-brand-red-600 px-5 text-xs font-bold uppercase tracking-wider text-white hover:bg-neutral-800 sm:w-auto sm:px-10 sm:text-sm sm:tracking-widest">
                {content.historyButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="relative min-w-0 aspect-video w-full overflow-hidden rounded-md border-2 border-black bg-neutral-900 shadow-lg">
              <MuxPlayer
                className="automec-mux-player"
                playbackId={playbackId}
                streamType="on-demand"
                loading="viewport"
                preload="metadata"
                autoPlay="muted"
                muted
                loop
                playsInline
                poster={poster}
                videoTitle={content.videoLabel}
                metadata={{
                  video_id: "automec-fabrica",
                  video_title: content.videoLabel,
                }}
                accentColor="#d01c24"
                primaryColor="#ffffff"
                secondaryColor="#171717"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                style={muxPlayerStyle}
              />

              {!isPlaying && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-16 sm:px-5 sm:pb-5">
                  <span className="text-xs font-bold uppercase tracking-widest text-white">
                    {content.videoLabel}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
