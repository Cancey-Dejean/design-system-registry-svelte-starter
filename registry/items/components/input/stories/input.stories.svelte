<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Input } from '../index.js';
	import Button from '../../button/button.svelte';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Input',
		component: Input,
		decorators: [() => StoryWrapper],
		argTypes: {
			type: {
				control: 'select',
				options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url', 'file'],
				description: 'The HTML input type'
			},
			placeholder: {
				control: 'text',
				description: 'Placeholder text'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the input is disabled',
				table: {
					defaultValue: { summary: 'false' }
				}
			},
			value: {
				control: 'text',
				description: 'The input value'
			},
			ref: {
				control: false,
				description: 'The ref of the input'
			},
			class: { control: 'text' }
		},
		args: {
			type: 'email',
			placeholder: 'Email',
			disabled: false,
			class: 'max-w-xs'
		}
	});
</script>

<script lang="ts">
	let email = $state('');
	let password = $state('');
</script>

<Story name="Default">
	<Input type="email" placeholder="Email" class="max-w-xs" />
</Story>

<Story name="With Value">
	<div class="grid w-full max-w-xs gap-2">
		<Input type="email" placeholder="Email" bind:value={email} />
		<p class="text-sm text-muted-foreground">Value: {email || '(empty)'}</p>
	</div>
</Story>

<Story name="File">
	<div class="grid w-full max-w-sm items-center gap-1.5">
		<label for="picture" class="text-sm leading-none font-medium">Picture</label>
		<Input id="picture" type="file" />
	</div>
</Story>

<Story name="Disabled">
	<Input disabled type="email" placeholder="Email" class="max-w-sm" />
</Story>

<Story name="With Label">
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<label for="email" class="text-sm leading-none font-medium">Email</label>
		<Input type="email" id="email" placeholder="Email" />
	</div>
</Story>

<Story name="With Button">
	<div class="flex w-full max-w-sm items-center gap-2">
		<Input type="email" placeholder="Email" />
		<Button type="submit" variant="outline">Subscribe</Button>
	</div>
</Story>

<Story name="Password">
	<div class="grid w-full max-w-xs gap-1.5">
		<label for="password" class="text-sm leading-none font-medium">Password</label>
		<Input id="password" type="password" placeholder="Password" bind:value={password} />
	</div>
</Story>

<Story name="Invalid">
	<div class="grid w-full max-w-xs gap-1.5">
		<label for="invalid-email" class="text-sm leading-none font-medium">Email</label>
		<Input
			id="invalid-email"
			type="email"
			placeholder="Email"
			value="not-an-email"
			aria-invalid="true"
		/>
		<p class="text-sm text-destructive">Please enter a valid email address.</p>
	</div>
</Story>
