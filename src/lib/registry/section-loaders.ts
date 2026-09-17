import { error } from "@sveltejs/kit";
import { getRegistryItemContent, getRegistryItemsBySection } from "./catalog";
import { registrySections, type RegistrySectionId } from "./sections";

export interface AdjacentPage {
  title: string;
  url: string;
}

function getSortedItems(section: RegistrySectionId) {
  return getRegistryItemsBySection(section).sort((a, b) =>
    a.metadata.title.localeCompare(b.metadata.title),
  );
}

export function loadSectionListing(section: RegistrySectionId) {
  return {
    items: getSortedItems(section).map((item) => ({ name: item.name, metadata: item.metadata })),
  };
}

export function loadSectionItem(section: RegistrySectionId, name: string) {
  const content = getRegistryItemContent(section, name);
  if (!content) error(404, `Not found: ${section}/${name}`);

  const sorted = getSortedItems(section);
  const index = sorted.findIndex((item) => item.name === name);
  const basePath = registrySections[section].basePath;

  const toAdjacentPage = (item: (typeof sorted)[number]): AdjacentPage => ({
    title: item.metadata.title,
    url: `${basePath}/${item.name}`,
  });

  return {
    section,
    name,
    metadata: content.metadata,
    prev: index > 0 ? toAdjacentPage(sorted[index - 1]) : null,
    next: index >= 0 && index < sorted.length - 1 ? toAdjacentPage(sorted[index + 1]) : null,
  };
}
