<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Skeleton } from '../index.js';


	const { Story } = defineMeta({
		title: 'Components/Skeleton',
		component: Skeleton,
		parameters: { centered: true },
		argTypes: {
			class: { control: 'text' },
			ref: { control: false }
		},
		args: {
			class: 'h-4 w-[200px]'
		}
	});
</script>

<Story name="Default">
	<div class="flex items-center space-x-4">
		<Skeleton class="size-12 rounded-full" />
		<div class="space-y-2">
			<Skeleton class="h-4 w-[250px]" />
			<Skeleton class="h-4 w-[200px]" />
		</div>
	</div>
</Story>

<Story name="Card">
	<div class="flex flex-col space-y-3">
		<Skeleton class="h-[125px] w-[250px] rounded-xl" />
		<div class="space-y-2">
			<Skeleton class="h-4 w-[250px]" />
			<Skeleton class="h-4 w-[200px]" />
		</div>
	</div>
</Story>

<Story name="Text">
	<div class="w-full max-w-sm space-y-2">
		<Skeleton class="h-4 w-full" />
		<Skeleton class="h-4 w-[90%]" />
		<Skeleton class="h-4 w-[80%]" />
	</div>
</Story>

<Story name="Avatar">
	<div class="flex items-center gap-3">
		<Skeleton class="size-10 rounded-full" />
		<div class="space-y-1.5">
			<Skeleton class="h-3 w-24" />
			<Skeleton class="h-3 w-16" />
		</div>
	</div>
</Story>

<Story name="Circle">
	<Skeleton class="h-[20px] w-[100px] rounded-full" />
</Story>
