import { getAllDocs } from "$lib/registry/docs-catalog";
import { getAllRegistryItems } from "$lib/registry/catalog";
import { registrySections, registrySectionIds } from "$lib/registry/sections";

export function load() {
  const docs = getAllDocs().map((doc) => ({
    title: doc.metadata.title,
    description: doc.metadata.description,
    url: `/docs/${doc.slug}`,
  }));

  const allItems = getAllRegistryItems();

  const sections = registrySectionIds.map((id) => {
    const section = registrySections[id];
    const items = allItems
      .filter((item) => item.section === id)
      .map((item) => ({
        title: item.metadata.title,
        description: item.metadata.description,
        url: `${section.basePath}/${item.name}`,
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
    return { id, title: section.title, items };
  });

  return { docs, sections };
}
