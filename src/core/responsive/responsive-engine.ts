// ============================================================================
// responsive-engine.ts
// Sistema de Responsividade Inteligente — Orquestrador Principal
// ============================================================================
//
// Singleton que coordena os 3 managers (Scale, Zoom, Viewport), calcula
// o ScaleState unificado, aplica CSS variables no :root, e notifica
// subscribers via Observer pattern.
//
// Uso:
//   import { ResponsiveEngine } from "@core/responsive/responsive-engine";
//
//   ResponsiveEngine.init();  // Inicializa com defaults
//   const state = ResponsiveEngine.getState();
//   const unsub = ResponsiveEngine.subscribe((state) => { ... });
//   ResponsiveEngine.destroy();  // Cleanup
//
// ============================================================================

import type {
  ResponsiveEngineConfig,
  ResponsiveSubscriber,
  ScaleState,
  Unsubscribe,
  ViewportInfo,
} from "./responsive-types";
import { CSS_VARIABLES } from "./responsive-types";
import { ScaleManager } from "./scale-manager";
import { ZoomManager } from "./zoom-manager";
import { ViewportManager } from "./viewport-manager";
import { resolveBreakpoint } from "./breakpoints";
import { isBrowser, setCSSVariable, removeCSSVariable } from "./responsive-utils";

// ----------------------------------------------------------------------------
// Configuração Padrão
// ----------------------------------------------------------------------------

const DEFAULT_CONFIG: ResponsiveEngineConfig = {
  baseWidth: 1920,
  minScale: 0.65,
  maxScale: 1.5,
  debounceMs: 100,
  compensateZoom: true,
  applyCSSVariables: true,
};

// ----------------------------------------------------------------------------
// Engine
// ----------------------------------------------------------------------------

/**
 * ResponsiveEngine — Orquestrador principal do sistema de responsividade.
 *
 * Padrão Singleton. Coordena ScaleManager, ZoomManager e ViewportManager
 * para calcular um ScaleState unificado e aplicar CSS variables globais.
 *
 * Lifecycle:
 *   1. init() — cria managers, registra observers, calcula estado inicial
 *   2. recalculate() — recalcula estado (chamado automaticamente por observers)
 *   3. subscribe() — registra listeners para mudanças de estado
 *   4. destroy() — cleanup completo
 */
class _ResponsiveEngine {
  /** Se o engine foi inicializado */
  private initialized: boolean = false;

  /** Configuração ativa */
  private config: ResponsiveEngineConfig = { ...DEFAULT_CONFIG };

  /** Managers */
  private scaleManager: ScaleManager | null = null;
  private zoomManager: ZoomManager | null = null;
  private viewportManager: ViewportManager | null = null;

  /** Estado atual */
  private currentState: ScaleState | null = null;

  /** Subscribers (Observer pattern) */
  private subscribers: Set<ResponsiveSubscriber> = new Set();

  // --------------------------------------------------------------------------
  // Initialization
  // --------------------------------------------------------------------------

  /**
   * Inicializa o engine com configuração opcional.
   * Seguro para chamar múltiplas vezes (idempotente).
   *
   * @param config - Configuração parcial para override
   */
  init(config?: Partial<ResponsiveEngineConfig>): void {
    // Não executa no servidor (SSR)
    if (!isBrowser()) return;

    // Se já inicializado, apenas atualiza config se fornecida
    if (this.initialized) {
      if (config) this.updateConfig(config);
      return;
    }

    // Merge config
    this.config = { ...DEFAULT_CONFIG, ...config };

    // Cria managers
    this.scaleManager = new ScaleManager({
      baseWidth: this.config.baseWidth,
      minScale: this.config.minScale,
      maxScale: this.config.maxScale,
    });

    this.zoomManager = new ZoomManager();
    this.viewportManager = new ViewportManager();

    // Registra observers
    this.viewportManager.observe((info: ViewportInfo) => {
      this.recalculate(info);
    }, this.config.debounceMs);

    this.zoomManager.observe(() => {
      // Zoom mudou — recalcula com viewport info atual
      const info = this.viewportManager!.getInfo();
      this.recalculate(info);
    });

    // Calcula estado inicial
    const initialInfo = this.viewportManager.getInfo();
    this.recalculate(initialInfo);

    this.initialized = true;
  }

  // --------------------------------------------------------------------------
  // Recalculation
  // --------------------------------------------------------------------------

  /**
   * Recalcula o ScaleState completo e notifica subscribers.
   * Chamado automaticamente pelos observers.
   *
   * @param viewportInfo - Informações atuais do viewport
   */
  private recalculate(viewportInfo: ViewportInfo): void {
    if (!this.scaleManager || !this.zoomManager) return;

    // 1. Detecta zoom
    const zoomLevel = this.zoomManager.detect();

    // 2. Calcula largura efetiva (compensada por zoom se habilitado)
    let effectiveWidth = viewportInfo.width;
    if (this.config.compensateZoom && zoomLevel !== 1) {
      effectiveWidth = this.zoomManager.compensateWidth(viewportInfo.width);
    }

    // 3. Calcula escala global
    const globalScale = this.scaleManager.calculate(effectiveWidth);

    // 4. Calcula font size base
    const baseFontSize = this.scaleManager.calculateBaseFontSize(globalScale);

    // 5. Resolve breakpoint
    const breakpoint = resolveBreakpoint(viewportInfo.width);

    // 6. Monta novo estado
    const newState: ScaleState = {
      globalScale,
      zoomLevel,
      baseFontSize,
      breakpoint,
      viewport: viewportInfo,
      timestamp: Date.now(),
    };

    // 7. Aplica CSS variables
    if (this.config.applyCSSVariables) {
      this.applyCSSVariables(newState);
    }

    // 8. Atualiza estado e notifica
    this.currentState = newState;
    this.notifySubscribers(newState);
  }

  // --------------------------------------------------------------------------
  // CSS Variables
  // --------------------------------------------------------------------------

  /**
   * Aplica todas as CSS variables no :root.
   */
  private applyCSSVariables(state: ScaleState): void {
    setCSSVariable(CSS_VARIABLES.GLOBAL_SCALE, String(state.globalScale));
    setCSSVariable(CSS_VARIABLES.SCALE_ALIAS, String(state.globalScale));
    setCSSVariable(CSS_VARIABLES.ZOOM_LEVEL, String(state.zoomLevel));
    setCSSVariable(CSS_VARIABLES.VIEWPORT_WIDTH, `${state.viewport.width}px`);
    setCSSVariable(CSS_VARIABLES.VIEWPORT_HEIGHT, `${state.viewport.height}px`);
    setCSSVariable(CSS_VARIABLES.BASE_FONT_SIZE, `${state.baseFontSize}px`);
    setCSSVariable(CSS_VARIABLES.BREAKPOINT, state.breakpoint);
    setCSSVariable(CSS_VARIABLES.DEVICE_TYPE, state.viewport.deviceType);
    setCSSVariable(CSS_VARIABLES.ORIENTATION, state.viewport.orientation);
  }

  /**
   * Remove todas as CSS variables injetadas.
   */
  private removeCSSVariables(): void {
    Object.values(CSS_VARIABLES).forEach((name) => {
      removeCSSVariable(name);
    });
  }

  // --------------------------------------------------------------------------
  // Observer Pattern
  // --------------------------------------------------------------------------

  /**
   * Registra um subscriber para receber atualizações de estado.
   *
   * @param subscriber - Callback chamado com o novo ScaleState
   * @returns Função de unsubscribe
   */
  subscribe(subscriber: ResponsiveSubscriber): Unsubscribe {
    this.subscribers.add(subscriber);

    // Emite estado atual imediatamente se disponível
    if (this.currentState) {
      subscriber(this.currentState);
    }

    return () => {
      this.subscribers.delete(subscriber);
    };
  }

  /**
   * Notifica todos os subscribers com o novo estado.
   */
  private notifySubscribers(state: ScaleState): void {
    this.subscribers.forEach((subscriber) => {
      try {
        subscriber(state);
      } catch (error) {
        console.error("[ResponsiveEngine] Subscriber error:", error);
      }
    });
  }

  // --------------------------------------------------------------------------
  // Public API
  // --------------------------------------------------------------------------

  /**
   * Estado padrão estável (referência fixa — nunca recriado).
   * Usado quando o engine não foi inicializado (SSR ou pré-mount).
   */
  private readonly defaultState: ScaleState = {
    globalScale: 1,
    zoomLevel: 1,
    baseFontSize: 16,
    breakpoint: "xl",
    viewport: {
      width: 1920,
      height: 1080,
      screenWidth: 1920,
      screenHeight: 1080,
      devicePixelRatio: 1,
      orientation: "landscape",
      isTouch: false,
      deviceType: "desktop",
    },
    timestamp: 0,
  };

  /**
   * Retorna o ScaleState atual.
   * Se o engine não foi inicializado, retorna um estado padrão (SSR-safe).
   */
  getState(): ScaleState {
    return this.currentState ?? this.defaultState;
  }

  /**
   * Retorna um snapshot do estado para useSyncExternalStore.
   * Retorna referência estável se o estado não mudou.
   */
  getSnapshot = (): ScaleState => {
    return this.currentState ?? this.defaultState;
  };

  /**
   * Snapshot para SSR (server-side rendering).
   * Retorna sempre a mesma referência — obrigatório para useSyncExternalStore.
   */
  getServerSnapshot = (): ScaleState => {
    return this.defaultState;
  };

  /**
   * Verifica se o engine foi inicializado.
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Atualiza a configuração em runtime e força recálculo.
   */
  updateConfig(config: Partial<ResponsiveEngineConfig>): void {
    this.config = { ...this.config, ...config };

    if (this.scaleManager) {
      this.scaleManager.updateConfig({
        baseWidth: this.config.baseWidth,
        minScale: this.config.minScale,
        maxScale: this.config.maxScale,
      });
    }

    // Força recálculo
    if (this.viewportManager) {
      const info = this.viewportManager.getInfo();
      this.recalculate(info);
    }
  }

  // --------------------------------------------------------------------------
  // Cleanup
  // --------------------------------------------------------------------------

  /**
   * Destrói o engine, removendo todos os listeners e CSS variables.
   */
  destroy(): void {
    if (!this.initialized) return;

    // Cleanup managers
    this.viewportManager?.destroy();
    this.zoomManager?.destroy();

    // Remove CSS variables
    this.removeCSSVariables();

    // Limpa subscribers
    this.subscribers.clear();

    // Reset state
    this.scaleManager = null;
    this.zoomManager = null;
    this.viewportManager = null;
    this.currentState = null;
    this.initialized = false;
  }
}

// ----------------------------------------------------------------------------
// Singleton Export
// ----------------------------------------------------------------------------

/**
 * Instância singleton do ResponsiveEngine.
 *
 * @example
 * ```ts
 * import { ResponsiveEngine } from "@core/responsive/responsive-engine";
 *
 * // Inicializar (geralmente no layout root)
 * ResponsiveEngine.init({ baseWidth: 1920 });
 *
 * // Obter estado
 * const state = ResponsiveEngine.getState();
 * console.log(state.globalScale); // 1.0 em Full HD
 *
 * // Observar mudanças
 * const unsub = ResponsiveEngine.subscribe((state) => {
 *   console.log("Scale:", state.globalScale);
 * });
 *
 * // Cleanup
 * ResponsiveEngine.destroy();
 * ```
 */
export const ResponsiveEngine = new _ResponsiveEngine();
