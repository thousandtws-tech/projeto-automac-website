"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";

export interface HistoryVideoContent {
  historyTitle: string;
  historySub: string;
  historyButton: string;
  credibilityTitle: string;
  credibilityDesc: string;
  videoLabel: string;
}

const bannerSrc =
  "https://res.cloudinary.com/dpgslwy15/image/upload/v1788282271/bg-2300x785px_awj83w.jpg";
const bannerSrcSet = [
  "https://res.cloudinary.com/dpgslwy15/image/upload/v1788282271/bg-2300x785px_awj83w.jpg",
  "https://res.cloudinary.com/dpgslwy15/image/upload/v1788282271/bg-2300x785px_awj83w.jpg",
  "hhttps://res.cloudinary.com/dpgslwy15/image/upload/v1788282271/bg-2300x785px_awj83w.jpg",
  "https://res.cloudinary.com/dpgslwy15/image/upload/v1788282271/bg-2300x785px_awj83w.jpg",
].join(", ");

const logo35Src =
  "https://res.cloudinary.com/dpgslwy15/image/upload/v1788281616/35_anos_banner_kv8nfm.webp";

export function HistoryVideoSection({
  content,
  storyBelowVideo = false,
  splitStory = false,
  centeredContent = false,
}: {
  content: HistoryVideoContent;
  playbackId?: string;
  storyBelowVideo?: boolean;
  splitStory?: boolean;
  centeredContent?: boolean;
}) {
  const storyParagraphs = content.historySub.split(/\n\s*\n/);
  const upperStoryParagraphs = splitStory ? storyParagraphs.slice(0, 3) : storyParagraphs;
  const lowerStoryParagraphs = splitStory ? storyParagraphs.slice(3) : [];

  return (
    <FadeIn direction="up" delay={0.2}>
      <div className="border-b border-black pb-16 pt-48 sm:pt-40 md:pt-44 md:pb-24 lg:pt-48">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className={`grid grid-cols-1 items-start lg:grid-cols-2 ${splitStory ? "gap-5 lg:gap-6" : "gap-10 lg:gap-12 xl:gap-20"}`}>
            <div className={`min-w-0 flex flex-col ${splitStory || centeredContent ? "items-center text-center" : "items-start text-left"} ${splitStory ? "lg:col-span-2" : ""} ${centeredContent ? "justify-center self-stretch" : ""}`}>
              <span className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-red-600 sm:mb-5 sm:text-base">
                {content.credibilityTitle}
              </span>
              <h2 className="mb-5 max-w-full text-balance text-[clamp(1.75rem,4vw,2.25rem)] font-bold uppercase leading-tight tracking-tight text-black sm:mb-6 2xl:text-[clamp(1.75rem,5vw,3rem)] 2xl:whitespace-nowrap">
                {content.historyTitle}
              </h2>
              {!storyBelowVideo && !splitStory && (
                <>
                  <div className={`mb-7 sm:mb-8 ${centeredContent ? "border-t-2 border-brand-red-600 pt-5" : "border-l-2 border-brand-red-600 pl-4 sm:pl-6"}`}>
                    <div className="mb-4 flex flex-col gap-2 text-lg font-medium leading-relaxed text-neutral-700 sm:text-xl">
                      {upperStoryParagraphs.map((paragraph) => (
                        <p key={paragraph} className="whitespace-pre-line">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {content.credibilityDesc && (
                      <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">
                        {content.credibilityDesc}
                      </p>
                    )}
                  </div>

                </>
              )}
            </div>

            <div className={`relative min-w-0 aspect-video w-full overflow-hidden rounded-md   shadow-lg ${splitStory ? "lg:col-span-2 lg:aspect-[21/9]" : storyBelowVideo ? "" : "lg:mt-[6.875rem]"}`}>
              <img
                src={bannerSrc}
                srcSet={bannerSrcSet}
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Banner 35 anos Automec"
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 z-0 flex items-center justify-center bg-black/20">
                <Image
                  src={logo35Src}
                  alt="35 anos Automec"
                  width={592}
                  height={463}
                  loading="eager"
                  className="relative z-10 h-auto w-28 sm:w-36 md:w-87 drop-shadow-2xl [image-rendering:-webkit-optimize-contrast]"
                />
              </div>
            </div>

            {splitStory && lowerStoryParagraphs.length > 0 && (
              <div className="grid gap-8 lg:col-span-2 lg:grid-cols-2 lg:gap-12 xl:gap-20">
                {[upperStoryParagraphs, lowerStoryParagraphs].map((paragraphs, index) => (
                  <div key={index} className="border-l-2 border-brand-red-600 pl-4 sm:pl-6">
                    <div className="flex flex-col gap-2 text-lg font-medium leading-relaxed text-neutral-700 sm:text-xl">
                      {paragraphs.map((paragraph) => (
                        <p key={paragraph} className="whitespace-pre-line">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {storyBelowVideo && (
              <div className="flex flex-col gap-5 lg:col-span-2">
                <div className="border-l-2 border-brand-red-600 pl-4 sm:pl-6">
                  <div className="flex flex-col gap-2 text-lg font-medium leading-relaxed text-neutral-700 sm:text-xl">
                    {content.historySub.split(/\n\s*\n/).map((paragraph) => (
                      <p key={paragraph} className="whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {content.credibilityDesc && (
                    <p className="mt-3 text-base leading-relaxed text-neutral-600 sm:text-lg">
                      {content.credibilityDesc}
                    </p>
                  )}
                </div>
                <Button className="h-14 w-full bg-brand-red-600 px-5 text-xs font-bold uppercase tracking-wider text-white hover:bg-neutral-800 sm:w-auto sm:px-10 sm:text-sm sm:tracking-widest">
                  {content.historyButton}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
