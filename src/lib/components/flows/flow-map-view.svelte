<script lang="ts">
  import { SvelteFlowProvider } from "@xyflow/svelte";

  import type { FlowViewProps } from "./flow-canvas";
  import FlowMapCanvas from "./flow-map-canvas.svelte";

  let props: FlowViewProps = $props();
</script>

<SvelteFlowProvider>
  <FlowMapCanvas {...props} />
</SvelteFlowProvider>
