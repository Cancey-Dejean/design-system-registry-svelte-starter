<script lang="ts">
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import HouseIcon from '@lucide/svelte/icons/house';
	import InboxIcon from '@lucide/svelte/icons/inbox';
	import SearchIcon from '@lucide/svelte/icons/search';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import * as Sidebar from './index.js';

	const items = [
		{ title: 'Home', url: '#/', icon: HouseIcon },
		{ title: 'Inbox', url: '#/', icon: InboxIcon },
		{ title: 'Calendar', url: '#/', icon: CalendarIcon },
		{ title: 'Search', url: '#/', icon: SearchIcon },
		{ title: 'Settings', url: '#/', icon: SettingsIcon }
	];
</script>

<div class="w-full max-w-4xl">
	<Sidebar.Provider class="min-h-[360px] overflow-hidden rounded-lg border">
		<Sidebar.Root>
			<Sidebar.Header>
				<span class="px-2 text-sm font-semibold">Acme Inc</span>
			</Sidebar.Header>
			<Sidebar.Content>
				<Sidebar.Group>
					<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							{#each items as item (item.title)}
								<Sidebar.MenuItem>
									<Sidebar.MenuButton tooltipContent={item.title}>
										{#snippet child({ props })}
											<a href={item.url} {...props}>
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
