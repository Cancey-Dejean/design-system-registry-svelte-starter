<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Label } from '../../label/index.js';
	import * as RadioGroup from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Radio Group',
		decorators: [() => StoryWrapper]
	});
</script>

<script lang="ts">
	let value = $state('comfortable');
</script>

<Story name="Default">
	<RadioGroup.Root value="comfortable">
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="default" id="rg-default-1" />
			<Label for="rg-default-1">Default</Label>
		</div>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="comfortable" id="rg-default-2" />
			<Label for="rg-default-2">Comfortable</Label>
		</div>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="compact" id="rg-default-3" />
			<Label for="rg-default-3">Compact</Label>
		</div>
	</RadioGroup.Root>
</Story>

<Story name="Controlled">
	<div class="grid gap-3">
		<p class="text-sm text-muted-foreground">Selected: {value}</p>
		<RadioGroup.Root bind:value>
			<div class="flex items-center space-x-2">
				<RadioGroup.Item value="default" id="rg-ctrl-1" />
				<Label for="rg-ctrl-1">Default</Label>
			</div>
			<div class="flex items-center space-x-2">
				<RadioGroup.Item value="comfortable" id="rg-ctrl-2" />
				<Label for="rg-ctrl-2">Comfortable</Label>
			</div>
			<div class="flex items-center space-x-2">
				<RadioGroup.Item value="compact" id="rg-ctrl-3" />
				<Label for="rg-ctrl-3">Compact</Label>
			</div>
		</RadioGroup.Root>
	</div>
</Story>

<Story name="Disabled">
	<RadioGroup.Root value="option-one" disabled>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="option-one" id="rg-dis-1" />
			<Label for="rg-dis-1">Option One</Label>
		</div>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="option-two" id="rg-dis-2" />
			<Label for="rg-dis-2">Option Two</Label>
		</div>
	</RadioGroup.Root>
</Story>

<Story name="Invalid">
	<div class="grid gap-2">
		<RadioGroup.Root value="option-one" aria-invalid="true">
			<div class="flex items-center space-x-2">
				<RadioGroup.Item value="option-one" id="rg-inv-1" aria-invalid="true" />
				<Label for="rg-inv-1">Option One</Label>
			</div>
			<div class="flex items-center space-x-2">
				<RadioGroup.Item value="option-two" id="rg-inv-2" aria-invalid="true" />
				<Label for="rg-inv-2">Option Two</Label>
			</div>
		</RadioGroup.Root>
		<p class="text-sm text-destructive">Please select a valid option.</p>
	</div>
</Story>
