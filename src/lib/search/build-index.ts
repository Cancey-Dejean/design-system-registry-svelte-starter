import { getDocPath } from "$lib/registry/doc-path";
import { getAllDocs } from "$lib/registry/docs-catalog";
import { getAllRegistryItems } from "$lib/registry/catalog";
import { registrySections } from "$lib/registry/sections";

export interface SearchIndexEntry {
  title: string;
  description: string;
  url: string;
  section: string;
}

export function buildSearchIndex(): SearchIndexEntry[] {
  const docs: SearchIndexEntry[] = getAllDocs().map((doc) => ({
    title: doc.metadata.title,
    description: doc.metadata.description ?? "",
    url: getDocPath(doc.slug),
    section: "Docs",
  }));

  const items: SearchIndexEntry[] = getAllRegistryItems().map((item) => ({
    title: item.metadata.title,
    description: item.metadata.description ?? "",
    url: `${registrySections[item.section].basePath}/${item.name}`,
    section: registrySections[item.section].title,
  }));

  return [...docs, ...items];
}
