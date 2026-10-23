export interface GalleryItem {
  name: string;
  metadata: { title: string; description?: string };
}

export function getBlockCategory(name: string) {
  const id = name.replace(/-\d+$/, "");
  return {
    id,
    title: id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  };
}

export function getGalleryCategories(items: readonly GalleryItem[]) {
  const categories = new Map<string, { id: string; title: string; count: number }>();
  for (const item of items) {
    const category = getBlockCategory(item.name);
    categories.set(category.id, {
      ...category,
      count: (categories.get(category.id)?.count ?? 0) + 1,
    });
  }
  return [...categories.values()];
}

export function filterGalleryItems<T extends GalleryItem>(
  items: readonly T[],
  query: string,
  category = "all",
): T[] {
  const term = query.trim().toLowerCase();
  return items.filter((item) => {
    const group = getBlockCategory(item.name);
    return (
      (category === "all" || group.id === category) &&
      `${item.name} ${item.metadata.title} ${item.metadata.description ?? ""} ${group.title}`
        .toLowerCase()
        .includes(term)
    );
  });
}
