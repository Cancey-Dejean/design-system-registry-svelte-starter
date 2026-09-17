import type { Component } from "svelte";
import type { RegistryItemType } from "./item-types";
import { registrySections, type RegistrySectionId } from "./sections";

export interface RegistryItemFile {
  path: string;
  type: string;
  target: string;
}

export interface RegistryItemMetadata {
  name: string;
  type: RegistryItemType;
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryItemFile[];
}

interface RegistryDocModule {
  default: Component;
  metadata: RegistryItemMetadata;
}

interface PreviewModule {
  default: Component;
}

// Eager: frontmatter is tiny and needed everywhere (nav, listings).
const registryModules = import.meta.glob<RegistryDocModule>("/registry/items/*/*/_registry.svx", {
  eager: true,
});

// Lazy: only the requested item's preview should end up in a route's bundle.
const previewLoaders = import.meta.glob<PreviewModule>("/registry/items/*/*/_preview.svelte");

// Raw source of the preview file, for the "Code" tab. Server-only consumers (+page.server.ts)
// so this text never ships to the client bundle.
const previewSourceLoaders = import.meta.glob<string>("/registry/items/*/*/_preview.svelte", {
  query: "?raw",
  import: "default",
});

// Raw source of the _registry.svx frontmatter+body, for llms.txt/.md twins.
const registryRawSources = import.meta.glob<string>("/registry/items/*/*/_registry.svx", {
  eager: true,
  query: "?raw",
  import: "default",
});

function stripFrontmatter(raw: string): string {
  return raw.replace(/^---\n[\s\S]*?\n---\n/, "").trim();
}

const ITEM_PATH_PATTERN = /\/registry\/items\/([^/]+)\/([^/]+)\/_registry\.svx$/;

export interface RegistryCatalogItem {
  section: RegistrySectionId;
  name: string;
  metadata: RegistryItemMetadata;
}

function isRegistrySectionId(value: string): value is RegistrySectionId {
  return value in registrySections;
}

function parseItemPath(path: string): { section: RegistrySectionId; name: string } | null {
  const match = ITEM_PATH_PATTERN.exec(path);
  if (!match) return null;
  const [, sectionDir, name] = match;
  if (!isRegistrySectionId(sectionDir)) return null;
  return { section: sectionDir, name };
}

export function getAllRegistryItems(): RegistryCatalogItem[] {
  const items: RegistryCatalogItem[] = [];
  for (const [path, mod] of Object.entries(registryModules)) {
    const parsed = parseItemPath(path);
    if (!parsed) continue;
    items.push({ section: parsed.section, name: parsed.name, metadata: mod.metadata });
  }
  return items;
}

export function getRegistryItemsBySection(section: RegistrySectionId): RegistryCatalogItem[] {
  return getAllRegistryItems().filter((item) => item.section === section);
}

function findEntryPath(section: RegistrySectionId, name: string): string | undefined {
  return Object.keys(registryModules).find((path) => {
    const parsed = parseItemPath(path);
    return parsed?.section === section && parsed.name === name;
  });
}

/** Metadata + the compiled doc body (both eager, cheap to access synchronously). */
export function getRegistryItemContent(
  section: RegistrySectionId,
  name: string,
): { metadata: RegistryItemMetadata; Body: Component } | null {
  const entryPath = findEntryPath(section, name);
  if (!entryPath) return null;
  const mod = registryModules[entryPath];
  return { metadata: mod.metadata, Body: mod.default };
}

/** The live preview component, loaded lazily so it isn't bundled into every route. */
export async function loadRegistryItemPreview(
  section: RegistrySectionId,
  name: string,
): Promise<Component | null> {
  const entryPath = findEntryPath(section, name);
  if (!entryPath) return null;
  const previewPath = entryPath.replace("_registry.svx", "_preview.svelte");
  const loadPreview = previewLoaders[previewPath];
  if (!loadPreview) return null;
  const previewMod = await loadPreview();
  return previewMod.default;
}

/** Raw source of the preview file, for server-only syntax highlighting. */
export async function loadRegistryItemPreviewSource(
  section: RegistrySectionId,
  name: string,
): Promise<string | null> {
  const entryPath = findEntryPath(section, name);
  if (!entryPath) return null;
  const previewPath = entryPath.replace("_registry.svx", "_preview.svelte");
  const loadSource = previewSourceLoaders[previewPath];
  if (!loadSource) return null;
  return await loadSource();
}

/** Raw markdown body of the _registry.svx (frontmatter stripped), for llms.txt/.md twins. */
export function getRegistryItemRawSource(section: RegistrySectionId, name: string): string | null {
  const entryPath = findEntryPath(section, name);
  if (!entryPath) return null;
  const raw = registryRawSources[entryPath];
  return raw ? stripFrontmatter(raw) : null;
}
