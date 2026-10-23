<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Progress } from '../index.js';


	const { Story } = defineMeta({
		title: 'Components/Progress',
		component: Progress,
		parameters: { centered: true },
		argTypes: {
			value: {
				control: { type: 'range', min: 0, max: 100, step: 1 },
				description: 'Current progress value'
			},
			max: {
				control: 'number',
				description: 'Maximum value',
				table: {
					defaultValue: { summary: '100' }
				}
			},
			class: { control: 'text' },
			ref: { control: false }
		},
		args: {
			value: 33,
			max: 100,
			class: 'w-full max-w-md'
		}
	});
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	let animated = $state(13);

	onMount(() => {
		const timer = setTimeout(() => (animated = 66), 500);
		return () => clearTimeout(timer);
	});
</script>

<Story name="Default">
	<div class="flex w-full max-w-md items-center">
		<Progress value={33} class="w-full" />
	</div>
</Story>

<Story name="Animated">
	<div class="flex w-full max-w-md flex-col gap-2">
		<p class="text-sm text-muted-foreground">{animated}%</p>
		<Progress value={animated} max={100} class="w-full" />
	</div>
</Story>

<Story name="Empty">
	<div class="flex w-full max-w-md items-center">
		<Progress value={0} class="w-full" />
	</div>
</Story>

<Story name="Complete">
	<div class="flex w-full max-w-md items-center">
		<Progress value={100} class="w-full" />
	</div>
</Story>

<Story name="Half">
	<div class="flex w-full max-w-md items-center">
		<Progress value={50} class="w-full" />
	</div>
</Story>
