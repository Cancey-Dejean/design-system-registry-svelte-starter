<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import * as Collapsible from "$registry/items/components/collapsible/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { Badge } from "$registry/items/components/badge/index.js";
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
  import { isNavItemActive, isNavSectionActive, isBlockCategoryActive, type SiteNavSection } from "$lib/navigation";

  let { sections }: { sections: SiteNavSection[] } = $props();
</script>

<Sidebar.Group>
  <Sidebar.Menu class="gap-2">
    {#each sections as section (section.id)}
      <Collapsible.Root open={isNavSectionActive(section, page.url.pathname)} class="group/collapsible">
        {#snippet child({ props })}
          <Sidebar.MenuItem {...props}>
            <Sidebar.MenuButton isActive={section.basePath === page.url.pathname}>
              {#snippet child({ props })}
                <a href={resolve("/") + (section.indexUrl ?? section.basePath).slice(1)} {...props}>
                  <span>{section.title}</span>
                </a>
              {/snippet}
            </Sidebar.MenuButton>
            <Collapsible.Trigger>
              {#snippet child({ props })}
                <Sidebar.MenuAction {...props} aria-label={`Toggle ${section.title}`}>
                  <ChevronRightIcon
                    class="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                  />
                </Sidebar.MenuAction>
              {/snippet}
            </Collapsible.Trigger>
            <Collapsible.Content>
              <Sidebar.MenuSub class="mr-0 pr-0">
                {#each section.categories ?? section.items as item (item.url)}
                  <Sidebar.MenuSubItem>
                    <Sidebar.MenuSubButton class="h-7" isActive={item.url.includes("?") ? isBlockCategoryActive(item.url.split("category=")[1], page.url.pathname, page.url.pathname === "/blocks" ? page.url.searchParams.get("category") : null) : isNavItemActive(item.url, page.url.pathname)}>
                      {#snippet child({ props })}
                        <a href={resolve("/") + item.url.slice(1)} {...props}>
                          <span>{item.title}</span>
                          {#if item.audience}
                            <Badge
                              variant="outline"
                              title={item.audience === "maintainers" ? "For registry maintainers, not projects that install from the registry" : "For developers and consumers of the registry"}
                              class={`ml-auto h-4.5 shrink-0 rounded-full px-1.5 font-mono text-[10px] font-normal tracking-wide uppercase ${item.audience === "maintainers" ? "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300" : "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300"}`}
                            >
                              {item.audience === "maintainers" ? "Maintainers" : "Dev"}
                            </Badge>
                          {:else if item.isHook}
                            <Badge
                              variant="secondary"
                              title="Hook"
                              aria-label="Hook"
                              class="ml-auto size-4.5 shrink-0 justify-center rounded-full bg-amber-500/15 px-0 font-mono text-[10px] font-semibold text-amber-700 dark:text-amber-300"
                            >H</Badge>
                          {:else if item.badge}
                            <span class="ml-auto rounded-full bg-muted px-1.5 text-[10px] text-muted-foreground">{item.badge}</span>
                          {/if}
                        </a>
                      {/snippet}
                    </Sidebar.MenuSubButton>
                  </Sidebar.MenuSubItem>
                {/each}
              </Sidebar.MenuSub>
            </Collapsible.Content>
          </Sidebar.MenuItem>
        {/snippet}
      </Collapsible.Root>
    {/each}
    <Sidebar.MenuItem>
      <Sidebar.MenuButton isActive={page.url.pathname === "/flows"}>
        {#snippet child({ props })}<a href={resolve("/flows")} {...props}><span>Component flows</span></a>{/snippet}
      </Sidebar.MenuButton>
    </Sidebar.MenuItem>
  </Sidebar.Menu>
</Sidebar.Group>
