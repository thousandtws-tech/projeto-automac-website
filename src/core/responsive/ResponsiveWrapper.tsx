"use client";

import { ResponsiveProvider } from "@/src/core/responsive/responsive-context";

/**
 * Client-side wrapper para o ResponsiveProvider.
 * Necessário porque o layout do Next.js é um Server Component,
 * mas o ResponsiveProvider precisa rodar no client (usa hooks/DOM).
 */
export function ResponsiveWrapper({ children }: { children: React.ReactNode }) {
  return <ResponsiveProvider>{children}</ResponsiveProvider>;
}
