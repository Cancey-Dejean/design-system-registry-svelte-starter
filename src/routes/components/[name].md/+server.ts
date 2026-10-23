import { buildItemMarkdownResponse } from "$lib/registry/md-twin";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ params }) =>
  buildItemMarkdownResponse("components", params.name);
