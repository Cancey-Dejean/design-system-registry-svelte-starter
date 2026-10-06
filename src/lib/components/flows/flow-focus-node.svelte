<script lang="ts">
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";
  import FileCodeIcon from "@lucide/svelte/icons/file-code";

  import {
    FLOW_FOCUS_WIDTH,
    getRegistryTypeLabel,
    hiddenHandleStyle,
    splitFilePath,
    type FlowFocusNode,
  } from "./flow-nodes";
  import RegistryTypeIcon from "./registry-type-icon.svelte";

  let { data }: NodeProps<FlowFocusNode> = $props();
</script>

<div
  style:width="{FLOW_FOCUS_WIDTH}px"
  class="flex flex-col gap-2 rounded-lg border border-primary bg-primary px-3.5 py-3 text-[13px] text-primary-foreground shadow-lg"
>
  <Handle type="target" position={Position.Left} style={hiddenHandleStyle} />
  <div class="flex items-center gap-2">
    <RegistryTypeIcon type={data.type} class="size-3.5 shrink-0" strokeWidth={1.75} />
    <strong class="truncate font-semibold">{data.title}</strong>
    <span class="ml-auto font-mono text-[11px] text-primary-foreground/60">
      {getRegistryTypeLabel(data.type)}
    </span>
  </div>
  <ul class="flex flex-col gap-1 font-mono text-[11.5px]">
    {#each data.files as file (file)}
      <li title={file} class="flex items-center gap-1.5 opacity-90">
        <FileCodeIcon class="size-3 shrink-0" strokeWidth={1.75} />
        <span class="truncate">
          <span class="opacity-50">…/</span>{splitFilePath(file).base}
        </span>
      </li>
    {/each}
  </ul>
  <Handle type="source" position={Position.Right} style={hiddenHandleStyle} />
</div>
