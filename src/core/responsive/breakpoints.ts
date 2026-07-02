// ============================================================================
// breakpoints.ts
// Sistema de Responsividade Inteligente — Definições de Breakpoints
// ============================================================================

import type {BreakpointDefinition, BreakpointKey} from "./responsive-types";

/**
 * Breakpoints ordenados do menor para o maior.
 * Compatíveis com Tailwind CSS (sm–2xl) + extensões para telas 2K/4K.
 */
export const BREAKPOINT_DEFINITIONS: readonly BreakpointDefinition[] = [
    {key: "xs", minWidth: 0, maxWidth: 640, label: "Smartphone"},
    {key: "sm", minWidth: 640, maxWidth: 768, label: "Smartphone Large"},
    {key: "md", minWidth: 768, maxWidth: 1024, label: "Tablet"},
    {key: "lg", minWidth: 1024, maxWidth: 1280, label: "Notebook"},
    {key: "xl", minWidth: 1280, maxWidth: 1536, label: "Desktop"},
    {key: "2xl", minWidth: 1536, maxWidth: 1920, label: "Full HD+"},
    {key: "3xl", minWidth: 1920, maxWidth: 2560, label: "2K / Ultrawide"},
    {key: "4k", minWidth: 2560, maxWidth: Infinity, label: "4K"},
] as const;

/**
 * Mapa rápido de breakpoint key → minWidth.
 */
export const BREAKPOINT_VALUES: Record<BreakpointKey, number> = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
    "3xl": 1920,
    "4k": 2560,
} as const;

/**
 * Resolve o breakpoint ativo com base na largura do viewport.
 *
 * @param width - Largura do viewport em px (window.innerWidth)
 * @returns A chave do breakpoint correspondente
 */
export function resolveBreakpoint(width: number): BreakpointKey {
    // Itera do maior para o menor para encontrar o match
    for (let i = BREAKPOINT_DEFINITIONS.length - 1; i >= 0; i--) {
        if (width >= BREAKPOINT_DEFINITIONS[i].minWidth) {
            return BREAKPOINT_DEFINITIONS[i].key;
        }
    }
    return "xs";
}

/**
 * Retorna a definição completa de um breakpoint.
 *
 * @param key - Chave do breakpoint
 * @returns A definição do breakpoint
 */
export function getBreakpointDefinition(key: BreakpointKey): BreakpointDefinition {
    const definition = BREAKPOINT_DEFINITIONS.find((bp) => bp.key === key);
    if (!definition) {
        return BREAKPOINT_DEFINITIONS[0];
    }
    return definition;
}

/**
 * Verifica se a largura atual está acima de um breakpoint específico.
 *
 * @param width - Largura do viewport em px
 * @param breakpoint - Breakpoint de referência
 * @returns true se width >= breakpoint.minWidth
 */
export function isAboveBreakpoint(width: number, breakpoint: BreakpointKey): boolean {
    return width >= BREAKPOINT_VALUES[breakpoint];
}

/**
 * Verifica se a largura atual está abaixo de um breakpoint específico.
 *
 * @param width - Largura do viewport em px
 * @param breakpoint - Breakpoint de referência
 * @returns true se width < breakpoint.minWidth
 */
export function isBelowBreakpoint(width: number, breakpoint: BreakpointKey): boolean {
    return width < BREAKPOINT_VALUES[breakpoint];
}
