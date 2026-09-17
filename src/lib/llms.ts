import { getAllDocs, getDocRawSource } from "./registry/docs-catalog";
import { getAllRegistryItems, getRegistryItemRawSource } from "./registry/catalog";
import { registrySections, registrySectionIds } from "./registry/sections";
import { registryConfig } from "$registry/config";

export function buildLlmsTxt(origin: string): string {
  const lines: string[] = [
    `# ${registryConfig.name}`,
    "",
    `${registryConfig.name} is a shadcn-svelte based design system and component registry.`,
    "",
    "## Docs",
    "",
  ];

  for (const doc of getAllDocs()) {
    lines.push(`- [${doc.metadata.title}](${origin}/docs/${doc.slug}): ${doc.metadata.description ?? ""}`);
  }

  const allItems = getAllRegistryItems();
  for (const id of registrySectionIds) {
    const section = registrySections[id];
    const items = allItems.filter((item) => item.section === id);
    if (items.length === 0) continue;
    lines.push("", `## ${section.title}`, "");
    for (const item of items) {
      lines.push(
        `- [${item.metadata.title}](${origin}${section.basePath}/${item.name}): ${item.metadata.description}`,
      );
    }
  }

  return lines.join("\n") + "\n";
}

export function buildLlmsFullTxt(origin: string): string {
  const sections: string[] = [];

  for (const doc of getAllDocs()) {
    const raw = getDocRawSource(doc.slug) ?? "";
    sections.push(`# ${doc.metadata.title}\n\nURL: ${origin}/docs/${doc.slug}\n\n${raw}`);
  }

  for (const item of getAllRegistryItems()) {
    const raw = getRegistryItemRawSource(item.section, item.name) ?? "";
    const url = `${origin}${registrySections[item.section].basePath}/${item.name}`;
    sections.push(`# ${item.metadata.title}\n\nURL: ${url}\n\n${raw}`);
  }

  return sections.join("\n\n---\n\n") + "\n";
}
