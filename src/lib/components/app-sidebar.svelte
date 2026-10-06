<script lang="ts">
  import { page } from "$app/state";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import NavMain from "./nav-main.svelte";
  import SearchDialog from "./search-dialog.svelte";
  import WorkflowIcon from "@lucide/svelte/icons/workflow";
  import {
    flowsPage,
    isNavItemActive,
    registryOverviewLink,
    type SiteNavSection,
  } from "$lib/navigation";
  import { registryConfig } from "$registry/config";
  import type { ComponentProps } from "svelte";
  import SvelteLogo from "$registry/items/components/logos/logo-set/svelte-logo.svelte";

  let {
    sections,
    ref = $bindable(null),
    collapsible = "offcanvas",
    ...restProps
  }: { sections: SiteNavSection[] } & ComponentProps<
    typeof Sidebar.Root
  > = $props();
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
  <Sidebar.Header class="gap-0 p-0">
    <div class="flex h-16 items-center border-b px-2">
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton size="lg">
            {#snippet child({ props })}
              <a href="/" {...props}>
                <div class="flex gap-2 leading-none">
                  <SvelteLogo />
                  <span class="font-semibold">{registryConfig.name}</span>
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
          isActive={isNavItemActive(flowsPage.url, page.url.pathname)}
        >
          {#snippet child({ props })}
            <a href={flowsPage.url} {...props}>
              <WorkflowIcon />
              <span>{flowsPage.title}</span>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton
          isActive={isNavItemActive(
            registryOverviewLink.url,
            page.url.pathname,
          )}
        >
          {#snippet child({ props })}
            <a href={registryOverviewLink.url} {...props}>
              <span>{registryOverviewLink.title}</span>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Footer>
  <Sidebar.Rail />
</Sidebar.Root>
