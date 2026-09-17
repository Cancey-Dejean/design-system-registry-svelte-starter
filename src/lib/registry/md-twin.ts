import { error } from "@sveltejs/kit";
import { getRegistryItemContent, getRegistryItemRawSource } from "./catalog";
import type { RegistrySectionId } from "./sections";

export function buildItemMarkdownResponse(section: RegistrySectionId, name: string): Response {
  const content = getRegistryItemContent(section, name);
  if (!content) error(404, `Not found: ${section}/${name}`);
  const raw = getRegistryItemRawSource(section, name) ?? "";
  return new Response(`# ${content.metadata.title}\n\n${raw}`, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
