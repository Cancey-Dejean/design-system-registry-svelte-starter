<script lang="ts" module>
  import {
    getDependencyDepths,
    isConnected,
    type RegistryFlowGraph,
  } from "$lib/registry/flow-graph";

  import type { FlowItemNode, FlowLabelNode, FlowTone } from "./flow-nodes";

  type MapNode = FlowItemNode | FlowLabelNode;

  const COLUMN_GAP = 320;
  const ROW_GAP = 60;
  const columnNames = ["Foundations", "Composites", "Compositions", "Assemblies"];

  function getMapLayout(graph: RegistryFlowGraph) {
    const depths = getDependencyDepths(graph);
    const connected = graph.names.filter((name) => isConnected(graph, name));
    const columns: string[][] = [];

    for (const name of connected) {
      const depth = depths.get(name) ?? 0;
      columns[depth] = [...(columns[depth] ?? []), name];
    }

    const sortedColumns = Array.from(columns, (column) =>
      (column ?? []).toSorted((a, b) => {
        const typeA = graph.items.get(a)?.type ?? "";
        const typeB = graph.items.get(b)?.type ?? "";

        return typeA.localeCompare(typeB) || a.localeCompare(b);
      }),
    );
    const tallest = Math.max(1, ...sortedColumns.map((column) => column.length));
    const positions = new Map<string, { x: number; y: number }>();

    sortedColumns.forEach((column, depth) => {
      const offset = ((tallest - column.length) * ROW_GAP) / 2;

      column.forEach((name, index) => {
        positions.set(name, { x: depth * COLUMN_GAP, y: offset + index * ROW_GAP });
      });
    });

    return { connected, columns: sortedColumns, positions };
  }

  function getTone(
    name: string,
    active: string | null,
    up: ReadonlySet<string>,
    down: ReadonlySet<string>,
    query: string,
  ): FlowTone {
    if (name === active) {
      return "focus";
    }

    if (query && !name.includes(query)) {
      return "dim";
    }

    if (up.has(name)) {
      return "up";
    }

    if (down.has(name)) {
      return "down";
    }

    return active ? "dim" : "default";
  }
</script>

<script lang="ts">
  import {
    Background,
    Controls,
    MiniMap,
    SvelteFlow,
    useSvelteFlow,
    type Edge,
  } from "@xyflow/svelte";
  import SearchIcon from "@lucide/svelte/icons/search";

  import { Input } from "$lib/components/ui/input/index.js";
  import {
    getDependents,
    getLocalDependencies,
    getTransitiveNeighbors,
  } from "$lib/registry/flow-graph";
  import type { RegistryItemType } from "$lib/registry/item-types";

  import {
    flowCanvasDefaults,
    flowSegmentClassName,
    flowSegmentedClassName,
    flowToolbarClassName,
    flowToolbarLabelClassName,
    getFlowEdgeStyle,
    type FlowViewProps,
  } from "./flow-canvas";
  import FlowInspector from "./flow-inspector.svelte";
  import FlowItemNodeView from "./flow-item-node.svelte";
  import FlowLabelNodeView from "./flow-label-node.svelte";
  import {
    FLOW_ITEM_HEIGHT,
    FLOW_ITEM_WIDTH,
    flowColors,
    getRegistryTypeLabel,
  } from "./flow-nodes";
  import RegistryTypeIcon from "./registry-type-icon.svelte";

  let { graph, selected, onSelect, colorMode }: FlowViewProps = $props();

  const nodeTypes = { item: FlowItemNodeView, label: FlowLabelNodeView };
  const flow = useSvelteFlow();

  let inspectorOpen = $state(true);
  let query = $state("");
  let hiddenTypes = $state.raw<ReadonlySet<RegistryItemType>>(new Set());

  let layout = $derived(getMapLayout(graph));
  let active = $derived(inspectorOpen ? selected : null);
  let up = $derived(active ? getTransitiveNeighbors(graph, active, "up") : new Set<string>());
  let down = $derived(active ? getTransitiveNeighbors(graph, active, "down") : new Set<string>());
  let normalizedQuery = $derived(query.trim().toLowerCase());

  let typeCounts = $derived.by(() => {
    const counts = new Map<RegistryItemType, number>();

    for (const name of layout.connected) {
      const type = graph.items.get(name)?.type;

      if (type) {
        counts.set(type, (counts.get(type) ?? 0) + 1);
      }
    }

    return [...counts];
  });

  let visible = $derived(
    layout.connected.filter((name) => {
      const type = graph.items.get(name)?.type;

      return type !== undefined && !hiddenTypes.has(type);
    }),
  );

  let nodes = $derived<MapNode[]>([
    ...layout.columns.map(
      (column, depth): FlowLabelNode => ({
        id: `column-${depth}`,
        type: "label",
        position: { x: depth * COLUMN_GAP, y: -40 },
        data: { label: `${columnNames[depth] ?? `Depth ${depth}`} · ${column.length}` },
      }),
    ),
    ...visible.map((name): FlowItemNode => {
      const item = graph.items.get(name);
      const dependencyCount = getLocalDependencies(graph, name).length;
      const dependentCount = getDependents(graph, name).length;

      return {
        id: name,
        type: "item",
        position: layout.positions.get(name) ?? { x: 0, y: 0 },
        width: FLOW_ITEM_WIDTH,
        height: FLOW_ITEM_HEIGHT,
        data: {
          label: item?.title ?? name,
          icon: item?.type,
          meta: `${dependencyCount}↑ ${dependentCount}↓`,
          tone: getTone(name, active, up, down, normalizedQuery),
          target: name,
          title: `${item?.title ?? name}: depends on ${dependencyCount}, used by ${dependentCount}`,
        },
      };
    }),
  ]);

  let edges = $derived.by<Edge[]>(() => {
    const visibleSet = new Set(visible);

    return visible.flatMap((name) =>
      getLocalDependencies(graph, name)
        .filter((dependency) => visibleSet.has(dependency))
        .map((dependency) => {
          const inUp = (name === active || up.has(name)) && up.has(dependency);
          const inDown = (dependency === active || down.has(dependency)) && down.has(name);
          let style = getFlowEdgeStyle(flowColors.faint, { opacity: active ? 0.5 : 1 });

          if (inUp) {
            style = getFlowEdgeStyle(flowColors.up, { "stroke-width": 2 });
          } else if (inDown) {
            style = getFlowEdgeStyle(flowColors.down, { "stroke-width": 2 });
          }

          return {
            id: `${dependency}->${name}`,
            source: dependency,
            target: name,
            animated: inUp || inDown,
            zIndex: inUp || inDown ? 1 : 0,
            style,
          };
        }),
    );
  });

  function select(name: string) {
    onSelect(name);
    inspectorOpen = true;

    const position = layout.positions.get(name);

    if (position) {
      void flow.setCenter(position.x + FLOW_ITEM_WIDTH / 2 + 80, position.y + FLOW_ITEM_HEIGHT / 2, {
        zoom: flow.getZoom(),
        duration: 450,
      });
    }
  }

  function toggleType(type: RegistryItemType) {
    const next = new Set(hiddenTypes);

    if (!next.delete(type)) {
      next.add(type);
    }

    hiddenTypes = next;
  }

  function getMiniMapNodeColor(id: string): string {
    if (id === active) {
      return "var(--foreground)";
    }

    if (up.has(id)) {
      return flowColors.up;
    }

    return down.has(id) ? flowColors.down : "var(--border)";
  }
</script>

<section
  class="flex h-[min(780px,calc(100svh-13rem))] min-h-120 flex-col overflow-hidden rounded-xl border bg-card"
>
  <div class={flowToolbarClassName}>
    <span class={flowToolbarLabelClassName}>
      How it connects ·
      <span class="normal-case">
        {layout.connected.length} connected · {graph.names.length - layout.connected.length}
        standalone hidden
      </span>
    </span>
    <div class="flex flex-wrap items-center gap-2">
      <div class="relative w-full sm:w-48">
        <SearchIcon
          class="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          bind:value={query}
          placeholder="Find an item…"
          aria-label="Find a registry item"
          class="h-8 pl-8"
        />
      </div>
      <fieldset class={flowSegmentedClassName}>
        <legend class="sr-only">Item types</legend>
        {#each typeCounts as [type, count] (type)}
          <button
            type="button"
            aria-pressed={!hiddenTypes.has(type)}
            onclick={() => toggleType(type)}
            class={flowSegmentClassName}
          >
            <RegistryTypeIcon {type} class="size-3" strokeWidth={1.75} />
            {getRegistryTypeLabel(type)}
            <span class="font-mono font-normal text-muted-foreground">{count}</span>
          </button>
        {/each}
      </fieldset>
    </div>
  </div>

  <div class="relative min-h-0 flex-1 bg-muted/30">
    <SvelteFlow
      {...flowCanvasDefaults}
      {nodes}
      {edges}
      {nodeTypes}
      {colorMode}
      fitView
      fitViewOptions={{ padding: { top: 0.2, left: 0.08, right: 0.35, bottom: 0.1 } }}
      onnodeclick={({ node }) => {
        if (node.type === "item" && node.data.target) {
          select(node.data.target);
        }
      }}
      onpaneclick={() => (inspectorOpen = false)}
    >
      <Background gap={18} size={1.2} patternColor="var(--border)" />
      <Controls position="bottom-left" showLock={false} />
      <MiniMap
        position="bottom-left"
        style="margin-left: 56px"
        width={160}
        height={100}
        class="hidden sm:block"
        pannable
        zoomable
        nodeBorderRadius={4}
        nodeColor={(node) => getMiniMapNodeColor(node.id)}
      />
    </SvelteFlow>

    {#if active}
      <FlowInspector {graph} name={active} onSelect={select} onClose={() => (inspectorOpen = false)} />
    {:else}
      <div
        class="absolute top-3 right-3 z-10 hidden gap-3 rounded-lg border bg-card px-3 py-2 text-xs shadow-xs lg:flex"
      >
        <span class="inline-flex items-center gap-1.5">
          <span class="h-0.5 w-4 rounded-full" style:background={flowColors.up}></span>
          Depends on
        </span>
        <span class="inline-flex items-center gap-1.5">
          <span class="h-0.5 w-4 rounded-full" style:background={flowColors.down}></span>
          Used by
        </span>
      </div>
    {/if}
  </div>
</section>
