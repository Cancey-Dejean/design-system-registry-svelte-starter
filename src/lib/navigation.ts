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
  /** Where the section's own nav link points to. Defaults to `basePath` when omitted. */
  indexUrl?: string;
  items: SiteNavItem[];
}

export function getSiteNavigationSections(): SiteNavSection[] {
  const docs = getAllDocs();
  const docsSection: SiteNavSection = {
    id: "docs",
    title: "Docs",
    basePath: "/docs",
    indexUrl: docs.length > 0 ? `/docs/${docs[0].slug}` : "/docs",
    items: docs.map((doc) => ({
      title: doc.metadata.title,
      url: `/docs/${doc.slug}`,
    })),
  };

  const allItems = getAllRegistryItems();
  const docsSlugs = new Set(docs.map((doc) => doc.slug));

  const registryNavSections = registrySectionIds.map((id) => {
    const section = registrySections[id];
    const items = allItems
      .filter((item) => item.section === id && !docsSlugs.has(item.name))
      .map((item) => ({
        title: item.metadata.title,
        url: `${section.basePath}/${item.name}`,
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
    return {
      id,
      title: section.title,
      basePath: section.basePath,
      indexUrl: items[0]?.url ?? section.basePath,
      items,
    };
  });

  return [docsSection, ...registryNavSections];
}

export const registryOverviewLink: SiteNavItem = {
  title: "Registry",
  url: "/registry",
};

export const flowsPage = {
  title: "Component flows",
  description: "Trace what each registry item depends on, what uses it, and what it installs.",
  url: "/flows",
} as const;

export function isNavItemActive(url: string, pathname: string): boolean {
  return pathname === url || pathname.startsWith(`${url}/`);
}

export function isNavSectionActive(section: SiteNavSection, pathname: string): boolean {
  if (pathname === (section.indexUrl ?? section.basePath)) return true;
  return section.items.some((item) => isNavItemActive(item.url, pathname));
}
