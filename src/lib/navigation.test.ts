import { describe, expect, test, vi } from "vite-plus/test";

vi.mock("./registry/docs-catalog", () => ({
  getAllDocs: () => [
    { slug: "index", metadata: { title: "Introduction" } },
    { slug: "installation", metadata: { title: "Installation" } },
    { slug: "registry", metadata: { title: "Registry", audience: "maintainers" } },
  ],
}));
vi.mock("./registry/catalog", () => ({
  getAllRegistryItems: () => [
    { section: "components", name: "button", metadata: { title: "Button" } },
    { section: "blocks", name: "hero", metadata: { title: "Hero" } },
  ],
}));

import {
  getSiteNavigationSections,
  isNavItemActive,
  isNavSectionActive,
  isBlockCategoryActive,
} from "./navigation";

describe("canonical documentation navigation", () => {
  test("links the introduction and section headers to their canonical indexes", () => {
    const sections = getSiteNavigationSections();
    expect(sections.map((section) => section.indexUrl)).toEqual([
      "/docs",
      "/components",
      "/blocks",
      "/utilities",
    ]);
    expect(sections[0].items[0].url).toBe("/docs");
    expect(sections[0].items[1].url).toBe("/docs/installation");
  });

  test("keeps a section open on its own index", () => {
    const section = { id: "components", title: "Components", basePath: "/components", items: [] };
    expect(isNavSectionActive(section, "/components")).toBe(true);
  });

  test("does not mark the introduction active on every nested docs page", () => {
    expect(isNavItemActive("/docs", "/docs/installation")).toBe(false);
    expect(isNavItemActive("/components/button", "/components/button/example")).toBe(true);
    expect(isNavItemActive("/components/button", "/components/button-group")).toBe(false);
  });
});

test("retains block detail identity while grouping sidebar categories", () => {
  const section = getSiteNavigationSections().find((section) => section.id === "blocks")!;
  expect(section.items[0].url).toBe("/blocks/hero");
  expect(section.categories?.[0].url).toBe("/blocks?category=hero");
  expect(isBlockCategoryActive("hero", "/blocks/hero", null)).toBe(true);
  expect(isBlockCategoryActive("hero", "/blocks/hero-02", null)).toBe(true);
  expect(isBlockCategoryActive("hero", "/blocks", "hero")).toBe(true);
  expect(isBlockCategoryActive("hero", "/blocks", null)).toBe(false);
});

test("matches reference docs audience tags without tagging Introduction or components", () => {
  const sections = getSiteNavigationSections();
  const docs = sections.find((section) => section.id === "docs")!.items;
  expect(docs.find((item) => item.url === "/docs")?.audience).toBeUndefined();
  expect(docs.find((item) => item.url === "/docs/installation")?.audience).toBe("dev");
  expect(docs.find((item) => item.url === "/docs/registry")?.audience).toBe("maintainers");
  expect(
    sections.find((section) => section.id === "components")!.items[0].audience,
  ).toBeUndefined();
});
