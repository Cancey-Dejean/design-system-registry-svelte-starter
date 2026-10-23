<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Spinner from '../spinner.svelte';


	const { Story } = defineMeta({
		title: 'Components/Spinner',
		component: Spinner,
		parameters: { centered: true },
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
