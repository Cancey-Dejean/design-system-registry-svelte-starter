<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		type DateValue
	} from '@internationalized/date';
	import { parseDate } from 'chrono-node';
	import { untrack } from 'svelte';
	import { cn } from '$lib/utils.js';
	import Button from '../../button/button.svelte';
	import { Calendar } from '../../calendar/index.js';
	import { Input } from '../../input/index.js';
	import { Label } from '../../label/index.js';
	import * as Popover from '../../popover/index.js';
	import DatePicker from '../datepicker.svelte';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Date Picker',
		decorators: [() => StoryWrapper]
	});
</script>

<script lang="ts">
	const df = new DateFormatter('en-US', { dateStyle: 'long' });
	const id = $props.id();

	let usageValue = $state<DateValue>();
	let datetimeOpen = $state(false);
	let datetimeValue = $state<DateValue | undefined>();

	function formatDate(date: DateValue | undefined) {
		if (!date) return '';
		return date.toDate(getLocalTimeZone()).toLocaleDateString('en-US', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		});
	}

	let naturalOpen = $state(false);
	let inputValue = $state('In 2 days');
	let naturalValue = $state<DateValue | undefined>(
		untrack(() => {
			const date = parseDate(inputValue);
			if (date) return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
			return undefined;
		})
	);
</script>

<Story name="Default">
	<DatePicker />
</Story>

<Story name="Usage">
	<Popover.Root>
		<Popover.Trigger>
			{#snippet child({ props })}
				<Button
					variant="outline"
					class={cn(
						'w-[280px] justify-start text-start font-normal',
						!usageValue && 'text-muted-foreground'
					)}
					{...props}
				>
					<CalendarIcon class="me-2 size-4" />
					{usageValue ? df.format(usageValue.toDate(getLocalTimeZone())) : 'Select a date'}
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-auto p-0">
			<Calendar bind:value={usageValue} type="single" captionLayout="dropdown" />
		</Popover.Content>
	</Popover.Root>
</Story>

<Story name="Date and Time">
	<div class="flex gap-4">
		<div class="flex flex-col gap-3">
			<Label for="{id}-date" class="px-1">Date</Label>
			<Popover.Root bind:open={datetimeOpen}>
				<Popover.Trigger id="{id}-date">
					{#snippet child({ props })}
						<Button {...props} variant="outline" class="w-32 justify-between font-normal">
							{datetimeValue
								? datetimeValue.toDate(getLocalTimeZone()).toLocaleDateString()
								: 'Select date'}
							<ChevronDownIcon />
						</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content class="w-auto overflow-hidden p-0" align="start">
					<Calendar
						type="single"
						bind:value={datetimeValue}
						onValueChange={() => {
							datetimeOpen = false;
						}}
						captionLayout="dropdown"
					/>
				</Popover.Content>
			</Popover.Root>
		</div>
		<div class="flex flex-col gap-3">
			<Label for="{id}-time" class="px-1">Time</Label>
			<Input
				type="time"
				id="{id}-time"
				step="1"
				value="10:30:00"
				class="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
			/>
		</div>
	</div>
</Story>

<Story name="Natural Language">
	<div class="flex w-full max-w-sm flex-col gap-3">
		<Label for="{id}-natural-date" class="px-1">Schedule Date</Label>
		<div class="relative flex gap-2">
			<Input
				id="{id}-natural-date"
				bind:value={
					() => inputValue,
					(v) => {
						inputValue = v;
						const date = parseDate(v);
						if (date) {
							naturalValue = new CalendarDate(
								date.getFullYear(),
								date.getMonth() + 1,
								date.getDate()
							);
						}
					}
				}
				placeholder="Tomorrow or next week"
				class="bg-background pe-10"
				onkeydown={(e) => {
					if (e.key === 'ArrowDown') {
						e.preventDefault();
						naturalOpen = true;
					}
				}}
			/>
			<Popover.Root bind:open={naturalOpen}>
				<Popover.Trigger id="{id}-date-picker">
					{#snippet child({ props })}
						<Button
							{...props}
							variant="ghost"
							class="absolute end-2 top-1/2 size-6 -translate-y-1/2"
						>
							<CalendarIcon class="size-3.5" />
							<span class="sr-only">Select date</span>
						</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content class="w-auto overflow-hidden p-0" align="end">
					<Calendar
						type="single"
						bind:value={naturalValue}
						captionLayout="dropdown"
						onValueChange={(v) => {
							inputValue = formatDate(v);
							naturalOpen = false;
						}}
					/>
				</Popover.Content>
			</Popover.Root>
		</div>
		<div class="px-1 text-sm text-muted-foreground">
			Your post will be published on
			<span class="font-medium">{formatDate(naturalValue)}</span>.
		</div>
	</div>
</Story>
