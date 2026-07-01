// ============================================================================
// zoom-manager.ts
// Sistema de Responsividade Inteligente — Detecção e Compensação de Zoom
// ============================================================================
//
// Responsabilidade: detectar o nível de zoom do navegador e fornecer um
// fator de compensação. O zoom é transparente para o ScaleManager — a
// largura efetiva é dividida pelo zoom para obter a largura "real".
//
// Métodos de detecção (em ordem de confiabilidade):
//   1. VisualViewport API (moderno, mais confiável)
//   2. window.outerWidth / window.innerWidth (desktop)
//   3. matchMedia DPI heuristics (fallback)
//
// ============================================================================

import { roundTo } from "./responsive-utils";

/**
 * Níveis de zoom comuns dos navegadores.
 * Usado para "snap" o zoom detectado ao valor mais próximo,
 * evitando flutuações de subpixel.
 */
const COMMON_ZOOM_LEVELS = [0.5, 0.67, 0.75, 0.8, 0.9, 1.0, 1.1, 1.25, 1.5, 1.75, 2.0] as const;

/**
 * Tolerância para snap de zoom (± 5%).
 */
const ZOOM_SNAP_TOLERANCE = 0.05;

/**
 * Gerenciador de Zoom.
 *
 * Detecta o nível de zoom do navegador usando múltiplas estratégias
 * e fornece compensação para o cálculo de escala.
 */
export class ZoomManager {
  /** Último nível de zoom detectado */
  private lastZoomLevel: number = 1;

  /** Listener para VisualViewport resize */
  private visualViewportHandler: (() => void) | null = null;

  /** Callback quando o zoom muda */
  private onZoomChange: ((zoomLevel: number) => void) | null = null;

  constructor() {
    this.lastZoomLevel = this.detect();
  }

  // --------------------------------------------------------------------------
  // Detecção
  // --------------------------------------------------------------------------

  /**
   * Detecta o nível de zoom atual do navegador.
   * Usa múltiplas estratégias com fallback.
   *
   * @returns Nível de zoom (1.0 = 100%, 1.5 = 150%, etc.)
   */
  detect(): number {
    let rawZoom = 1;

    // Estratégia 1: VisualViewport API (mais confiável em mobile e desktop moderno)
    if (typeof window !== "undefined" && window.visualViewport) {
      rawZoom = window.visualViewport.scale;

      // Em desktop, visualViewport.scale pode ser sempre 1
      // Se for 1, tenta outerWidth/innerWidth como complemento
      if (rawZoom === 1) {
        rawZoom = this.detectViaOuterWidth();
      }
    }
    // Estratégia 2: outerWidth / innerWidth (desktop)
    else if (typeof window !== "undefined") {
      rawZoom = this.detectViaOuterWidth();
    }

    // Snap para o nível de zoom mais próximo (evita ruído de subpixel)
    const snapped = this.snapToCommonLevel(rawZoom);

    this.lastZoomLevel = snapped;
    return snapped;
  }

  /**
   * Detecta zoom via outerWidth / innerWidth.
   * Funciona bem em Chrome/Edge desktop, menos confiável em Firefox/Safari.
   */
  private detectViaOuterWidth(): number {
    if (typeof window === "undefined") return 1;

    const outerWidth = window.outerWidth;
    const innerWidth = window.innerWidth;

    // Proteção contra valores inválidos (ex: janela minimizada)
    if (outerWidth <= 0 || innerWidth <= 0) return 1;

    // outerWidth pode incluir scrollbar e bordas do SO
    // Em windows, a diferença é geralmente ~16px (scrollbar)
    // Usamos uma heurística: se a diferença é < 5%, é zoom
    const ratio = outerWidth / innerWidth;

    // Se a razão está muito longe de qualquer zoom conhecido, não é zoom
    if (ratio < 0.4 || ratio > 2.5) return 1;

    return roundTo(ratio, 2);
  }

  /**
   * Snap para o nível de zoom padrão mais próximo.
   * Evita que valores como 1.003 ou 0.997 sejam tratados como zoom.
   */
  private snapToCommonLevel(rawZoom: number): number {
    for (const level of COMMON_ZOOM_LEVELS) {
      if (Math.abs(rawZoom - level) <= ZOOM_SNAP_TOLERANCE) {
        return level;
      }
    }
    // Se não encontrou match próximo, arredonda para 2 casas
    return roundTo(rawZoom, 2);
  }

  // --------------------------------------------------------------------------
  // Compensação
  // --------------------------------------------------------------------------

  /**
   * Retorna a largura do viewport compensada pelo zoom.
   * Quando o usuário dá zoom in (ex: 150%), o innerWidth reportado é menor.
   * Esta função retorna a largura "real" que o layout deveria ter.
   *
   * @param viewportWidth - window.innerWidth
   * @returns Largura compensada
   */
  compensateWidth(viewportWidth: number): number {
    // Quando zoom > 1, innerWidth diminui → multiplicamos pelo zoom
    // para restaurar a largura "real" percebida
    // Nota: na maioria dos casos, queremos que o zoom NÃO afete
    // o layout — o scale deve ser baseado na resolução física
    return roundTo(viewportWidth * this.lastZoomLevel, 0);
  }

  /**
   * Retorna o último nível de zoom detectado.
   */
  getZoomLevel(): number {
    return this.lastZoomLevel;
  }

  // --------------------------------------------------------------------------
  // Observação
  // --------------------------------------------------------------------------

  /**
   * Registra um listener para mudanças de zoom.
   * Usa VisualViewport API quando disponível.
   *
   * @param callback - Função chamada quando o zoom muda
   */
  observe(callback: (zoomLevel: number) => void): void {
    this.onZoomChange = callback;

    if (typeof window !== "undefined" && window.visualViewport) {
      this.visualViewportHandler = () => {
        const newZoom = this.detect();
        if (newZoom !== this.lastZoomLevel) {
          this.lastZoomLevel = newZoom;
          this.onZoomChange?.(newZoom);
        }
      };

      window.visualViewport.addEventListener("resize", this.visualViewportHandler);
    }
  }

  /**
   * Remove todos os listeners.
   */
  destroy(): void {
    if (this.visualViewportHandler && typeof window !== "undefined" && window.visualViewport) {
      window.visualViewport.removeEventListener("resize", this.visualViewportHandler);
    }
    this.visualViewportHandler = null;
    this.onZoomChange = null;
  }
}
