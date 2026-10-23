import { getDocPath } from "$lib/registry/doc-path";
import { getRegistryItemsBySection } from "./catalog";
import { getAllDocs } from "./docs-catalog";
import { registrySections, type RegistrySectionId } from "./sections";

export function buildSectionIndexMarkdown(section: RegistrySectionId): string {
  const { title, basePath } = registrySections[section];
  const items = getRegistryItemsBySection(section).sort((a, b) =>
    a.metadata.title.localeCompare(b.metadata.title),
  );

  const lines = [`# ${title}`, ""];
  for (const item of items) {
    lines.push(
      `- [${item.metadata.title}](${basePath}/${item.name}): ${item.metadata.description}`,
    );
  }
  return lines.join("\n") + "\n";
}

export function buildDocsIndexMarkdown(): string {
  const lines = ["# Docs", ""];
  for (const doc of getAllDocs()) {
    lines.push(
      `- [${doc.metadata.title}](${getDocPath(doc.slug)}): ${doc.metadata.description ?? ""}`,
    );
  }
  return lines.join("\n") + "\n";
}
