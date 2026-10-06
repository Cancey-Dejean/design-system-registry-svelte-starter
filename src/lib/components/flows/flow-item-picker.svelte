<script lang="ts">
  import { tick } from "svelte";

  import * as Command from "$registry/items/components/command/index.js";
  import * as Popover from "$registry/items/components/popover/index.js";
  import type { RegistryFlowGraph } from "$lib/registry/flow-graph";
  import { cn } from "$lib/utils";

  import RegistryTypeIcon from "./registry-type-icon.svelte";

  let {
    graph,
    value,
    onValueChange,
    class: className,
  }: {
    graph: RegistryFlowGraph;
    value: string;
    onValueChange: (name: string) => void;
    class?: string;
  } = $props();

  let open = $state(false);
  let query = $state("");
  let triggerRef = $state<HTMLButtonElement | null>(null);

  const getTitle = (name: string) => graph.items.get(name)?.title ?? name;

  let selectedItem = $derived(graph.items.get(value));
  let normalizedQuery = $derived(query.trim().toLowerCase());
  let filteredNames = $derived(
    normalizedQuery
      ? graph.names.filter(
          (name) =>
            name.includes(normalizedQuery) ||
            getTitle(name).toLowerCase().includes(normalizedQuery),
        )
      : graph.names,
  );

  function select(name: string) {
    onValueChange(name);
    open = false;
    void tick().then(() => triggerRef?.focus());
  }
</script>

<Popover.Root
  bind:open
  onOpenChange={(isOpen) => {
    if (!isOpen) {
      query = "";
    }
  }}
>
  <Popover.Trigger
    bind:ref={triggerRef}
    role="combobox"
    aria-label="Registry item"
    aria-expanded={open}
    class={cn(
      "flex h-9 w-full cursor-pointer items-center gap-2 rounded-lg border border-input bg-transparent px-2.5 text-left text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=open]:border-ring dark:bg-input/30",
      className,
    )}
  >
    {#if selectedItem}
      <RegistryTypeIcon
        type={selectedItem.type}
        class="size-4 shrink-0 text-muted-foreground"
        strokeWidth={1.75}
      />
    {/if}
    <span class="min-w-0 flex-1 truncate">{getTitle(value)}</span>
  </Popover.Trigger>
  <Popover.Content align="start" class="w-(--bits-popover-anchor-width) min-w-56 p-0">
    <Command.Root shouldFilter={false}>
      <Command.Input
        bind:value={query}
        aria-label="Search registry items"
        placeholder="Search items…"
      />
      <p aria-live="polite" class="px-3 pt-2 pb-1 font-mono text-[11px] text-muted-foreground">
        {filteredNames.length}
        {filteredNames.length === 1 ? "item" : "items"}
      </p>
      <Command.List>
        {#if filteredNames.length === 0}
          <p class="py-6 text-center text-sm">No matching items</p>
        {/if}
        <Command.Group>
          {#each filteredNames as name (name)}
            {@const item = graph.items.get(name)}
            <Command.Item value={name} onSelect={() => select(name)}>
              {#if item}
                <RegistryTypeIcon
                  type={item.type}
                  class="size-4 text-muted-foreground"
                  strokeWidth={1.75}
                />
              {/if}
              <span class="truncate">{getTitle(name)}</span>
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
