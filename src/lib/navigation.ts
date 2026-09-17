import { getAllDocs } from "./registry/docs-catalog";
import { getAllRegistryItems } from "./registry/catalog";
import { registrySections, registrySectionIds } from "./registry/sections";

export interface SiteNavItem {
  title: string;
  url: string;
}

export interface SiteNavSection {
  id: string;
  title: string;
  basePath: string;
  items: SiteNavItem[];
}

export function getSiteNavigationSections(): SiteNavSection[] {
  const docsSection: SiteNavSection = {
    id: "docs",
    title: "Docs",
    basePath: "/docs",
    items: getAllDocs().map((doc) => ({
      title: doc.metadata.title,
      url: `/docs/${doc.slug}`,
    })),
  };

  const allItems = getAllRegistryItems();

  const registryNavSections = registrySectionIds.map((id) => {
    const section = registrySections[id];
    const items = allItems
      .filter((item) => item.section === id)
      .map((item) => ({
        title: item.metadata.title,
        url: `${section.basePath}/${item.name}`,
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
    return { id, title: section.title, basePath: section.basePath, items };
  });

  return [docsSection, ...registryNavSections];
}

export const registryOverviewLink: SiteNavItem = {
  title: "Registry",
  url: "/registry",
};

export function isNavItemActive(url: string, pathname: string): boolean {
  return pathname === url || pathname.startsWith(`${url}/`);
}

export function isNavSectionActive(section: SiteNavSection, pathname: string): boolean {
  return section.items.some((item) => isNavItemActive(item.url, pathname));
}
