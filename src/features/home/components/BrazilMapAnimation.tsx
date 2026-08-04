"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin } from "lucide-react";

export interface MapPoint {
  id: string;
  city: string;
  state: string;
  x: number; // 0 to 600 coordinates
  y: number; // 0 to 600 coordinates
  isMain?: boolean;
}

export const MAP_POINTS: MapPoint[] = [
  { id: "sp", city: "São Paulo", state: "SP", x: 348, y: 382, isMain: true },
  { id: "rj", city: "Rio de Janeiro", state: "RJ", x: 398, y: 374 },
  { id: "bh", city: "Belo Horizonte", state: "MG", x: 378, y: 332 },
  { id: "df", city: "Brasília", state: "DF", x: 338, y: 278 },
  { id: "pr", city: "Curitiba", state: "PR", x: 322, y: 422 },
  { id: "rs", city: "Porto Alegre", state: "RS", x: 312, y: 488 },
  { id: "ba", city: "Salvador", state: "BA", x: 432, y: 252 },
  { id: "pe", city: "Recife", state: "PE", x: 478, y: 172 },
  { id: "ce", city: "Fortaleza", state: "CE", x: 442, y: 128 },
  { id: "am", city: "Manaus", state: "AM", x: 212, y: 152 },
  { id: "pa", city: "Belém", state: "PA", x: 322, y: 122 },
  { id: "go", city: "Goiânia", state: "GO", x: 318, y: 296 },
  { id: "mt", city: "Cuiabá", state: "MT", x: 242, y: 272 },
];

interface BrazilMapAnimationProps {
  variant?: "light" | "dark";
}

export function BrazilMapAnimation({ variant = "light" }: BrazilMapAnimationProps) {
  const [hoveredPoint, setHoveredPoint] = useState<MapPoint | null>(null);
  const isLight = variant === "light";

  const hqPoint = MAP_POINTS.find((p) => p.isMain) || MAP_POINTS[0];

  return (
    <div className="relative w-full aspect-[4/3.5] sm:aspect-[4/3] flex items-center justify-center select-none py-2">
      <svg
        viewBox="0 0 600 600"
        className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
      >
        <defs>
          {/* Red Glow Filter for Dots */}
          <filter id="red-dot-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pulse Signal Beam Gradient */}
          <linearGradient id="red-beam-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Brazil Vector Outline */}
        <g className="transition-all duration-300">
          {/* Main Continental Brazil Silhouette */}
          <path
            d="M 230 50 
               C 255 45, 290 40, 310 50 
               C 330 55, 340 70, 355 80 
               C 375 90, 400 95, 420 105 
               C 440 115, 460 120, 475 135 
               C 488 150, 492 165, 485 185 
               C 475 205, 455 225, 442 245 
               C 428 268, 412 290, 402 320 
               C 395 340, 402 360, 408 375 
               C 412 388, 402 400, 388 412 
               C 368 428, 348 442, 336 462 
               C 324 482, 318 505, 308 528 
               C 302 538, 292 538, 288 528 
               C 282 505, 288 482, 294 460 
               C 300 438, 305 418, 290 402 
               C 272 388, 252 378, 240 362 
               C 228 348, 222 328, 208 312 
               C 192 296, 175 282, 162 265 
               C 150 248, 142 230, 130 215 
               C 118 198, 108 180, 115 160 
               C 122 140, 140 125, 160 110 
               C 180 95, 205 75, 230 50 Z"
            fill={isLight ? "rgba(220, 38, 38, 0.04)" : "rgba(255, 255, 255, 0.1)"}
            stroke={isLight ? "#DC2626" : "rgba(255, 255, 255, 0.85)"}
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="hover:fill-red-500/10 transition-all duration-300"
          />

          {/* Internal Connection Lines from São Paulo HQ */}
          {MAP_POINTS.map((point) => {
            if (point.isMain) return null;
            const dx = point.x - hqPoint.x;
            const dy = point.y - hqPoint.y;
            const cx = hqPoint.x + dx * 0.5 - dy * 0.15;
            const cy = hqPoint.y + dy * 0.5 + dx * 0.15;
            const pathData = `M ${hqPoint.x} ${hqPoint.y} Q ${cx} ${cy} ${point.x} ${point.y}`;

            return (
              <g key={`line-${point.id}`}>
                <path
                  d={pathData}
                  fill="none"
                  stroke={isLight ? "rgba(220, 38, 38, 0.2)" : "rgba(255, 255, 255, 0.25)"}
                  strokeWidth="1.2"
                  strokeDasharray="3 4"
                />
                <motion.path
                  d={pathData}
                  fill="none"
                  stroke="url(#red-beam-grad)"
                  strokeWidth="1.8"
                  strokeDasharray="6 14"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -40 }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </g>
            );
          })}
        </g>

        {/* Red Pulse Dots */}
        {MAP_POINTS.map((point) => {
          const isHQ = point.isMain;

          return (
            <g
              key={point.id}
              transform={`translate(${point.x}, ${point.y})`}
              className="cursor-pointer group/dot"
              onMouseEnter={() => setHoveredPoint(point)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              {/* Outer Radar Ripple Wave */}
              <circle
                r={isHQ ? 20 : 14}
                fill="none"
                stroke="#DC2626"
                strokeWidth="1.5"
                className="animate-ping opacity-75"
              />

              {/* Red Glow Aura */}
              <circle
                r={isHQ ? 12 : 8}
                fill="#DC2626"
                filter="url(#red-dot-glow)"
                className="transition-transform duration-300 group-hover/dot:scale-125"
              />

              {/* Solid White / Red Core Circle */}
              <circle
                r={isHQ ? 7 : 5}
                fill="#FFFFFF"
                stroke="#DC2626"
                strokeWidth={isHQ ? 3 : 2}
                className="transition-transform duration-300 group-hover/dot:scale-110"
              />

              {/* Inner Center Dot */}
              <circle r={isHQ ? 3 : 2} fill="#DC2626" />

              {/* State Code Tag */}
              <g transform="translate(10, -6)" className="pointer-events-none">
                <rect
                  x="0"
                  y="-10"
                  width={point.state.length * 8 + 14}
                  height="16"
                  rx="4"
                  fill="#18181B"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1"
                />
                <text
                  x="5"
                  y="1.5"
                  fill="#FFFFFF"
                  fontSize="9"
                  fontWeight="800"
                  fontFamily="sans-serif"
                >
                  {point.state}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      {/* Hover City Tooltip Badge */}
      <AnimatePresence>
        {hoveredPoint && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/90 text-white px-4 py-2 rounded-full border border-white/20 text-xs font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md pointer-events-none whitespace-nowrap z-20"
          >
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <MapPin className="w-3.5 h-3.5 text-red-400" />
            <span>
              {hoveredPoint.city} - {hoveredPoint.state}
            </span>
            {hoveredPoint.isMain && (
              <span className="bg-brand-red-600 text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-wider ml-1">
                Matriz Automec
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
