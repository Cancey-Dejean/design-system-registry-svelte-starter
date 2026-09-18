<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../../button/button.svelte';
	import { Checkbox } from '../../checkbox/index.js';
	import { Input } from '../../input/index.js';
	import { Textarea } from '../../textarea/index.js';
	import * as Field from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Field',
		decorators: [() => StoryWrapper]
	});
</script>

<script lang="ts">
	let sameAsShipping = $state(true);

	const validationErrors = [
		{ message: 'Must be at least 8 characters.' },
		{ message: 'Must include a number.' }
	];
</script>

<Story name="Default">
	<div class="w-full max-w-md">
		<Field.Group>
			<Field.Field>
				<Field.Label for="username">Username</Field.Label>
				<Input id="username" placeholder="shadcn" />
				<Field.Description>This is your public display name.</Field.Description>
			</Field.Field>
		</Field.Group>
	</div>
</Story>

<Story name="Horizontal">
	<div class="w-full max-w-md">
		<Field.Group>
			<Field.Field orientation="horizontal">
				<Checkbox id="terms" checked={sameAsShipping} />
				<Field.Label for="terms" class="font-normal">Accept terms and conditions</Field.Label>
			</Field.Field>
		</Field.Group>
	</div>
</Story>

<Story name="Fieldset">
	<div class="w-full max-w-md">
		<form>
			<Field.Group>
				<Field.Set>
					<Field.Legend>Payment Method</Field.Legend>
					<Field.Description>All transactions are secure and encrypted</Field.Description>
					<Field.Group>
						<Field.Field>
							<Field.Label for="card-name">Name on Card</Field.Label>
							<Input id="card-name" placeholder="John Doe" required />
						</Field.Field>
						<div class="grid grid-cols-3 gap-4">
							<Field.Field class="col-span-2">
								<Field.Label for="card-number">Card Number</Field.Label>
								<Input id="card-number" placeholder="1234 5678 9012 3456" required />
								<Field.Description>Enter your 16-digit number.</Field.Description>
							</Field.Field>
							<Field.Field class="col-span-1">
								<Field.Label for="cvv">CVV</Field.Label>
								<Input id="cvv" placeholder="123" required />
							</Field.Field>
						</div>
					</Field.Group>
				</Field.Set>
				<Field.Separator />
				<Field.Set>
					<Field.Legend>Billing Address</Field.Legend>
					<Field.Description>
						The billing address associated with your payment method
					</Field.Description>
					<Field.Group>
						<Field.Field orientation="horizontal">
							<Checkbox id="same-as-shipping" bind:checked={sameAsShipping} />
							<Field.Label for="same-as-shipping" class="font-normal">
								Same as shipping address
							</Field.Label>
						</Field.Field>
					</Field.Group>
				</Field.Set>
				<Field.Separator />
				<Field.Set>
					<Field.Group>
						<Field.Field>
							<Field.Label for="comments">Comments</Field.Label>
							<Textarea
								id="comments"
								placeholder="Add any additional comments"
								class="resize-none"
							/>
						</Field.Field>
					</Field.Group>
				</Field.Set>
				<Field.Field orientation="horizontal">
					<Button type="submit">Submit</Button>
					<Button variant="outline" type="button">Cancel</Button>
				</Field.Field>
			</Field.Group>
		</form>
	</div>
</Story>

<Story name="Validation">
	<div class="w-full max-w-md">
		<Field.Group>
			<Field.Field data-invalid="true">
				<Field.Label for="password">Password</Field.Label>
				<Input id="password" type="password" aria-invalid="true" />
				<Field.Error errors={validationErrors} />
			</Field.Field>
			<Field.Field data-invalid="true">
				<Field.Label for="email-invalid">Email</Field.Label>
				<Input id="email-invalid" type="email" aria-invalid="true" value="not-an-email" />
				<Field.Error>Please enter a valid email address.</Field.Error>
			</Field.Field>
		</Field.Group>
	</div>
</Story>

<Story name="With Separator">
	<div class="w-full max-w-md">
		<Field.Group>
			<Field.Field>
				<Field.Label for="email-login">Email</Field.Label>
				<Input id="email-login" type="email" placeholder="you@example.com" />
			</Field.Field>
			<Field.Separator>Or continue with</Field.Separator>
			<Field.Field>
				<Field.Label for="phone">Phone</Field.Label>
				<Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
			</Field.Field>
		</Field.Group>
	</div>
</Story>
