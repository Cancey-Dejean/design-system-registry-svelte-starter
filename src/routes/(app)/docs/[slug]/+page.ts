import { redirect } from "@sveltejs/kit";
import { loadDocPage } from "$lib/registry/doc-load";
import type { PageLoad } from "./$types";
export const load: PageLoad = ({ params }) => {
  if (params.slug === "index") redirect(308, "/docs");
  return loadDocPage(params.slug);
};
