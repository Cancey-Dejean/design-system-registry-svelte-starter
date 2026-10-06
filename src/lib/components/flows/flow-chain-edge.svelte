<script lang="ts" module>
  import type { Edge } from "@xyflow/svelte";

  export type ChainEdge = Edge<{ turnY?: number }, "chain">;
</script>

<script lang="ts">
  import { BaseEdge, getSmoothStepPath, type EdgeProps } from "@xyflow/svelte";

  let {
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style,
    markerEnd,
    data,
  }: EdgeProps<ChainEdge> = $props();

  let path = $derived(
    getSmoothStepPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourcePosition,
      targetPosition,
      borderRadius: 12,
      centerY: data?.turnY !== undefined && data.turnY > sourceY ? data.turnY : undefined,
    })[0],
  );
</script>

<BaseEdge {path} {style} {markerEnd} />
