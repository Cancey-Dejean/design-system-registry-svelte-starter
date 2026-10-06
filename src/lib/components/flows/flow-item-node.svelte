<script lang="ts">
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";

  import { cn } from "$lib/utils";

  import {
    FLOW_ITEM_WIDTH,
    getFlowIcon,
    hiddenHandleStyle,
    toneClassNames,
    type FlowItemNode,
  } from "./flow-nodes";

  let { data }: NodeProps<FlowItemNode> = $props();

  let Icon = $derived(data.icon ? getFlowIcon(data.icon) : undefined);
</script>

<div
  title={data.title}
  style:width="{FLOW_ITEM_WIDTH}px"
  class={cn(
    "flex h-9.5 items-center gap-2 rounded-lg border px-3 text-[13px] shadow-xs transition-[opacity,background-color,border-color,translate] duration-150",
    toneClassNames[data.tone],
    data.target && "cursor-pointer hover:-translate-y-px hover:border-ring",
  )}
>
  <Handle type="target" position={Position.Left} style={hiddenHandleStyle} />
  {#if Icon}
    <Icon class="size-3.5 shrink-0" strokeWidth={1.75} />
  {/if}
  <span class="truncate">{data.label}</span>
  {#if data.meta}
    <span
      class={cn(
        "ml-auto shrink-0 font-mono text-[11px]",
        data.tone === "focus" ? "text-primary-foreground/60" : "text-muted-foreground",
      )}
    >
      {data.meta}
    </span>
  {/if}
  <Handle type="source" position={Position.Right} style={hiddenHandleStyle} />
</div>
