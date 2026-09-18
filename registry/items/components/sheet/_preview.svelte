<script lang="ts">
	import Button from '../button/button.svelte';
	import { buttonVariants } from '../button/button.variants.js';
	import { Input } from '../input/index.js';
	import { Label } from '../label/index.js';
	import * as Sheet from './index.js';
</script>

<Sheet.Root>
	<Sheet.Trigger class={buttonVariants({ variant: 'outline' })}>Open</Sheet.Trigger>
	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>Edit profile</Sheet.Title>
			<Sheet.Description>
				Make changes to your profile here. Click save when you're done.
			</Sheet.Description>
		</Sheet.Header>
		<div class="grid flex-1 auto-rows-min gap-6 px-4">
			<div class="grid gap-3">
				<Label for="sheet-preview-name">Name</Label>
				<Input id="sheet-preview-name" value="Pedro Duarte" />
			</div>
			<div class="grid gap-3">
				<Label for="sheet-preview-username">Username</Label>
				<Input id="sheet-preview-username" value="@peduarte" />
			</div>
		</div>
		<Sheet.Footer>
			<Button type="submit">Save changes</Button>
			<Sheet.Close class={buttonVariants({ variant: 'outline' })}>Close</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
