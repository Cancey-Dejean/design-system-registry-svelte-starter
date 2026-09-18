<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { ICONS } from '../icons.js';
	import type { IconProps } from './icon.types.js';
	import { iconVariants } from './icon.variants.js';

	let { icon, size = 'md', class: className }: IconProps = $props();

	const IconComponent = $derived(ICONS[icon]);
</script>

<IconComponent class={cn(iconVariants({ size }), className)} />
