<script lang="ts">
	import * as ButtonGroup from './index.js';
	import Button from '../button/button.svelte';
</script>

<div class="flex flex-col gap-4">
	<ButtonGroup.Root aria-label="Actions">
		<Button variant="outline">Archive</Button>
		<Button variant="outline">Report</Button>
		<Button variant="outline">Snooze</Button>
	</ButtonGroup.Root>

	<ButtonGroup.Root>
		<Button variant="secondary" size="sm">Copy</Button>
		<ButtonGroup.Separator />
		<Button variant="secondary" size="sm">Paste</Button>
	</ButtonGroup.Root>
</div>
