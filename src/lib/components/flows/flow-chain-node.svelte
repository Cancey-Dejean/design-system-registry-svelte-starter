<script lang="ts">
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";
  import SlidersHorizontalIcon from "@lucide/svelte/icons/sliders-horizontal";

  import { cn } from "$lib/utils";

  import { getFlowChainContext } from "./flow-chain-context.svelte";
  import {
    CHAIN_TITLE_CENTER,
    FLOW_CHAIN_WIDTH,
    getFlowIcon,
    hiddenHandleStyle,
    splitFilePath,
    type FlowChainNode,
  } from "./flow-nodes";

  let { id, data }: NodeProps<FlowChainNode> = $props();

  const chain = getFlowChainContext();

  let Icon = $derived(getFlowIcon(data.icon));
  let isRoot = $derived(data.variant === "root");
  let isHot = $derived(chain?.hot === id);
</script>

<div
  style:width="{FLOW_CHAIN_WIDTH}px"
  class={cn(
    "rounded-xl border bg-card text-[13px] shadow-xs transition-[box-shadow,border-color] duration-150",
    isRoot && "border-primary bg-primary font-mono text-xs text-primary-foreground",
    data.variant === "remote" && "border-dashed",
    data.variant === "sink" && "bg-muted",
    data.target && "cursor-pointer",
    isHot && "border-foreground ring-3 ring-foreground/10",
  )}
>
  <Handle type="target" position={Position.Top} style={hiddenHandleStyle} />
  <div
    class={cn(
      "px-3 pt-2 font-mono text-[10.5px] tracking-wider uppercase",
      isRoot ? "text-primary-foreground/55" : "text-muted-foreground",
    )}
  >
    {data.kind}
  </div>
  <div class="flex items-center gap-2 px-3 pt-1 pb-2.5">
    <Icon class="size-3.5 shrink-0" strokeWidth={1.75} />
    <strong class="truncate font-semibold">{data.label}</strong>
    {#if data.step !== undefined}
      <span
        class={cn(
          "ml-auto font-mono text-[11px]",
          isRoot ? "text-primary-foreground/55" : "text-muted-foreground",
        )}
      >
        #{data.step}
      </span>
    {/if}
  </div>
  {#if data.lines.length > 0}
    <ul
      class="flex flex-col gap-0.5 border-t px-3 pt-2 pb-2.5 font-mono text-[11.5px] text-muted-foreground"
    >
      {#each data.lines as line (line)}
        <li title={line} class="truncate">
          {#if data.linesArePaths && line.includes("/")}…/{/if}<span
            class="font-medium text-foreground"
            >{data.linesArePaths ? splitFilePath(line).base : line}</span
          >
        </li>
      {/each}
    </ul>
  {/if}
  {#if data.apiSummary}
    <div
      title={data.apiSummary}
      class={cn(
        "flex items-center gap-1.5 border-t px-3 py-1.5 font-mono text-[11px]",
        isRoot ? "border-primary-foreground/15 text-primary-foreground/70" : "text-muted-foreground",
      )}
    >
      <SlidersHorizontalIcon class="size-3 shrink-0" strokeWidth={1.75} />
      <span class="truncate">{data.apiSummary}</span>
    </div>
  {/if}
  <Handle type="source" position={Position.Bottom} style={hiddenHandleStyle} />
  <Handle
    id="props"
    type="source"
    position={Position.Right}
    style="{hiddenHandleStyle}; top: {CHAIN_TITLE_CENTER}px"
  />
</div>
