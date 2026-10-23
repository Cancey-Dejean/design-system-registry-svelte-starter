<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import NavMain from "./nav-main.svelte";
  import SearchDialog from "./search-dialog.svelte";
  import { afterNavigate } from "$app/navigation";
  import { useSidebar } from "$lib/components/ui/sidebar/index.js";
  import {
    isNavItemActive,
    registryOverviewLink,
    type SiteNavSection,
  } from "$lib/navigation";
  import { registryConfig } from "$registry/config";
  import type { ComponentProps } from "svelte";


  let {
    sections,
    ref = $bindable(null),
    collapsible = "offcanvas",
    ...restProps
  }: { sections: SiteNavSection[] } & ComponentProps<
    typeof Sidebar.Root
  > = $props();
  const sidebar = useSidebar();
  afterNavigate(() => { sidebar.setOpenMobile(false); });
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
  <Sidebar.Header class="gap-0 p-0">
    <div class="flex h-14 items-center px-2">
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton size="lg">
            {#snippet child({ props })}
              <a href={resolve("/")} {...props}>
                <div class="flex gap-2 leading-none">
                  <span class="font-mono text-sm font-semibold tracking-tighter">{registryConfig.name}</span>
                </div>
              </a>
            {/snippet}
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </div>
    <div class="px-2 pt-2">
      <SearchDialog />
    </div>
  </Sidebar.Header>
  <Sidebar.Content>
    <NavMain {sections} />
  </Sidebar.Content>
  <Sidebar.Footer>
    <Sidebar.Menu>

      <Sidebar.MenuItem>
        <Sidebar.MenuButton
          isActive={isNavItemActive(
            registryOverviewLink.url,
            page.url.pathname,
          )}
        >
          {#snippet child({ props })}
            <a href={resolve("/") + registryOverviewLink.url.slice(1)} {...props}>
              <span>{registryOverviewLink.title}</span>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Footer>
  <Sidebar.Rail />
</Sidebar.Root>
