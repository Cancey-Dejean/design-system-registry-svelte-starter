<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import type { RegistryItemMetadata } from "$lib/registry/catalog";

  let {
    items,
    basePath,
  }: {
    items: { name: string; metadata: RegistryItemMetadata }[];
    basePath: string;
  } = $props();
</script>

<div class="grid gap-4 sm:grid-cols-2">
  {#each items as item (item.name)}
    <a href={`${basePath}/${item.name}`} class="block">
      <Card.Root class="h-full transition-colors hover:border-foreground/40">
        <Card.Header>
          <Card.Title>{item.metadata.title}</Card.Title>
          {#if item.metadata.description}
            <Card.Description>{item.metadata.description}</Card.Description>
          {/if}
        </Card.Header>
      </Card.Root>
    </a>
  {/each}
</div>
