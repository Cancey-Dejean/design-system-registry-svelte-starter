<script lang="ts">
  import { page } from "$app/state";
  import * as Collapsible from "$registry/items/components/collapsible/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
  import { isNavItemActive, isNavSectionActive, type SiteNavSection } from "$lib/navigation";

  let { sections }: { sections: SiteNavSection[] } = $props();
</script>

<Sidebar.Group>
  <Sidebar.Menu>
    {#each sections as section (section.id)}
      <Collapsible.Root open={isNavSectionActive(section, page.url.pathname)} class="group/collapsible">
        {#snippet child({ props })}
          <Sidebar.MenuItem {...props}>
            <Sidebar.MenuButton isActive={isNavItemActive(section.basePath, page.url.pathname)}>
              {#snippet child({ props })}
                <a href={section.indexUrl ?? section.basePath} {...props}>
                  <span>{section.title}</span>
                </a>
              {/snippet}
            </Sidebar.MenuButton>
            <Collapsible.Trigger>
              {#snippet child({ props })}
                <Sidebar.MenuAction {...props}>
                  <ChevronRightIcon
                    class="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                  />
                </Sidebar.MenuAction>
              {/snippet}
            </Collapsible.Trigger>
            <Collapsible.Content>
              <Sidebar.MenuSub>
                {#each section.items as item (item.url)}
                  <Sidebar.MenuSubItem>
                    <Sidebar.MenuSubButton isActive={isNavItemActive(item.url, page.url.pathname)}>
                      {#snippet child({ props })}
                        <a href={item.url} {...props}>
                          <span>{item.title}</span>
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
  </Sidebar.Menu>
</Sidebar.Group>
