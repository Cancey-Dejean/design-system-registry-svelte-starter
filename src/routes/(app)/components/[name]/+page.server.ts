import { loadItemDocPage } from "$lib/registry/item-doc-load.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  return await loadItemDocPage("components", params.name);
};
