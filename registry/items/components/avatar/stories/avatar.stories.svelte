<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CheckIcon from '@lucide/svelte/icons/check';
	import * as Avatar from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Avatar',
		decorators: [() => StoryWrapper]
	});
</script>

<script lang="ts">
	const people = [
		{ src: 'https://github.com/shadcn.png', alt: '@shadcn', fallback: 'CN' },
		{ src: 'https://github.com/leerob.png', alt: '@leerob', fallback: 'LR' },
		{ src: 'https://github.com/evilrabbit.png', alt: '@evilrabbit', fallback: 'ER' }
	];
</script>

<Story name="Default">
	<div class="flex items-center gap-4">
		<Avatar.Root>
			<Avatar.Image src={people[0].src} alt={people[0].alt} />
			<Avatar.Fallback>{people[0].fallback}</Avatar.Fallback>
		</Avatar.Root>
	</div>
</Story>

<Story name="Fallback">
	<div class="flex items-center gap-4">
		<Avatar.Root>
			<Avatar.Image src="/broken-image.png" alt="Broken" />
			<Avatar.Fallback>JD</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.Root>
			<Avatar.Fallback>AB</Avatar.Fallback>
		</Avatar.Root>
	</div>
</Story>

<Story name="Sizes">
	<div class="flex items-end gap-4">
		<Avatar.Root size="sm">
			<Avatar.Image src={people[0].src} alt={people[0].alt} />
			<Avatar.Fallback>{people[0].fallback}</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.Root size="default">
			<Avatar.Image src={people[0].src} alt={people[0].alt} />
			<Avatar.Fallback>{people[0].fallback}</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.Root size="lg">
			<Avatar.Image src={people[0].src} alt={people[0].alt} />
			<Avatar.Fallback>{people[0].fallback}</Avatar.Fallback>
		</Avatar.Root>
	</div>
</Story>

<Story name="Shape">
	<div class="flex items-center gap-4">
		<Avatar.Root>
			<Avatar.Image src={people[0].src} alt={people[0].alt} />
			<Avatar.Fallback>{people[0].fallback}</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.Root class="rounded-lg">
			<Avatar.Image src={people[2].src} alt={people[2].alt} />
			<Avatar.Fallback>{people[2].fallback}</Avatar.Fallback>
		</Avatar.Root>
	</div>
</Story>

<Story name="Badge">
	<div class="flex items-end gap-6">
		<Avatar.Root size="sm">
			<Avatar.Image src={people[0].src} alt={people[0].alt} />
			<Avatar.Fallback>{people[0].fallback}</Avatar.Fallback>
			<Avatar.Badge />
		</Avatar.Root>
		<Avatar.Root>
			<Avatar.Image src={people[0].src} alt={people[0].alt} />
			<Avatar.Fallback>{people[0].fallback}</Avatar.Fallback>
			<Avatar.Badge>
				<CheckIcon />
			</Avatar.Badge>
		</Avatar.Root>
		<Avatar.Root size="lg">
			<Avatar.Image src={people[0].src} alt={people[0].alt} />
			<Avatar.Fallback>{people[0].fallback}</Avatar.Fallback>
			<Avatar.Badge>
				<CheckIcon />
			</Avatar.Badge>
		</Avatar.Root>
	</div>
</Story>

<Story name="Group">
	<div class="flex flex-col gap-6">
		<Avatar.Group>
			{#each people as person (person.alt)}
				<Avatar.Root>
					<Avatar.Image src={person.src} alt={person.alt} />
					<Avatar.Fallback>{person.fallback}</Avatar.Fallback>
				</Avatar.Root>
			{/each}
		</Avatar.Group>

		<Avatar.Group>
			{#each people as person (person.alt)}
				<Avatar.Root>
					<Avatar.Image src={person.src} alt={person.alt} />
					<Avatar.Fallback>{person.fallback}</Avatar.Fallback>
				</Avatar.Root>
			{/each}
			<Avatar.GroupCount>+3</Avatar.GroupCount>
		</Avatar.Group>
	</div>
</Story>
