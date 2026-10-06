import type { RegistryItemType } from "./item-types";

export type RegistryFlowRemoteDependency = {
  id: string;
  name: string;
  source: string;
};

export type RegistryFlowVariant = {
  name: string;
  options: string[];
  defaultValue?: string;
};

export type RegistryFlowProp = {
  name: string;
  type: string;
  optional: boolean;
  defaultValue?: string;
};

export type RegistryFlowApi = {
  component?: string;
  variants: RegistryFlowVariant[];
  props: RegistryFlowProp[];
};

export type RegistryFlowItem = {
  name: string;
  type: RegistryItemType;
  title: string;
  /** Route of the item's docs page. */
  href: string;
  dependencies: string[];
  localDependencies: string[];
  remoteDependencies: RegistryFlowRemoteDependency[];
  files: string[];
  api: RegistryFlowApi;
};

export type RegistryFlowItemSource = {
  name: string;
  type: RegistryItemType;
  title: string;
  href: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: { path: string; target?: string }[];
};

/**
 * `registryDependencies` mixes items from this registry with ones resolved
 * elsewhere. Names found in `localNames` are local; everything else is remote.
 */
export function toRegistryFlowItem(
  source: RegistryFlowItemSource,
  localNames: ReadonlySet<string>,
  api: RegistryFlowApi = { variants: [], props: [] },
): RegistryFlowItem {
  const registryDependencies = source.registryDependencies ?? [];

  return {
    name: source.name,
    type: source.type,
    title: source.title,
    href: source.href,
    dependencies: source.dependencies ?? [],
    localDependencies: registryDependencies.filter((dependency) => localNames.has(dependency)),
    remoteDependencies: registryDependencies
      .filter((dependency) => !localNames.has(dependency))
      .map(toRemoteRegistryDependency),
    files: (source.files ?? []).map((file) => file.target ?? file.path),
    api,
  };
}

export function toRemoteRegistryDependency(value: string): RegistryFlowRemoteDependency {
  if (URL.canParse(value)) {
    const url = new URL(value);
    const lastSegment = url.pathname.split("/").findLast(Boolean) ?? value;

    return {
      id: `remote:${value}`,
      name: lastSegment.replace(/\.json$/u, ""),
      source: url.hostname,
    };
  }

  const namespaced = /^(@[^/]+)\/(.+)$/u.exec(value);

  if (namespaced?.[1] && namespaced[2]) {
    return { id: `remote:${value}`, name: namespaced[2], source: namespaced[1] };
  }

  return { id: `remote:${value}`, name: value, source: "shadcn-svelte" };
}
