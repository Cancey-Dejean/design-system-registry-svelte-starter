<script lang="ts">
  import { cn } from "cn";
  import { DOT_CANVAS_PITCH, type DotCanvasProps } from "./dot-canvas.types.js";
  let { size = 24, class: className }: DotCanvasProps = $props();
</script>

<div
  aria-hidden="true"
  class={cn(
    "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)]",
    DOT_CANVAS_PITCH[size],
    className,
  )}
></div>
