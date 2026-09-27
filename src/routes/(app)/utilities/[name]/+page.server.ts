import { redirect } from "@sveltejs/kit";
import { loadItemDocPage } from "$lib/registry/item-doc-load.server";
import type { PageServerLoad } from "./$types";

// Items with their own long-form doc under registry/docs/*.svx don't need a
// second, separate registry-item page — send visitors to the doc instead.
const DOC_REDIRECTS: Record<string, string> = {
  styles: "/docs/styles",
};

export const load: PageServerLoad = async ({ params }) => {
  const docRedirect = DOC_REDIRECTS[params.name];
  if (docRedirect) redirect(308, docRedirect);

  return await loadItemDocPage("utilities", params.name);
};
