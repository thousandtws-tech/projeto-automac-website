// ============================================================================
// responsive-utils.ts
// Sistema de Responsividade Inteligente — Funções Utilitárias
// ============================================================================

import type { DeviceType, Orientation } from "./responsive-types";

// ----------------------------------------------------------------------------
// Debounce com requestAnimationFrame
// ----------------------------------------------------------------------------

/**
 * Cria uma versão debounced de uma função, combinando setTimeout com
 * requestAnimationFrame para alinhar a execução ao ciclo de pintura.
 *
 * @param fn - Função a ser debounced
 * @param ms - Delay em milissegundos
 * @returns Função debounced com método .cancel()
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let rafId: number | null = null;

  const debounced = ((...args: unknown[]) => {
    // Cancela pendentes
    if (timeoutId !== null) clearTimeout(timeoutId);
    if (rafId !== null) cancelAnimationFrame(rafId);

    timeoutId = setTimeout(() => {
      // Alinha com o próximo frame de pintura
      rafId = requestAnimationFrame(() => {
        fn(...args);
        timeoutId = null;
        rafId = null;
      });
    }, ms);
  }) as T & { cancel: () => void };

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  return debounced;
}

// ----------------------------------------------------------------------------
// Throttle
// ----------------------------------------------------------------------------

/**
 * Cria uma versão throttled de uma função, garantindo execução máxima
 * a cada `ms` milissegundos usando timestamp comparison.
 *
 * @param fn - Função a ser throttled
 * @param ms - Intervalo mínimo entre execuções
 * @returns Função throttled com método .cancel()
 */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number
): T & { cancel: () => void } {
  let lastCall = 0;
  let trailingTimeout: ReturnType<typeof setTimeout> | null = null;

  const throttled = ((...args: unknown[]) => {
    const now = Date.now();
    const elapsed = now - lastCall;

    if (elapsed >= ms) {
      // Executa imediatamente
      lastCall = now;
      fn(...args);
    } else if (trailingTimeout === null) {
      // Agenda trailing call
      trailingTimeout = setTimeout(() => {
        lastCall = Date.now();
        trailingTimeout = null;
        fn(...args);
      }, ms - elapsed);
    }
  }) as T & { cancel: () => void };

  throttled.cancel = () => {
    if (trailingTimeout !== null) {
      clearTimeout(trailingTimeout);
      trailingTimeout = null;
    }
  };

  return throttled;
}

// ----------------------------------------------------------------------------
// Clamp / Math
// ----------------------------------------------------------------------------

/**
 * Limita um valor entre min e max.
 */
export function clampScale(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Arredonda para N casas decimais (evita valores como 0.71428571428...).
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

// ----------------------------------------------------------------------------
// Device Detection
// ----------------------------------------------------------------------------

/**
 * Detecta se o dispositivo suporta touch.
 * Usa múltiplas heurísticas para compatibilidade cross-browser.
 */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;

  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error — IE/Edge legacy
    (navigator.msMaxTouchPoints != null && navigator.msMaxTouchPoints > 0)
  );
}

/**
 * Detecta o tipo de dispositivo baseado na largura do viewport e touch support.
 */
export function detectDeviceType(width: number): DeviceType {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

/**
 * Detecta a orientação com base nas dimensões da janela.
 */
export function detectOrientation(width: number, height: number): Orientation {
  return width >= height ? "landscape" : "portrait";
}

// ----------------------------------------------------------------------------
// CSS Variable Helpers
// ----------------------------------------------------------------------------

/**
 * Define uma CSS variable no :root (documentElement).
 * Otimizado para evitar escritas desnecessárias (compara valor atual).
 */
export function setCSSVariable(name: string, value: string): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const current = root.style.getPropertyValue(name);

  // Evita reflow desnecessário se o valor não mudou
  if (current !== value) {
    root.style.setProperty(name, value);
  }
}

/**
 * Lê uma CSS variable do :root.
 */
export function getCSSVariable(name: string): string {
  if (typeof document === "undefined") return "";

  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * Remove uma CSS variable do :root.
 */
export function removeCSSVariable(name: string): void {
  if (typeof document === "undefined") return;
  document.documentElement.style.removeProperty(name);
}

// ----------------------------------------------------------------------------
// SSR Guard
// ----------------------------------------------------------------------------

/**
 * Verifica se estamos no browser (não SSR/Node).
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}
