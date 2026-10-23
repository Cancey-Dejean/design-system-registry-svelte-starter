<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Textarea } from '../index.js';
	import Button from '../../button/button.svelte';


	const { Story } = defineMeta({
		title: 'Components/Textarea',
		component: Textarea,
		parameters: { centered: true },
		argTypes: {
			placeholder: {
				control: 'text',
				description: 'Placeholder text'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the textarea is disabled',
				table: {
					defaultValue: { summary: 'false' }
				}
			},
			value: {
				control: 'text',
				description: 'The textarea value'
			},
			ref: {
				control: false,
				description: 'The ref of the textarea'
			},
			class: { control: 'text' }
		},
		args: {
			placeholder: 'Type your message here.',
			disabled: false,
			class: 'max-w-sm'
		}
	});
</script>

<script lang="ts">
	let message = $state('');
</script>

<Story name="Default">
	<div class="w-full max-w-sm">
		<Textarea placeholder="Type your message here." />
	</div>
</Story>

<Story name="With Value">
	<div class="grid w-full max-w-sm gap-2">
		<Textarea placeholder="Type your message here." bind:value={message} />
		<p class="text-sm text-muted-foreground">{message.length} characters</p>
	</div>
</Story>

<Story name="Disabled">
	<div class="w-full max-w-sm">
		<Textarea disabled placeholder="Type your message here." />
	</div>
</Story>

<Story name="With Label">
	<div class="grid w-full max-w-sm gap-1.5">
		<label for="message" class="text-sm leading-none font-medium">Your message</label>
		<Textarea placeholder="Type your message here." id="message" />
	</div>
</Story>

<Story name="With Text">
	<div class="grid w-full max-w-sm gap-1.5">
		<label for="message-2" class="text-sm leading-none font-medium">Your Message</label>
		<Textarea placeholder="Type your message here." id="message-2" />
		<p class="text-sm text-muted-foreground">Your message will be copied to the support team.</p>
	</div>
</Story>

<Story name="With Button">
	<div class="grid w-full max-w-sm gap-2">
		<Textarea placeholder="Type your message here." />
		<Button>Send message</Button>
	</div>
</Story>

<Story name="Invalid">
	<div class="grid w-full max-w-sm gap-1.5">
		<label for="invalid-message" class="text-sm leading-none font-medium">Your message</label>
		<Textarea
			id="invalid-message"
			placeholder="Type your message here."
			value="Too short"
			aria-invalid="true"
		/>
		<p class="text-sm text-destructive">Message must be at least 20 characters.</p>
	</div>
</Story>
