<script lang="ts">
	import type { TextProps } from './text.types';
	import { cn } from '$lib/utils.js';
	import { textVariants } from './text.variants';

	let {
		class: className,
		as = 'p',
		size = 'md',
		weight = 'regular',
		tone = 'default',
		align = 'left',
		ref = $bindable(null),
		children,
		...restProps
	}: TextProps = $props();
</script>

<svelte:element
	this={as}
	bind:this={ref}
	data-slot="text"
	class={cn(textVariants({ size, weight, tone, align }), className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
