<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { CarouselAPI } from '../context.js';
	import * as Card from '../../card/index.js';
	import * as Carousel from '../index.js';


	const { Story } = defineMeta({
		title: 'Components/Carousel',
		parameters: { centered: true }
	});
</script>

<script lang="ts">
	let api = $state<CarouselAPI>();
	let current = $state(0);
	const count = $derived(api ? api.scrollSnapList().length : 0);

  function trackSelection() {
    const currentApi = api;
    if (!currentApi) return;
    const onSelect = () => { current = currentApi.selectedScrollSnap() + 1; };
    onSelect();
    currentApi.on("select", onSelect);
    return () => { currentApi.off("select", onSelect); };
  }

</script>

{#snippet slides(sizeClass = 'text-4xl')}
	{#each Array(5) as _, i (i)}
		<Carousel.Item>
			<div class="p-1">
				<Card.Root>
					<Card.Content class="flex aspect-square items-center justify-center p-6">
						<span class="font-semibold {sizeClass}">{i + 1}</span>
					</Card.Content>
				</Card.Root>
			</div>
		</Carousel.Item>
	{/each}
{/snippet}

<Story name="Default">
	<div class="mx-auto w-full max-w-xs">
		<Carousel.Root class="w-full">
			<Carousel.Content>
				{@render slides()}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
</Story>

<Story name="Sizes">
	<div class="mx-auto w-full max-w-sm">
		<Carousel.Root opts={{ align: 'start' }} class="w-full">
			<Carousel.Content>
				{#each Array(5) as _, i (i)}
					<Carousel.Item class="md:basis-1/2 lg:basis-1/3">
						<div class="p-1">
							<Card.Root>
								<Card.Content class="flex aspect-square items-center justify-center p-6">
									<span class="text-3xl font-semibold">{i + 1}</span>
								</Card.Content>
							</Card.Root>
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
</Story>

<Story name="Spacing">
	<div class="mx-auto w-full max-w-sm">
		<Carousel.Root class="w-full">
			<Carousel.Content class="-ms-1">
				{#each Array(5) as _, i (i)}
					<Carousel.Item class="ps-1 md:basis-1/2 lg:basis-1/3">
						<div class="p-1">
							<Card.Root>
								<Card.Content class="flex aspect-square items-center justify-center p-6">
									<span class="text-2xl font-semibold">{i + 1}</span>
								</Card.Content>
							</Card.Root>
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
</Story>

<Story name="Vertical">
	<div class="mx-auto w-full max-w-xs">
		<Carousel.Root opts={{ align: 'start' }} orientation="vertical" class="w-full">
			<Carousel.Content class="-mt-1 h-[200px]">
				{#each Array(5) as _, i (i)}
					<Carousel.Item class="pt-1 md:basis-1/2">
						<div class="p-1">
							<Card.Root>
								<Card.Content class="flex items-center justify-center p-6">
									<span class="text-3xl font-semibold">{i + 1}</span>
								</Card.Content>
							</Card.Root>
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
</Story>

<Story name="With API">
	<div class="mx-auto w-full max-w-xs">
		<Carousel.Root setApi={(emblaApi) => (api = emblaApi)} class="w-full">
			<Carousel.Content>
				{@render slides()}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
		<div {@attach () => trackSelection()} class="py-2 text-center text-sm text-muted-foreground">
			Slide {current} of {count}
		</div>
	</div>
</Story>
