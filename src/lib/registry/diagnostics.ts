import matter from "gray-matter";
import { registrySections, type RegistrySectionId } from "./sections";
import type { RegistryItemType } from "./item-types";

export interface RegistryDiagnostic {
  path: string;
  message: string;
}

export interface RegistryDiagnostics {
  errors: RegistryDiagnostic[];
  warnings: RegistryDiagnostic[];
}

interface RegistryFrontmatterFile {
  path?: string;
  type?: string;
  target?: string;
}

interface RegistryFrontmatter {
  name?: string;
  type?: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryFrontmatterFile[];
}

const REGISTRY_ITEM_TYPES: readonly RegistryItemType[] = [
  "registry:ui",
  "registry:component",
  "registry:block",
  "registry:base",
  "registry:font",
  "registry:lib",
  "registry:hook",
  "registry:page",
  "registry:file",
  "registry:style",
  "registry:theme",
  "registry:item",
];

function isRegistryItemType(value: string): value is RegistryItemType {
  return (REGISTRY_ITEM_TYPES as string[]).includes(value);
}

function expectedSectionFor(type: RegistryItemType): RegistrySectionId | undefined {
  return (Object.keys(registrySections) as RegistrySectionId[]).find((id) =>
    registrySections[id].types.includes(type),
  );
}

const FILE_ITEM_TYPES: ReadonlySet<RegistryItemType> = new Set([
  "registry:style",
  "registry:file",
  "registry:theme",
  "registry:font",
  "registry:base",
]);

const ON_DISK_ITEM_ROOTS = new Set<string>([...Object.keys(registrySections), "files"]);

function expectedDiskSectionFor(type: RegistryItemType): string | undefined {
  if (FILE_ITEM_TYPES.has(type)) return "files";
  return expectedSectionFor(type);
}

function isOnDiskItemRoot(value: string): boolean {
  return ON_DISK_ITEM_ROOTS.has(value);
}

// Matches registry/items/<section>/<name>/_registry.svx
const ITEM_ENTRY_PATTERN = /^registry\/items\/([^/]+)\/([^/]+)\/_registry\.svx$/;

export interface GetRegistryDiagnosticsOptions {
  /** Registry-scoped file contents, keyed by path relative to the project root (e.g. "registry/items/components/badge/_registry.svx"). */
  files: Record<string, string>;
  /**
   * Checks whether a path relative to the project root exists on disk. Used to verify
   * `files[].path` entries, which commonly point outside `registry/` (e.g. `src/lib/...`).
   * Defaults to always returning `true` (skips existence checks) so the function stays
   * pure and testable without filesystem access.
   */
  fileExists?: (path: string) => boolean;
}

export function getRegistryDiagnostics({
  files,
  fileExists = () => true,
}: GetRegistryDiagnosticsOptions): RegistryDiagnostics {
  const errors: RegistryDiagnostic[] = [];
  const warnings: RegistryDiagnostic[] = [];

  const itemDirs = new Set<string>();
  const registryEntryDirs = new Set<string>();
  for (const path of Object.keys(files)) {
    const dirMatch = /^registry\/items\/([^/]+)\/([^/]+)\//.exec(path);
    if (dirMatch && isOnDiskItemRoot(dirMatch[1])) {
      itemDirs.add(`registry/items/${dirMatch[1]}/${dirMatch[2]}`);
    }
    const entryMatch = ITEM_ENTRY_PATTERN.exec(path);
    if (entryMatch) registryEntryDirs.add(`registry/items/${entryMatch[1]}/${entryMatch[2]}`);
  }
  for (const dir of itemDirs) {
    if (!registryEntryDirs.has(dir)) {
      errors.push({
        path: dir,
        message: "Folder contains files but no _registry.svx — it's invisible to the catalog.",
      });
    }
  }

  const seenNames = new Map<string, string>();

  for (const [path, raw] of Object.entries(files)) {
    const entryMatch = ITEM_ENTRY_PATTERN.exec(path);
    if (!entryMatch) continue;
    const [, sectionDir, folderName] = entryMatch;

    let data: RegistryFrontmatter;
    try {
      data = matter(raw).data as RegistryFrontmatter;
    } catch (error) {
      errors.push({ path, message: `Could not parse frontmatter: ${(error as Error).message}` });
      continue;
    }

    if (!data.name) {
      errors.push({ path, message: "Missing required field: name" });
    } else if (data.name !== folderName) {
      errors.push({
        path,
        message: `name "${data.name}" does not match its folder name "${folderName}"`,
      });
    }

    if (!data.type) {
      errors.push({ path, message: "Missing required field: type" });
    } else if (!isRegistryItemType(data.type)) {
      errors.push({
        path,
        message: `Unknown type "${data.type}" — see src/lib/registry/item-types.ts`,
      });
    } else {
      const expectedDisk = expectedDiskSectionFor(data.type);
      if (expectedDisk && expectedDisk !== sectionDir) {
        errors.push({
          path,
          message: `type "${data.type}" belongs under registry/items/${expectedDisk}/, not registry/items/${sectionDir}/`,
        });
      }
    }

    if (!data.title) warnings.push({ path, message: "Missing recommended field: title" });
    if (!data.description) {
      warnings.push({ path, message: "Missing recommended field: description" });
    }

    if (data.name) {
      const existing = seenNames.get(data.name);
      if (existing) {
        errors.push({
          path,
          message: `Duplicate item name "${data.name}" (also used by ${existing})`,
        });
      } else {
        seenNames.set(data.name, path);
      }
    }

    const itemFiles = data.files ?? [];
    if (itemFiles.length === 0) {
      warnings.push({ path, message: "No files listed in frontmatter" });
    }
    for (const [index, file] of itemFiles.entries()) {
      const label = `files[${index}]`;
      if (!file.path) {
        errors.push({ path, message: `${label} is missing path` });
        continue;
      }
      if (!file.type) {
        warnings.push({ path, message: `${label} (${file.path}) is missing type` });
      }
      if (!fileExists(file.path)) {
        errors.push({ path, message: `${label} references a missing file: ${file.path}` });
      }
    }
  }

  return { errors, warnings };
}

export function getRegistryDoctorExitCode(result: RegistryDiagnostics): number {
  return result.errors.length > 0 ? 1 : 0;
}
