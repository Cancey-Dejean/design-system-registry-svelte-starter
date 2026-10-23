<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import * as Card from '../index.js';
	import Button from '../../button/button.svelte';


	const { Story } = defineMeta({
		title: 'Components/Card',
		parameters: { centered: true }
	});
</script>

<Story name="Default">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title>Card Title</Card.Title>
			<Card.Description>Card Description</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>Card Content</p>
		</Card.Content>
		<Card.Footer>
			<p>Card Footer</p>
		</Card.Footer>
	</Card.Root>
</Story>

<Story name="With Action">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title>Login to your account</Card.Title>
			<Card.Description>Enter your email below to login to your account</Card.Description>
			<Card.Action>
				<Button variant="ghost">Sign Up</Button>
			</Card.Action>
		</Card.Header>
		<Card.Content>
			<p class="text-sm text-muted-foreground">Form fields go here.</p>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Button class="w-full">Login</Button>
			<Button variant="outline" class="w-full">Login with Google</Button>
		</Card.Footer>
	</Card.Root>
</Story>

<Story name="Small">
	<Card.Root size="sm" class="w-full max-w-sm">
		<Card.Header>
			<Card.Title>Small Card</Card.Title>
			<Card.Description>Uses the compact size variant.</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>Less spacing between sections.</p>
		</Card.Content>
	</Card.Root>
</Story>

<Story name="With Image">
	<Card.Root class="relative w-full max-w-sm pt-0">
		<img
			src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
			alt="Event cover"
			class="aspect-video w-full object-cover"
		/>
		<Card.Header>
			<Card.Title>Design systems meetup</Card.Title>
			<Card.Description>
				A practical talk on component APIs, accessibility, and shipping faster.
			</Card.Description>
		</Card.Header>
		<Card.Footer>
			<Button class="w-full">View Event</Button>
		</Card.Footer>
	</Card.Root>
</Story>

<Story name="Edge Content">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title>Terms of Service</Card.Title>
			<Card.Description>Review the terms before accepting the agreement.</Card.Description>
		</Card.Header>
		<Card.Content class="-mb-(--card-spacing)">
			<div
				class="-mx-(--card-spacing) max-h-48 space-y-4 overflow-y-auto border-t bg-muted/50 px-(--card-spacing) py-4 text-sm leading-relaxed"
			>
				<p>
					These terms govern your use of the workspace, including access to shared documents,
					project files, and collaboration tools.
				</p>
				<p>
					You are responsible for the content you upload and for ensuring that your team has the
					appropriate permissions to view or edit it.
				</p>
				<p>
					By continuing, you agree to keep your account credentials secure and to follow your
					organization's acceptable use policies.
				</p>
			</div>
		</Card.Content>
		<Card.Footer class="justify-end gap-2">
			<Button variant="outline">Decline</Button>
			<Button>Accept</Button>
		</Card.Footer>
	</Card.Root>
</Story>
