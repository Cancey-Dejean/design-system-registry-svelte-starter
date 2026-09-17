<script lang="ts">
  import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
  import type { AdjacentPage } from "$lib/registry/section-loaders";

  let { prev, next }: { prev: AdjacentPage | null; next: AdjacentPage | null } = $props();
</script>

{#if prev || next}
  <nav class="flex items-center justify-between gap-4 border-t pt-6">
    {#if prev}
      <a
        href={prev.url}
        class="flex flex-col gap-1 rounded-md border px-4 py-2 text-sm hover:bg-accent"
      >
        <span class="flex items-center gap-1 text-muted-foreground">
          <ChevronLeftIcon class="size-3.5" />
          Previous
        </span>
        <span class="font-medium">{prev.title}</span>
      </a>
    {:else}
      <span></span>
    {/if}
    {#if next}
      <a
        href={next.url}
        class="flex flex-col items-end gap-1 rounded-md border px-4 py-2 text-sm hover:bg-accent"
      >
        <span class="flex items-center gap-1 text-muted-foreground">
          Next
          <ChevronRightIcon class="size-3.5" />
        </span>
        <span class="font-medium">{next.title}</span>
      </a>
    {/if}
  </nav>
{/if}
