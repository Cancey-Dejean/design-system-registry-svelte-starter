<script lang="ts">
	import type { SpinnerProps } from './spinner.types';
	import { Loader2Icon } from '@lucide/svelte';
	import { cn } from '$lib/utils.js';

	let { class: className, ...restProps }: SpinnerProps = $props();
</script>

<Loader2Icon
	role="status"
	aria-label="Loading"
	class={cn('size-4 animate-spin', className)}
	{...restProps}
/>
