<script lang="ts">
  import { page } from "$app/state";
  import * as Breadcrumb from "$registry/items/components/breadcrumb/index.js";
  import { isNavItemActive, type SiteNavSection } from "$lib/navigation";

  let { sections }: { sections: SiteNavSection[] } = $props();

  let activeSection = $derived(
    sections.find((section) =>
      section.items.some((item) => isNavItemActive(item.url, page.url.pathname)),
    ),
  );
  let activeItem = $derived(
    activeSection?.items.find((item) => isNavItemActive(item.url, page.url.pathname)),
  );
</script>

{#if activeSection}
  <Breadcrumb.Root>
    <Breadcrumb.List>
      <Breadcrumb.Item class="hidden md:block">
        {#if activeItem}
          <Breadcrumb.Link href={activeSection.items[0]?.url ?? activeSection.basePath}>
            {activeSection.title}
          </Breadcrumb.Link>
        {:else}
          <Breadcrumb.Page>{activeSection.title}</Breadcrumb.Page>
        {/if}
      </Breadcrumb.Item>
      {#if activeItem}
        <Breadcrumb.Separator class="hidden md:block" />
        <Breadcrumb.Item>
          <Breadcrumb.Page>{activeItem.title}</Breadcrumb.Page>
        </Breadcrumb.Item>
      {/if}
    </Breadcrumb.List>
  </Breadcrumb.Root>
{/if}
