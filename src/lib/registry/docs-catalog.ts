import type { Component } from "svelte";

export interface DocPageMetadata {
  title: string;
  description?: string;
  order?: number;
  group?: string;
}

interface DocModule {
  default: Component;
  metadata: DocPageMetadata;
}

const docModules = import.meta.glob<DocModule>("/registry/docs/*.svx", { eager: true });

const docRawSources = import.meta.glob<string>("/registry/docs/*.svx", {
  eager: true,
  query: "?raw",
  import: "default",
});

const DOC_PATH_PATTERN = /\/registry\/docs\/([^/]+)\.svx$/;

function stripFrontmatter(raw: string): string {
  return raw.replace(/^---\n[\s\S]*?\n---\n/, "").trim();
}

export interface DocCatalogEntry {
  slug: string;
  metadata: DocPageMetadata;
  Body: Component;
}

function slugFromPath(path: string): string | null {
  const match = DOC_PATH_PATTERN.exec(path);
  return match ? match[1] : null;
}

export function getAllDocs(): DocCatalogEntry[] {
  return Object.entries(docModules)
    .map(([path, mod]) => {
      const slug = slugFromPath(path);
      if (!slug) return null;
      return { slug, metadata: mod.metadata, Body: mod.default };
    })
    .filter((entry): entry is DocCatalogEntry => entry !== null)
    .sort((a, b) => (a.metadata.order ?? 0) - (b.metadata.order ?? 0));
}

export function getDoc(slug: string): DocCatalogEntry | null {
  return getAllDocs().find((doc) => doc.slug === slug) ?? null;
}

export function getDocRawSource(slug: string): string | null {
  for (const [path, raw] of Object.entries(docRawSources)) {
    if (slugFromPath(path) === slug) return stripFrontmatter(raw);
  }
  return null;
}
