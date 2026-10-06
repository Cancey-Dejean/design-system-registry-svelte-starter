<script lang="ts">
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
  import SlidersHorizontalIcon from "@lucide/svelte/icons/sliders-horizontal";

  import { cn } from "$lib/utils";

  import { getFlowChainContext } from "./flow-chain-context.svelte";
  import {
    FLOW_PROP_WIDTH,
    PROP_HEADER_HEIGHT,
    PROP_ROW_HEIGHT,
    hiddenHandleStyle,
    type FlowPropNode,
  } from "./flow-nodes";

  let { id, data }: NodeProps<FlowPropNode> = $props();

  const chain = getFlowChainContext();

  let isHot = $derived(chain?.hot === data.owner);
</script>

<div
  style:width="{FLOW_PROP_WIDTH}px"
  class={cn(
    "rounded-lg border bg-card font-mono text-[11.5px] shadow-xs transition-[box-shadow,border-color] duration-150",
    isHot && "border-foreground/40 ring-3 ring-foreground/5",
  )}
>
  <Handle
    type="target"
    position={Position.Left}
    style="{hiddenHandleStyle}; top: {PROP_HEADER_HEIGHT / 2}px"
  />
  <button
    type="button"
    aria-expanded={data.expanded}
    aria-controls="{id}-options"
    aria-label="{data.expanded ? 'Collapse' : 'Expand'} {data.label} options"
    onclick={() => chain?.toggleProp(id)}
    style:height="{PROP_HEADER_HEIGHT}px"
    class="nodrag flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 text-left outline-none hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50"
  >
    <SlidersHorizontalIcon class="size-3 shrink-0 text-muted-foreground" strokeWidth={1.75} />
    <span class="truncate font-medium">{data.label}</span>
    <span
      class="ml-auto rounded-full bg-muted px-1.5 text-[10.5px] text-muted-foreground tabular-nums"
    >
      {data.rows.length}
    </span>
    <ChevronRightIcon
      aria-hidden="true"
      class={cn(
        "size-3 shrink-0 text-muted-foreground transition-transform duration-150",
        data.expanded && "rotate-90",
      )}
      strokeWidth={1.75}
    />
  </button>
  {#if data.expanded}
    <ul id="{id}-options" class="pb-2">
      {#each data.rows as row, index (row.label)}
        <li
          title={row.detail ? `${row.label}: ${row.detail}` : row.label}
          style:height="{PROP_ROW_HEIGHT}px"
          class={cn(
            "relative flex items-center gap-1.5 pr-2.5 pl-8 text-muted-foreground",
            row.isDefault && "text-foreground",
          )}
        >
          <span
            aria-hidden="true"
            class="absolute top-0 left-4 h-1/2 w-2.5 rounded-bl-md border-b border-l border-muted-foreground/35"
          ></span>
          {#if index < data.rows.length - 1}
            <span
              aria-hidden="true"
              class="absolute top-1/2 bottom-0 left-4 border-l border-muted-foreground/35"
            ></span>
          {/if}
          <span
            class={cn(
              "shrink-0",
              row.isDefault && "-ml-1.5 rounded-sm bg-foreground px-1.5 font-medium text-background",
            )}
          >
            {row.label}
          </span>
          {#if row.detail}
            <span class="truncate opacity-70">{row.detail}</span>
          {/if}
          {#if row.isDefault}
            <span class="ml-auto shrink-0 text-[10px] tracking-wide text-muted-foreground">
              default
            </span>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</div>
