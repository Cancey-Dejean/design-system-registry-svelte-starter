<script lang="ts">
  import type { NodeProps } from "@xyflow/svelte";

  import { FLOW_ITEM_WIDTH, type FlowLabelNode } from "./flow-nodes";

  let { data }: NodeProps<FlowLabelNode> = $props();
</script>

<div
  style:width="{data.width ?? FLOW_ITEM_WIDTH}px"
  class="pointer-events-none font-mono text-[11px] tracking-wider text-muted-foreground uppercase"
>
  {data.label}
</div>
