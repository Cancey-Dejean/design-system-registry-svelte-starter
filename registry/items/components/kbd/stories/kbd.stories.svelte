<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SearchIcon from '@lucide/svelte/icons/search';
	import Button from '../../button/button.svelte';
	import * as InputGroup from '../../input-group/index.js';
	import * as Kbd from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Kbd',
		decorators: [() => StoryWrapper]
	});
</script>

<Story name="Default">
	<div class="flex flex-col items-center gap-4">
		<Kbd.Group>
			<Kbd.Root>⌘</Kbd.Root>
			<Kbd.Root>⇧</Kbd.Root>
			<Kbd.Root>⌥</Kbd.Root>
			<Kbd.Root>⌃</Kbd.Root>
		</Kbd.Group>
		<Kbd.Group>
			<Kbd.Root>Ctrl</Kbd.Root>
			<span>+</span>
			<Kbd.Root>B</Kbd.Root>
		</Kbd.Group>
	</div>
</Story>

<Story name="Group">
	<div class="flex flex-col items-center gap-4">
		<p class="text-sm text-muted-foreground">
			Use
			<Kbd.Group>
				<Kbd.Root>Ctrl + B</Kbd.Root>
				<Kbd.Root>Ctrl + K</Kbd.Root>
			</Kbd.Group>
			to open the command palette
		</p>
	</div>
</Story>

<Story name="Button">
	<div class="flex flex-wrap items-center gap-4">
		<Button variant="outline" size="sm" class="pe-2">
			Accept <Kbd.Root>⏎</Kbd.Root>
		</Button>
		<Button variant="outline" size="sm" class="pe-2">
			Cancel <Kbd.Root>Esc</Kbd.Root>
		</Button>
	</div>
</Story>

<Story name="Input Group">
	<div class="flex w-full max-w-xs flex-col gap-6">
		<InputGroup.Root>
			<InputGroup.Input placeholder="Search..." />
			<InputGroup.Addon>
				<SearchIcon />
			</InputGroup.Addon>
			<InputGroup.Addon align="inline-end">
				<Kbd.Root>⌘</Kbd.Root>
				<Kbd.Root>K</Kbd.Root>
			</InputGroup.Addon>
		</InputGroup.Root>
	</div>
</Story>
