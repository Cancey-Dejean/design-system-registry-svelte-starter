<script lang="ts">
	import type { LinkProps } from './link-text.types';
	import { cn } from '$lib/utils.js';
	import { linkTextVariants } from './link-text.variants';

	let {
		class: className,
		as = 'a',
		tone = 'default',
		underline = 'hover',
		size = 'md',
		external = false,
		href,
		ref = $bindable(null),
		children,
		...restProps
	}: LinkProps = $props();
</script>

<svelte:element
	this={as}
	bind:this={ref}
	data-slot="link"
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer' : undefined}
	class={cn(linkTextVariants({ tone, underline, size }), className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
