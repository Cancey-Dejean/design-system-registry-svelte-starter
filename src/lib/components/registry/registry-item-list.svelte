<script lang="ts">
  import * as Card from "$registry/items/components/card/index.js";
  import type { RegistryItemMetadata } from "$lib/registry/catalog";

  let {
    title,
    items,
    basePath,
  }: {
    title: string;
    items: { name: string; metadata: RegistryItemMetadata }[];
    basePath: string;
  } = $props();
</script>

<div class="flex flex-col gap-4 py-8 grow">
  <h1 class="text-3xl font-semibold tracking-tight">{title}</h1>
  <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
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
</div>
