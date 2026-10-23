<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { buttonVariants } from '../../button/button.variants.js';
	import Button from '../../button/button.svelte';
	import { Input } from '../../input/index.js';
	import { Label } from '../../label/index.js';
	import * as Sheet from '../index.js';


	const { Story } = defineMeta({
		title: 'Components/Sheet',
		parameters: { centered: true }
	});
</script>

{#snippet profileForm(prefix: string)}
	<div class="grid flex-1 auto-rows-min gap-6 px-4">
		<div class="grid gap-3">
			<Label for="{prefix}-name">Name</Label>
			<Input id="{prefix}-name" value="Pedro Duarte" />
		</div>
		<div class="grid gap-3">
			<Label for="{prefix}-username">Username</Label>
			<Input id="{prefix}-username" value="@peduarte" />
		</div>
	</div>
{/snippet}

<Story name="Default">
	<div class="flex min-h-24 items-center justify-center">
		<Sheet.Root>
			<Sheet.Trigger class={buttonVariants({ variant: 'outline' })}>Open</Sheet.Trigger>
			<Sheet.Content side="right">
				<Sheet.Header>
					<Sheet.Title>Edit profile</Sheet.Title>
					<Sheet.Description>
						Make changes to your profile here. Click save when you're done.
					</Sheet.Description>
				</Sheet.Header>
				{@render profileForm('sheet-default')}
				<Sheet.Footer>
					<Button type="submit">Save changes</Button>
					<Sheet.Close class={buttonVariants({ variant: 'outline' })}>Close</Sheet.Close>
				</Sheet.Footer>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</Story>

<Story name="Simple">
	<div class="flex min-h-24 items-center justify-center">
		<Sheet.Root>
			<Sheet.Trigger class={buttonVariants({ variant: 'outline' })}>Open</Sheet.Trigger>
			<Sheet.Content>
				<Sheet.Header>
					<Sheet.Title>Are you sure absolutely sure?</Sheet.Title>
					<Sheet.Description>
						This action cannot be undone. This will permanently delete your account and remove your
						data from our servers.
					</Sheet.Description>
				</Sheet.Header>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</Story>

<Story name="Side Top">
	<div class="flex min-h-24 items-center justify-center">
		<Sheet.Root>
			<Sheet.Trigger class={buttonVariants({ variant: 'outline' })}>Open top</Sheet.Trigger>
			<Sheet.Content side="top">
				<Sheet.Header>
					<Sheet.Title>Top sheet</Sheet.Title>
					<Sheet.Description>This sheet slides in from the top of the viewport.</Sheet.Description>
				</Sheet.Header>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</Story>

<Story name="Side Bottom">
	<div class="flex min-h-24 items-center justify-center">
		<Sheet.Root>
			<Sheet.Trigger class={buttonVariants({ variant: 'outline' })}>Open bottom</Sheet.Trigger>
			<Sheet.Content side="bottom">
				<Sheet.Header>
					<Sheet.Title>Bottom sheet</Sheet.Title>
					<Sheet.Description>
						This sheet slides in from the bottom of the viewport.
					</Sheet.Description>
				</Sheet.Header>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</Story>

<Story name="Side Left">
	<div class="flex min-h-24 items-center justify-center">
		<Sheet.Root>
			<Sheet.Trigger class={buttonVariants({ variant: 'outline' })}>Open left</Sheet.Trigger>
			<Sheet.Content side="left">
				<Sheet.Header>
					<Sheet.Title>Left sheet</Sheet.Title>
					<Sheet.Description>This sheet slides in from the left of the viewport.</Sheet.Description>
				</Sheet.Header>
				{@render profileForm('sheet-left')}
			</Sheet.Content>
		</Sheet.Root>
	</div>
</Story>

<Story name="Custom Size">
	<div class="flex min-h-24 items-center justify-center">
		<Sheet.Root>
			<Sheet.Trigger class={buttonVariants({ variant: 'outline' })}>Open wider</Sheet.Trigger>
			<Sheet.Content class="w-[400px] sm:w-[540px]" side="right">
				<Sheet.Header>
					<Sheet.Title>Are you absolutely sure?</Sheet.Title>
					<Sheet.Description>
						This action cannot be undone. This will permanently delete your account and remove your
						data from our servers.
					</Sheet.Description>
				</Sheet.Header>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</Story>
