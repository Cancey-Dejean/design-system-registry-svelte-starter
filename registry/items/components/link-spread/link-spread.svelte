<script lang="ts">
	import type { LinkSpreadProps } from './link-spread.types';
	import { cn } from '$lib/utils.js';

	let { class: className, newTab = false, href, target, ...restProps }: LinkSpreadProps = $props();
</script>

<a
	data-slot="link-spread"
	{...restProps}
	href={href || '#'}
	class={cn(
		'absolute inset-0 z-10',
		href ? 'pointer-events-auto' : 'pointer-events-none',
		className
	)}
	target={newTab ? '_blank' : (target ?? '_self')}
></a>
