import { SIDEBAR_COOKIE_NAME } from "$lib/components/ui/sidebar/constants.js";
import { getSiteNavigationSections } from "$lib/navigation";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ cookies }) => {
  return {
    sections: getSiteNavigationSections(),
    sidebarOpen: cookies.get(SIDEBAR_COOKIE_NAME) !== "false",
  };
};
