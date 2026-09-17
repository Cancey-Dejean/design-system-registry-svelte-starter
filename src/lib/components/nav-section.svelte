<script lang="ts">
  import { page } from "$app/state";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { isNavItemActive, type SiteNavSection } from "$lib/navigation";

  let { section }: { section: SiteNavSection } = $props();
</script>

<Sidebar.Group>
  <Sidebar.GroupLabel>{section.title}</Sidebar.GroupLabel>
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
</Sidebar.Group>
