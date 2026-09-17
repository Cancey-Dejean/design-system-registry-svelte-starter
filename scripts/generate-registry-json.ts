#!/usr/bin/env bun
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { Glob } from "bun";
import matter from "gray-matter";
import { registryConfig } from "../registry/config";

interface RegistryItemFile {
  path: string;
  type: string;
  target: string;
}

interface RegistryJsonItem {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryItemFile[];
}

const root = process.cwd();
const glob = new Glob("registry/items/*/*/_registry.svx");
const items: RegistryJsonItem[] = [];

for (const file of glob.scanSync(root)) {
  const raw = readFileSync(join(root, file), "utf8");
  const { data } = matter(raw);
  items.push({
    name: data.name,
    type: data.type,
    title: data.title,
    description: data.description,
    dependencies: data.dependencies ?? [],
    registryDependencies: data.registryDependencies ?? [],
    files: data.files ?? [],
  });
}

items.sort((a, b) => a.name.localeCompare(b.name));

const registryJson = {
  $schema: "https://shadcn-svelte.com/schema/registry.json",
  name: registryConfig.name,
  homepage: registryConfig.homepage,
  items,
};

const json = JSON.stringify(registryJson, null, 2);

writeFileSync(resolve(root, "registry.generated.json"), json);
mkdirSync(resolve(root, "static"), { recursive: true });
writeFileSync(resolve(root, "static/registry.json"), json);

console.log(`Generated registry.generated.json with ${items.length} items`);
