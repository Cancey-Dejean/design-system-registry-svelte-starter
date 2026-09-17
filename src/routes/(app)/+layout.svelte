<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import SiteBreadcrumb from "$lib/components/site-breadcrumb.svelte";
  import SiteFooter from "$lib/components/site-footer.svelte";
  import ThemeToggle from "$lib/components/theme-toggle.svelte";
  import AccentThemeToggle from "$lib/components/accent-theme-toggle.svelte";

  let { data, children } = $props();
</script>

<Sidebar.Provider>
  <AppSidebar sections={data.sections} />
  <Sidebar.Inset>
    <header class="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
      <div class="flex items-center gap-2">
        <Sidebar.Trigger class="-ms-1" />
        <Separator orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />
        <SiteBreadcrumb sections={data.sections} />
      </div>
      <div class="flex items-center gap-1">
        <AccentThemeToggle />
        <ThemeToggle />
      </div>
    </header>
    <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
      {@render children()}
    </div>
    <SiteFooter />
  </Sidebar.Inset>
</Sidebar.Provider>
