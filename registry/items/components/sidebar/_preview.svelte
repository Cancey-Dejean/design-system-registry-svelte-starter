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

<p>
	See Storybook for examples. Click here to see the <a href="#" target="_blank"
		>Sidebar documentation</a
	>.
</p>
