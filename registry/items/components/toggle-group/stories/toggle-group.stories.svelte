<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import BoldIcon from '@lucide/svelte/icons/bold';
	import BookmarkIcon from '@lucide/svelte/icons/bookmark';
	import HeartIcon from '@lucide/svelte/icons/heart';
	import ItalicIcon from '@lucide/svelte/icons/italic';
	import StarIcon from '@lucide/svelte/icons/star';
	import UnderlineIcon from '@lucide/svelte/icons/underline';
	import * as ToggleGroup from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Toggle Group',
		decorators: [() => StoryWrapper]
	});
</script>

<script lang="ts">
	let single = $state('bold');
	let multi = $state<string[]>(['bold']);
</script>

<Story name="Default">
	<ToggleGroup.Root type="single">
		<ToggleGroup.Item value="bold" aria-label="Toggle bold">
			<BoldIcon />
		</ToggleGroup.Item>
		<ToggleGroup.Item value="italic" aria-label="Toggle italic">
			<ItalicIcon />
		</ToggleGroup.Item>
		<ToggleGroup.Item value="underline" aria-label="Toggle underline">
			<UnderlineIcon />
		</ToggleGroup.Item>
	</ToggleGroup.Root>
</Story>

<Story name="Outline">
	<ToggleGroup.Root variant="outline" type="multiple">
		<ToggleGroup.Item value="bold" aria-label="Toggle bold">
			<BoldIcon />
		</ToggleGroup.Item>
		<ToggleGroup.Item value="italic" aria-label="Toggle italic">
			<ItalicIcon />
		</ToggleGroup.Item>
		<ToggleGroup.Item value="underline" aria-label="Toggle underline">
			<UnderlineIcon />
		</ToggleGroup.Item>
	</ToggleGroup.Root>
</Story>

<Story name="Single Controlled">
	<div class="grid gap-3">
		<p class="text-sm text-muted-foreground">Selected: {single}</p>
		<ToggleGroup.Root type="single" bind:value={single}>
			<ToggleGroup.Item value="bold" aria-label="Toggle bold">
				<BoldIcon />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="italic" aria-label="Toggle italic">
				<ItalicIcon />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="underline" aria-label="Toggle underline">
				<UnderlineIcon />
			</ToggleGroup.Item>
		</ToggleGroup.Root>
	</div>
</Story>

<Story name="Multiple Controlled">
	<div class="grid gap-3">
		<p class="text-sm text-muted-foreground">Selected: {multi.join(', ') || 'none'}</p>
		<ToggleGroup.Root type="multiple" bind:value={multi}>
			<ToggleGroup.Item value="bold" aria-label="Toggle bold">
				<BoldIcon />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="italic" aria-label="Toggle italic">
				<ItalicIcon />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="underline" aria-label="Toggle underline">
				<UnderlineIcon />
			</ToggleGroup.Item>
		</ToggleGroup.Root>
	</div>
</Story>

<Story name="Sizes">
	<div class="flex flex-col gap-4">
		<ToggleGroup.Root size="sm" type="single">
			<ToggleGroup.Item value="bold" aria-label="Toggle bold sm">
				<BoldIcon />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="italic" aria-label="Toggle italic sm">
				<ItalicIcon />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="underline" aria-label="Toggle underline sm">
				<UnderlineIcon />
			</ToggleGroup.Item>
		</ToggleGroup.Root>
		<ToggleGroup.Root size="default" type="single">
			<ToggleGroup.Item value="bold" aria-label="Toggle bold">
				<BoldIcon />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="italic" aria-label="Toggle italic">
				<ItalicIcon />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="underline" aria-label="Toggle underline">
				<UnderlineIcon />
			</ToggleGroup.Item>
		</ToggleGroup.Root>
		<ToggleGroup.Root size="lg" type="multiple">
			<ToggleGroup.Item value="bold" aria-label="Toggle bold lg">
				<BoldIcon />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="italic" aria-label="Toggle italic lg">
				<ItalicIcon />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="underline" aria-label="Toggle underline lg">
				<UnderlineIcon />
			</ToggleGroup.Item>
		</ToggleGroup.Root>
	</div>
</Story>

<Story name="Spacing">
	<ToggleGroup.Root type="multiple" variant="outline" spacing={2} size="sm">
		<ToggleGroup.Item
			value="star"
			aria-label="Toggle star"
			class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
		>
			<StarIcon />
			Star
		</ToggleGroup.Item>
		<ToggleGroup.Item
			value="heart"
			aria-label="Toggle heart"
			class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
		>
			<HeartIcon />
			Heart
		</ToggleGroup.Item>
		<ToggleGroup.Item
			value="bookmark"
			aria-label="Toggle bookmark"
			class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
		>
			<BookmarkIcon />
			Bookmark
		</ToggleGroup.Item>
	</ToggleGroup.Root>
</Story>

<Story name="Vertical">
	<ToggleGroup.Root type="single" orientation="vertical" variant="outline">
		<ToggleGroup.Item value="bold" aria-label="Toggle bold">
			<BoldIcon />
		</ToggleGroup.Item>
		<ToggleGroup.Item value="italic" aria-label="Toggle italic">
			<ItalicIcon />
		</ToggleGroup.Item>
		<ToggleGroup.Item value="underline" aria-label="Toggle underline">
			<UnderlineIcon />
		</ToggleGroup.Item>
	</ToggleGroup.Root>
</Story>

<Story name="Disabled">
	<ToggleGroup.Root disabled type="single">
		<ToggleGroup.Item value="bold" aria-label="Toggle bold">
			<BoldIcon />
		</ToggleGroup.Item>
		<ToggleGroup.Item value="italic" aria-label="Toggle italic">
			<ItalicIcon />
		</ToggleGroup.Item>
		<ToggleGroup.Item value="underline" aria-label="Toggle underline">
			<UnderlineIcon />
		</ToggleGroup.Item>
	</ToggleGroup.Root>
</Story>
