import { buildSectionIndexMarkdown } from "$lib/registry/index-markdown";

export function GET() {
  return new Response(buildSectionIndexMarkdown("utilities"), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
