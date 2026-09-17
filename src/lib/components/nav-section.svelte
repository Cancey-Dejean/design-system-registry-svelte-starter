<script lang="ts">
  import { page } from "$app/state";
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import * as Collapsible from "$lib/components/ui/collapsible/index.js";
  import { isNavItemActive, type SiteNavSection } from "$lib/navigation";

  let { section }: { section: SiteNavSection } = $props();
</script>

<Collapsible.Root open={true} class="group/collapsible">
  <Sidebar.Group>
    <Sidebar.GroupLabel>
      {#snippet child({ props })}
        <Collapsible.Trigger {...props}>
          {section.title}
          <ChevronRightIcon
            class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
          />
        </Collapsible.Trigger>
      {/snippet}
    </Sidebar.GroupLabel>
    <Collapsible.Content>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each section.items as item (item.url)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton isActive={isNavItemActive(item.url, page.url.pathname)}>
                {#snippet child({ props })}
                  <a href={item.url} {...props}>
                    <span>{item.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Collapsible.Content>
  </Sidebar.Group>
</Collapsible.Root>
