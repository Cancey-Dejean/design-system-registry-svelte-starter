<script lang="ts">
  let { containerId }: { containerId: string } = $props();

  let items = $state<{ id: string; label: string }[]>([]);

  $effect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    items = Array.from(container.querySelectorAll<HTMLHeadingElement>("h2[id]")).map((heading) => ({
      id: heading.id,
      label: heading.textContent ?? "",
    }));
  });
</script>

{#if items.length}
  <nav class="hidden w-48 shrink-0 xl:block">
    <div class="sticky top-8 flex flex-col gap-2">
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
