<script lang="ts" module>
  import type { Edge } from "@xyflow/svelte";
  import {
    getDependents,
    getFlowLayers,
    getInstallStepId,
    getLocalDependencies,
    type RegistryFlowGraph,
    type RegistryFlowInstallStep,
  } from "$lib/registry/flow-graph";

  import { getFlowEdgeStyle } from "./flow-canvas";
  import type { ChainEdge } from "./flow-chain-edge.svelte";
  import {
    FLOW_CHAIN_WIDTH,
    FLOW_PROP_WIDTH,
    estimateChainNodeHeight,
    estimatePropNodeHeight,
    flowColors,
    getApiSummary,
    getRegistryTypeLabel,
    type FlowChainNode,
    type FlowPropNode,
    type FlowPropNodeData,
  } from "./flow-nodes";

  type ChainMode = "installs" | "dependents";

  const modeOptions = [
    ["installs", "What it installs"],
    ["dependents", "What depends on it"],
  ] as const satisfies readonly (readonly [ChainMode, string])[];

  const ROOT_ID = "chain:root";
  const NPM_ID = "chain:npm";
  const COLUMN_GAP = FLOW_CHAIN_WIDTH + 40;
  const LAYER_GAP = 70;
  const ROW_GAP = 24;
  const MAX_ROW_NODES = 3;
  const PROP_GAP = 88;
  const PROP_STACK_GAP = 14;

  type ChainNodeSpec = FlowChainNode["data"];

  type ChainModel = {
    layers: Map<string, number>;
    specs: Map<string, ChainNodeSpec>;
    edges: Edge[];
  };

  function getItemSpec(
    graph: RegistryFlowGraph,
    name: string,
    overrides: Partial<ChainNodeSpec>,
  ): ChainNodeSpec {
    const item = graph.items.get(name);

    return {
      label: item?.title ?? name,
      icon: item?.type ?? "package",
      kind: `registry:${item ? getRegistryTypeLabel(item.type) : "item"}`,
      lines: [],
      variant: "item",
      target: name,
      apiSummary: item ? getApiSummary(item.api) : undefined,
      ...overrides,
    };
  }

  function buildInstallChain(
    graph: RegistryFlowGraph,
    name: string,
    steps: readonly RegistryFlowInstallStep[],
    packages: readonly string[],
  ): ChainModel {
    const stepNumbers = new Map(steps.map((step, index) => [getInstallStepId(step), index + 1]));
    const layers = new Map<string, number>([[ROOT_ID, 0]]);
    const specs = new Map<string, ChainNodeSpec>();
    const edges: Edge[] = [{ id: `${ROOT_ID}->${name}`, source: ROOT_ID, target: name }];

    const itemLayers = getFlowLayers(graph, name, "up");

    for (const [itemName, layer] of itemLayers) {
      layers.set(itemName, layer + 1);
    }

    for (const [itemName, itemLayer] of itemLayers) {
      const layer = itemLayer + 1;
      const item = graph.items.get(itemName);

      specs.set(
        itemName,
        getItemSpec(graph, itemName, {
          kind: `registry:${item ? getRegistryTypeLabel(item.type) : "item"} · ${itemName === name ? "requested" : "dependency"}`,
          lines: item?.files ?? [],
          linesArePaths: true,
          step: stepNumbers.get(itemName),
        }),
      );

      for (const dependency of getLocalDependencies(graph, itemName)) {
        edges.push({ id: `${itemName}->${dependency}`, source: itemName, target: dependency });
      }

      for (const dependency of item?.remoteDependencies ?? []) {
        layers.set(dependency.id, Math.max(layers.get(dependency.id) ?? 0, layer + 1));
        specs.set(dependency.id, {
          label: dependency.name,
          icon: "globe",
          kind: `remote · ${dependency.source}`,
          lines: [],
          variant: "remote",
          step: stepNumbers.get(dependency.id),
        });
        edges.push({ id: `${itemName}->${dependency.id}`, source: itemName, target: dependency.id });
      }
    }

    specs.set(ROOT_ID, {
      label: `shadcn-svelte add ${name}`,
      icon: "terminal",
      kind: "you run",
      lines: [],
      variant: "root",
    });

    if (packages.length > 0) {
      const lastLayer = Math.max(...layers.values());

      for (const [id, layer] of layers) {
        if (layer === lastLayer) {
          edges.push({
            id: `${id}->${NPM_ID}`,
            source: id,
            target: NPM_ID,
            style: getFlowEdgeStyle(flowColors.neutral, {
              "stroke-dasharray": "4 4",
              opacity: 0.6,
            }),
          });
        }
      }

      layers.set(NPM_ID, lastLayer + 1);
      specs.set(NPM_ID, {
        label: `npm install · ${packages.length}`,
        icon: "package",
        kind: "then",
        lines: packages,
        variant: "sink",
      });
    }

    return { layers, specs, edges };
  }

  function buildDependentsChain(graph: RegistryFlowGraph, name: string): ChainModel {
    const layers = getFlowLayers(graph, name, "down");
    const specs = new Map<string, ChainNodeSpec>();
    const edges: Edge[] = [];

    for (const [itemName, layer] of layers) {
      specs.set(
        itemName,
        getItemSpec(graph, itemName, {
          kind: itemName === name ? "you change" : `affected · depth ${layer}`,
          variant: itemName === name ? "root" : "item",
          target: itemName === name ? undefined : itemName,
        }),
      );

      for (const dependent of getDependents(graph, itemName)) {
        if (layers.has(dependent)) {
          edges.push({
            id: `${itemName}->${dependent}`,
            source: itemName,
            target: dependent,
            style: getFlowEdgeStyle(flowColors.down),
          });
        }
      }
    }

    return { layers, specs, edges };
  }

  type PropSpec = Omit<FlowPropNodeData, "expanded"> & { id: string };

  function getPropSpecs(graph: RegistryFlowGraph, ids: Iterable<string>): Map<string, PropSpec[]> {
    const propSpecs = new Map<string, PropSpec[]>();

    for (const owner of ids) {
      const api = graph.items.get(owner)?.api;

      if (!api) {
        continue;
      }

      const specs: PropSpec[] = api.variants.map((variant) => ({
        id: `prop:${owner}:${variant.name}`,
        owner,
        label: variant.name,
        rows: variant.options.map((option) => ({
          label: option,
          isDefault: option === variant.defaultValue,
        })),
      }));

      if (api.props.length > 0) {
        specs.push({
          id: `prop:${owner}:*`,
          owner,
          label: "props",
          rows: api.props.map((prop) => ({
            label: `${prop.name}${prop.optional ? "?" : ""}`,
            detail: prop.defaultValue === undefined ? prop.type : `= ${prop.defaultValue}`,
          })),
        });
      }

      if (specs.length > 0) {
        propSpecs.set(owner, specs);
      }
    }

    return propSpecs;
  }

  function layoutChain(
    { layers, specs, edges }: ChainModel,
    propSpecs: ReadonlyMap<string, readonly PropSpec[]> | undefined,
    expandedProps: ReadonlySet<string>,
  ) {
    const byLayer: string[][] = [];

    for (const [id, layer] of layers) {
      byLayer[layer] = [...(byLayer[layer] ?? []), id];
    }

    const columnGap = propSpecs ? COLUMN_GAP + PROP_GAP + FLOW_PROP_WIDTH : COLUMN_GAP;
    const nodes: (FlowChainNode | FlowPropNode)[] = [];
    const propEdges: Edge[] = [];
    // Turning each edge inside the gap above its target row keeps horizontal
    // runs clear of prop stacks, which make rows taller than their chain nodes.
    const turnY = new Map<string, number>();
    let y = 0;
    let gapAbove = 0;

    for (const ids of byLayer) {
      const sorted = (ids ?? []).toSorted();

      for (let start = 0; start < sorted.length; start += MAX_ROW_NODES) {
        const row = sorted.slice(start, start + MAX_ROW_NODES);
        let rowHeight = 0;

        row.forEach((id, index) => {
          const spec = specs.get(id);

          if (!spec) {
            return;
          }

          if (gapAbove > 0) {
            turnY.set(id, y - gapAbove / 2);
          }

          const x = (index - (row.length - 1) / 2) * columnGap;
          const ownProps = propSpecs?.get(id) ?? [];
          let propY = y;

          rowHeight = Math.max(
            rowHeight,
            estimateChainNodeHeight(spec.lines.length, !propSpecs && Boolean(spec.apiSummary)),
          );
          nodes.push({
            id,
            type: "chain",
            position: { x, y },
            data: propSpecs ? { ...spec, apiSummary: undefined } : spec,
          });

          for (const { id: propId, ...propData } of ownProps) {
            const expanded = expandedProps.has(propId);

            nodes.push({
              id: propId,
              type: "prop",
              position: { x: x + FLOW_CHAIN_WIDTH + PROP_GAP, y: propY },
              data: { ...propData, expanded },
            });
            propEdges.push({
              id: `${id}->${propId}`,
              source: id,
              sourceHandle: "props",
              target: propId,
              type: "default",
              style: getFlowEdgeStyle(flowColors.neutral, { opacity: 0.45 }),
            });
            propY += estimatePropNodeHeight(propData.rows.length, expanded) + PROP_STACK_GAP;
          }

          rowHeight = Math.max(rowHeight, propY - y - PROP_STACK_GAP);
        });

        gapAbove = start + MAX_ROW_NODES < sorted.length ? ROW_GAP : LAYER_GAP;
        y += rowHeight + gapAbove;
      }
    }

    return {
      nodes,
      edges: [
        ...edges.map(
          (edge): ChainEdge => ({
            style: getFlowEdgeStyle(flowColors.neutral),
            ...edge,
            type: "chain",
            data: { turnY: turnY.get(edge.target) },
          }),
        ),
        ...propEdges,
      ],
    };
  }
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { Background, Controls, SvelteFlow } from "@xyflow/svelte";
  import ArrowDownIcon from "@lucide/svelte/icons/arrow-down";
  import ListTreeIcon from "@lucide/svelte/icons/list-tree";
  import PackageIcon from "@lucide/svelte/icons/package";
  import SlidersHorizontalIcon from "@lucide/svelte/icons/sliders-horizontal";

  import { Badge } from "$registry/items/components/badge/index.js";
  import { getInstallOrder, getInstallPackages } from "$lib/registry/flow-graph";
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
  import { FlowChainState, setFlowChainContext } from "./flow-chain-context.svelte";
  import FlowChainEdgeView from "./flow-chain-edge.svelte";
  import FlowChainNodeView from "./flow-chain-node.svelte";
  import FlowInstallCommand from "./flow-install-command.svelte";
  import FlowItemPicker from "./flow-item-picker.svelte";
  import type { FlowIcon } from "./flow-nodes";
  import FlowPropNodeView from "./flow-prop-node.svelte";
  import FlowPropsPanel from "./flow-props-panel.svelte";
  import RegistryTypeIcon from "./registry-type-icon.svelte";

  let { graph, selected, onSelect, colorMode, header }: FlowViewProps = $props();

  const nodeTypes = { chain: FlowChainNodeView, prop: FlowPropNodeView };
  const edgeTypes = { chain: FlowChainEdgeView };

  let mode = $state<ChainMode>("installs");
  // Only canvas hover previews another item's props. Previewing from the
  // install list would resize the panel above it and shift the hovered row.
  let previewName = $state<string | null>(null);
  let showProps = $state(true);
  let expandedProps = $state.raw<ReadonlySet<string>>(new Set());

  const chain = setFlowChainContext(
    new FlowChainState((id) => {
      const next = new Set(expandedProps);

      if (!next.delete(id)) {
        next.add(id);
      }

      expandedProps = next;
    }),
  );

  let item = $derived(graph.items.get(selected));
  let propsItem = $derived((previewName ? graph.items.get(previewName) : undefined) ?? item);
  let steps = $derived(getInstallOrder(graph, selected));
  let packages = $derived(getInstallPackages(graph, steps));
  let model = $derived(
    mode === "installs"
      ? buildInstallChain(graph, selected, steps, packages)
      : buildDependentsChain(graph, selected),
  );
  let propSpecs = $derived(getPropSpecs(graph, model.layers.keys()));
  let propIds = $derived([...propSpecs.values()].flat().map((spec) => spec.id));
  let optionCount = $derived(
    [...propSpecs.values()].flat().reduce((total, spec) => total + spec.rows.length, 0),
  );
  let propsShown = $derived(showProps && propIds.length > 0);
  let allExpanded = $derived(propIds.length > 0 && propIds.every((id) => expandedProps.has(id)));
  let flow = $derived(layoutChain(model, propsShown ? propSpecs : undefined, expandedProps));

  let affected = $derived(
    [...model.layers]
      .filter(([name]) => name !== selected)
      .toSorted(
        ([nameA, layerA], [nameB, layerB]) => layerA - layerB || nameA.localeCompare(nameB),
      ),
  );
  let fileCount = $derived(
    steps.reduce(
      (total, step) =>
        step.kind === "item" ? total + (graph.items.get(step.name)?.files.length ?? 0) : total,
      0,
    ),
  );
  let totals = $derived<(readonly [string, number])[]>(
    mode === "installs"
      ? [
          ["Items", steps.length],
          ["Packages", packages.length],
          ["Files", fileCount],
        ]
      : [
          ["Affected", affected.length],
          ["Direct", getDependents(graph, selected).length],
          ["Max depth", Math.max(0, ...model.layers.values())],
        ],
  );

  function setAllExpanded(expanded: boolean) {
    const next = new Set(expandedProps);

    for (const id of propIds) {
      if (expanded) {
        next.add(id);
      } else {
        next.delete(id);
      }
    }

    expandedProps = next;
  }
</script>

{#snippet canvasToggle(
  pressed: boolean,
  onPressedChange: (pressed: boolean) => void,
  Icon: FlowIcon,
  label: string,
  count: number,
  disabled: boolean,
)}
  <button
    type="button"
    aria-pressed={pressed && !disabled}
    {disabled}
    onclick={() => onPressedChange(!pressed)}
    class={flowSegmentClassName}
  >
    <Icon class="size-3" strokeWidth={1.75} />
    {label}
    <span class="font-mono font-normal text-muted-foreground">{count}</span>
  </button>
{/snippet}

{#snippet stepNumber(value: number)}{value}{/snippet}

{#snippet packageNumber()}<PackageIcon class="size-3" />{/snippet}

{#snippet chainStep(
  id: string,
  number: Snippet,
  label: string,
  kind: string,
  emphasized: boolean,
  onStepSelect?: () => void,
)}
  {@const className = cn(
    "grid w-full grid-cols-[1.625rem_minmax(0,1fr)_auto] items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm",
    chain.hot === id && "bg-muted",
  )}
  {#snippet content()}
    <span
      class={cn(
        "grid size-5.5 place-items-center rounded-full border bg-card font-mono text-[11px]",
        emphasized && "border-primary bg-primary text-primary-foreground",
      )}
    >
      {@render number()}
    </span>
    <span class="truncate">{label}</span>
    <span class="font-mono text-[11px] text-muted-foreground">{kind}</span>
  {/snippet}
  <li>
    {#if onStepSelect}
      <button
        type="button"
        onclick={onStepSelect}
        onmouseenter={() => (chain.hot = id)}
        onmouseleave={() => (chain.hot = null)}
        onfocus={() => (chain.hot = id)}
        onblur={() => (chain.hot = null)}
        class={cn(className, "outline-none focus-visible:ring-3 focus-visible:ring-ring/50")}
      >
        {@render content()}
      </button>
    {:else}
      <div class={className}>{@render content()}</div>
    {/if}
  </li>
{/snippet}

{#if item}
  <div
    class="grid grid-cols-[minmax(0,1fr)] gap-6 pb-6 lg:-mt-6 lg:-ml-6 lg:grid-cols-[22rem_minmax(0,1fr)] lg:pb-0"
  >
    <aside
      class={cn(
        "flex flex-col gap-5 rounded-xl border p-5 *:shrink-0 lg:sticky lg:top-16 lg:h-[calc(100svh-4rem)] lg:self-start lg:overflow-y-auto lg:rounded-none lg:border-0 lg:border-r lg:bg-muted/30",
        flowSidebarScrollClassName,
      )}
    >
      <div class="flex flex-col gap-2">
        <span class="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          Registry item
        </span>
        <FlowItemPicker {graph} value={selected} onValueChange={onSelect} />
      </div>

      <div class="flex flex-col items-start gap-2">
        <Badge variant="outline" class="font-mono">
          <RegistryTypeIcon type={item.type} strokeWidth={1.75} />
          registry:{getRegistryTypeLabel(item.type)}
        </Badge>
        <h2 class="text-4xl leading-none font-semibold tracking-tighter">{item.title}</h2>
        <p class="text-sm text-muted-foreground">
          {mode === "installs"
            ? `Everything the CLI pulls in when someone installs ${item.title}, in order.`
            : `Every registry item affected when you change ${item.title}.`}
        </p>
      </div>

      {#if mode === "installs"}
        <FlowInstallCommand name={selected} />
      {/if}

      <dl class="grid grid-cols-3 divide-x overflow-hidden rounded-lg border">
        {#each totals as [label, value] (label)}
          <div class="flex flex-col-reverse px-3 py-2.5">
            <dt class="text-xs text-muted-foreground">{label}</dt>
            <dd class="font-mono text-xl">{value}</dd>
          </div>
        {/each}
      </dl>

      {#if propsItem}
        <FlowPropsPanel item={propsItem} previewing={propsItem.name !== selected} />
      {/if}

      <div>
        <h3 class="mb-1.5 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          {mode === "installs" ? "Install order" : "Impact"}
        </h3>
        <ol class="flex flex-col">
          {#if mode === "installs"}
            {#each steps as step, index (getInstallStepId(step))}
              {@const id = getInstallStepId(step)}
              {@const isRequested = id === selected}
              {#snippet number()}{@render stepNumber(index + 1)}{/snippet}
              {#if step.kind === "remote"}
                {@render chainStep(id, number, step.dependency.name, "remote", isRequested)}
              {:else}
                {@render chainStep(
                  id,
                  number,
                  graph.items.get(step.name)?.title ?? step.name,
                  isRequested
                    ? "requested"
                    : getRegistryTypeLabel(graph.items.get(step.name)?.type ?? "registry:item"),
                  isRequested,
                  () => onSelect(step.name),
                )}
              {/if}
            {/each}
            {#if packages.length > 0}
              {@render chainStep(
                NPM_ID,
                packageNumber,
                "npm install",
                `${packages.length} ${packages.length === 1 ? "pkg" : "pkgs"}`,
                false,
              )}
            {/if}
          {:else}
            {#snippet sourceNumber()}{@render stepNumber(0)}{/snippet}
            {@render chainStep(selected, sourceNumber, item.title, "source", true)}
            {#each affected as [name], index (name)}
              {#snippet number()}{@render stepNumber(index + 1)}{/snippet}
              {@render chainStep(
                name,
                number,
                graph.items.get(name)?.title ?? name,
                getRegistryTypeLabel(graph.items.get(name)?.type ?? "registry:item"),
                false,
                () => onSelect(name),
              )}
            {/each}
          {/if}
        </ol>
        {#if mode === "dependents" && affected.length === 0}
          <p class="mt-1 px-2 text-xs text-muted-foreground">
            Safe to change — nothing else in the registry uses {item.title}.
          </p>
        {/if}
      </div>
    </aside>

    <div class="contents lg:flex lg:h-[calc(100svh-4rem)] lg:min-w-0 lg:flex-col lg:gap-6 lg:py-6">
      {#if header}
        <div class="order-first lg:order-none">{@render header()}</div>
      {/if}
      <section
        class="flex h-[min(780px,calc(100svh-13rem))] min-h-120 flex-col overflow-hidden rounded-xl border bg-card lg:h-auto lg:min-h-0 lg:flex-1"
      >
        <div class={flowToolbarClassName}>
          <span class={cn(flowToolbarLabelClassName, "inline-flex items-center gap-1.5")}>
            <ArrowDownIcon class="size-3" />
            {mode === "installs" ? "Install order" : "Impact"} ·
            <span class="normal-case">
              {mode === "installs" ? "top → bottom: resolve order" : "top → bottom: blast radius"}
            </span>
          </span>
          <div class="flex flex-wrap items-center gap-2">
            <fieldset class={flowSegmentedClassName}>
              <legend class="sr-only">Flow direction</legend>
              {#each modeOptions as [value, label] (value)}
                <button
                  type="button"
                  aria-pressed={mode === value}
                  onclick={() => (mode = value)}
                  class={flowSegmentClassName}
                >
                  {label}
                </button>
              {/each}
            </fieldset>
            {#if propIds.length > 0}
              <fieldset class={flowSegmentedClassName}>
                <legend class="sr-only">Canvas details</legend>
                {@render canvasToggle(
                  showProps,
                  (pressed) => (showProps = pressed),
                  SlidersHorizontalIcon,
                  "Props",
                  propIds.length,
                  false,
                )}
                {@render canvasToggle(
                  allExpanded,
                  setAllExpanded,
                  ListTreeIcon,
                  "Options",
                  optionCount,
                  !showProps,
                )}
              </fieldset>
            {/if}
          </div>
        </div>
        <div class="min-h-0 flex-1 bg-muted/30">
          {#key `${selected}-${mode}-${propsShown}`}
            <SvelteFlow
              {...flowCanvasDefaults}
              nodes={flow.nodes}
              edges={flow.edges}
              {nodeTypes}
              {edgeTypes}
              {colorMode}
              fitView
              fitViewOptions={{ padding: { top: "24px", bottom: "24px", x: "24px" }, maxZoom: 1 }}
              onnodepointerenter={({ node }) => {
                const id = node.type === "prop" ? node.data.owner : node.id;

                chain.hot = id;
                previewName = graph.items.has(id) ? id : null;
              }}
              onnodepointerleave={() => {
                chain.hot = null;
                previewName = null;
              }}
              onnodeclick={({ node }) => {
                if (node.type === "chain" && node.data.target && node.data.target !== selected) {
                  onSelect(node.data.target);
                }
              }}
            >
              <Background gap={20} size={1.2} patternColor="var(--border)" />
              <Controls position="bottom-right" showLock={false} />
            </SvelteFlow>
          {/key}
        </div>
      </section>
    </div>
  </div>
{/if}
