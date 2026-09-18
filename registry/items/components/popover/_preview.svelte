<script lang="ts">
	import { buttonVariants } from '../button/button.variants.js';
	import * as Popover from './index.js';
</script>

<Popover.Root>
	<Popover.Trigger class={buttonVariants({ variant: 'outline' })}>Open popover</Popover.Trigger>
	<Popover.Content class="w-80">
		<div class="grid gap-4">
			<div class="space-y-2">
				<h4 class="leading-none font-medium">Dimensions</h4>
				<p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
			</div>
		</div>
	</Popover.Content>
</Popover.Root>
