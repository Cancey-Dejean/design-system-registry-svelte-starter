import { loadSectionItem } from "$lib/registry/section-loaders";
import { loadRegistryItemPreviewSource } from "$lib/registry/catalog";
import { highlightCode } from "$lib/shiki";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const { section, name, metadata } = loadSectionItem("utilities", params.name);
  const source = await loadRegistryItemPreviewSource(section, name);
  const previewSourceHtml = source ? await highlightCode(source, "svelte") : "";
  return { section, name, metadata, previewSourceHtml };
};
