<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import * as ContextMenu from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Context Menu',
		decorators: [() => StoryWrapper]
	});
</script>

<script lang="ts">
	let showBookmarks = $state(false);
	let showFullURLs = $state(true);
	let value = $state('pedro');
</script>

{#snippet fullMenu()}
	<ContextMenu.Content class="w-52">
		<ContextMenu.Item inset>
			Back
			<ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
		</ContextMenu.Item>
		<ContextMenu.Item inset disabled>
			Forward
			<ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
		</ContextMenu.Item>
		<ContextMenu.Item inset>
			Reload
			<ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
		</ContextMenu.Item>
		<ContextMenu.Sub>
			<ContextMenu.SubTrigger inset>More Tools</ContextMenu.SubTrigger>
			<ContextMenu.SubContent class="w-48">
				<ContextMenu.Item>
					Save Page As...
					<ContextMenu.Shortcut>⇧⌘S</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Item>Create Shortcut...</ContextMenu.Item>
				<ContextMenu.Item>Name Window...</ContextMenu.Item>
				<ContextMenu.Separator />
				<ContextMenu.Item>Developer Tools</ContextMenu.Item>
			</ContextMenu.SubContent>
		</ContextMenu.Sub>
		<ContextMenu.Separator />
		<ContextMenu.CheckboxItem bind:checked={showBookmarks}>Show Bookmarks</ContextMenu.CheckboxItem>
		<ContextMenu.CheckboxItem bind:checked={showFullURLs}>Show Full URLs</ContextMenu.CheckboxItem>
		<ContextMenu.Separator />
		<ContextMenu.RadioGroup bind:value>
			<ContextMenu.Group>
				<ContextMenu.GroupHeading inset>People</ContextMenu.GroupHeading>
				<ContextMenu.RadioItem value="pedro">Pedro Duarte</ContextMenu.RadioItem>
				<ContextMenu.RadioItem value="colm">Colm Tuite</ContextMenu.RadioItem>
			</ContextMenu.Group>
		</ContextMenu.RadioGroup>
	</ContextMenu.Content>
{/snippet}

<Story name="Default">
	<ContextMenu.Root>
		<ContextMenu.Trigger
			class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
		>
			Right click here
		</ContextMenu.Trigger>
		{@render fullMenu()}
	</ContextMenu.Root>
</Story>

<Story name="Simple">
	<ContextMenu.Root>
		<ContextMenu.Trigger
			class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
		>
			Right click here
		</ContextMenu.Trigger>
		<ContextMenu.Content class="w-48">
			<ContextMenu.Item>Profile</ContextMenu.Item>
			<ContextMenu.Item>Billing</ContextMenu.Item>
			<ContextMenu.Item>Team</ContextMenu.Item>
			<ContextMenu.Item>Subscription</ContextMenu.Item>
		</ContextMenu.Content>
	</ContextMenu.Root>
</Story>

<Story name="Destructive">
	<ContextMenu.Root>
		<ContextMenu.Trigger
			class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
		>
			Right click here
		</ContextMenu.Trigger>
		<ContextMenu.Content class="w-48">
			<ContextMenu.Label>Actions</ContextMenu.Label>
			<ContextMenu.Separator />
			<ContextMenu.Item>Edit</ContextMenu.Item>
			<ContextMenu.Item>Duplicate</ContextMenu.Item>
			<ContextMenu.Separator />
			<ContextMenu.Item variant="destructive">Delete</ContextMenu.Item>
		</ContextMenu.Content>
	</ContextMenu.Root>
</Story>
