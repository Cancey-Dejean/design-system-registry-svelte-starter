<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { AspectRatio } from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Aspect Ratio',
		component: AspectRatio,
		decorators: [() => StoryWrapper],
		argTypes: {
			ratio: {
				control: 'number',
				description: 'The desired width-to-height aspect ratio',
				table: {
					defaultValue: { summary: '1' }
				}
			},
			ref: {
				control: false,
				description: 'The ref of the aspect ratio root'
			},
			class: { control: 'text' }
		},
		args: {
			ratio: 16 / 9,
			class: 'bg-muted overflow-hidden rounded-lg'
		}
	});
</script>

{#snippet media(alt = 'Gray by Drew Beamer')}
	<img
		src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
		{alt}
		class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
	/>
{/snippet}

<Story name="Default">
	<div class="w-full max-w-md">
		<AspectRatio ratio={16 / 9} class="overflow-hidden rounded-lg bg-muted">
			{@render media()}
		</AspectRatio>
	</div>
</Story>

<Story name="Square">
	<div class="w-full max-w-xs">
		<AspectRatio ratio={1} class="overflow-hidden rounded-lg bg-muted">
			{@render media('Square crop')}
		</AspectRatio>
	</div>
</Story>

<Story name="Portrait">
	<div class="w-full max-w-xs">
		<AspectRatio ratio={9 / 16} class="overflow-hidden rounded-lg bg-muted">
			{@render media('Portrait crop')}
		</AspectRatio>
	</div>
</Story>

<Story name="Video">
	<div class="m-auto w-full max-w-lg">
		<AspectRatio ratio={16 / 9} class="overflow-hidden rounded-lg bg-muted">
			{@render media('Video frame')}
		</AspectRatio>
	</div>
</Story>
