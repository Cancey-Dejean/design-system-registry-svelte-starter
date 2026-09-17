import { error } from "@sveltejs/kit";
import { getAllDocs, getDoc } from "$lib/registry/docs-catalog";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  const doc = getDoc(params.slug);
  if (!doc) error(404, `Doc not found: ${params.slug}`);

  const all = getAllDocs();
  const index = all.findIndex((entry) => entry.slug === params.slug);
  const toAdjacentPage = (entry: (typeof all)[number]) => ({
    title: entry.metadata.title,
    url: `/docs/${entry.slug}`,
  });

  return {
    slug: params.slug,
    metadata: doc.metadata,
    prev: index > 0 ? toAdjacentPage(all[index - 1]) : null,
    next: index >= 0 && index < all.length - 1 ? toAdjacentPage(all[index + 1]) : null,
  };
};
