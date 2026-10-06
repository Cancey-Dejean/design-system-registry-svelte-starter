export const flowLayouts = ["map", "lanes", "chain"] as const;

export type FlowLayout = (typeof flowLayouts)[number];

export const defaultFlowLayout: FlowLayout = "lanes";

const FLOW_LAYOUT_STORAGE_KEY = "component-flows:layout";

let memoryLayout: FlowLayout | null = null;

function isFlowLayout(value: unknown): value is FlowLayout {
  return typeof value === "string" && flowLayouts.some((layout) => layout === value);
}

/** The chosen flows layout, persisted for the browser session (not across sessions). */
export function readFlowLayout(): FlowLayout {
  try {
    const stored = window.sessionStorage.getItem(FLOW_LAYOUT_STORAGE_KEY);

    if (isFlowLayout(stored)) {
      return stored;
    }
  } catch {
    // sessionStorage can throw when storage is disabled; fall back to memory.
  }

  return memoryLayout ?? defaultFlowLayout;
}

export function writeFlowLayout(layout: FlowLayout) {
  memoryLayout = layout;

  try {
    window.sessionStorage.setItem(FLOW_LAYOUT_STORAGE_KEY, layout);
  } catch {
    // sessionStorage can throw when storage is disabled; the memory copy still applies.
  }
}
