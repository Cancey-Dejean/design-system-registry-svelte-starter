import type { Node } from "@xyflow/svelte";
import BoxIcon from "@lucide/svelte/icons/box";
import BracesIcon from "@lucide/svelte/icons/braces";
import ComponentIcon from "@lucide/svelte/icons/component";
import FileCodeIcon from "@lucide/svelte/icons/file-code";
import GlobeIcon from "@lucide/svelte/icons/globe";
import LayersIcon from "@lucide/svelte/icons/layers";
import PackageIcon from "@lucide/svelte/icons/package";
import PaletteIcon from "@lucide/svelte/icons/palette";
import TerminalIcon from "@lucide/svelte/icons/terminal";
import ZapIcon from "@lucide/svelte/icons/zap";

import type { RegistryFlowApi } from "$lib/registry/flow-data";
import type { RegistryItemType } from "$lib/registry/item-types";

export type FlowIcon = typeof BoxIcon;

export const flowColors = {
  up: "oklch(0.62 0.17 252)",
  down: "oklch(0.72 0.16 65)",
  neutral: "var(--muted-foreground)",
  faint: "var(--border)",
} as const;

const registryTypeIcons: Partial<Record<RegistryItemType, FlowIcon>> = {
  "registry:ui": ComponentIcon,
  "registry:component": ComponentIcon,
  "registry:block": LayersIcon,
  "registry:hook": ZapIcon,
  "registry:lib": BracesIcon,
  "registry:file": FileCodeIcon,
  "registry:page": FileCodeIcon,
  "registry:style": PaletteIcon,
  "registry:theme": PaletteIcon,
};

export function getRegistryTypeIcon(type: RegistryItemType): FlowIcon {
  return registryTypeIcons[type] ?? BoxIcon;
}

const extraIcons = { globe: GlobeIcon, package: PackageIcon, terminal: TerminalIcon };

// Nodes name their icon instead of holding the component: Svelte Flow expects
// node data to be structured-cloneable, which a component function is not.
export type FlowIconName = RegistryItemType | keyof typeof extraIcons;

export function getFlowIcon(name: FlowIconName): FlowIcon {
  return name in extraIcons
    ? extraIcons[name as keyof typeof extraIcons]
    : getRegistryTypeIcon(name as RegistryItemType);
}

export function getRegistryTypeLabel(type: RegistryItemType): string {
  return type.replace("registry:", "");
}

export function splitFilePath(path: string): { directory: string; base: string } {
  const index = path.lastIndexOf("/");

  return index === -1
    ? { directory: "", base: path }
    : { directory: path.slice(0, index + 1), base: path.slice(index + 1) };
}

export const hiddenHandleStyle = "opacity: 0; pointer-events: none";

export type FlowTone = "default" | "focus" | "up" | "down" | "dim" | "package" | "remote" | "empty";

export const toneClassNames: Record<FlowTone, string> = {
  default: "border-border bg-card",
  focus: "border-primary bg-primary text-primary-foreground shadow-lg",
  up: "border-blue-500/45 bg-blue-500/10",
  down: "border-amber-500/50 bg-amber-500/10",
  dim: "border-border bg-card opacity-30",
  package: "border-border bg-muted font-mono text-xs shadow-none",
  remote: "border-dashed border-border bg-muted font-mono text-xs shadow-none",
  empty:
    "justify-center border-dashed border-border bg-transparent text-muted-foreground shadow-none",
};

export const FLOW_ITEM_WIDTH = 220;
export const FLOW_ITEM_HEIGHT = 38;

export type FlowItemNodeData = {
  label: string;
  icon?: FlowIconName;
  meta?: string;
  tone: FlowTone;
  target?: string;
  title?: string;
};

export type FlowItemNode = Node<FlowItemNodeData, "item">;

export type FlowLabelNodeData = { label: string; width?: number };

export type FlowLabelNode = Node<FlowLabelNodeData, "label">;

export type FlowFocusNodeData = {
  title: string;
  type: RegistryItemType;
  files: readonly string[];
};

export type FlowFocusNode = Node<FlowFocusNodeData, "focus">;

export const FLOW_FOCUS_WIDTH = 240;

export type FlowChainNodeData = {
  label: string;
  icon: FlowIconName;
  kind: string;
  step?: number;
  lines: readonly string[];
  linesArePaths?: boolean;
  variant: "item" | "root" | "remote" | "sink";
  target?: string;
  apiSummary?: string;
};

export function getApiSummary(api: RegistryFlowApi): string | undefined {
  const parts = api.variants.map((variant) => `${variant.name} ${variant.options.length}`);

  if (api.props.length > 0) {
    parts.push(`${api.props.length} ${api.props.length === 1 ? "prop" : "props"}`);
  }

  return parts.length > 0 ? parts.join(" · ") : undefined;
}

export type FlowChainNode = Node<FlowChainNodeData, "chain">;

export const FLOW_CHAIN_WIDTH = 240;
export const CHAIN_TITLE_CENTER = 40;

export function estimateChainNodeHeight(lineCount: number, hasApiSummary = false): number {
  return 62 + (lineCount > 0 ? 18 + lineCount * 18 : 0) + (hasApiSummary ? 27 : 0);
}

export type FlowPropNodeRow = { label: string; detail?: string; isDefault?: boolean };

export type FlowPropNodeData = {
  owner: string;
  label: string;
  rows: readonly FlowPropNodeRow[];
  expanded: boolean;
};

export type FlowPropNode = Node<FlowPropNodeData, "prop">;

export const FLOW_PROP_WIDTH = 184;
export const PROP_HEADER_HEIGHT = 34;
export const PROP_ROW_HEIGHT = 22;

export function estimatePropNodeHeight(rowCount: number, expanded: boolean): number {
  return PROP_HEADER_HEIGHT + (expanded ? rowCount * PROP_ROW_HEIGHT + 10 : 0);
}
