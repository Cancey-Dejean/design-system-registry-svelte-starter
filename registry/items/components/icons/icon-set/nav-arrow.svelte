<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { SVGAttributes } from 'svelte/elements';

	let { class: className, ...restProps }: SVGAttributes<SVGSVGElement> = $props();
</script>

<svg
	aria-hidden="true"
	class={cn(className)}
	viewBox="0 0 13 13"
	width="10"
	height="10"
	{...restProps}
>
	<path d="M1 12L12.5 0.499965" stroke="currentColor" stroke-width="1" fill="none" />
	<path d="M1 0.5H12.5V12" stroke="currentColor" stroke-width="1" fill="none" />
</svg>
