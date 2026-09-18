<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CalculatorIcon from '@lucide/svelte/icons/calculator';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import CreditCardIcon from '@lucide/svelte/icons/credit-card';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import SmileIcon from '@lucide/svelte/icons/smile';
	import UserIcon from '@lucide/svelte/icons/user';
	import { buttonVariants } from '../../button/button.variants.js';
	import * as Command from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Command',
		decorators: [() => StoryWrapper]
	});
</script>

<script lang="ts">
	let open = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
	}
</script>

<svelte:document onkeydown={handleKeydown} />

{#snippet commandItems()}
	<Command.Empty>No results found.</Command.Empty>
	<Command.Group heading="Suggestions">
		<Command.Item>
			<CalendarIcon />
			<span>Calendar</span>
		</Command.Item>
		<Command.Item>
			<SmileIcon />
			<span>Search Emoji</span>
		</Command.Item>
		<Command.Item disabled>
			<CalculatorIcon />
			<span>Calculator</span>
		</Command.Item>
	</Command.Group>
	<Command.Separator />
	<Command.Group heading="Settings">
		<Command.Item>
			<UserIcon />
			<span>Profile</span>
			<Command.Shortcut>⌘P</Command.Shortcut>
		</Command.Item>
		<Command.Item>
			<CreditCardIcon />
			<span>Billing</span>
			<Command.Shortcut>⌘B</Command.Shortcut>
		</Command.Item>
		<Command.Item>
			<SettingsIcon />
			<span>Settings</span>
			<Command.Shortcut>⌘S</Command.Shortcut>
		</Command.Item>
	</Command.Group>
{/snippet}

<Story name="Default">
	<div class="mx-auto w-full max-w-md">
		<Command.Root class="rounded-lg border shadow-md">
			<Command.Input placeholder="Type a command or search..." />
			<Command.List>
				{@render commandItems()}
			</Command.List>
		</Command.Root>
	</div>
</Story>

<Story name="Dialog">
	<div class="flex flex-col items-center gap-4">
		<p class="text-sm text-muted-foreground">
			Press
			<kbd
				class="pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 select-none"
			>
				<span class="text-xs">⌘</span>J
			</kbd>
			or click the button
		</p>
		<button
			type="button"
			class={buttonVariants({ variant: 'outline' })}
			onclick={() => (open = true)}
		>
			Open Command
		</button>
		<Command.Dialog bind:open>
			<Command.Input placeholder="Type a command or search..." />
			<Command.List>
				{@render commandItems()}
			</Command.List>
		</Command.Dialog>
	</div>
</Story>

<Story name="Simple">
	<div class="mx-auto w-full max-w-md">
		<Command.Root class="rounded-lg border shadow-md">
			<Command.Input placeholder="Type a command or search..." />
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>
				<Command.Group heading="Suggestions">
					<Command.Item>Calendar</Command.Item>
					<Command.Item>Search Emoji</Command.Item>
					<Command.Item>Calculator</Command.Item>
				</Command.Group>
				<Command.Separator />
				<Command.Group heading="Settings">
					<Command.Item>Profile</Command.Item>
					<Command.Item>Billing</Command.Item>
					<Command.Item>Settings</Command.Item>
				</Command.Group>
			</Command.List>
		</Command.Root>
	</div>
</Story>
