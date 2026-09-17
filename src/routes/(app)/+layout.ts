import { getSiteNavigationSections } from "$lib/navigation";

export function load() {
  return {
    sections: getSiteNavigationSections(),
  };
}
