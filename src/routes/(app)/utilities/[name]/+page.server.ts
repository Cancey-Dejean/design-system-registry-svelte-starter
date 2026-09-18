import { redirect } from "@sveltejs/kit";
import { loadSectionItem } from "$lib/registry/section-loaders";
import { loadRegistryItemPreviewSource } from "$lib/registry/catalog";
import { highlightCode } from "$lib/shiki";
import type { PageServerLoad } from "./$types";

// Items with their own long-form doc under registry/docs/*.svx don't need a
// second, separate registry-item page — send visitors to the doc instead.
const DOC_REDIRECTS: Record<string, string> = {
  styles: "/docs/styles",
};

export const load: PageServerLoad = async ({ params }) => {
  const docRedirect = DOC_REDIRECTS[params.name];
  if (docRedirect) redirect(308, docRedirect);

  const { section, name, metadata, prev, next } = loadSectionItem("utilities", params.name);
  const source = await loadRegistryItemPreviewSource(section, name);
  const previewSourceHtml = source ? await highlightCode(source, "svelte") : "";
  return { section, name, metadata, previewSourceHtml, prev, next };
};
