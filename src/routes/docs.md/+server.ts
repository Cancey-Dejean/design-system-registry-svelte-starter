import { getDoc, getDocRawSource } from "$lib/registry/docs-catalog";
export function GET() {
  const doc = getDoc("index");
  return new Response(
    `# ${doc?.metadata.title ?? "Introduction"}\n\n${getDocRawSource("index") ?? ""}`,
    {
      headers: { "content-type": "text/markdown; charset=utf-8" },
    },
  );
}
