import { buildSectionIndexMarkdown } from "$lib/registry/index-markdown";

export function GET() {
  return new Response(buildSectionIndexMarkdown("blocks"), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
