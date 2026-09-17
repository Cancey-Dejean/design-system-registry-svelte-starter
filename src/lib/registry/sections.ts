import type { RegistryItemType } from "./item-types";

export type RegistrySectionId = "components" | "blocks" | "utilities";

export interface RegistrySectionConfig {
  id: RegistrySectionId;
  title: string;
  basePath: string;
  types: RegistryItemType[];
}

export const registrySections: Record<RegistrySectionId, RegistrySectionConfig> = {
  components: {
    id: "components",
    title: "Components",
    basePath: "/components",
    types: ["registry:ui", "registry:component"],
  },
  blocks: {
    id: "blocks",
    title: "Blocks",
    basePath: "/blocks",
    types: ["registry:block"],
  },
  utilities: {
    id: "utilities",
    title: "Utilities",
    basePath: "/utilities",
    types: [
      "registry:hook",
      "registry:lib",
      "registry:file",
      "registry:theme",
      "registry:font",
      "registry:base",
      "registry:page",
      "registry:style",
      "registry:item",
    ],
  },
};

export const registrySectionIds = Object.keys(registrySections) as RegistrySectionId[];

export function getRegistrySectionIdForType(type: RegistryItemType): RegistrySectionId | undefined {
  return registrySectionIds.find((id) => registrySections[id].types.includes(type));
}

export function getRegistryItemRoutePath(sectionId: RegistrySectionId, name: string): string {
  return `${registrySections[sectionId].basePath}/${name}`;
}
