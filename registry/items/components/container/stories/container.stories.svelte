<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Container from '../container.svelte';
	import StoryWrapper from "$lib/components/utility/story-wrapper.svelte";

	const { Story } = defineMeta({
		title: 'Components/Container',
		component: Container,
		parameters: { centered: true },

		argTypes: {
			size: {
				control: 'select',
				description: 'The max-width size variant of the container',
				table: {
					defaultValue: { summary: 'base' }
				}
			},
			ref: {
				control: false,
				description: 'The ref of the container'
			}
		},
		args: {
			size: 'base'
		}
	});
</script>

<Story name="Default" args={{ size: 'base' }}>

		<StoryWrapper
			class="border-foreground-muted flex h-50 items-center justify-center rounded-2xl border border-dashed bg-background p-4 text-foreground dark:bg-transparent dark:text-white"
			>Container</StoryWrapper
		>

</Story>
