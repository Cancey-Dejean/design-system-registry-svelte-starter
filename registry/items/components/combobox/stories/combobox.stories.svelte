<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CheckIcon from '@lucide/svelte/icons/check';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import CircleIcon from '@lucide/svelte/icons/circle';
	import CircleArrowUpIcon from '@lucide/svelte/icons/circle-arrow-up';
	import CircleCheckIcon from '@lucide/svelte/icons/circle-check';
	import CircleHelpIcon from '@lucide/svelte/icons/circle-help';
	import CircleXIcon from '@lucide/svelte/icons/circle-x';
	import { useId } from 'bits-ui';
	import { type Component, tick } from 'svelte';
	import { buttonVariants } from '../../button/button.variants.js';
	import Button from '../../button/button.svelte';
	import * as Command from '../../command/index.js';
	import * as Popover from '../../popover/index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';
	import { cn } from '$lib/utils.js';

	const { Story } = defineMeta({
		title: 'Components/Combobox',
		decorators: [() => StoryWrapper]
	});
</script>

<script lang="ts">
	const frameworks = [
		{ value: 'sveltekit', label: 'SvelteKit' },
		{ value: 'next.js', label: 'Next.js' },
		{ value: 'nuxt.js', label: 'Nuxt.js' },
		{ value: 'remix', label: 'Remix' },
		{ value: 'astro', label: 'Astro' }
	];

	type Status = {
		value: string;
		label: string;
		icon: Component;
	};

	const statuses: Status[] = [
		{ value: 'backlog', label: 'Backlog', icon: CircleHelpIcon },
		{ value: 'todo', label: 'Todo', icon: CircleIcon },
		{ value: 'in progress', label: 'In Progress', icon: CircleArrowUpIcon },
		{ value: 'done', label: 'Done', icon: CircleCheckIcon },
		{ value: 'canceled', label: 'Canceled', icon: CircleXIcon }
	];

	let open = $state(false);
	let value = $state('');
	let triggerRef = $state<HTMLButtonElement>(null!);
	let statusOpen = $state(false);
	let statusValue = $state('');

	const selectedValue = $derived(frameworks.find((f) => f.value === value)?.label);
	const selectedStatus = $derived(statuses.find((s) => s.value === statusValue));
	const statusTriggerId = useId();

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}

	function closeStatusAndFocusTrigger(triggerId: string) {
		statusOpen = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Story name="Default">
	<Popover.Root bind:open>
		<Popover.Trigger bind:ref={triggerRef}>
			{#snippet child({ props })}
				<Button
					{...props}
					variant="outline"
					class="w-[200px] justify-between"
					role="combobox"
					aria-expanded={open}
				>
					{selectedValue || 'Select a framework...'}
					<ChevronsUpDownIcon class="opacity-50" />
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-[200px] p-0">
			<Command.Root>
				<Command.Input placeholder="Search framework..." />
				<Command.List>
					<Command.Empty>No framework found.</Command.Empty>
					<Command.Group>
						{#each frameworks as framework (framework.value)}
							<Command.Item
								value={framework.value}
								onSelect={() => {
									value = framework.value;
									closeAndFocusTrigger();
								}}
							>
								<CheckIcon class={cn(value !== framework.value && 'text-transparent')} />
								{framework.label}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
</Story>

<Story name="Status">
	<div class="flex items-center space-x-4">
		<p class="text-sm text-muted-foreground">Status</p>
		<Popover.Root bind:open={statusOpen}>
			<Popover.Trigger
				id={statusTriggerId}
				class={buttonVariants({
					variant: 'outline',
					size: 'sm',
					class: 'w-[150px] justify-start'
				})}
			>
				{#if selectedStatus}
					{@const Icon = selectedStatus.icon}
					<Icon class="me-2 size-4 shrink-0" />
					{selectedStatus.label}
				{:else}
					+ Set status
				{/if}
			</Popover.Trigger>
			<Popover.Content class="w-[200px] p-0" side="right" align="start">
				<Command.Root>
					<Command.Input placeholder="Change status..." />
					<Command.List>
						<Command.Empty>No results found.</Command.Empty>
						<Command.Group>
							{#each statuses as status (status.value)}
								<Command.Item
									value={status.value}
									onSelect={() => {
										statusValue = status.value;
										closeStatusAndFocusTrigger(statusTriggerId);
									}}
								>
									{@const Icon = status.icon}
									<Icon
										class={cn(
											'me-2 size-4',
											status.value !== selectedStatus?.value && 'text-foreground/40'
										)}
									/>
									<span>{status.label}</span>
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.List>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
	</div>
</Story>
