<script lang="ts">
 import { codeBlockVariants, type CodeBlockVariant, type CodeBlockSize } from "./code-block.variants.js";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		size = "default",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: CodeBlockVariant;
		size?: CodeBlockSize;
	} = $props();
</script>

<div
	{@attach (element) => { ref = element; return () => { ref = null; }; }}
	data-slot="code-block"
	data-variant={variant}
	data-size={size}
	class={cn(codeBlockVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
