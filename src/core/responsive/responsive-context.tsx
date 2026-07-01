// ============================================================================
// responsive-context.tsx
// Sistema de Responsividade Inteligente — React Context & Provider
// ============================================================================
//
// Providencia o ScaleState para toda a árvore React via Context API.
// Usa useSyncExternalStore para integração eficiente com o ResponsiveEngine
// singleton, evitando re-renders desnecessários.
//
// Uso:
//   // No layout root:
//   <ResponsiveProvider>
//     {children}
//   </ResponsiveProvider>
//
//   // Em qualquer componente:
//   const { globalScale, breakpoint } = useResponsiveContext();
//
// ============================================================================

"use client";

import React, { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import type { ResponsiveEngineConfig, ScaleState } from "./responsive-types";
import { ResponsiveEngine } from "./responsive-engine";

// ----------------------------------------------------------------------------
// Context
// ----------------------------------------------------------------------------

/**
 * Context do sistema de responsividade.
 * Nunca deve ser consumido diretamente — use useResponsiveContext().
 */
const ResponsiveContext = createContext<ScaleState | null>(null);

ResponsiveContext.displayName = "ResponsiveContext";

// ----------------------------------------------------------------------------
// Provider
// ----------------------------------------------------------------------------

interface ResponsiveProviderProps {
  /** Configuração opcional do engine */
  config?: Partial<ResponsiveEngineConfig>;
  /** Children React */
  children: React.ReactNode;
}

/**
 * ResponsiveProvider — inicializa o ResponsiveEngine e providencia
 * o ScaleState para a árvore de componentes.
 *
 * Deve ser colocado o mais alto possível na hierarquia (geralmente no layout).
 *
 * @example
 * ```tsx
 * // app/[locale]/layout.tsx
 * import { ResponsiveProvider } from "@core/responsive/responsive-context";
 *
 * export default function Layout({ children }) {
 *   return (
 *     <ResponsiveProvider>
 *       {children}
 *     </ResponsiveProvider>
 *   );
 * }
 * ```
 */
export function ResponsiveProvider({ config, children }: ResponsiveProviderProps) {
  // Inicializa o engine no mount
  useEffect(() => {
    ResponsiveEngine.init(config);

    return () => {
      ResponsiveEngine.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Apenas no mount — config changes são handled via updateConfig

  // Atualiza config se props mudam
  useEffect(() => {
    if (config && ResponsiveEngine.isInitialized()) {
      ResponsiveEngine.updateConfig(config);
    }
  }, [config]);

  // Subscribe no engine via useSyncExternalStore
  // Isso garante consistência com concurrent features do React 18+
  const state = useSyncExternalStore(
    ResponsiveEngine.subscribe.bind(ResponsiveEngine),
    ResponsiveEngine.getSnapshot,
    ResponsiveEngine.getServerSnapshot
  );

  // Memoriza o value para evitar re-renders quando o objeto não muda
  const value = useMemo(() => state, [state]);

  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  );
}

// ----------------------------------------------------------------------------
// Consumer Hook
// ----------------------------------------------------------------------------

/**
 * Hook para consumir o ScaleState do ResponsiveContext.
 *
 * @throws Error se usado fora de um ResponsiveProvider
 * @returns O ScaleState atual
 */
export function useResponsiveContext(): ScaleState {
  const context = useContext(ResponsiveContext);

  if (context === null) {
    throw new Error(
      "[useResponsiveContext] Must be used inside <ResponsiveProvider>. " +
      "Wrap your layout with <ResponsiveProvider> to use responsive hooks."
    );
  }

  return context;
}
