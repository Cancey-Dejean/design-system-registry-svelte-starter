<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { buttonVariants } from '../../button/button.variants.js';
	import * as Popover from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Popover',
		decorators: [() => StoryWrapper]
	});
</script>

<script lang="ts">
	let open = $state(false);
</script>

<Story name="Default">
	<Popover.Root>
		<Popover.Trigger class={buttonVariants({ variant: 'outline' })}>Open popover</Popover.Trigger>
		<Popover.Content class="w-80">
			<div class="grid gap-4">
				<div class="space-y-2">
					<h4 class="leading-none font-medium">Dimensions</h4>
					<p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
				</div>
			</div>
		</Popover.Content>
	</Popover.Root>
</Story>

<Story name="Controlled">
	<div class="flex flex-col items-start gap-4">
		<p class="text-sm text-muted-foreground">Status: {open ? 'open' : 'closed'}</p>
		<Popover.Root bind:open>
			<Popover.Trigger class={buttonVariants({ variant: 'outline' })}>
				Toggle popover
			</Popover.Trigger>
			<Popover.Content class="w-72">
				<p class="text-sm">Controlled open state via <code>bind:open</code>.</p>
			</Popover.Content>
		</Popover.Root>
	</div>
</Story>

<Story name="Align Start">
	<Popover.Root>
		<Popover.Trigger class={buttonVariants({ variant: 'outline' })}>Align start</Popover.Trigger>
		<Popover.Content class="w-72" align="start">
			<p class="text-sm">Content aligns to the start of the trigger.</p>
		</Popover.Content>
	</Popover.Root>
</Story>
