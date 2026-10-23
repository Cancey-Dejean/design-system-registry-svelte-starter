<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import BadgeCheckIcon from '@lucide/svelte/icons/badge-check';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import Plus from '@lucide/svelte/icons/plus';
	import ShieldAlertIcon from '@lucide/svelte/icons/shield-alert';
	import Button from '../../button/button.svelte';
	import * as Avatar from '../../avatar/index.js';
	import * as Item from '../index.js';


	const { Story } = defineMeta({
		title: 'Components/Item',
		parameters: { centered: true }
	});

	const music = [
		{
			title: 'Midnight City Lights',
			artist: 'Neon Dreams',
			album: 'Electric Nights',
			duration: '3:45'
		},
		{
			title: 'Coffee Shop Conversations',
			artist: 'The Morning Brew',
			album: 'Urban Stories',
			duration: '4:05'
		},
		{
			title: 'Digital Rain',
			artist: 'Cyber Symphony',
			album: 'Binary Beats',
			duration: '3:30'
		}
	];

	const people = [
		{
			username: 'shadcn',
			avatar: 'https://github.com/shadcn.png',
			email: 'shadcn@vercel.com'
		},
		{
			username: 'maxleiter',
			avatar: 'https://github.com/maxleiter.png',
			email: 'maxleiter@vercel.com'
		},
		{
			username: 'evilrabbit',
			avatar: 'https://github.com/evilrabbit.png',
			email: 'evilrabbit@vercel.com'
		}
	];

	const models = [
		{
			name: 'v0-1.5-sm',
			description: 'Everyday tasks and UI generation.',
			image:
				'https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop'
		},
		{
			name: 'v0-1.5-lg',
			description: 'Advanced thinking or reasoning.',
			image:
				'https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop'
		},
		{
			name: 'v0-2.0-mini',
			description: 'Open Source model for everyone.',
			image:
				'https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop'
		}
	];
</script>

<Story name="Default">
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
		<Item.Root variant="outline" size="sm">
			{#snippet child({ props })}
				<a href="#/" {...props}>
					<Item.Media>
						<BadgeCheckIcon class="size-5" />
					</Item.Media>
					<Item.Content>
						<Item.Title>Your profile has been verified.</Item.Title>
					</Item.Content>
					<Item.Actions>
						<ChevronRightIcon class="size-4" />
					</Item.Actions>
				</a>
			{/snippet}
		</Item.Root>
	</div>
</Story>

<Story name="Variants">
	<div class="flex w-full max-w-md flex-col gap-6">
		<Item.Root>
			<Item.Content>
				<Item.Title>Default Variant</Item.Title>
				<Item.Description>Standard styling with subtle background and borders.</Item.Description>
			</Item.Content>
			<Item.Actions>
				<Button variant="outline" size="sm">Open</Button>
			</Item.Actions>
		</Item.Root>
		<Item.Root variant="outline">
			<Item.Content>
				<Item.Title>Outline Variant</Item.Title>
				<Item.Description>
					Outlined style with clear borders and transparent background.
				</Item.Description>
			</Item.Content>
			<Item.Actions>
				<Button variant="outline" size="sm">Open</Button>
			</Item.Actions>
		</Item.Root>
		<Item.Root variant="muted">
			<Item.Content>
				<Item.Title>Muted Variant</Item.Title>
				<Item.Description>
					Subdued appearance with muted colors for secondary content.
				</Item.Description>
			</Item.Content>
			<Item.Actions>
				<Button variant="outline" size="sm">Open</Button>
			</Item.Actions>
		</Item.Root>
	</div>
</Story>

<Story name="Size">
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
		<Item.Root variant="outline" size="sm">
			{#snippet child({ props })}
				<a href="#/" {...props}>
					<Item.Media>
						<BadgeCheckIcon class="size-5" />
					</Item.Media>
					<Item.Content>
						<Item.Title>Your profile has been verified.</Item.Title>
					</Item.Content>
					<Item.Actions>
						<ChevronRightIcon class="size-4" />
					</Item.Actions>
				</a>
			{/snippet}
		</Item.Root>
	</div>
</Story>

<Story name="Icon">
	<div class="flex w-full max-w-lg flex-col gap-6">
		<Item.Root variant="outline">
			<Item.Media variant="icon">
				<ShieldAlertIcon />
			</Item.Media>
			<Item.Content>
				<Item.Title>Security Alert</Item.Title>
				<Item.Description>New login detected from unknown device.</Item.Description>
			</Item.Content>
			<Item.Actions>
				<Button size="sm" variant="outline">Review</Button>
			</Item.Actions>
		</Item.Root>
	</div>
</Story>

<Story name="Avatar">
	<div class="flex w-full max-w-lg flex-col gap-6">
		<Item.Root variant="outline">
			<Item.Media>
				<Avatar.Root class="size-10">
					<Avatar.Image src="https://github.com/evilrabbit.png" />
					<Avatar.Fallback>ER</Avatar.Fallback>
				</Avatar.Root>
			</Item.Media>
			<Item.Content>
				<Item.Title>Evil Rabbit</Item.Title>
				<Item.Description>Last seen 5 months ago</Item.Description>
			</Item.Content>
			<Item.Actions>
				<Button size="icon" variant="outline" class="rounded-full" aria-label="Invite">
					<Plus />
				</Button>
			</Item.Actions>
		</Item.Root>
		<Item.Root variant="outline">
			<Item.Media>
				<div
					class="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale"
				>
					<Avatar.Root class="hidden sm:flex">
						<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
					<Avatar.Root class="hidden sm:flex">
						<Avatar.Image src="https://github.com/maxleiter.png" alt="@maxleiter" />
						<Avatar.Fallback>LR</Avatar.Fallback>
					</Avatar.Root>
					<Avatar.Root>
						<Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
						<Avatar.Fallback>ER</Avatar.Fallback>
					</Avatar.Root>
				</div>
			</Item.Media>
			<Item.Content>
				<Item.Title>No Team Members</Item.Title>
				<Item.Description>Invite your team to collaborate on this project.</Item.Description>
			</Item.Content>
			<Item.Actions>
				<Button size="sm" variant="outline">Invite</Button>
			</Item.Actions>
		</Item.Root>
	</div>
</Story>

<Story name="Image">
	<div class="flex w-full max-w-md flex-col gap-4">
		{#each music as song (song.title)}
			<Item.Root variant="outline">
				{#snippet child({ props })}
					<a href="#/" {...props}>
						<Item.Media variant="image">
							<img
								src={`https://avatar.vercel.sh/${song.title}`}
								alt={song.title}
								width="32"
								height="32"
								class="size-8 rounded object-cover grayscale"
							/>
						</Item.Media>
						<Item.Content>
							<Item.Title class="line-clamp-1">
								{song.title} -
								<span class="text-muted-foreground">{song.album}</span>
							</Item.Title>
							<Item.Description>{song.artist}</Item.Description>
						</Item.Content>
						<Item.Content class="flex-none text-center">
							<Item.Description>{song.duration}</Item.Description>
						</Item.Content>
					</a>
				{/snippet}
			</Item.Root>
		{/each}
	</div>
</Story>

<Story name="Group">
	<div class="flex w-full max-w-md flex-col gap-6">
		<Item.Group>
			{#each people as person, index (person.username)}
				<Item.Root>
					<Item.Media>
						<Avatar.Root>
							<Avatar.Image src={person.avatar} class="grayscale" />
							<Avatar.Fallback>{person.username.charAt(0)}</Avatar.Fallback>
						</Avatar.Root>
					</Item.Media>
					<Item.Content class="gap-1">
						<Item.Title>{person.username}</Item.Title>
						<Item.Description>{person.email}</Item.Description>
					</Item.Content>
					<Item.Actions>
						<Button variant="ghost" size="icon" class="rounded-full">
							<Plus />
						</Button>
					</Item.Actions>
				</Item.Root>
				{#if index !== people.length - 1}
					<Item.Separator />
				{/if}
			{/each}
		</Item.Group>
	</div>
</Story>

<Story name="Header">
	<div class="flex w-full max-w-xl flex-col gap-6">
		<Item.Group class="grid grid-cols-3 gap-4">
			{#each models as model (model.name)}
				<Item.Root variant="outline">
					<Item.Header>
						<img
							src={model.image}
							alt={model.name}
							width="128"
							height="128"
							class="aspect-square w-full rounded-sm object-cover"
						/>
					</Item.Header>
					<Item.Content>
						<Item.Title>{model.name}</Item.Title>
						<Item.Description>{model.description}</Item.Description>
					</Item.Content>
				</Item.Root>
			{/each}
		</Item.Group>
	</div>
</Story>

<Story name="Link">
	<div class="flex w-full max-w-md flex-col gap-4">
		<Item.Root>
			{#snippet child({ props })}
				<a href="#/" {...props}>
					<Item.Content>
						<Item.Title>Visit our documentation</Item.Title>
						<Item.Description>Learn how to get started with our components.</Item.Description>
					</Item.Content>
					<Item.Actions>
						<ChevronRightIcon class="size-4" />
					</Item.Actions>
				</a>
			{/snippet}
		</Item.Root>
		<Item.Root variant="outline">
			{#snippet child({ props })}
				<a href="#/" target="_blank" rel="noopener noreferrer" {...props}>
					<Item.Content>
						<Item.Title>External resource</Item.Title>
						<Item.Description>Opens in a new tab with security attributes.</Item.Description>
					</Item.Content>
					<Item.Actions>
						<ExternalLinkIcon class="size-4" />
					</Item.Actions>
				</a>
			{/snippet}
		</Item.Root>
	</div>
</Story>
