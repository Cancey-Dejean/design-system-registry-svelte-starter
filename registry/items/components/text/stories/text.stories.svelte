<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Text from '../text.svelte';
	import { TEXT_ALIGNMENTS, TEXT_SIZES, TEXT_TONES, TEXT_WEIGHTS } from '../text.variants';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Text',
		component: Text,
		decorators: [() => StoryWrapper],
		argTypes: {
			size: {
				description: 'The font size of the text',
				control: 'select',
				options: TEXT_SIZES
			},
			weight: {
				description: 'The font weight of the text',
				control: 'select',
				options: TEXT_WEIGHTS
			},
			tone: {
				description: 'The color tone of the text',
				control: 'select',
				options: TEXT_TONES
			},
			align: {
				description: 'The text alignment',
				control: 'select',
				options: TEXT_ALIGNMENTS
			},
			class: { control: false },
			as: { table: { disable: true } }
		},
		args: {
			size: 'md',
			weight: 'regular',
			tone: 'default',
			align: 'left'
		}
	});
</script>

<Story name="Default">
	{#snippet children()}
		The quick brown fox jumps over the lazy dog. This is a sample paragraph to demonstrate the text
		component.
	{/snippet}
</Story>

<Story name="Sizes" argTypes={{ size: { table: { disable: true } } }}>
	<div class="flex flex-col gap-4">
		{#each TEXT_SIZES as size (size)}
			<Text {size}>Size: {size} — The quick brown fox jumps over the lazy dog.</Text>
		{/each}
	</div>
</Story>

<Story name="Weights" argTypes={{ weight: { table: { disable: true } } }}>
	<div class="flex flex-col gap-4">
		{#each TEXT_WEIGHTS as weight (weight)}
			<Text {weight}>Weight: {weight} — The quick brown fox jumps over the lazy dog.</Text>
		{/each}
	</div>
</Story>

<Story name="Tones" argTypes={{ tone: { table: { disable: true } } }}>
	<div class="flex flex-col gap-4">
		{#each TEXT_TONES as tone (tone)}
			<Text {tone}>Tone: {tone} — The quick brown fox jumps over the lazy dog.</Text>
		{/each}
	</div>
</Story>

<Story name="Alignments" argTypes={{ align: { table: { disable: true } } }}>
	<div class="flex w-full flex-col gap-4">
		{#each TEXT_ALIGNMENTS as align (align)}
			<Text {align}>
				Align: <strong>{align}</strong> — The quick brown fox jumps over the lazy dog.
			</Text>
		{/each}
	</div>
</Story>

<Story name="As Span" args={{ as: 'span' }}>
	{#snippet children()}
		This renders as a span element.
	{/snippet}
</Story>
