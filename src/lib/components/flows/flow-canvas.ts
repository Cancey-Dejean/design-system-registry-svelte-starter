import type { ColorMode, SvelteFlowProps } from "@xyflow/svelte";
import type { Snippet } from "svelte";

import type { RegistryFlowGraph } from "$lib/registry/flow-graph";

export type FlowViewProps = {
  graph: RegistryFlowGraph;
  selected: string;
  onSelect: (name: string) => void;
  colorMode: ColorMode;
  header?: Snippet;
};

export const flowSidebarScrollClassName =
  "overscroll-contain [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent";

export const flowToolbarClassName =
  "flex flex-wrap items-center justify-between gap-2 border-b bg-card px-4 py-2.5";

export const flowToolbarLabelClassName =
  "font-mono text-[11px] tracking-wider text-muted-foreground uppercase";

export const flowSegmentedClassName = "inline-flex flex-wrap gap-0.5 rounded-lg border p-0.5";

export const flowSegmentClassName =
  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50 aria-pressed:bg-muted aria-pressed:font-medium aria-pressed:text-foreground";

export const flowCanvasDefaults = {
  nodesDraggable: false,
  nodesConnectable: false,
  elementsSelectable: false,
  minZoom: 0.3,
  maxZoom: 1.6,
} satisfies Partial<SvelteFlowProps>;

/** Svelte Flow takes edge styles as a CSS string, so `extra` uses CSS property names. */
export function getFlowEdgeStyle(
  stroke: string,
  extra: Record<string, string | number> = {},
): string {
  return Object.entries({ stroke, "stroke-width": 1.5, ...extra })
    .map(([property, value]) => `${property}: ${value}`)
    .join("; ");
}
