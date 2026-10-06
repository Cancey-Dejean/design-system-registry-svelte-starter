import { loadRegistryFlowItems } from "$lib/registry/flows.server";
import type { PageServerLoad } from "./$types";

// The flow data is read from registry sources with the TypeScript compiler,
// so resolve it at build time instead of on every request.
export const prerender = true;

export const load: PageServerLoad = () => {
  return {
    items: loadRegistryFlowItems(),
    hideFooter: true,
  };
};
