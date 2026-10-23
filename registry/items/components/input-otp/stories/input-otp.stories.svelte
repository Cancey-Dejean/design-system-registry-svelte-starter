<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'bits-ui';
	import * as InputOTP from '../index.js';


	const { Story } = defineMeta({
		title: 'Components/Input OTP',
		parameters: { centered: true }
	});
</script>

<script lang="ts">
	let value = $state('');
</script>

<Story name="Default">
	<div class="flex min-h-24 items-center justify-center">
		<InputOTP.Root maxlength={6}>
			{#snippet children({ cells })}
				<InputOTP.Group>
					{#each cells.slice(0, 3) as cell (cell)}
						<InputOTP.Slot {cell} />
					{/each}
				</InputOTP.Group>
				<InputOTP.Separator />
				<InputOTP.Group>
					{#each cells.slice(3, 6) as cell (cell)}
						<InputOTP.Slot {cell} />
					{/each}
				</InputOTP.Group>
			{/snippet}
		</InputOTP.Root>
	</div>
</Story>

<Story name="Pattern">
	<div class="flex min-h-24 items-center justify-center">
		<InputOTP.Root maxlength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
			{#snippet children({ cells })}
				<InputOTP.Group>
					{#each cells as cell (cell)}
						<InputOTP.Slot {cell} />
					{/each}
				</InputOTP.Group>
			{/snippet}
		</InputOTP.Root>
	</div>
</Story>

<Story name="Separator">
	<div class="flex min-h-24 items-center justify-center">
		<InputOTP.Root maxlength={6}>
			{#snippet children({ cells })}
				<InputOTP.Group>
					{#each cells.slice(0, 2) as cell (cell)}
						<InputOTP.Slot {cell} />
					{/each}
				</InputOTP.Group>
				<InputOTP.Separator />
				<InputOTP.Group>
					{#each cells.slice(2, 4) as cell (cell)}
						<InputOTP.Slot {cell} />
					{/each}
				</InputOTP.Group>
				<InputOTP.Separator />
				<InputOTP.Group>
					{#each cells.slice(4, 6) as cell (cell)}
						<InputOTP.Slot {cell} />
					{/each}
				</InputOTP.Group>
			{/snippet}
		</InputOTP.Root>
	</div>
</Story>

<Story name="Controlled">
	<div class="flex min-h-24 flex-col items-center justify-center gap-2">
		<InputOTP.Root maxlength={6} bind:value>
			{#snippet children({ cells })}
				<InputOTP.Group>
					{#each cells as cell (cell)}
						<InputOTP.Slot {cell} />
					{/each}
				</InputOTP.Group>
			{/snippet}
		</InputOTP.Root>
		<p class="text-center text-sm text-muted-foreground">
			{value === '' ? 'Enter your one-time password.' : `You entered: ${value}`}
		</p>
	</div>
</Story>

<Story name="Disabled">
	<div class="flex min-h-24 items-center justify-center">
		<InputOTP.Root maxlength={6} disabled>
			{#snippet children({ cells })}
				<InputOTP.Group>
					{#each cells.slice(0, 3) as cell (cell)}
						<InputOTP.Slot {cell} />
					{/each}
				</InputOTP.Group>
				<InputOTP.Separator />
				<InputOTP.Group>
					{#each cells.slice(3, 6) as cell (cell)}
						<InputOTP.Slot {cell} />
					{/each}
				</InputOTP.Group>
			{/snippet}
		</InputOTP.Root>
	</div>
</Story>
