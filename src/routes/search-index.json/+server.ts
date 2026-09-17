import { json } from "@sveltejs/kit";
import { buildSearchIndex } from "$lib/search/build-index";

export function GET() {
  return json(buildSearchIndex());
}
