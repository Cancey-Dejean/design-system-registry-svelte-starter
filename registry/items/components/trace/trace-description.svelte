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
	data-slot="trace-description"
	class={cn("shrink-0 text-muted-foreground/70 tabular-nums", className)}
	{...restProps}
>
	{@render children?.()}
</span>
