import { highlightCode } from "$lib/shiki";
import { loadRegistryItemPreviewSource } from "./catalog";
import { loadManualInstallFiles } from "./manual-files.server";
import { loadSectionItem } from "./section-loaders";
import type { RegistrySectionId } from "./sections";

export async function loadItemDocPage(section: RegistrySectionId, name: string) {
  const item = loadSectionItem(section, name);
  const source = await loadRegistryItemPreviewSource(item.section, item.name);
  const previewSourceHtml = source ? await highlightCode(source, "svelte") : "";
  const manualFiles = await loadManualInstallFiles(item.metadata);
  return { ...item, previewSourceHtml, manualFiles };
}
