<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MinusIcon from '@lucide/svelte/icons/minus';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import { MediaQuery } from 'svelte/reactivity';
	import { buttonVariants } from '../../button/button.variants.js';
	import { cn } from '$lib/utils.js';
	import Button from '../../button/button.svelte';
	import * as Dialog from '../../dialog/index.js';
	import { Input } from '../../input/index.js';
	import { Label } from '../../label/index.js';
	import * as Drawer from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Drawer',
		decorators: [() => StoryWrapper]
	});

	const DRAWER_SIDES = ['top', 'right', 'bottom', 'left'] as const;
</script>

<script lang="ts">
	let goal = $state(350);
	let open = $state(false);
	const isDesktop = new MediaQuery('(min-width: 768px)');
	const id = $props.id();

	function handleClick(adjustment: number) {
		goal = Math.max(200, Math.min(400, goal + adjustment));
	}
</script>

{#snippet goalControls()}
	<div class="flex items-center justify-center space-x-2">
		<Button
			variant="outline"
			size="icon"
			class="size-8 shrink-0 rounded-full"
			onclick={() => handleClick(-10)}
			disabled={goal <= 200}
		>
			<MinusIcon />
			<span class="sr-only">Decrease</span>
		</Button>
		<div class="flex-1 text-center">
			<div class="text-7xl font-bold tracking-tighter">{goal}</div>
			<div class="text-[0.70rem] text-muted-foreground uppercase">Calories/day</div>
		</div>
		<Button
			variant="outline"
			size="icon"
			class="size-8 shrink-0 rounded-full"
			onclick={() => handleClick(10)}
			disabled={goal >= 400}
		>
			<PlusIcon />
			<span class="sr-only">Increase</span>
		</Button>
	</div>
{/snippet}

<Story name="Default">
	<Drawer.Root>
		<Drawer.Trigger class={buttonVariants({ variant: 'outline' })}>Open Drawer</Drawer.Trigger>
		<Drawer.Content>
			<div class="mx-auto w-full max-w-sm">
				<Drawer.Header>
					<Drawer.Title>Move Goal</Drawer.Title>
					<Drawer.Description>Set your daily activity goal.</Drawer.Description>
				</Drawer.Header>
				<div class="p-4 pb-0">
					{@render goalControls()}
				</div>
				<Drawer.Footer>
					<Button>Submit</Button>
					<Drawer.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Drawer.Close>
				</Drawer.Footer>
			</div>
		</Drawer.Content>
	</Drawer.Root>
</Story>

<Story name="Simple">
	<Drawer.Root>
		<Drawer.Trigger class={buttonVariants({ variant: 'outline' })}>Open</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>Are you absolutely sure?</Drawer.Title>
				<Drawer.Description>This action cannot be undone.</Drawer.Description>
			</Drawer.Header>
			<Drawer.Footer>
				<Button>Submit</Button>
				<Drawer.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
</Story>

<Story name="Sides">
	<div class="flex flex-wrap gap-2">
		{#each DRAWER_SIDES as side (side)}
			<Drawer.Root direction={side === 'bottom' ? undefined : side}>
				<Drawer.Trigger class={cn(buttonVariants({ variant: 'outline' }), 'capitalize')}>
					{side}
				</Drawer.Trigger>
				<Drawer.Content
					class="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]"
				>
					<Drawer.Header>
						<Drawer.Title>Move Goal</Drawer.Title>
						<Drawer.Description>Set your daily activity goal.</Drawer.Description>
					</Drawer.Header>
					<div class="no-scrollbar overflow-y-auto px-4">
						{#each Array.from({ length: 6 }) as _, i (i)}
							<p class="mb-4 leading-normal">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua.
							</p>
						{/each}
					</div>
					<Drawer.Footer>
						<Button>Submit</Button>
						<Drawer.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Drawer.Close>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>
		{/each}
	</div>
</Story>

<Story name="Responsive Dialog">
	{#if isDesktop.current}
		<Dialog.Root bind:open>
			<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Edit Profile</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-[425px]">
				<Dialog.Header>
					<Dialog.Title>Edit profile</Dialog.Title>
					<Dialog.Description>
						Make changes to your profile here. Click save when you're done.
					</Dialog.Description>
				</Dialog.Header>
				<form class="grid items-start gap-4">
					<div class="grid gap-2">
						<Label for="email-{id}">Email</Label>
						<Input type="email" id="email-{id}" value="shadcn@example.com" />
					</div>
					<div class="grid gap-2">
						<Label for="username-{id}">Username</Label>
						<Input id="username-{id}" value="@shadcn" />
					</div>
					<Button type="submit">Save changes</Button>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	{:else}
		<Drawer.Root bind:open>
			<Drawer.Trigger class={buttonVariants({ variant: 'outline' })}>Edit Profile</Drawer.Trigger>
			<Drawer.Content>
				<Drawer.Header class="text-start">
					<Drawer.Title>Edit profile</Drawer.Title>
					<Drawer.Description>
						Make changes to your profile here. Click save when you're done.
					</Drawer.Description>
				</Drawer.Header>
				<form class="grid items-start gap-4 px-4">
					<div class="grid gap-2">
						<Label for="email-{id}">Email</Label>
						<Input type="email" id="email-{id}" value="shadcn@example.com" />
					</div>
					<div class="grid gap-2">
						<Label for="username-{id}">Username</Label>
						<Input id="username-{id}" value="@shadcn" />
					</div>
					<Button type="submit">Save changes</Button>
				</form>
				<Drawer.Footer class="pt-2">
					<Drawer.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Drawer.Close>
				</Drawer.Footer>
			</Drawer.Content>
		</Drawer.Root>
	{/if}
</Story>
