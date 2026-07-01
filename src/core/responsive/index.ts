// ============================================================================
// src/core/responsive/index.ts
// Sistema de Responsividade Inteligente — Barrel Export
// ============================================================================

// Engine
export { ResponsiveEngine } from "./responsive-engine";

// React
export { ResponsiveProvider, useResponsiveContext } from "./responsive-context";

// Hooks
export {
  useResponsive,
  useBreakpoint,
  useGlobalScale,
  useIsTouch,
  useDeviceType,
  useOrientation,
  useZoomLevel,
  useIsAbove,
  useIsBelow,
  useIsBetween,
  useScaledValue,
  useScaledValues,
  useViewportSize,
} from "./hooks/useResponsive";

// Breakpoints
export {
  BREAKPOINT_DEFINITIONS,
  BREAKPOINT_VALUES,
  resolveBreakpoint,
  getBreakpointDefinition,
  isAboveBreakpoint,
  isBelowBreakpoint,
} from "./breakpoints";

// Types
export type {
  BreakpointKey,
  Orientation,
  DeviceType,
  ViewportInfo,
  ScaleState,
  ResponsiveEngineConfig,
  ResponsiveSubscriber,
  Unsubscribe,
  BreakpointDefinition,
} from "./responsive-types";

export { CSS_VARIABLES } from "./responsive-types";
