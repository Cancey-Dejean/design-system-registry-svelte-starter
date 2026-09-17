import { buildLlmsFullTxt } from "$lib/llms";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ url }) => {
  return new Response(buildLlmsFullTxt(url.origin), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
