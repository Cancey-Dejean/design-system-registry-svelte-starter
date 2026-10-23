import { error } from "@sveltejs/kit";
import { getRegistryItemContent } from "$lib/registry/catalog";
import type { PageLoad } from "./$types";
export const load: PageLoad = ({ params }) => {
  if (!getRegistryItemContent("components", params.name)) error(404, "Preview not found");
  return { name: params.name };
};
