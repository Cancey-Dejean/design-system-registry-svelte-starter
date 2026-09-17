<script lang="ts">
  import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
  import type { AdjacentPage } from "$lib/registry/section-loaders";

  let { prev, next }: { prev: AdjacentPage | null; next: AdjacentPage | null } = $props();
</script>

{#if prev || next}
  <nav class="flex items-center overflow-hidden rounded-md border text-muted-foreground">
    {#if prev}
      <a
        href={prev.url}
        title={prev.title}
        aria-label={`Previous: ${prev.title}`}
        class="flex items-center justify-center px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
      >
        <ChevronLeftIcon class="size-4" />
      </a>
    {:else}
      <span class="flex items-center justify-center px-2 py-1.5 opacity-40">
        <ChevronLeftIcon class="size-4" />
      </span>
    {/if}
    <span class="h-5 w-px bg-border"></span>
    {#if next}
      <a
        href={next.url}
        title={next.title}
        aria-label={`Next: ${next.title}`}
        class="flex items-center justify-center px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
      >
        <ChevronRightIcon class="size-4" />
      </a>
    {:else}
      <span class="flex items-center justify-center px-2 py-1.5 opacity-40">
        <ChevronRightIcon class="size-4" />
      </span>
    {/if}
  </nav>
{/if}
