<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
	import { RangeCalendar } from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Range Calendar',
		decorators: [() => StoryWrapper]
	});
</script>

<script lang="ts">
	const start = today(getLocalTimeZone());
	let value = $state({
		start,
		end: start.add({ days: 7 })
	});
	let multiMonthValue = $state({
		start: new CalendarDate(2025, 6, 5),
		end: new CalendarDate(2025, 6, 18)
	});
	let dropdownValue = $state({
		start: new CalendarDate(2025, 6, 5),
		end: new CalendarDate(2025, 6, 12)
	});
</script>

<Story name="Default">
	<RangeCalendar bind:value class="rounded-md border shadow-sm" />
</Story>

<Story name="Dropdown Caption">
	<RangeCalendar
		bind:value={dropdownValue}
		class="rounded-md border shadow-sm"
		captionLayout="dropdown"
	/>
</Story>

<Story name="Month Only Dropdown">
	<RangeCalendar
		bind:value={dropdownValue}
		class="rounded-md border shadow-sm"
		captionLayout="dropdown-months"
	/>
</Story>

<Story name="Year Only Dropdown">
	<RangeCalendar
		bind:value={dropdownValue}
		class="rounded-md border shadow-sm"
		captionLayout="dropdown-years"
	/>
</Story>

<Story name="Two Months">
	<RangeCalendar
		bind:value={multiMonthValue}
		class="rounded-md border shadow-sm"
		numberOfMonths={2}
	/>
</Story>
