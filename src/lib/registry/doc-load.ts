import { error } from "@sveltejs/kit";
import { getAllDocs, getDoc, getDocRawSource } from "./docs-catalog";
import { getDocPath } from "./doc-path";
import { extractHeadings } from "./extract-headings";

export function loadDocPage(slug: string) {
  const doc = getDoc(slug);
  if (!doc) error(404, `Doc not found: ${slug}`);
  const all = getAllDocs();
  const index = all.findIndex((entry) => entry.slug === slug);
  const adjacent = (entry: (typeof all)[number]) => ({
    title: entry.metadata.title,
    url: getDocPath(entry.slug),
  });
  return {
    slug,
    metadata: doc.metadata,
    toc: extractHeadings(getDocRawSource(slug) ?? ""),
    prev: index > 0 ? adjacent(all[index - 1]) : null,
    next: index >= 0 && index < all.length - 1 ? adjacent(all[index + 1]) : null,
  };
}
