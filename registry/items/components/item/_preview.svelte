<script lang="ts">
	import Button from '../button/button.svelte';
	import * as Item from './index.js';
</script>

<div class="flex w-full max-w-md flex-col gap-6">
	<Item.Root variant="outline">
		<Item.Content>
			<Item.Title>Basic Item</Item.Title>
			<Item.Description>A simple item with title and description.</Item.Description>
		</Item.Content>
		<Item.Actions>
			<Button variant="outline" size="sm">Action</Button>
		</Item.Actions>
	</Item.Root>
</div>
