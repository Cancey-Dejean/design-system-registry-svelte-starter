<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import SiteBreadcrumb from "$lib/components/site-breadcrumb.svelte";
  import SiteFooter from "$lib/components/site-footer.svelte";
  import ThemeToggle from "$lib/components/theme-toggle.svelte";
  import AccentThemeToggle from "$lib/components/accent-theme-toggle.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { registryConfig } from "$registry/config";
  import BookOpenIcon from "@lucide/svelte/icons/book-open";
  import CodeIcon from "@lucide/svelte/icons/code";

  let { data, children } = $props();
</script>

<Sidebar.Provider>
  <AppSidebar sections={data.sections} />
  <Sidebar.Inset>
    <header class="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
      <div class="flex items-center gap-2">
        <Sidebar.Trigger class="-ms-1" />
        <Separator
          orientation="vertical"
          class="me-2 data-[orientation=vertical]:h-4"
        />
        <SiteBreadcrumb sections={data.sections} />
      </div>
      <div class="flex items-center gap-1">
        <Button
          href={registryConfig.storybookUrl}
          target="_blank"
          variant="ghost"
          size="icon"
          aria-label="Storybook"
        >
          <BookOpenIcon data-icon="inline-start" class="size-4" />
        </Button>
        <Button
          href={registryConfig.repositoryUrl}
          target="_blank"
          variant="ghost"
          size="icon"
          aria-label="GitHub"
        >
          <CodeIcon data-icon="inline-start" class="size-4" />
        </Button>
        <AccentThemeToggle />
        <ThemeToggle />
      </div>
    </header>
    <div class="flex min-w-0 flex-1 flex-col gap-4 pt-6 pr-4 pl-6">
      <div class="flex min-w-0 items-start gap-8">
        {@render children()}
      </div>
    </div>
    <SiteFooter />
  </Sidebar.Inset>
</Sidebar.Provider>
