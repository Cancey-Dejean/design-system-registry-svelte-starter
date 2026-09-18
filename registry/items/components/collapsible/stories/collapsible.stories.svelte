<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import { buttonVariants } from '../../button/button.variants.js';
	import * as Collapsible from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Collapsible',
		decorators: [() => StoryWrapper]
	});
</script>

<script lang="ts">
	let open = $state(false);
	let defaultOpen = $state(true);
</script>

<Story name="Default">
	<div class="w-[350px]">
		<Collapsible.Root class="space-y-2">
			<div class="flex items-center justify-between space-x-4 px-4">
				<h4 class="text-sm font-semibold">@huntabyte starred 3 repositories</h4>
				<Collapsible.Trigger
					class={buttonVariants({ variant: 'ghost', size: 'sm', class: 'w-9 p-0' })}
				>
					<ChevronsUpDownIcon />
					<span class="sr-only">Toggle</span>
				</Collapsible.Trigger>
			</div>
			<div class="rounded-md border px-4 py-3 font-mono text-sm">@huntabyte/bits-ui</div>
			<Collapsible.Content class="space-y-2">
				<div class="rounded-md border px-4 py-3 font-mono text-sm">@melt-ui/melt-ui</div>
				<div class="rounded-md border px-4 py-3 font-mono text-sm">@sveltejs/svelte</div>
			</Collapsible.Content>
		</Collapsible.Root>
	</div>
</Story>

<Story name="Controlled">
	<div class="w-[350px] space-y-4">
		<Collapsible.Root bind:open class="space-y-2">
			<div class="flex items-center justify-between space-x-4 px-4">
				<h4 class="text-sm font-semibold">
					Status: {open ? 'open' : 'closed'}
				</h4>
				<Collapsible.Trigger class={buttonVariants({ variant: 'outline', size: 'sm' })}>
					Toggle
				</Collapsible.Trigger>
			</div>
			<Collapsible.Content class="rounded-md border px-4 py-3 text-sm">
				Yes. Free to use for personal and commercial projects. No attribution required.
			</Collapsible.Content>
		</Collapsible.Root>
	</div>
</Story>

<Story name="Default Open">
	<div class="w-[350px]">
		<Collapsible.Root bind:open={defaultOpen} class="space-y-2">
			<div class="flex items-center justify-between space-x-4 px-4">
				<h4 class="text-sm font-semibold">Can I use this in my project?</h4>
				<Collapsible.Trigger
					class={buttonVariants({ variant: 'ghost', size: 'sm', class: 'w-9 p-0' })}
				>
					<ChevronsUpDownIcon />
					<span class="sr-only">Toggle</span>
				</Collapsible.Trigger>
			</div>
			<Collapsible.Content class="rounded-md border px-4 py-3 text-sm">
				Yes. Free to use for personal and commercial projects. No attribution required.
			</Collapsible.Content>
		</Collapsible.Root>
	</div>
</Story>
