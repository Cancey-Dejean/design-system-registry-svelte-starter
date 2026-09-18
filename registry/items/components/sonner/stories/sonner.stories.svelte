<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { toast } from 'svelte-sonner';
	import Button from '../../button/button.svelte';
	import { Toaster } from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Sonner',
		decorators: [() => StoryWrapper]
	});
</script>

{#snippet toastActions()}
	<div class="flex flex-wrap items-center justify-center gap-2">
		<Button variant="outline" onclick={() => toast('Event has been created')}>Default</Button>
		<Button variant="outline" onclick={() => toast.success('Event has been created')}>
			Success
		</Button>
		<Button
			variant="outline"
			onclick={() => toast.info('Be at the area 10 minutes before the event time')}
		>
			Info
		</Button>
		<Button
			variant="outline"
			onclick={() => toast.warning('Event start time cannot be earlier than 8am')}
		>
			Warning
		</Button>
		<Button variant="outline" onclick={() => toast.error('Event has not been created')}>
			Error
		</Button>
		<Button
			variant="outline"
			onclick={() => {
				toast.promise<{ name: string }>(
					() => new Promise((resolve) => setTimeout(() => resolve({ name: 'Event' }), 2000)),
					{
						loading: 'Loading...',
						success: (data) => `${data.name} has been created`,
						error: 'Error'
					}
				);
			}}
		>
			Promise
		</Button>
	</div>
{/snippet}

<Story name="Default">
	<div class="flex min-h-40 flex-col items-center justify-center gap-4">
		<Toaster />
		{@render toastActions()}
	</div>
</Story>

<Story name="With Action">
	<div class="flex min-h-40 items-center justify-center">
		<Toaster />
		<Button
			variant="outline"
			onclick={() =>
				toast('Event has been created', {
					description: 'Sunday, December 03, 2023 at 9:00 AM',
					action: {
						label: 'Undo',
						onClick: () => console.info('Undo')
					}
				})}
		>
			Show Toast
		</Button>
	</div>
</Story>

<Story name="Top Center">
	<div class="flex min-h-40 items-center justify-center">
		<Toaster position="top-center" />
		<Button variant="outline" onclick={() => toast('Toast from top center')}>Top center</Button>
	</div>
</Story>
