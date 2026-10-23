<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { buttonVariants } from '../../button/button.variants.js';
	import Button from '../../button/button.svelte';
	import { Input } from '../../input/index.js';
	import * as Dialog from '../index.js';


	const { Story } = defineMeta({
		title: 'Components/Dialog',
		parameters: { centered: true }
	});
</script>

<script lang="ts">
	let controlledOpen = $state(false);
</script>

<Story name="Default">
	<Dialog.Root>
		<form>
			<Dialog.Trigger type="button" class={buttonVariants({ variant: 'outline' })}>
				Open Dialog
			</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-[425px]">
				<Dialog.Header>
					<Dialog.Title>Edit profile</Dialog.Title>
					<Dialog.Description>
						Make changes to your profile here. Click save when you're done.
					</Dialog.Description>
				</Dialog.Header>
				<div class="grid gap-4">
					<div class="grid gap-3">
						<label for="name-1" class="text-sm font-medium">Name</label>
						<Input id="name-1" name="name" value="Pedro Duarte" />
					</div>
					<div class="grid gap-3">
						<label for="username-1" class="text-sm font-medium">Username</label>
						<Input id="username-1" name="username" value="@peduarte" />
					</div>
				</div>
				<Dialog.Footer>
					<Dialog.Close type="button" class={buttonVariants({ variant: 'outline' })}>
						Cancel
					</Dialog.Close>
					<Button type="submit">Save changes</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</form>
	</Dialog.Root>
</Story>

<Story name="Simple">
	<Dialog.Root>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Open</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Are you absolutely sure?</Dialog.Title>
				<Dialog.Description>
					This action cannot be undone. This will permanently delete your account and remove your
					data from our servers.
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
</Story>

<Story name="Custom Close Button">
	<Dialog.Root>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Share</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-md" showCloseButton={false}>
			<Dialog.Header>
				<Dialog.Title>Share link</Dialog.Title>
				<Dialog.Description>Anyone who has this link will be able to view this.</Dialog.Description>
			</Dialog.Header>
			<div class="flex items-center gap-2">
				<div class="grid flex-1 gap-2">
					<label for="link" class="sr-only">Link</label>
					<Input id="link" value="https://shadcn-svelte.com/docs/installation" readonly />
				</div>
			</div>
			<Dialog.Footer class="sm:justify-start">
				<Dialog.Close class={buttonVariants({ variant: 'secondary' })}>Close</Dialog.Close>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</Story>

<Story name="Controlled">
	<div class="flex flex-col items-center gap-4">
		<p class="text-sm text-muted-foreground">
			Dialog is {controlledOpen ? 'open' : 'closed'}
		</p>
		<button
			type="button"
			class={buttonVariants({ variant: 'outline' })}
			onclick={() => (controlledOpen = true)}
		>
			Open controlled dialog
		</button>
		<Dialog.Root bind:open={controlledOpen}>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Controlled dialog</Dialog.Title>
					<Dialog.Description>
						This dialog’s open state is driven by local state.
					</Dialog.Description>
				</Dialog.Header>
				<Dialog.Footer>
					<Dialog.Close class={buttonVariants({ variant: 'outline' })}>Close</Dialog.Close>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	</div>
</Story>
