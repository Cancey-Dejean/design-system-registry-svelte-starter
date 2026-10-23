<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ICONS } from '../../icons.js';
	import IconGallery from '../../icon-gallery.svelte';
	import Icon from '../icon.svelte';
	import { ICON_SIZES } from '../icon.variants.js';
	import StoryWrapper from "$lib/components/utility/story-wrapper.svelte";

	const { Story } = defineMeta({
		title: 'Components/Icon',
		component: Icon,
		parameters: { centered: true },
		args: {
			icon: 'aperture',
			size: 'lg'
		},
		argTypes: {
			icon: {
				description: 'The icon to display',
				control: { type: 'select' },
				options: Object.keys(ICONS)
			},
			size: {
				description: 'The size of the icon',
				control: { type: 'select' },
				options: ICON_SIZES
			}
		}
	});
</script>

<Story name="Default" />

<Story name="All Icons">
	{#snippet template()}
		<StoryWrapper class="max-w-6xl p-8">
			<IconGallery />
		</StoryWrapper>
	{/snippet}
</Story>
