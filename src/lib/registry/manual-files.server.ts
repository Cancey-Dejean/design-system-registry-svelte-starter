import { readFile } from "node:fs/promises";
import path from "node:path";
import { highlightCode } from "$lib/shiki";
import type { RegistryItemMetadata } from "./catalog";
import type { ManualInstallFile } from "./manual-files";

export type { ManualInstallFile };

function highlightLangForPath(filePath: string): string {
  const ext = filePath.split(".").pop()?.toLowerCase() ?? "";
  switch (ext) {
    case "svelte":
      return "svelte";
    case "ts":
    case "js":
    case "mts":
    case "cts":
      return "typescript";
    case "css":
      return "css";
    case "json":
      return "json";
    case "yaml":
    case "yml":
      return "yaml";
    default:
      return "text";
  }
}

export async function loadManualInstallFiles(
  metadata: RegistryItemMetadata,
): Promise<ManualInstallFile[]> {
  const files = metadata.files ?? [];
  const result: ManualInstallFile[] = [];

  for (const file of files) {
    try {
      const code = await readFile(path.resolve(process.cwd(), file.path), "utf8");
      result.push({
        target: file.target,
        code,
        html: await highlightCode(code, highlightLangForPath(file.path)),
      });
    } catch {
      // Skip missing sources — `registry:doctor` flags these separately.
    }
  }

  return result;
}
