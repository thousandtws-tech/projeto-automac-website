// ============================================================================
// scale-manager.ts
// Sistema de Responsividade Inteligente — Gerenciador de Escala
// ============================================================================
//
// Responsabilidade: calcular o fator de escala global (--global-scale) baseado
// na resolução efetiva do viewport, compensando zoom e DPI. A resolução de
// referência é 1920px (Full HD) — nessa largura, globalScale = 1.0.
//
// ============================================================================

import type { ResponsiveEngineConfig } from "./responsive-types";
import { clampScale, roundTo } from "./responsive-utils";

/**
 * Configuração padrão do ScaleManager.
 */
const DEFAULT_CONFIG: Pick<ResponsiveEngineConfig, "baseWidth" | "minScale" | "maxScale"> = {
  baseWidth: 1920,
  minScale: 0.65,
  maxScale: 1.5,
};

/**
 * Gerenciador de Escala.
 *
 * Calcula o fator `globalScale` como a razão entre a largura efetiva
 * do viewport e a largura de referência, limitada por min/max.
 *
 * Fórmula:
 *   effectiveWidth = viewportWidth (já compensado por zoom se necessário)
 *   globalScale = clamp(effectiveWidth / baseWidth, minScale, maxScale)
 *
 * Resultados típicos:
 *   - 4K (3840px): ~1.5 (limitado pelo maxScale)
 *   - 2K (2560px): ~1.33
 *   - FHD (1920px): 1.0
 *   - HD (1366px): ~0.71
 *   - Tablet (768px): ~0.65 (limitado pelo minScale)
 *   - Mobile (375px): ~0.65 (limitado pelo minScale)
 */
export class ScaleManager {
  private baseWidth: number;
  private minScale: number;
  private maxScale: number;

  /** Último valor calculado (cache para evitar recálculos idênticos) */
  private lastScale: number = 1;
  private lastInputWidth: number = 0;

  constructor(config?: Partial<Pick<ResponsiveEngineConfig, "baseWidth" | "minScale" | "maxScale">>) {
    this.baseWidth = config?.baseWidth ?? DEFAULT_CONFIG.baseWidth;
    this.minScale = config?.minScale ?? DEFAULT_CONFIG.minScale;
    this.maxScale = config?.maxScale ?? DEFAULT_CONFIG.maxScale;
  }

  // --------------------------------------------------------------------------
  // Cálculo Principal
  // --------------------------------------------------------------------------

  /**
   * Calcula o fator de escala global.
   *
   * @param viewportWidth - Largura do viewport em px (já compensada por zoom)
   * @returns Fator de escala arredondado a 4 casas decimais
   */
  calculate(viewportWidth: number): number {
    // Cache: se a largura não mudou, retorna o valor em cache
    if (viewportWidth === this.lastInputWidth) {
      return this.lastScale;
    }

    const rawScale = viewportWidth / this.baseWidth;
    const clamped = clampScale(rawScale, this.minScale, this.maxScale);
    const rounded = roundTo(clamped, 4);

    // Atualiza cache
    this.lastInputWidth = viewportWidth;
    this.lastScale = rounded;

    return rounded;
  }

  /**
   * Calcula o tamanho base do font-size (rem) proporcional à escala.
   * Usa 16px como referência (padrão dos browsers).
   *
   * @param globalScale - Fator de escala calculado
   * @returns Font size base em px
   */
  calculateBaseFontSize(globalScale: number): number {
    return roundTo(16 * globalScale, 2);
  }

  // --------------------------------------------------------------------------
  // Configuração
  // --------------------------------------------------------------------------

  /**
   * Atualiza a configuração em runtime.
   */
  updateConfig(config: Partial<Pick<ResponsiveEngineConfig, "baseWidth" | "minScale" | "maxScale">>): void {
    if (config.baseWidth !== undefined) this.baseWidth = config.baseWidth;
    if (config.minScale !== undefined) this.minScale = config.minScale;
    if (config.maxScale !== undefined) this.maxScale = config.maxScale;

    // Invalida cache para forçar recálculo
    this.lastInputWidth = 0;
  }

  /**
   * Retorna a configuração atual.
   */
  getConfig() {
    return {
      baseWidth: this.baseWidth,
      minScale: this.minScale,
      maxScale: this.maxScale,
    };
  }
}
