<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Separator } from '../index.js';


	const { Story } = defineMeta({
		title: 'Components/Separator',
		component: Separator,
		parameters: { centered: true },
		argTypes: {
			orientation: {
				control: 'select',
				options: ['horizontal', 'vertical'],
				description: 'The orientation of the separator',
				table: {
					defaultValue: { summary: 'horizontal' }
				}
			},
			ref: {
				control: false,
				description: 'The ref of the separator'
			},
			class: { control: 'text' }
		},
		args: {
			orientation: 'horizontal'
		}
	});
</script>

<Story name="Default">
	<div class="w-full max-w-sm">
		<div class="space-y-1">
			<h4 class="text-sm leading-none font-medium">Bits UI Primitives</h4>
			<p class="text-sm text-muted-foreground">An open-source UI component library.</p>
		</div>
		<Separator class="my-4" />
		<div class="flex h-5 items-center space-x-4 text-sm">
			<div>Blog</div>
			<Separator orientation="vertical" />
			<div>Docs</div>
			<Separator orientation="vertical" />
			<div>Source</div>
		</div>
	</div>
</Story>

<Story name="Horizontal">
	<div class="w-full max-w-sm space-y-4">
		<p class="text-sm">Content above the separator.</p>
		<Separator />
		<p class="text-sm">Content below the separator.</p>
	</div>
</Story>

<Story name="Vertical">
	<div class="flex h-5 items-center space-x-4 text-sm">
		<div>Blog</div>
		<Separator orientation="vertical" />
		<div>Docs</div>
		<Separator orientation="vertical" />
		<div>Source</div>
	</div>
</Story>
