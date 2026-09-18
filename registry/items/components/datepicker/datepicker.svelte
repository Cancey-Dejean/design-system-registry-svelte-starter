<script lang="ts">
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import { getLocalTimeZone, today, type CalendarDate } from '@internationalized/date';
	import Button from '../button/button.svelte';
	import { Calendar } from '../calendar/index.js';
	import { Label } from '../label/index.js';
	import * as Popover from '../popover/index.js';

	let {
		label = 'Date of birth',
		placeholder = 'Select date',
		class: className
	}: {
		label?: string;
		placeholder?: string;
		class?: string;
	} = $props();

	const id = $props.id();

	let open = $state(false);
	let value = $state<CalendarDate | undefined>();
</script>

<div class={['flex flex-col gap-3', className]}>
	<Label for="{id}-date" class="px-1">{label}</Label>
	<Popover.Root bind:open>
		<Popover.Trigger id="{id}-date">
			{#snippet child({ props })}
				<Button {...props} variant="outline" class="w-48 justify-between font-normal">
					{value ? value.toDate(getLocalTimeZone()).toLocaleDateString() : placeholder}
					<ChevronDownIcon />
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-auto overflow-hidden p-0" align="start">
			<Calendar
				type="single"
				bind:value
				captionLayout="dropdown"
				onValueChange={() => {
					open = false;
				}}
				maxValue={today(getLocalTimeZone())}
			/>
		</Popover.Content>
	</Popover.Root>
</div>
