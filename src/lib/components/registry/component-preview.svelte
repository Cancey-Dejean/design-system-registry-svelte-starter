<script lang="ts">
  import type { Snippet } from "svelte";
  import { DotCanvas } from "$registry/items/utilities/dot-canvas/index.js";
  let { children }: { children: Snippet } = $props();
</script>

<div
  data-slot="component-preview"
  class="relative isolate grid min-h-72 place-items-center rounded-lg border border-border bg-background p-6"
>
  <DotCanvas
    class="rounded-[inherit] mask-[radial-gradient(ellipse_at_center,transparent_20%,black_85%)]"
  />
  <div
    data-slot="component-preview-stage"
    class="relative z-1 grid min-h-60 w-full place-items-center"
  >
    {@render children()}
  </div>
</div>
