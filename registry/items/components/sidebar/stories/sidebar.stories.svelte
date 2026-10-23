<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import HouseIcon from '@lucide/svelte/icons/house';
	import InboxIcon from '@lucide/svelte/icons/inbox';
	import SearchIcon from '@lucide/svelte/icons/search';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import * as Sidebar from '../index.js';


	const { Story } = defineMeta({
		title: 'Components/Sidebar',
		parameters: { centered: true }
	});

	const items = [
		{ title: 'Home', url: '#/', icon: HouseIcon },
		{ title: 'Inbox', url: '#/', icon: InboxIcon },
		{ title: 'Calendar', url: '#/', icon: CalendarIcon },
		{ title: 'Search', url: '#/', icon: SearchIcon },
		{ title: 'Settings', url: '#/', icon: SettingsIcon }
	];
</script>

<script lang="ts">
	let open = $state(true);
</script>

{#snippet applicationMenu()}
	<Sidebar.Group>
		<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
		<Sidebar.GroupContent>
			<Sidebar.Menu>
				{#each items as item (item.title)}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton tooltipContent={item.title}>
							{#snippet child({ props })}
								<a href="#/" {...props}>
									<item.icon />
									<span>{item.title}</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.GroupContent>
	</Sidebar.Group>
{/snippet}

<Story name="Default">
	<div class="w-full max-w-4xl">
		<Sidebar.Provider class="min-h-[360px] overflow-hidden rounded-lg border">
			<Sidebar.Root>
				<Sidebar.Header>
					<span class="px-2 text-sm font-semibold">Acme Inc</span>
				</Sidebar.Header>
				<Sidebar.Content>
					{@render applicationMenu()}
				</Sidebar.Content>
				<Sidebar.Footer>
					<span class="px-2 text-xs text-muted-foreground">v1.0.0</span>
				</Sidebar.Footer>
			</Sidebar.Root>
			<Sidebar.Inset>
				<header class="flex h-12 items-center gap-2 border-b px-4">
					<Sidebar.Trigger />
					<span class="text-sm font-medium">Dashboard</span>
				</header>
				<div class="p-4 text-sm text-muted-foreground">Main content area</div>
			</Sidebar.Inset>
		</Sidebar.Provider>
	</div>
</Story>

<Story name="Collapsible Icon">
	<div class="w-full max-w-4xl">
		<Sidebar.Provider class="min-h-[360px] overflow-hidden rounded-lg border">
			<Sidebar.Root collapsible="icon">
				<Sidebar.Header>
					<span class="truncate px-2 text-sm font-semibold">Acme</span>
				</Sidebar.Header>
				<Sidebar.Content>
					{@render applicationMenu()}
				</Sidebar.Content>
				<Sidebar.Rail />
			</Sidebar.Root>
			<Sidebar.Inset>
				<header class="flex h-12 items-center gap-2 border-b px-4">
					<Sidebar.Trigger />
					<span class="text-sm font-medium">Icon collapse</span>
				</header>
				<div class="p-4 text-sm text-muted-foreground">
					Use the trigger or rail to collapse the sidebar to icons.
				</div>
			</Sidebar.Inset>
		</Sidebar.Provider>
	</div>
</Story>

<Story name="Floating">
	<div class="w-full max-w-4xl">
		<Sidebar.Provider class="min-h-[360px] overflow-hidden rounded-lg border">
			<Sidebar.Root variant="floating" collapsible="icon">
				<Sidebar.Content>
					{@render applicationMenu()}
				</Sidebar.Content>
			</Sidebar.Root>
			<Sidebar.Inset>
				<header class="flex h-12 items-center gap-2 border-b px-4">
					<Sidebar.Trigger />
					<span class="text-sm font-medium">Floating sidebar</span>
				</header>
				<div class="p-4 text-sm text-muted-foreground">Inset content with floating shell.</div>
			</Sidebar.Inset>
		</Sidebar.Provider>
	</div>
</Story>

<Story name="Inset">
	<div class="w-full max-w-4xl">
		<Sidebar.Provider class="min-h-[360px] overflow-hidden rounded-lg border">
			<Sidebar.Root variant="inset">
				<Sidebar.Content>
					{@render applicationMenu()}
				</Sidebar.Content>
			</Sidebar.Root>
			<Sidebar.Inset>
				<header class="flex h-12 items-center gap-2 border-b px-4">
					<Sidebar.Trigger />
					<span class="text-sm font-medium">Inset variant</span>
				</header>
				<div class="p-4 text-sm text-muted-foreground">Sidebar uses the inset layout chrome.</div>
			</Sidebar.Inset>
		</Sidebar.Provider>
	</div>
</Story>

<Story name="Controlled">
	<div class="w-full max-w-4xl">
		<Sidebar.Provider bind:open class="min-h-[360px] overflow-hidden rounded-lg border">
			<Sidebar.Root>
				<Sidebar.Content>
					{@render applicationMenu()}
				</Sidebar.Content>
			</Sidebar.Root>
			<Sidebar.Inset>
				<header class="flex h-12 items-center gap-2 border-b px-4">
					<Sidebar.Trigger />
					<span class="text-sm font-medium">
						Sidebar is {open ? 'open' : 'closed'}
					</span>
				</header>
				<div class="p-4 text-sm text-muted-foreground">
					Open state is bound with <code class="text-xs">bind:open</code> on the provider.
				</div>
			</Sidebar.Inset>
		</Sidebar.Provider>
	</div>
</Story>

<Story name="Skeletons">
	<div class="w-full max-w-4xl">
		<Sidebar.Provider class="min-h-[280px] overflow-hidden rounded-lg border">
			<Sidebar.Root>
				<Sidebar.Content>
					<Sidebar.Group>
						<Sidebar.GroupLabel>Loading</Sidebar.GroupLabel>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								{#each Array.from({ length: 5 }) as _, i (i)}
									<Sidebar.MenuItem>
										<Sidebar.MenuSkeleton showIcon />
									</Sidebar.MenuItem>
								{/each}
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Content>
			</Sidebar.Root>
			<Sidebar.Inset>
				<header class="flex h-12 items-center gap-2 border-b px-4">
					<Sidebar.Trigger />
					<span class="text-sm font-medium">Skeleton menu</span>
				</header>
			</Sidebar.Inset>
		</Sidebar.Provider>
	</div>
</Story>
