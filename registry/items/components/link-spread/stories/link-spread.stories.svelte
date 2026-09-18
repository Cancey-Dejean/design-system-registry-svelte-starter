<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LinkSpread from '../link-spread.svelte';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Link Spread',
		component: LinkSpread,
		decorators: [() => StoryWrapper],
		argTypes: {
			href: {
				control: 'text',
				description: 'The URL the container should navigate to'
			},
			newTab: {
				control: 'boolean',
				description: 'Whether the link should open in a new tab',
				table: {
					defaultValue: { summary: 'false' }
				}
			},
			'aria-label': {
				control: 'text',
				description: 'Accessible name for the link (required; the anchor has no visible text)'
			},
			class: { control: false },
			target: { table: { disable: true } }
		},
		args: {
			href: 'https://example.com',
			newTab: false,
			'aria-label': 'Open details'
		}
	});
</script>

{#snippet cardTemplate(args)}
	<article
		class="relative w-full max-w-sm rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:bg-muted/40"
	>
		<h3 class="font-medium">Fully clickable card</h3>
		<p class="mt-1 text-sm text-muted-foreground">
			The whole surface links via LinkSpread. Hover and click anywhere on the card.
		</p>
		<LinkSpread {...args} />
	</article>
{/snippet}

<Story name="Default" template={cardTemplate} />

<Story
	name="New Tab"
	args={{ newTab: true, href: 'https://example.com', 'aria-label': 'Open docs in a new tab' }}
	template={cardTemplate}
/>

<Story
	name="Without Href"
	args={{ href: undefined, 'aria-label': 'No destination' }}
	argTypes={{ href: { table: { disable: true } } }}
>
	{#snippet template(args)}
		<article
			class="relative w-full max-w-sm rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
		>
			<h3 class="font-medium">Not clickable yet</h3>
			<p class="mt-1 text-sm text-muted-foreground">
				Without href, LinkSpread renders but uses pointer-events-none.
			</p>
			<LinkSpread {...args} />
		</article>
	{/snippet}
</Story>

<Story name="Card Grid">
	{#snippet template()}
		<div class="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
			{#each ['Alpha', 'Beta', 'Gamma', 'Delta'] as title (title)}
				<article
					class="relative rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:bg-muted/40"
				>
					<h3 class="font-medium">{title}</h3>
					<p class="mt-1 text-sm text-muted-foreground">Entire tile navigates as one target.</p>
					<LinkSpread href={`#${title.toLowerCase()}`} aria-label={`Open ${title}`} />
				</article>
			{/each}
		</div>
	{/snippet}
</Story>
