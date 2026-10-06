<script lang="ts" module>
  import type { Edge } from "@xyflow/svelte";
  import {
    getDependents,
    getLocalDependencies,
    type RegistryFlowGraph,
    type RegistryFlowRole,
  } from "$lib/registry/flow-graph";

  import { getFlowEdgeStyle } from "./flow-canvas";
  import {
    FLOW_FOCUS_WIDTH,
    flowColors,
    type FlowFocusNode,
    type FlowItemNode,
    type FlowLabelNode,
  } from "./flow-nodes";

  type LanesDirection = "up" | "both" | "down";
  type LanesNode = FlowItemNode | FlowLabelNode | FlowFocusNode;

  const directionOptions = [
    { value: "up", label: "Depends on" },
    { value: "both", label: "Both" },
    { value: "down", label: "Used by" },
  ] as const satisfies readonly { value: LanesDirection; label: string }[];

  const roles = ["shared", "composite", "standalone"] as const;

  const roleDotClassNames: Record<RegistryFlowRole, string> = {
    shared: "bg-emerald-500",
    composite: "bg-amber-500",
    standalone: "bg-muted-foreground/40",
  };

  const ROW_HEIGHT = 50;
  const COLUMN_X = { up: 0, focus: 270, down: 270 + FLOW_FOCUS_WIDTH + 60 } as const;

  type LaneEntry = {
    id: string;
    node: FlowItemNode["data"];
    dashed: boolean;
  };

  function getUpstreamEntries(graph: RegistryFlowGraph, name: string): LaneEntry[] {
    const item = graph.items.get(name);

    if (!item) {
      return [];
    }

    return [
      ...getLocalDependencies(graph, name).map((dependency): LaneEntry => {
        const dependencyItem = graph.items.get(dependency);
        const count = getLocalDependencies(graph, dependency).length;

        return {
          id: dependency,
          dashed: false,
          node: {
            label: dependencyItem?.title ?? dependency,
            icon: dependencyItem?.type,
            meta: `${count} ${count === 1 ? "dep" : "deps"}`,
            tone: "default",
            target: dependency,
            title: `Trace ${dependencyItem?.title ?? dependency}`,
          },
        };
      }),
      ...item.remoteDependencies.map(
        (dependency): LaneEntry => ({
          id: dependency.id,
          dashed: true,
          node: {
            label: dependency.name,
            icon: "globe",
            meta: dependency.source,
            tone: "remote",
            title: `${dependency.source}/${dependency.name}`,
          },
        }),
      ),
      ...item.dependencies.map(
        (dependency): LaneEntry => ({
          id: `npm:${dependency}`,
          dashed: true,
          node: {
            label: dependency,
            icon: "package",
            meta: "npm",
            tone: "package",
            title: dependency,
          },
        }),
      ),
    ];
  }

  function getDownstreamEntries(graph: RegistryFlowGraph, name: string): LaneEntry[] {
    return getDependents(graph, name).map((dependent) => {
      const dependentItem = graph.items.get(dependent);
      const count = getDependents(graph, dependent).length;

      return {
        id: dependent,
        dashed: false,
        node: {
          label: dependentItem?.title ?? dependent,
          icon: dependentItem?.type,
          meta: `${count} ${count === 1 ? "use" : "uses"}`,
          tone: "default",
          target: dependent,
          title: `Trace ${dependentItem?.title ?? dependent}`,
        },
      };
    });
  }

  function buildLanes(graph: RegistryFlowGraph, name: string, direction: LanesDirection) {
    const item = graph.items.get(name);
    const showUp = direction !== "down";
    const showDown = direction !== "up";
    const upEntries = showUp ? getUpstreamEntries(graph, name) : [];
    const downEntries = showDown ? getDownstreamEntries(graph, name) : [];
    const focusHeight = 52 + (item?.files.length ?? 0) * 19;
    const rows = Math.max(
      upEntries.length,
      downEntries.length,
      Math.ceil(focusHeight / ROW_HEIGHT),
      1,
    );
    const totalHeight = rows * ROW_HEIGHT;
    const nodes: LanesNode[] = [];
    const edges: Edge[] = [];

    const placeColumn = (entries: LaneEntry[], side: "up" | "down") => {
      const x = COLUMN_X[side];

      if (entries.length === 0) {
        nodes.push({
          id: `empty-${side}`,
          type: "item",
          position: { x, y: totalHeight / 2 - 19 },
          data: {
            label: side === "up" ? "No dependencies" : "Not used by other items",
            tone: "empty",
          },
        });
        return;
      }

      const top = (totalHeight - entries.length * ROW_HEIGHT) / 2;
      const stroke = side === "up" ? flowColors.up : flowColors.down;

      entries.forEach((entry, index) => {
        nodes.push({
          id: entry.id,
          type: "item",
          position: { x, y: top + index * ROW_HEIGHT },
          data: entry.node,
        });
        edges.push({
          id: `${side}:${entry.id}`,
          source: side === "up" ? entry.id : name,
          target: side === "up" ? name : entry.id,
          style: getFlowEdgeStyle(
            stroke,
            entry.dashed ? { "stroke-dasharray": "4 4", opacity: 0.6 } : {},
          ),
        });
      });
    };

    if (showUp) {
      placeColumn(upEntries, "up");
      nodes.push({
        id: "label-up",
        type: "label",
        position: { x: COLUMN_X.up, y: -36 },
        data: { label: "Depends on" },
      });
    }

    if (showDown) {
      placeColumn(downEntries, "down");
      nodes.push({
        id: "label-down",
        type: "label",
        position: { x: COLUMN_X.down, y: -36 },
        data: { label: "Used by" },
      });
    }

    if (item) {
      nodes.push(
        {
          id: name,
          type: "focus",
          position: { x: COLUMN_X.focus, y: (totalHeight - focusHeight) / 2 },
          data: { title: item.title, type: item.type, files: item.files },
        },
        {
          id: "label-focus",
          type: "label",
          position: { x: COLUMN_X.focus, y: -36 },
          data: { label: "Component · installs to", width: FLOW_FOCUS_WIDTH },
        },
      );
    }

    return { nodes, edges, height: Math.max(280, totalHeight + 120) };
  }
</script>

<script lang="ts">
  import { SvelteFlow } from "@xyflow/svelte";
  import SearchIcon from "@lucide/svelte/icons/search";

  import { Input } from "$lib/components/ui/input/index.js";
  import { getFlowRole } from "$lib/registry/flow-graph";
  import { cn } from "$lib/utils";

  import {
    flowCanvasDefaults,
    flowSegmentClassName,
    flowSegmentedClassName,
    flowSidebarScrollClassName,
    flowToolbarClassName,
    flowToolbarLabelClassName,
    type FlowViewProps,
  } from "./flow-canvas";
  import FlowFocusNodeView from "./flow-focus-node.svelte";
  import FlowItemNodeView from "./flow-item-node.svelte";
  import FlowItemPicker from "./flow-item-picker.svelte";
  import FlowLabelNodeView from "./flow-label-node.svelte";
  import { getRegistryTypeLabel } from "./flow-nodes";

  let { graph, selected, onSelect, colorMode, header }: FlowViewProps = $props();

  const nodeTypes = {
    item: FlowItemNodeView,
    label: FlowLabelNodeView,
    focus: FlowFocusNodeView,
  };

  let query = $state("");
  let direction = $state<LanesDirection>("both");

  let item = $derived(graph.items.get(selected));
  let lanes = $derived(buildLanes(graph, selected, direction));
  let normalizedQuery = $derived(query.trim().toLowerCase());
  let visibleNames = $derived(
    graph.names.filter((name) => {
      const title = graph.items.get(name)?.title.toLowerCase() ?? "";

      return name.includes(normalizedQuery) || title.includes(normalizedQuery);
    }),
  );
  let stats = $derived(
    item
      ? ([
          [
            "Depends on",
            getLocalDependencies(graph, selected).length + item.remoteDependencies.length,
          ],
          ["Used by", getDependents(graph, selected).length],
          ["Packages", item.dependencies.length],
          ["Files", item.files.length],
        ] as const)
      : [],
  );
</script>

{#if item}
  <div
    class="grid grid-cols-[minmax(0,1fr)] gap-6 md:-mt-6 md:-ml-6 md:grid-cols-[15rem_minmax(0,1fr)]"
  >
    <aside
      class="hidden flex-col gap-3 border-r bg-muted/30 p-3 md:sticky md:top-16 md:flex md:h-[calc(100svh-4rem)] md:self-start"
    >
      <div class="relative">
        <SearchIcon
          class="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          bind:value={query}
          placeholder="Search items"
          aria-label="Search registry items"
          class="pl-8"
        />
      </div>
      <div
        class="flex items-center justify-between px-1 font-mono text-[11px] tracking-wider text-muted-foreground uppercase"
      >
        <span>Registry items</span>
        <span>{visibleNames.length}</span>
      </div>
      <div
        class="flex min-w-0 shrink-0 gap-3 overflow-x-auto overscroll-x-contain px-1 text-xs whitespace-nowrap text-muted-foreground [scrollbar-width:none]"
      >
        {#each roles as role (role)}
          <span class="inline-flex flex-none items-center gap-1.5 capitalize">
            <span class={cn("size-1.5 rounded-full", roleDotClassNames[role])}></span>
            {role}
          </span>
        {/each}
      </div>
      <nav
        aria-label="Registry items"
        class={cn(
          "-mx-1 flex min-h-0 flex-col gap-px overflow-y-auto px-1",
          flowSidebarScrollClassName,
        )}
      >
        {#each visibleNames as name (name)}
          {@const isCurrent = name === selected}
          <button
            type="button"
            aria-current={isCurrent}
            onclick={() => onSelect(name)}
            class={cn(
              "flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted",
              isCurrent && "border-border bg-card font-medium shadow-xs hover:bg-card",
            )}
          >
            <span
              class={cn(
                "size-1.5 shrink-0 rounded-full",
                roleDotClassNames[getFlowRole(graph, name)],
              )}
            ></span>
            <span class="truncate">{graph.items.get(name)?.title ?? name}</span>
            <span class="ml-auto font-mono text-[11px] text-muted-foreground">
              {getLocalDependencies(graph, name).length + getDependents(graph, name).length}
            </span>
          </button>
        {/each}
      </nav>
    </aside>

    <div class="flex min-w-0 flex-col gap-4 pb-6 md:pt-6">
      {#if header}
        <div class="mb-2">{@render header()}</div>
      {/if}
      <FlowItemPicker {graph} value={selected} onValueChange={onSelect} class="md:hidden" />

      <section
        class="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card px-5 py-4"
      >
        <div>
          <div class="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            registry:{getRegistryTypeLabel(item.type)}
          </div>
          <h2 class="mt-1 text-xl font-semibold tracking-tight">{item.title}</h2>
        </div>
        <dl class="flex gap-6 sm:gap-8">
          {#each stats as [label, value] (label)}
            <div class="text-right">
              <dt class="text-xs text-muted-foreground">{label}</dt>
              <dd class="font-mono text-2xl leading-tight">{value}</dd>
            </div>
          {/each}
        </dl>
      </section>

      <section class="overflow-hidden rounded-xl border bg-card">
        <div class={flowToolbarClassName}>
          <span class={flowToolbarLabelClassName}>
            How it flows · <span class="normal-case">click an item to trace it</span>
          </span>
          <fieldset class={flowSegmentedClassName}>
            <legend class="sr-only">Direction</legend>
            {#each directionOptions as option (option.value)}
              <button
                type="button"
                aria-pressed={direction === option.value}
                onclick={() => (direction = option.value)}
                class={flowSegmentClassName}
              >
                {option.label}
              </button>
            {/each}
          </fieldset>
        </div>
        <div class="bg-muted/30" style:height="{lanes.height}px">
          {#key `${selected}-${direction}`}
            <SvelteFlow
              {...flowCanvasDefaults}
              nodes={lanes.nodes}
              edges={lanes.edges}
              {nodeTypes}
              {colorMode}
              fitView
              fitViewOptions={{ padding: 0.15, maxZoom: 1 }}
              zoomOnScroll={false}
              preventScrolling={false}
              onnodeclick={({ node }) => {
                if (node.type === "item" && node.data.target) {
                  onSelect(node.data.target);
                }
              }}
            />
          {/key}
        </div>
      </section>
    </div>
  </div>
{/if}
