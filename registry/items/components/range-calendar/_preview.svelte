<script lang="ts">
	import { getLocalTimeZone, today } from '@internationalized/date';
	import { RangeCalendar } from './index.js';

	const start = today(getLocalTimeZone());
	let value = $state({
		start,
		end: start.add({ days: 7 })
	});
</script>

<RangeCalendar bind:value class="rounded-md border shadow-sm" captionLayout="dropdown" />
