<script lang="ts">
  import type { HeadingEntry } from "$lib/registry/extract-headings";

  let { items }: { items: HeadingEntry[] } = $props();
</script>

{#if items.length}
  <nav class="hidden w-48 shrink-0 xl:block">
    <div class="sticky top-24 flex flex-col gap-2">
      <p class="text-sm font-medium">On This Page</p>
      <ul class="flex flex-col gap-2 text-sm text-muted-foreground">
        {#each items as item (item.id)}
          <li>
            <a href={`#${item.id}`} class="hover:text-foreground">{item.label}</a>
          </li>
        {/each}
      </ul>
    </div>
  </nav>
{/if}
