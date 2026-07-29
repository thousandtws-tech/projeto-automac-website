"use client";

import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react/lazy";
import type { MuxPlayerCSSProperties } from "@mux/mux-player-react";
import { Play } from "lucide-react";
import type { Locale } from "@/src/i18n/config";

const defaultHomePlaybackId =
  "Se57ug001px3tdXw00quRrSUi004FYqlK1QoxD1Vks3lrI";

interface VideoSectionProps {
  locale: Locale;
  dictionary: {
    home: {
      videoSection: {
        badge: string;
        titlePart1: string;
        titleHighlight: string;
        description: string;
        videoLabel: string;
      };
    };
  };
}

export function VideoSection({ locale, dictionary }: VideoSectionProps) {
  const videoSection = dictionary.home.videoSection;
  const [isPlaying, setIsPlaying] = useState(false);
  const muxPlaybackId =
    process.env.NEXT_PUBLIC_MUX_HOME_PLAYBACK_ID ||
    process.env.NEXT_PUBLIC_MUX_PLAYBACK_ID ||
    defaultHomePlaybackId;
  const thumbnailUrl = `https://image.mux.com/${muxPlaybackId}/thumbnail.png?width=2560&height=1440&time=18&fit_mode=smartcrop`;
  const muxPlayerStyle = {
    width: "100%",
    height: "100%",
    aspectRatio: "16 / 9",
    "--media-object-fit": "cover",
    "--media-object-position": "center",
    "--seek-backward-button": "none",
    "--seek-forward-button": "none",
  } satisfies MuxPlayerCSSProperties;

  return (
    <div id="home-video-section" className="border-b border-black bg-white">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-16 md:py-24 items-center">
          {/* Left side - Title and Description */}
          <div className="flex flex-col gap-6">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-red-600">
              {videoSection.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-black tracking-tighter text-black uppercase leading-[0.9]">
              {videoSection.titlePart1}
              <br />
              <span className="underline decoration-brand-red-600/30 underline-offset-4">
                {videoSection.titleHighlight}
              </span>
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed max-w-lg">
              {videoSection.description}
            </p>
          </div>

          {/* Right side - Video Card */}
          <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-neutral-900 shadow-lg">
            {muxPlaybackId ? (
              <MuxPlayer
                className="automec-mux-player"
                playbackId={muxPlaybackId}
                streamType="on-demand"
                loading="viewport"
                preload="metadata"
                autoPlay="muted"
                muted
                loop
                playsInline
                poster={thumbnailUrl}
                videoTitle={videoSection.videoLabel}
                metadata={{
                  video_id: `automec-fabrica-${locale}`,
                  video_title: videoSection.videoLabel,
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
                aria-label={`${videoSection.videoLabel}: configure NEXT_PUBLIC_MUX_HOME_PLAYBACK_ID para reproduzir`}
                disabled
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red-600 sm:h-20 sm:w-20">
                  <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" />
                </span>
              </button>
            )}

            {!isPlaying && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-16 sm:px-5 sm:pb-5">
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  {videoSection.videoLabel}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        id="home-metrics-dock"
        className="h-[158px] bg-black/70 md:h-[113px]"
        aria-label="Indicadores Automec"
      />
    </div>
  );
}
