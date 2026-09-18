<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLImgAttributes } from 'svelte/elements';

	let {
		class: className,
		src = '/images/logo.png',
		alt = 'Main Logo',
		...restProps
	}: HTMLImgAttributes = $props();
</script>

<img {src} {alt} class={cn('h-4', className)} {...restProps} />
