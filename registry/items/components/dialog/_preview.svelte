<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button.variants.js';
	import Button from '../button/button.svelte';
	import { Input } from '../input/index.js';
	import * as Dialog from './index.js';
</script>

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
					<label for="name-preview" class="text-sm font-medium">Name</label>
					<Input id="name-preview" name="name" value="Pedro Duarte" />
				</div>
				<div class="grid gap-3">
					<label for="username-preview" class="text-sm font-medium">Username</label>
					<Input id="username-preview" name="username" value="@peduarte" />
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
