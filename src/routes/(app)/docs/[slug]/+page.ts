import { error } from "@sveltejs/kit";
import { getDoc } from "$lib/registry/docs-catalog";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  const doc = getDoc(params.slug);
  if (!doc) error(404, `Doc not found: ${params.slug}`);
  return { slug: params.slug, metadata: doc.metadata };
};
