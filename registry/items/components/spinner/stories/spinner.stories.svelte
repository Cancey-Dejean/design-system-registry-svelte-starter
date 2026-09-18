<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Spinner from '../spinner.svelte';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Spinner',
		component: Spinner,
		decorators: [() => StoryWrapper],
		argTypes: {
			class: { control: 'text' }
		},
		args: {
			class: ''
		}
	});
</script>

<Story name="Default" />

<Story name="Large" args={{ class: 'size-8' }} />

<Story name="Muted" args={{ class: 'size-6 text-muted-foreground' }} />
