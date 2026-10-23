import { getBlockCategory, getGalleryCategories } from "./registry/gallery";
import { getDocPath } from "./registry/doc-path";
import { getAllDocs } from "./registry/docs-catalog";
import { getAllRegistryItems } from "./registry/catalog";
import { registrySections, registrySectionIds } from "./registry/sections";

export interface SiteNavItem {
  title: string;
  url: string;
  badge?: string;
  isHook?: boolean;
  audience?: "dev" | "maintainers";
}

export interface SiteNavSection {
  id: string;
  title: string;
  basePath: string;
  /** Where the section's own nav link points to. Defaults to `basePath` when omitted. */
  indexUrl?: string;
  items: SiteNavItem[];
  categories?: SiteNavItem[];
}

export function getSiteNavigationSections(): SiteNavSection[] {
  const docs = getAllDocs();
  const docsSection: SiteNavSection = {
    id: "docs",
    title: "Docs",
    basePath: "/docs",
    indexUrl: "/docs",
    items: docs.map((doc) => ({
      title: doc.metadata.title,
      audience: doc.slug === "index" ? undefined : (doc.metadata.audience ?? "dev"),
      url: getDocPath(doc.slug),
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
        isHook: item.metadata.type === "registry:hook",
        url: `${section.basePath}/${item.name}`,
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
    return {
      id,
      title: section.title,
      basePath: section.basePath,
      indexUrl: section.basePath,
      items,
      categories:
        id === "blocks"
          ? getGalleryCategories(
              items.map((item) => ({
                name: item.url.split("/").at(-1)!,
                metadata: { title: item.title },
              })),
            ).map((category) => ({
              title: category.title,
              url: `/blocks?category=${category.id}`,
              badge: String(category.count),
            }))
          : undefined,
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
  return pathname === url || (url !== "/docs" && pathname.startsWith(`${url}/`));
}

export function isNavSectionActive(section: SiteNavSection, pathname: string): boolean {
  if (
    pathname === (section.indexUrl ?? section.basePath) ||
    pathname.startsWith(`${section.basePath}/`)
  )
    return true;
  return section.items.some((item) => isNavItemActive(item.url, pathname));
}

export function isBlockCategoryActive(
  category: string,
  pathname: string,
  selectedCategory: string | null,
): boolean {
  if (pathname === "/blocks") return selectedCategory === category;
  if (!pathname.startsWith("/blocks/")) return false;
  return getBlockCategory(decodeURIComponent(pathname.split("/")[2])).id === category;
}
