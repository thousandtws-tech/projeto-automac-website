// ============================================================================
// responsive-types.ts
// Sistema de Responsividade Inteligente — Tipos e Interfaces
// ============================================================================

/**
 * Chaves dos breakpoints do sistema.
 * Compatíveis com Tailwind CSS (sm, md, lg, xl, 2xl) + extensões (3xl, 4k).
 */
export type BreakpointKey = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4k";

/**
 * Orientação do dispositivo.
 */
export type Orientation = "portrait" | "landscape";

/**
 * Tipo de dispositivo detectado.
 */
export type DeviceType = "mobile" | "tablet" | "desktop";

// ----------------------------------------------------------------------------
// Viewport
// ----------------------------------------------------------------------------

/**
 * Informações completas do viewport atual.
 */
export interface ViewportInfo {
  /** Largura interna da janela (window.innerWidth) */
  width: number;
  /** Altura interna da janela (window.innerHeight) */
  height: number;
  /** Largura total da tela física (screen.width) */
  screenWidth: number;
  /** Altura total da tela física (screen.height) */
  screenHeight: number;
  /** Device Pixel Ratio (window.devicePixelRatio) */
  devicePixelRatio: number;
  /** Orientação detectada */
  orientation: Orientation;
  /** Se o dispositivo suporta touch */
  isTouch: boolean;
  /** Tipo de dispositivo inferido */
  deviceType: DeviceType;
}

// ----------------------------------------------------------------------------
// Scale State
// ----------------------------------------------------------------------------

/**
 * Estado unificado do sistema de responsividade.
 * Emitido pelo ResponsiveEngine a cada recálculo.
 */
export interface ScaleState {
  /** Fator multiplicador global (aplicado como --global-scale) */
  globalScale: number;
  /** Nível de zoom do navegador detectado (1 = 100%) */
  zoomLevel: number;
  /** Tamanho base do rem calculado */
  baseFontSize: number;
  /** Breakpoint ativo */
  breakpoint: BreakpointKey;
  /** Informações do viewport */
  viewport: ViewportInfo;
  /** Timestamp do último recálculo */
  timestamp: number;
}

// ----------------------------------------------------------------------------
// Configuração
// ----------------------------------------------------------------------------

/**
 * Configuração do ResponsiveEngine.
 */
export interface ResponsiveEngineConfig {
  /** Largura de referência para escala 1.0 (padrão: 1920) */
  baseWidth: number;
  /** Fator de escala mínimo (padrão: 0.65) */
  minScale: number;
  /** Fator de escala máximo (padrão: 1.5) */
  maxScale: number;
  /** Debounce em ms para eventos de resize (padrão: 100) */
  debounceMs: number;
  /** Se deve compensar o zoom do navegador (padrão: true) */
  compensateZoom: boolean;
  /** Se deve aplicar CSS variables automaticamente (padrão: true) */
  applyCSSVariables: boolean;
}

// ----------------------------------------------------------------------------
// Observer
// ----------------------------------------------------------------------------

/**
 * Callback de subscriber do ResponsiveEngine.
 */
export type ResponsiveSubscriber = (state: ScaleState) => void;

/**
 * Função de cleanup retornada pelo subscribe.
 */
export type Unsubscribe = () => void;

// ----------------------------------------------------------------------------
// Breakpoint Definition
// ----------------------------------------------------------------------------

/**
 * Definição de um breakpoint individual.
 */
export interface BreakpointDefinition {
  /** Chave do breakpoint */
  key: BreakpointKey;
  /** Largura mínima em px */
  minWidth: number;
  /** Largura máxima em px (exclusive) */
  maxWidth: number;
  /** Label amigável */
  label: string;
}

// ----------------------------------------------------------------------------
// CSS Variable Names
// ----------------------------------------------------------------------------

/**
 * Nomes das CSS variables injetadas pelo engine.
 */
export const CSS_VARIABLES = {
  GLOBAL_SCALE: "--global-scale",
  SCALE_ALIAS: "--rs",
  ZOOM_LEVEL: "--zoom-level",
  VIEWPORT_WIDTH: "--viewport-width",
  VIEWPORT_HEIGHT: "--viewport-height",
  BASE_FONT_SIZE: "--base-font-size",
  BREAKPOINT: "--breakpoint",
  DEVICE_TYPE: "--device-type",
  ORIENTATION: "--orientation",
} as const;
