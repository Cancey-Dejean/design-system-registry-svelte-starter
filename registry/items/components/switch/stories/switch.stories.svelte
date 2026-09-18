<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Label } from '../../label/index.js';
	import { Switch } from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Switch',
		component: Switch,
		decorators: [() => StoryWrapper],
		argTypes: {
			checked: {
				control: 'boolean',
				description: 'Whether the switch is checked',
				table: {
					defaultValue: { summary: 'false' }
				}
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the switch is disabled',
				table: {
					defaultValue: { summary: 'false' }
				}
			},
			ref: { control: false },
			class: { control: 'text' }
		},
		args: {
			checked: false,
			disabled: false
		}
	});
</script>

<script lang="ts">
	let airplane = $state(false);
	let notified = $state(true);
</script>

<Story name="Default">
	<div class="flex items-center space-x-2">
		<Switch id="airplane-mode" bind:checked={airplane} />
		<Label for="airplane-mode">Airplane Mode</Label>
	</div>
</Story>

<Story name="Checked">
	<div class="flex items-center space-x-2">
		<Switch id="notifications" bind:checked={notified} />
		<Label for="notifications">Notifications</Label>
	</div>
</Story>

<Story name="Disabled">
	<div class="flex flex-col gap-4">
		<div class="flex items-center space-x-2">
			<Switch id="disabled-off" disabled />
			<Label for="disabled-off">Disabled off</Label>
		</div>
		<div class="flex items-center space-x-2">
			<Switch id="disabled-on" checked disabled />
			<Label for="disabled-on">Disabled on</Label>
		</div>
	</div>
</Story>

<Story name="With Description">
	<div class="flex items-start space-x-2">
		<Switch id="marketing" class="mt-0.5" />
		<div class="grid gap-1.5 leading-none">
			<Label for="marketing">Marketing emails</Label>
			<p class="text-sm text-muted-foreground">
				Receive emails about new products, features, and more.
			</p>
		</div>
	</div>
</Story>
