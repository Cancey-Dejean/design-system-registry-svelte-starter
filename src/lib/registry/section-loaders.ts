import { error } from "@sveltejs/kit";
import { getRegistryItemContent, getRegistryItemsBySection } from "./catalog";
import type { RegistrySectionId } from "./sections";

export function loadSectionListing(section: RegistrySectionId) {
  return {
    items: getRegistryItemsBySection(section).map((item) => ({
      name: item.name,
      metadata: item.metadata,
    })),
  };
}

export function loadSectionItem(section: RegistrySectionId, name: string) {
  const content = getRegistryItemContent(section, name);
  if (!content) error(404, `Not found: ${section}/${name}`);
  return { section, name, metadata: content.metadata };
}
