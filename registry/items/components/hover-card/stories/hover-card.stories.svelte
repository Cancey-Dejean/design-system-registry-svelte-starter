<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CalendarDaysIcon from '@lucide/svelte/icons/calendar-days';
	import * as Avatar from '../../avatar/index.js';
	import * as HoverCard from '../index.js';


	const { Story } = defineMeta({
		title: 'Components/Hover Card',
		parameters: { centered: true }
	});
</script>

<script lang="ts">
	let open = $state(false);
</script>

{#snippet profileCard()}
	<div class="flex justify-between space-x-4">
		<Avatar.Root>
			<Avatar.Image src="https://github.com/sveltejs.png" />
			<Avatar.Fallback>SK</Avatar.Fallback>
		</Avatar.Root>
		<div class="space-y-1">
			<h4 class="text-sm font-semibold">@sveltejs</h4>
			<p class="text-sm">Cybernetically enhanced web apps.</p>
			<div class="flex items-center pt-2">
				<CalendarDaysIcon class="me-2 size-4 opacity-70" />
				<span class="text-xs text-muted-foreground">Joined September 2022</span>
			</div>
		</div>
	</div>
{/snippet}

<Story name="Default">
	<div class="flex min-h-40 items-center justify-center">
		<HoverCard.Root>
			<HoverCard.Trigger
				href="https://github.com/sveltejs"
				target="_blank"
				rel="noreferrer noopener"
				class="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
			>
				@sveltejs
			</HoverCard.Trigger>
			<HoverCard.Content class="w-80">
				{@render profileCard()}
			</HoverCard.Content>
		</HoverCard.Root>
	</div>
</Story>

<Story name="Simple">
	<div class="flex min-h-40 items-center justify-center">
		<HoverCard.Root>
			<HoverCard.Trigger
				class="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8"
			>
				Hover
			</HoverCard.Trigger>
			<HoverCard.Content>SvelteKit - Web development, streamlined</HoverCard.Content>
		</HoverCard.Root>
	</div>
</Story>

<Story name="Controlled">
	<div class="flex min-h-40 flex-col items-center justify-center gap-4">
		<p class="text-sm text-muted-foreground">
			Hover card is {open ? 'open' : 'closed'}
		</p>
		<HoverCard.Root bind:open>
			<HoverCard.Trigger
				href="https://github.com/sveltejs"
				target="_blank"
				rel="noreferrer noopener"
				class="rounded-sm underline-offset-4 hover:underline"
			>
				@sveltejs
			</HoverCard.Trigger>
			<HoverCard.Content class="w-80">
				{@render profileCard()}
			</HoverCard.Content>
		</HoverCard.Root>
	</div>
</Story>
