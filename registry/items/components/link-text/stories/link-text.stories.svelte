<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LinkText from '../link-text.svelte';
	import { LINK_TEXT_SIZES, LINK_TEXT_TONES, LINK_TEXT_UNDERLINES } from '../link-text.variants';


	const { Story } = defineMeta({
		title: 'Components/Link Text',
		component: LinkText,
		parameters: { centered: true },
		argTypes: {
			tone: {
				description: 'The color tone of the link',
				control: 'select',
				options: LINK_TEXT_TONES
			},
			underline: {
				description: 'The underline behavior',
				control: 'select',
				options: LINK_TEXT_UNDERLINES
			},
			size: {
				description: 'The font size of the link',
				control: 'select',
				options: LINK_TEXT_SIZES
			},
			external: {
				description: 'Opens in a new tab with rel noopener noreferrer',
				control: 'boolean'
			},
			class: { control: false },
			as: { table: { disable: true } }
		},
		args: {
			href: '#',
			tone: 'default',
			underline: 'hover',
			size: 'md'
		}
	});
</script>

<Story name="Default">

		Click here

</Story>

<Story name="Tones" argTypes={{ tone: { table: { disable: true } } }}>
	<div class="flex flex-col gap-4">
		{#each LINK_TEXT_TONES as tone (tone)}
			<LinkText href="#" {tone}>Tone: {tone}</LinkText>
		{/each}
	</div>
</Story>

<Story name="Underlines" argTypes={{ underline: { table: { disable: true } } }}>
	<div class="flex flex-col gap-4">
		{#each LINK_TEXT_UNDERLINES as underline (underline)}
			<LinkText href="#" {underline}>Underline: {underline}</LinkText>
		{/each}
	</div>
</Story>

<Story name="Sizes" argTypes={{ size: { table: { disable: true } } }}>
	<div class="flex flex-col gap-4">
		{#each LINK_TEXT_SIZES as size (size)}
			<LinkText href="#" {size}>Size: {size}</LinkText>
		{/each}
	</div>
</Story>

<Story name="External" args={{ external: true, href: 'https://example.com' }}>

		External link

</Story>
