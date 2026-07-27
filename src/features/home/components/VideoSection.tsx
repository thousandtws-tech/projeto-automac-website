"use client";

import React from "react";
import { Play } from "lucide-react";
import type { Locale } from "@/src/i18n/config";

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

  return (
    <div className="border-b border-black bg-white">
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
          <div className="relative w-full aspect-video bg-neutral-900 rounded-sm overflow-hidden group cursor-pointer shadow-lg">
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              muted
              loop
              playsInline
              poster="/hero/hero-1.jpg"
            >
              <source src="#" type="video/mp4" />
            </video>

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-all duration-300 group-hover:bg-brand-red-600 group-hover:scale-110">
                <Play className="h-8 w-8 ml-1" fill="currentColor" />
              </div>
            </div>

            {/* Bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Caption */}
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                {videoSection.videoLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
