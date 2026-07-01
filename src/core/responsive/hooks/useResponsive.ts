// ============================================================================
// hooks/useResponsive.ts
// Sistema de Responsividade Inteligente — React Hooks
// ============================================================================
//
// Hooks consumer-friendly para acessar o estado do ResponsiveEngine.
// Todos dependem do ResponsiveProvider estar na árvore.
//
// ============================================================================

"use client";

import { useMemo } from "react";
import type { BreakpointKey, DeviceType, Orientation, ScaleState } from "../responsive-types";
import { useResponsiveContext } from "../responsive-context";
import { isAboveBreakpoint, isBelowBreakpoint } from "../breakpoints";

// ----------------------------------------------------------------------------
// Hook Principal
// ----------------------------------------------------------------------------

/**
 * Hook principal para acessar todo o ScaleState.
 *
 * @returns O ScaleState completo (globalScale, breakpoint, viewport, etc.)
 *
 * @example
 * ```tsx
 * const { globalScale, breakpoint, viewport } = useResponsive();
 * ```
 */
export function useResponsive(): ScaleState {
  return useResponsiveContext();
}

// ----------------------------------------------------------------------------
// Hooks Utilitários
// ----------------------------------------------------------------------------

/**
 * Retorna o breakpoint ativo.
 *
 * @example
 * ```tsx
 * const bp = useBreakpoint(); // "xl"
 * ```
 */
export function useBreakpoint(): BreakpointKey {
  const { breakpoint } = useResponsiveContext();
  return breakpoint;
}

/**
 * Retorna o fator de escala global.
 *
 * @example
 * ```tsx
 * const scale = useGlobalScale(); // 1.0 em Full HD
 * ```
 */
export function useGlobalScale(): number {
  const { globalScale } = useResponsiveContext();
  return globalScale;
}

/**
 * Retorna true se o dispositivo suporta touch.
 */
export function useIsTouch(): boolean {
  const { viewport } = useResponsiveContext();
  return viewport.isTouch;
}

/**
 * Retorna o tipo de dispositivo (mobile, tablet, desktop).
 */
export function useDeviceType(): DeviceType {
  const { viewport } = useResponsiveContext();
  return viewport.deviceType;
}

/**
 * Retorna a orientação do viewport.
 */
export function useOrientation(): Orientation {
  const { viewport } = useResponsiveContext();
  return viewport.orientation;
}

/**
 * Retorna o nível de zoom do navegador.
 */
export function useZoomLevel(): number {
  const { zoomLevel } = useResponsiveContext();
  return zoomLevel;
}

// ----------------------------------------------------------------------------
// Hooks de Breakpoint Condicional
// ----------------------------------------------------------------------------

/**
 * Retorna true se o viewport está acima do breakpoint especificado.
 *
 * @param breakpoint - Breakpoint mínimo
 *
 * @example
 * ```tsx
 * const isDesktop = useIsAbove("lg");
 * ```
 */
export function useIsAbove(breakpoint: BreakpointKey): boolean {
  const { viewport } = useResponsiveContext();
  return useMemo(() => isAboveBreakpoint(viewport.width, breakpoint), [viewport.width, breakpoint]);
}

/**
 * Retorna true se o viewport está abaixo do breakpoint especificado.
 *
 * @param breakpoint - Breakpoint máximo
 *
 * @example
 * ```tsx
 * const isMobile = useIsBelow("md");
 * ```
 */
export function useIsBelow(breakpoint: BreakpointKey): boolean {
  const { viewport } = useResponsiveContext();
  return useMemo(() => isBelowBreakpoint(viewport.width, breakpoint), [viewport.width, breakpoint]);
}

/**
 * Retorna true se o viewport está entre dois breakpoints (inclusive min, exclusive max).
 *
 * @example
 * ```tsx
 * const isTablet = useIsBetween("md", "lg");
 * ```
 */
export function useIsBetween(min: BreakpointKey, max: BreakpointKey): boolean {
  const { viewport } = useResponsiveContext();
  return useMemo(
    () => isAboveBreakpoint(viewport.width, min) && isBelowBreakpoint(viewport.width, max),
    [viewport.width, min, max]
  );
}

// ----------------------------------------------------------------------------
// Hooks de Valor Escalado
// ----------------------------------------------------------------------------

/**
 * Escala um valor numérico pelo globalScale.
 *
 * @param baseValue - Valor base (ex: 16)
 * @returns Valor escalado (ex: 11.36 em HD)
 *
 * @example
 * ```tsx
 * const iconSize = useScaledValue(24); // escala com o globalScale
 * ```
 */
export function useScaledValue(baseValue: number): number {
  const { globalScale } = useResponsiveContext();
  return useMemo(() => Math.round(baseValue * globalScale * 100) / 100, [baseValue, globalScale]);
}

/**
 * Escala múltiplos valores de uma vez.
 *
 * @param values - Objeto de valores base
 * @returns Objeto com valores escalados
 *
 * @example
 * ```tsx
 * const { padding, fontSize, gap } = useScaledValues({
 *   padding: 16,
 *   fontSize: 14,
 *   gap: 8,
 * });
 * ```
 */
export function useScaledValues<T extends Record<string, number>>(values: T): T {
  const { globalScale } = useResponsiveContext();

  return useMemo(() => {
    const result = {} as Record<string, number>;
    for (const key in values) {
      result[key] = Math.round(values[key] * globalScale * 100) / 100;
    }
    return result as T;
  }, [values, globalScale]);
}

// ----------------------------------------------------------------------------
// Hook de Dimensões do Viewport
// ----------------------------------------------------------------------------

/**
 * Retorna as dimensões do viewport.
 *
 * @example
 * ```tsx
 * const { width, height } = useViewportSize();
 * ```
 */
export function useViewportSize(): { width: number; height: number } {
  const { viewport } = useResponsiveContext();
  return useMemo(() => ({ width: viewport.width, height: viewport.height }), [viewport.width, viewport.height]);
}
