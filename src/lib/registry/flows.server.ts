import { readFileSync } from "node:fs";
import path from "node:path";

import { getAllRegistryItems } from "./catalog";
import { toRegistryFlowItem, type RegistryFlowItem } from "./flow-data";
import { getRegistryItemApi } from "./flow-props";
import { getRegistryItemRoutePath } from "./sections";

function readSourceFiles(paths: readonly string[]) {
  return paths.flatMap((filePath) => {
    try {
      return [
        { path: filePath, code: readFileSync(path.resolve(process.cwd(), filePath), "utf8") },
      ];
    } catch {
      // Skip missing sources — `registry:doctor` flags these separately.
      return [];
    }
  });
}

export function loadRegistryFlowItems(): RegistryFlowItem[] {
  const items = getAllRegistryItems();
  const localNames = new Set(items.map((item) => item.name));

  return items.map(({ section, name, metadata }) =>
    toRegistryFlowItem(
      {
        name,
        type: metadata.type,
        title: metadata.title,
        href: getRegistryItemRoutePath(section, name),
        dependencies: metadata.dependencies,
        registryDependencies: metadata.registryDependencies,
        files: metadata.files,
      },
      localNames,
      getRegistryItemApi({
        name,
        files: readSourceFiles(
          (metadata.files ?? [])
            .map((file) => file.path)
            .filter((filePath) => /\.(?:svelte|ts)$/u.test(filePath)),
        ),
      }),
    ),
  );
}
