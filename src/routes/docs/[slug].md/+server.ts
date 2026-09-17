import { error } from "@sveltejs/kit";
import { getDoc, getDocRawSource } from "$lib/registry/docs-catalog";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ params }) => {
  const doc = getDoc(params.slug);
  if (!doc) error(404, `Doc not found: ${params.slug}`);
  const raw = getDocRawSource(params.slug) ?? "";
  return new Response(`# ${doc.metadata.title}\n\n${raw}`, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
};
