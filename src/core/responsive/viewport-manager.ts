// ============================================================================
// viewport-manager.ts
// Sistema de Responsividade Inteligente — Monitoramento do Viewport
// ============================================================================
//
// Responsabilidade: monitorar TODAS as mudanças que afetam o viewport:
//   - Resize da janela
//   - Mudança de orientação
//   - Fullscreen toggle
//   - VisualViewport changes (mobile keyboard, etc.)
//   - Mudança de monitor (multi-monitor)
//
// Emite um ViewportInfo unificado via callback, debounced com rAF.
//
// ============================================================================

import type { ViewportInfo } from "./responsive-types";
import { debounce, detectDeviceType, detectOrientation, isTouchDevice } from "./responsive-utils";

/**
 * Gerenciador do Viewport.
 *
 * Centraliza a observação de todos os eventos que alteram as dimensões
 * ou características do viewport, emitindo um ViewportInfo consolidado.
 */
export class ViewportManager {
  /** Último ViewportInfo computado (cache) */
  private lastInfo: ViewportInfo | null = null;

  /** Callback quando o viewport muda */
  private onChange: ((info: ViewportInfo) => void) | null = null;

  /** Debounced handler */
  private debouncedUpdate: ReturnType<typeof debounce> | null = null;

  /** ResizeObserver no documentElement */
  private resizeObserver: ResizeObserver | null = null;

  /** MediaQueryList para orientação */
  private orientationMql: MediaQueryList | null = null;
  private orientationHandler: ((e: MediaQueryListEvent) => void) | null = null;

  /** Fullscreen change handler */
  private fullscreenHandler: (() => void) | null = null;

  /** DPR MediaQueryList (detecta mudança de monitor) */
  private dprMql: MediaQueryList | null = null;
  private dprHandler: ((e: MediaQueryListEvent) => void) | null = null;

  constructor() {
    // Computa o estado inicial se estivermos no browser
    if (typeof window !== "undefined") {
      this.lastInfo = this.computeViewportInfo();
    }
  }

  // --------------------------------------------------------------------------
  // Computação
  // --------------------------------------------------------------------------

  /**
   * Computa o ViewportInfo completo do estado atual.
   * Leitura sincronizada para evitar layout thrashing.
   */
  computeViewportInfo(): ViewportInfo {
    if (typeof window === "undefined") {
      return this.getSSRFallback();
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    return {
      width,
      height,
      screenWidth: window.screen?.width ?? width,
      screenHeight: window.screen?.height ?? height,
      devicePixelRatio: window.devicePixelRatio ?? 1,
      orientation: detectOrientation(width, height),
      isTouch: isTouchDevice(),
      deviceType: detectDeviceType(width),
    };
  }

  /**
   * Fallback para SSR — valores neutros.
   */
  private getSSRFallback(): ViewportInfo {
    return {
      width: 1920,
      height: 1080,
      screenWidth: 1920,
      screenHeight: 1080,
      devicePixelRatio: 1,
      orientation: "landscape",
      isTouch: false,
      deviceType: "desktop",
    };
  }

  /**
   * Retorna o último ViewportInfo (do cache).
   */
  getInfo(): ViewportInfo {
    if (!this.lastInfo) {
      this.lastInfo = this.computeViewportInfo();
    }
    return this.lastInfo;
  }

  // --------------------------------------------------------------------------
  // Observação
  // --------------------------------------------------------------------------

  /**
   * Inicia a observação de todas as fontes de mudança do viewport.
   *
   * @param callback - Chamado com o novo ViewportInfo quando algo muda
   * @param debounceMs - Debounce em ms (padrão: 100)
   */
  observe(callback: (info: ViewportInfo) => void, debounceMs: number = 100): void {
    if (typeof window === "undefined") return;

    this.onChange = callback;

    // Cria o handler debounced
    this.debouncedUpdate = debounce(() => {
      const info = this.computeViewportInfo();

      // Só emite se algo mudou (evita atualizações redundantes)
      if (this.hasChanged(info)) {
        this.lastInfo = info;
        this.onChange?.(info);
      }
    }, debounceMs);

    // 1. ResizeObserver no documentElement (mais preciso que window resize)
    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => {
        this.debouncedUpdate?.();
      });
      this.resizeObserver.observe(document.documentElement);
    } else {
      // Fallback: window resize
      window.addEventListener("resize", this.debouncedUpdate);
    }

    // 2. Orientação via matchMedia
    this.orientationMql = window.matchMedia("(orientation: portrait)");
    this.orientationHandler = () => this.debouncedUpdate?.();
    this.orientationMql.addEventListener("change", this.orientationHandler);

    // 3. Fullscreen change
    this.fullscreenHandler = () => this.debouncedUpdate?.();
    document.addEventListener("fullscreenchange", this.fullscreenHandler);

    // 4. Mudança de DPR (troca de monitor em multi-monitor)
    this.observeDPRChange();
  }

  /**
   * Observa mudanças no devicePixelRatio.
   * Usando matchMedia com resolução exata, recria o listener quando o DPR muda.
   */
  private observeDPRChange(): void {
    if (typeof window === "undefined") return;

    const currentDPR = window.devicePixelRatio;
    const query = `(resolution: ${currentDPR}dppx)`;

    this.dprMql = window.matchMedia(query);
    this.dprHandler = () => {
      // DPR mudou — notifica e re-observa com novo DPR
      this.debouncedUpdate?.();
      // Re-attach com o novo valor
      this.cleanupDPRObserver();
      this.observeDPRChange();
    };

    // Usa addListener para compatibilidade com Safari antigo
    this.dprMql.addEventListener("change", this.dprHandler);
  }

  /**
   * Limpa o observer de DPR.
   */
  private cleanupDPRObserver(): void {
    if (this.dprMql && this.dprHandler) {
      this.dprMql.removeEventListener("change", this.dprHandler);
    }
    this.dprMql = null;
    this.dprHandler = null;
  }

  // --------------------------------------------------------------------------
  // Comparação
  // --------------------------------------------------------------------------

  /**
   * Compara dois ViewportInfo para detectar mudanças significativas.
   * Evita recálculos quando apenas subpixels mudam.
   */
  private hasChanged(newInfo: ViewportInfo): boolean {
    if (!this.lastInfo) return true;

    return (
      Math.abs(newInfo.width - this.lastInfo.width) >= 1 ||
      Math.abs(newInfo.height - this.lastInfo.height) >= 1 ||
      newInfo.devicePixelRatio !== this.lastInfo.devicePixelRatio ||
      newInfo.orientation !== this.lastInfo.orientation
    );
  }

  // --------------------------------------------------------------------------
  // Cleanup
  // --------------------------------------------------------------------------

  /**
   * Remove todos os listeners e observers.
   */
  destroy(): void {
    // ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    // Debounced handler (fallback resize)
    if (this.debouncedUpdate && typeof window !== "undefined") {
      window.removeEventListener("resize", this.debouncedUpdate);
      this.debouncedUpdate.cancel();
      this.debouncedUpdate = null;
    }

    // Orientação
    if (this.orientationMql && this.orientationHandler) {
      this.orientationMql.removeEventListener("change", this.orientationHandler);
    }
    this.orientationMql = null;
    this.orientationHandler = null;

    // Fullscreen
    if (this.fullscreenHandler && typeof document !== "undefined") {
      document.removeEventListener("fullscreenchange", this.fullscreenHandler);
    }
    this.fullscreenHandler = null;

    // DPR
    this.cleanupDPRObserver();

    // Callback
    this.onChange = null;
  }
}
