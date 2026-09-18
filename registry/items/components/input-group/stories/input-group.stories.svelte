<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SearchIcon from '@lucide/svelte/icons/search';
	import MailIcon from '@lucide/svelte/icons/mail';
	import CreditCardIcon from '@lucide/svelte/icons/credit-card';
	import CheckIcon from '@lucide/svelte/icons/check';
	import InfoIcon from '@lucide/svelte/icons/info';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import ArrowUpIcon from '@lucide/svelte/icons/arrow-up';
	import * as InputGroup from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Input Group',
		decorators: [() => StoryWrapper]
	});
</script>

<Story name="Default">
	<div class="grid w-full max-w-sm gap-6">
		<InputGroup.Root>
			<InputGroup.Input placeholder="Search..." />
			<InputGroup.Addon>
				<SearchIcon />
			</InputGroup.Addon>
			<InputGroup.Addon align="inline-end">12 results</InputGroup.Addon>
		</InputGroup.Root>
	</div>
</Story>

<Story name="Icon">
	<div class="grid w-full max-w-sm gap-6">
		<InputGroup.Root>
			<InputGroup.Input placeholder="Search..." />
			<InputGroup.Addon>
				<SearchIcon />
			</InputGroup.Addon>
		</InputGroup.Root>
		<InputGroup.Root>
			<InputGroup.Input type="email" placeholder="Enter your email" />
			<InputGroup.Addon>
				<MailIcon />
			</InputGroup.Addon>
		</InputGroup.Root>
		<InputGroup.Root>
			<InputGroup.Input placeholder="Card number" />
			<InputGroup.Addon>
				<CreditCardIcon />
			</InputGroup.Addon>
		</InputGroup.Root>
		<InputGroup.Root>
			<InputGroup.Input placeholder="@shadcn" />
			<InputGroup.Addon align="inline-end">
				<div
					class="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground"
				>
					<CheckIcon class="size-3" />
				</div>
			</InputGroup.Addon>
		</InputGroup.Root>
	</div>
</Story>

<Story name="Text">
	<div class="grid w-full max-w-sm gap-6">
		<InputGroup.Root>
			<InputGroup.Input placeholder="example.com" class="!ps-1" />
			<InputGroup.Addon>
				<InputGroup.Text>https://</InputGroup.Text>
			</InputGroup.Addon>
		</InputGroup.Root>
		<InputGroup.Root>
			<InputGroup.Input placeholder="0.00" />
			<InputGroup.Addon>
				<InputGroup.Text>$</InputGroup.Text>
			</InputGroup.Addon>
			<InputGroup.Addon align="inline-end">
				<InputGroup.Text>USD</InputGroup.Text>
			</InputGroup.Addon>
		</InputGroup.Root>
	</div>
</Story>

<Story name="Button">
	<div class="grid w-full max-w-sm gap-6">
		<InputGroup.Root>
			<InputGroup.Input placeholder="Search..." />
			<InputGroup.Addon>
				<SearchIcon />
			</InputGroup.Addon>
			<InputGroup.Addon align="inline-end">
				<InputGroup.Button>Search</InputGroup.Button>
			</InputGroup.Addon>
		</InputGroup.Root>
		<InputGroup.Root>
			<InputGroup.Input placeholder="example.com" class="!ps-1" />
			<InputGroup.Addon>
				<InputGroup.Text>https://</InputGroup.Text>
			</InputGroup.Addon>
			<InputGroup.Addon align="inline-end">
				<InputGroup.Button class="rounded-full" size="icon-xs">
					<InfoIcon />
				</InputGroup.Button>
			</InputGroup.Addon>
		</InputGroup.Root>
	</div>
</Story>

<Story name="Textarea">
	<div class="w-full max-w-sm">
		<InputGroup.Root>
			<InputGroup.Textarea placeholder="Ask, Search or Chat..." />
			<InputGroup.Addon align="block-end">
				<InputGroup.Button variant="outline" class="rounded-full" size="icon-xs">
					<PlusIcon />
				</InputGroup.Button>
				<InputGroup.Text class="ms-auto">52% used</InputGroup.Text>
				<InputGroup.Button variant="default" class="rounded-full" size="icon-xs">
					<ArrowUpIcon />
					<span class="sr-only">Send</span>
				</InputGroup.Button>
			</InputGroup.Addon>
		</InputGroup.Root>
	</div>
</Story>

<Story name="Disabled">
	<div class="w-full max-w-sm">
		<InputGroup.Root>
			<InputGroup.Input placeholder="Email" disabled />
			<InputGroup.Addon>
				<MailIcon />
			</InputGroup.Addon>
		</InputGroup.Root>
	</div>
</Story>
