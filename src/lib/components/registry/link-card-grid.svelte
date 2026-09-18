<script lang="ts">
  import * as Card from "$registry/items/components/card/index.js";

  let {
    items,
  }: {
    items: { title: string; description?: string; url: string }[];
  } = $props();
</script>

<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {#each items as item (item.url)}
    <a href={item.url} class="block">
      <Card.Root class="h-full transition-colors hover:border-foreground/40">
        <Card.Header>
          <Card.Title>{item.title}</Card.Title>
          {#if item.description}
            <Card.Description>{item.description}</Card.Description>
          {/if}
        </Card.Header>
      </Card.Root>
    </a>
  {/each}
</div>
