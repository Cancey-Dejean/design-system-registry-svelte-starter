<script lang="ts">
  import type { Snippet } from "svelte";
  import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
  import FileCodeIcon from "@lucide/svelte/icons/file-code";
  import GlobeIcon from "@lucide/svelte/icons/globe";
  import PackageIcon from "@lucide/svelte/icons/package";
  import XIcon from "@lucide/svelte/icons/x";

  import { Badge } from "$registry/items/components/badge/index.js";
  import * as Collapsible from "$registry/items/components/collapsible/index.js";
  import {
    getTransitiveNeighbors,
    getVia,
    type RegistryFlowDirection,
    type RegistryFlowGraph,
  } from "$lib/registry/flow-graph";

  import FlowInstallCommand from "./flow-install-command.svelte";
  import { flowColors, getRegistryTypeLabel, splitFilePath } from "./flow-nodes";
  import RegistryTypeIcon from "./registry-type-icon.svelte";

  let {
    graph,
    name,
    onSelect,
    onClose,
  }: {
    graph: RegistryFlowGraph;
    name: string;
    onSelect: (name: string) => void;
    onClose: () => void;
  } = $props();

  let item = $derived(graph.items.get(name));
  let upstream = $derived([...getTransitiveNeighbors(graph, name, "up")].toSorted());
  let downstream = $derived([...getTransitiveNeighbors(graph, name, "down")].toSorted());
  let upstreamCount = $derived(upstream.length + (item?.remoteDependencies.length ?? 0));
</script>

{#snippet link(target: string, direction: RegistryFlowDirection)}
  {@const targetItem = graph.items.get(target)}
  {@const via = getVia(graph, name, target, direction)}
  <button
    type="button"
    onclick={() => onSelect(target)}
    class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
  >
    {#if targetItem}
      <RegistryTypeIcon type={targetItem.type} class="size-3.5 shrink-0" strokeWidth={1.75} />
    {:else}
      <FileCodeIcon class="size-3.5 shrink-0" strokeWidth={1.75} />
    {/if}
    <span class="truncate">{targetItem?.title ?? target}</span>
    <span class="ml-auto shrink-0 text-[11px] text-muted-foreground">
      {via ? `via ${via}` : "direct"}
    </span>
  </button>
{/snippet}

{#snippet line(color: string)}
  <span class="h-0.5 w-4 rounded-full" style:background={color}></span>
{/snippet}

{#snippet group(label: string, marker: Snippet, children: Snippet)}
  <Collapsible.Root open>
    <h3>
      <Collapsible.Trigger
        class="group/trigger -mx-1 mb-1 flex w-[calc(100%+0.5rem)] items-center gap-1.5 rounded-md px-1 py-1 font-mono text-[11px] tracking-wider text-muted-foreground uppercase outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {@render marker()}
        {label}
        <ChevronRightIcon
          class="ml-auto size-3.5 transition-transform duration-150 group-aria-expanded/trigger:rotate-90"
        />
      </Collapsible.Trigger>
    </h3>
    <Collapsible.Content>{@render children()}</Collapsible.Content>
  </Collapsible.Root>
{/snippet}

{#snippet emptyNote(text: string)}
  <p class="px-2 py-0.5 text-xs text-muted-foreground">{text}</p>
{/snippet}

{#if item}
  <aside
    aria-label="{item.title} details"
    class="absolute inset-x-3 bottom-3 z-20 flex max-h-[55%] animate-in flex-col overflow-hidden rounded-xl border bg-card shadow-xl duration-200 fade-in slide-in-from-right-2 md:inset-x-auto md:top-3 md:right-3 md:max-h-none md:w-80"
  >
    <div class="flex flex-col gap-3 border-b p-4">
      <div class="flex items-start justify-between gap-2">
        <Badge variant="outline" class="font-mono">
          <RegistryTypeIcon type={item.type} strokeWidth={1.75} />
          registry:{getRegistryTypeLabel(item.type)}
        </Badge>
        <button
          type="button"
          aria-label="Close details"
          onclick={onClose}
          class="rounded-md p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <XIcon class="size-4" />
        </button>
      </div>
      <h2 class="text-lg font-semibold tracking-tight">{item.title}</h2>
      <FlowInstallCommand {name} />
    </div>
    <div class="flex flex-col gap-5 overflow-y-auto p-4">
      {#snippet upMarker()}{@render line(flowColors.up)}{/snippet}
      {#snippet upChildren()}
        {#each upstream as target (target)}
          {@render link(target, "up")}
        {/each}
        {#each item.remoteDependencies as dependency (dependency.id)}
          <div class="flex items-center gap-2 px-2 py-1.5 text-sm">
            <GlobeIcon class="size-3.5 shrink-0" strokeWidth={1.75} />
            <span class="truncate">{dependency.name}</span>
            <span class="ml-auto shrink-0 text-[11px] text-muted-foreground">
              {dependency.source}
            </span>
          </div>
        {/each}
        {#if upstreamCount === 0}
          {@render emptyNote("Nothing — this is a foundation.")}
        {/if}
      {/snippet}
      {@render group(`Depends on · ${upstreamCount}`, upMarker, upChildren)}

      {#snippet downMarker()}{@render line(flowColors.down)}{/snippet}
      {#snippet downChildren()}
        {#each downstream as target (target)}
          {@render link(target, "down")}
        {/each}
        {#if downstream.length === 0}
          {@render emptyNote("No other registry item uses this yet.")}
        {/if}
      {/snippet}
      {@render group(`Used by · ${downstream.length}`, downMarker, downChildren)}

      {#snippet npmMarker()}<PackageIcon class="size-3" />{/snippet}
      {#snippet npmChildren()}
        <div class="flex flex-wrap gap-1.5 px-2">
          {#each item.dependencies as dependency (dependency)}
            <Badge variant="outline" class="font-mono">{dependency}</Badge>
          {/each}
        </div>
        {#if item.dependencies.length === 0}
          {@render emptyNote("No packages.")}
        {/if}
      {/snippet}
      {@render group(`npm · ${item.dependencies.length}`, npmMarker, npmChildren)}

      {#snippet filesMarker()}<FileCodeIcon class="size-3" />{/snippet}
      {#snippet filesChildren()}
        {#each item.files as file (file)}
          {@const { directory, base } = splitFilePath(file)}
          <div class="px-2 py-0.5 font-mono text-xs break-all">
            <span class="text-muted-foreground">{directory}</span>{base}
          </div>
        {/each}
      {/snippet}
      {@render group(`Files · ${item.files.length}`, filesMarker, filesChildren)}

      <a href={item.href} class="inline-flex items-center gap-1.5 text-sm font-medium hover:underline">
        Open {item.title} docs
        <ArrowRightIcon class="size-3.5" />
      </a>
    </div>
  </aside>
{/if}
