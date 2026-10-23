<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<span
	{@attach (element) => { ref = element; return () => { ref = null; }; }}
	data-slot="trace-title"
	class={cn("min-w-0 truncate motion-reduce:shimmer-none", className)}
	{...restProps}
>
	{@render children?.()}
</span>

<style>
  :global([data-status="running"]) [data-slot="trace-title"] {
    background-image: linear-gradient(90deg, currentColor 35%, var(--color-foreground) 50%, currentColor 65%);
    background-size: 200% 100%;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: trace-shimmer 2s linear infinite;
  }
  @keyframes trace-shimmer {
    from { background-position: 100% 0; }
    to { background-position: -100% 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    :global([data-status="running"]) [data-slot="trace-title"] {
      animation: none;
      background: none;
      -webkit-text-fill-color: currentColor;
    }
  }
</style>
