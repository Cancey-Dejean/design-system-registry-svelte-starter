<!-- Imports -->
<script lang="ts" module>
	import { cn } from '$lib/utils.js';
	import type { ContainerProps } from './container.types';
	import { containerVariants } from './container.variants';
</script>

<!-- Props -->
<script lang="ts">
	let {
		class: className,
		size = 'base',
		ref = $bindable(null),
		children,
		...restProps
	}: ContainerProps = $props();
</script>

<!-- Component -->
<div
	bind:this={ref}
	data-slot="container"
	data-size={size}
	class={cn(containerVariants({ size }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
