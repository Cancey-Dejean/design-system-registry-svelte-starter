import { buildDocsIndexMarkdown } from "$lib/registry/index-markdown";

export function GET() {
  return new Response(buildDocsIndexMarkdown(), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
