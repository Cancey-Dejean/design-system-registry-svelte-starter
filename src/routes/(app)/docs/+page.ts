import { getAllDocs } from "$lib/registry/docs-catalog";

export function load() {
  return {
    docs: getAllDocs().map((doc) => ({ slug: doc.slug, metadata: doc.metadata })),
  };
}
