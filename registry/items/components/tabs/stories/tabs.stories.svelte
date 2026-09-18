<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import * as Card from '../../card/index.js';
	import Button from '../../button/button.svelte';
	import { Input } from '../../input/index.js';
	import { Label } from '../../label/index.js';
	import * as Tabs from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Tabs',
		decorators: [() => StoryWrapper]
	});
</script>

<script lang="ts">
	let value = $state('account');
</script>

<Story name="Default">
	<Tabs.Root value="account" class="w-[400px]">
		<Tabs.List>
			<Tabs.Trigger value="account">Account</Tabs.Trigger>
			<Tabs.Trigger value="password">Password</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="account">Make changes to your account here.</Tabs.Content>
		<Tabs.Content value="password">Change your password here.</Tabs.Content>
	</Tabs.Root>
</Story>

<Story name="Controlled">
	<div class="grid w-[400px] gap-3">
		<p class="text-sm text-muted-foreground">Active: {value}</p>
		<Tabs.Root bind:value>
			<Tabs.List>
				<Tabs.Trigger value="account">Account</Tabs.Trigger>
				<Tabs.Trigger value="password">Password</Tabs.Trigger>
				<Tabs.Trigger value="billing">Billing</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="account">Account settings panel.</Tabs.Content>
			<Tabs.Content value="password">Password settings panel.</Tabs.Content>
			<Tabs.Content value="billing">Billing settings panel.</Tabs.Content>
		</Tabs.Root>
	</div>
</Story>

<Story name="Line">
	<Tabs.Root value="overview" class="w-[400px]">
		<Tabs.List variant="line">
			<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
			<Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
			<Tabs.Trigger value="reports">Reports</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="overview" class="pt-2">Overview content.</Tabs.Content>
		<Tabs.Content value="analytics" class="pt-2">Analytics content.</Tabs.Content>
		<Tabs.Content value="reports" class="pt-2">Reports content.</Tabs.Content>
	</Tabs.Root>
</Story>

<Story name="Vertical">
	<Tabs.Root value="account" orientation="vertical" class="w-[480px]">
		<Tabs.List>
			<Tabs.Trigger value="account">Account</Tabs.Trigger>
			<Tabs.Trigger value="password">Password</Tabs.Trigger>
			<Tabs.Trigger value="team">Team</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="account">Account settings.</Tabs.Content>
		<Tabs.Content value="password">Password settings.</Tabs.Content>
		<Tabs.Content value="team">Team settings.</Tabs.Content>
	</Tabs.Root>
</Story>

<Story name="With Card">
	<div class="w-full max-w-sm">
		<Tabs.Root value="account">
			<Tabs.List class="grid w-full grid-cols-2">
				<Tabs.Trigger value="account">Account</Tabs.Trigger>
				<Tabs.Trigger value="password">Password</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="account">
				<Card.Root>
					<Card.Header>
						<Card.Title>Account</Card.Title>
						<Card.Description>
							Make changes to your account here. Click save when you're done.
						</Card.Description>
					</Card.Header>
					<Card.Content class="grid gap-6">
						<div class="grid gap-3">
							<Label for="tabs-demo-name">Name</Label>
							<Input id="tabs-demo-name" value="Pedro Duarte" />
						</div>
						<div class="grid gap-3">
							<Label for="tabs-demo-username">Username</Label>
							<Input id="tabs-demo-username" value="@peduarte" />
						</div>
					</Card.Content>
					<Card.Footer>
						<Button>Save changes</Button>
					</Card.Footer>
				</Card.Root>
			</Tabs.Content>
			<Tabs.Content value="password">
				<Card.Root>
					<Card.Header>
						<Card.Title>Password</Card.Title>
						<Card.Description>
							Change your password here. After saving, you'll be logged out.
						</Card.Description>
					</Card.Header>
					<Card.Content class="grid gap-6">
						<div class="grid gap-3">
							<Label for="tabs-demo-current">Current password</Label>
							<Input id="tabs-demo-current" type="password" />
						</div>
						<div class="grid gap-3">
							<Label for="tabs-demo-new">New password</Label>
							<Input id="tabs-demo-new" type="password" />
						</div>
					</Card.Content>
					<Card.Footer>
						<Button>Save password</Button>
					</Card.Footer>
				</Card.Root>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</Story>

<Story name="Disabled Trigger">
	<Tabs.Root value="account" class="w-[400px]">
		<Tabs.List>
			<Tabs.Trigger value="account">Account</Tabs.Trigger>
			<Tabs.Trigger value="password" disabled>Password</Tabs.Trigger>
			<Tabs.Trigger value="team">Team</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="account">Account panel (password tab is disabled).</Tabs.Content>
		<Tabs.Content value="team">Team panel.</Tabs.Content>
	</Tabs.Root>
</Story>
