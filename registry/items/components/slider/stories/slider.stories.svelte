<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Slider } from '../index.js';


	const { Story } = defineMeta({
		title: 'Components/Slider',
		component: Slider,
		parameters: { centered: true }
	});
</script>

<script lang="ts">
	let single = $state(50);
	let stepped = $state(25);
	let range = $state([25, 75]);
</script>

<Story asChild name="Default">
	<div class="flex w-full max-w-md flex-col gap-2">
		<p class="text-sm text-muted-foreground">Value: {single}</p>
		<Slider type="single" bind:value={single} max={100} step={1} class="w-full" />
	</div>
</Story>

<Story asChild name="Stepped">
	<div class="flex w-full max-w-md flex-col gap-2">
		<p class="text-sm text-muted-foreground">Value: {stepped} (step 5)</p>
		<Slider type="single" bind:value={stepped} max={100} step={5} class="w-full" />
	</div>
</Story>

<Story asChild name="Disabled">
	<div class="flex w-full max-w-md items-center">
		<Slider type="single" value={40} max={100} step={1} disabled class="w-full" />
	</div>
</Story>

<Story asChild name="Vertical">
	<div class="flex h-48 items-center justify-center">
		<Slider
			type="single"
			bind:value={single}
			orientation="vertical"
			max={100}
			step={1}
			class="h-full"
		/>
	</div>
</Story>

<Story asChild name="Range">
	<div class="flex w-full max-w-md flex-col gap-2">
		<p class="text-sm text-muted-foreground">
			Range: {range[0]} – {range[1]}
		</p>
		<Slider type="multiple" bind:value={range} max={100} step={1} class="w-full" />
	</div>
</Story>
