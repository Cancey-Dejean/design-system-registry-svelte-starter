<script lang="ts">
	import type { HeadingProps } from './heading.types';
	import { cn } from '$lib/utils.js';
	import { headingVariants } from './heading.variants';

	let {
		class: className,
		level = 1,
		size,
		weight = 'semibold',
		tone = 'default',
		ref = $bindable(null),
		children,
		...restProps
	}: HeadingProps = $props();

	const tag = $derived(`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6');
</script>

<svelte:element
	this={tag}
	bind:this={ref}
	data-slot="heading"
	data-size={level}
	class={cn(headingVariants({ size, weight, tone }), className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
