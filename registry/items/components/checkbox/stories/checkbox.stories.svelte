<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Checkbox } from '../index.js';


	const { Story } = defineMeta({
		title: 'Components/Checkbox',
		component: Checkbox,
		parameters: { centered: true },
		argTypes: {
			checked: {
				control: 'boolean',
				description: 'Whether the checkbox is checked',
				table: {
					defaultValue: { summary: 'false' }
				}
			},
			indeterminate: {
				control: 'boolean',
				description: 'Whether the checkbox is in an indeterminate state',
				table: {
					defaultValue: { summary: 'false' }
				}
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the checkbox is disabled',
				table: {
					defaultValue: { summary: 'false' }
				}
			},
			ref: {
				control: false,
				description: 'The ref of the checkbox'
			},
			class: { control: 'text' }
		},
		args: {
			checked: false,
			indeterminate: false,
			disabled: false
		}
	});
</script>

<script lang="ts">
	let defaultChecked = $state(false);
	let termsChecked = $state(true);
	let indeterminateChecked = $state(false);
	let indeterminate = $state(true);
</script>

<Story name="Default">
	<div class="flex items-center gap-3">
		<Checkbox id="terms" bind:checked={defaultChecked} />
		<label
			for="terms"
			class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			Accept terms and conditions
		</label>
	</div>
</Story>

<Story name="Checked">
	<div class="flex items-start gap-3">
		<Checkbox id="terms-2" bind:checked={termsChecked} />
		<div class="grid gap-2">
			<label for="terms-2" class="text-sm leading-none font-medium">
				Accept terms and conditions
			</label>
			<p class="text-sm text-muted-foreground">
				By clicking this checkbox, you agree to the terms and conditions.
			</p>
		</div>
	</div>
</Story>

<Story name="Disabled">
	<div class="flex flex-col gap-4">
		<div class="flex items-center gap-3">
			<Checkbox id="disabled-unchecked" disabled />
			<label for="disabled-unchecked" class="text-sm leading-none font-medium opacity-70">
				Disabled
			</label>
		</div>
		<div class="flex items-center gap-3">
			<Checkbox id="disabled-checked" checked disabled />
			<label for="disabled-checked" class="text-sm leading-none font-medium opacity-70">
				Disabled checked
			</label>
		</div>
	</div>
</Story>

<Story name="Indeterminate">
	<div class="flex items-center gap-3">
		<Checkbox id="indeterminate" bind:checked={indeterminateChecked} bind:indeterminate />
		<label for="indeterminate" class="text-sm leading-none font-medium"> Select all </label>
	</div>
</Story>

<Story name="With Card">
	<label
		class="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
	>
		<Checkbox
			id="toggle-2"
			checked
			class="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
		/>
		<div class="grid gap-1.5 font-normal">
			<p class="text-sm leading-none font-medium">Enable notifications</p>
			<p class="text-sm text-muted-foreground">
				You can enable or disable notifications at any time.
			</p>
		</div>
	</label>
</Story>
