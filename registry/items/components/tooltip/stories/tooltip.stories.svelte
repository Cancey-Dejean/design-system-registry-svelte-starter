<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { buttonVariants } from '$lib/components/ui/button.variants.js';
	import * as Tooltip from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Tooltip',
		decorators: [() => StoryWrapper]
	});
</script>

<script lang="ts">
	let open = $state(false);
</script>

<Story name="Default">
	<div class="flex min-h-24 items-center justify-center">
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger class={buttonVariants({ variant: 'outline' })}>Hover</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Add to library</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</div>
</Story>

<Story name="Sides">
	<div class="flex min-h-40 flex-wrap items-center justify-center gap-4">
		<Tooltip.Provider>
			{#each ['top', 'right', 'bottom', 'left'] as side (side)}
				<Tooltip.Root>
					<Tooltip.Trigger class={buttonVariants({ variant: 'outline' })}>
						{side}
					</Tooltip.Trigger>
					<Tooltip.Content {side}>
						<p>Side: {side}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			{/each}
		</Tooltip.Provider>
	</div>
</Story>

<Story name="Instant">
	<div class="flex min-h-24 items-center justify-center">
		<Tooltip.Provider delayDuration={0}>
			<Tooltip.Root>
				<Tooltip.Trigger class={buttonVariants({ variant: 'outline' })}>
					Instant tooltip
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Opens with no delay</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</div>
</Story>

<Story name="Controlled">
	<div class="flex min-h-24 flex-col items-center justify-center gap-3">
		<p class="text-sm text-muted-foreground">Open: {open ? 'yes' : 'no'}</p>
		<Tooltip.Provider>
			<Tooltip.Root bind:open>
				<Tooltip.Trigger class={buttonVariants({ variant: 'outline' })}>
					Focus or hover
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Controlled via bind:open</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</div>
</Story>

<Story name="With Kbd Hint">
	<div class="flex min-h-24 items-center justify-center">
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger class={buttonVariants({ variant: 'outline' })}>Save</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Save changes</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</div>
</Story>
