<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
	import { Calendar } from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Calendar',
		decorators: [() => StoryWrapper]
	});
</script>

<script lang="ts">
	let singleValue = $state(today(getLocalTimeZone()));
	let multiMonthValue = $state(new CalendarDate(2025, 6, 12));
	let dropdownValue = $state(new CalendarDate(2025, 6, 12));
</script>

<Story name="Default">
	<Calendar type="single" bind:value={singleValue} class="rounded-md border shadow-sm" />
</Story>

<Story name="Dropdown Caption">
	<Calendar
		type="single"
		bind:value={dropdownValue}
		class="rounded-md border shadow-sm"
		captionLayout="dropdown"
	/>
</Story>

<Story name="Month Only Dropdown">
	<Calendar
		type="single"
		bind:value={dropdownValue}
		class="rounded-md border shadow-sm"
		captionLayout="dropdown-months"
	/>
</Story>

<Story name="Year Only Dropdown">
	<Calendar
		type="single"
		bind:value={dropdownValue}
		class="rounded-md border shadow-sm"
		captionLayout="dropdown-years"
	/>
</Story>

<Story name="Two Months">
	<Calendar
		type="single"
		bind:value={multiMonthValue}
		class="rounded-md border shadow-sm"
		numberOfMonths={2}
	/>
</Story>
