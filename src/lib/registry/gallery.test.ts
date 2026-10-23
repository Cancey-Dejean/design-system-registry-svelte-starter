import { describe, expect, test } from "vite-plus/test";
import { filterGalleryItems, getGalleryCategories } from "./gallery";

const items = [
  { name: "hero-01", metadata: { title: "Hero 01", description: "Marketing introduction" } },
  { name: "hero-02", metadata: { title: "Hero 02", description: "Product launch" } },
  { name: "pricing", metadata: { title: "Pricing", description: "Subscription plans" } },
];

describe("gallery discovery", () => {
  test("groups variants under one category with correct counts", () => {
    expect(getGalleryCategories(items)).toEqual([
      { id: "hero", title: "Hero", count: 2 },
      { id: "pricing", title: "Pricing", count: 1 },
    ]);
  });
  test("combines category and case-insensitive title/description search", () => {
    expect(filterGalleryItems(items, " LAUNCH ", "hero").map((item) => item.name)).toEqual([
      "hero-02",
    ]);
    expect(filterGalleryItems(items, "plans", "hero")).toEqual([]);
    expect(filterGalleryItems(items, "plans", "all").map((item) => item.name)).toEqual(["pricing"]);
  });
  test("returns all entries for an empty query and no category filter", () => {
    expect(filterGalleryItems(items, "", "all")).toEqual(items);
  });
});
