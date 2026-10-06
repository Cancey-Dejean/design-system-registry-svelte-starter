<script lang="ts" module>
  import {
    getDependents,
    getLocalDependencies,
    type RegistryFlowGraph,
  } from "$lib/registry/flow-graph";

  function getInitialSelection(graph: RegistryFlowGraph): string {
    const connectionCount = (name: string) =>
      getLocalDependencies(graph, name).length + getDependents(graph, name).length;

    return graph.names.reduce<string>(
      (best, name) => (best === "" || connectionCount(name) > connectionCount(best) ? name : best),
      "",
    );
  }
</script>

<script lang="ts">
  import "@xyflow/svelte/dist/style.css";

  import { onMount, untrack } from "svelte";
  import type { ColorMode } from "@xyflow/svelte";

  import { registryConfig } from "$registry/config";
  import { cn } from "$lib/utils";

  import FlowChainView from "./flow-chain-view.svelte";
  import FlowLanesView from "./flow-lanes-view.svelte";
  import FlowLayoutSelector from "./flow-layout-selector.svelte";
  import FlowMapView from "./flow-map-view.svelte";
  import {
    defaultFlowLayout,
    readFlowLayout,
    writeFlowLayout,
    type FlowLayout,
  } from "./flow-layout";

  let {
    graph,
    title,
    description,
  }: { graph: RegistryFlowGraph; title: string; description: string } = $props();

  const flowViews = { map: FlowMapView, lanes: FlowLanesView, chain: FlowChainView };

  let layout = $state<FlowLayout>(defaultFlowLayout);
  let selected = $state(untrack(() => getInitialSelection(graph)));
  let colorMode = $state<ColorMode>("light");

  let View = $derived(flowViews[layout]);
  let sharedCount = $derived(graph.dependents.size);
  let viewOwnsHeader = $derived(layout !== "map");

  function setLayout(next: FlowLayout) {
    layout = next;
    writeFlowLayout(next);
  }

  onMount(() => {
    layout = readFlowLayout();

    // The theme toggle flips a class on <html> rather than exposing state.
    const root = document.documentElement;
    const syncColorMode = () => {
      colorMode = root.classList.contains("dark") ? "dark" : "light";
    };
    const observer = new MutationObserver(syncColorMode);

    syncColorMode();
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  });
</script>

{#snippet header()}
  <header class="flex flex-wrap items-end justify-between gap-4">
    <div class="flex flex-col gap-1.5">
      <h1 class="text-3xl font-semibold tracking-tight">{title}</h1>
      <p class="max-w-2xl text-sm text-muted-foreground">{description}</p>
      <p class="text-sm text-muted-foreground">
        <span class="font-medium text-foreground">{registryConfig.namespace}</span> ·
        {graph.names.length} items · {sharedCount} shared
      </p>
    </div>
    <FlowLayoutSelector value={layout} onValueChange={setLayout} />
  </header>
{/snippet}

<div class={cn("flex min-w-0 flex-1 flex-col gap-6", !viewOwnsHeader && "pb-6")}>
  {#if !(selected && viewOwnsHeader)}
    {@render header()}
  {/if}

  {#if selected}
    <View
      {graph}
      {selected}
      onSelect={(name) => (selected = name)}
      {colorMode}
      header={viewOwnsHeader ? header : undefined}
    />
  {:else}
    <p class="text-sm text-muted-foreground">No registry items yet.</p>
  {/if}
</div>
