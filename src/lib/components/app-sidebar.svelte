<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import NavSection from "./nav-section.svelte";
  import type { SiteNavSection } from "$lib/navigation";
  import { registryConfig } from "$registry/config";
  import type { ComponentProps } from "svelte";

  let {
    sections,
    ref = $bindable(null),
    collapsible = "icon",
    ...restProps
  }: { sections: SiteNavSection[] } & ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton size="lg">
          {#snippet child({ props })}
            <a href="/" {...props}>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-semibold">{registryConfig.name}</span>
              </div>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
  <Sidebar.Content>
    {#each sections as section (section.id)}
      <NavSection {section} />
    {/each}
  </Sidebar.Content>
  <Sidebar.Rail />
</Sidebar.Root>
