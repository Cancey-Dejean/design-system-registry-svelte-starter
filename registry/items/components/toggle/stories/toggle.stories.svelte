<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import BoldIcon from '@lucide/svelte/icons/bold';
	import ItalicIcon from '@lucide/svelte/icons/italic';
	import UnderlineIcon from '@lucide/svelte/icons/underline';
	import { Toggle } from '../index.js';


	const { Story } = defineMeta({
		title: 'Components/Toggle',
		parameters: { centered: true }
	});
</script>

<script lang="ts">
	let pressed = $state(false);
	let bold = $state(true);
</script>

<Story name="Default">
	<Toggle aria-label="Toggle italic">
		<ItalicIcon />
	</Toggle>
</Story>

<Story name="Outline">
	<Toggle variant="outline" aria-label="Toggle italic">
		<ItalicIcon />
	</Toggle>
</Story>

<Story name="With Text">
	<Toggle aria-label="Toggle italic">
		<ItalicIcon />
		Italic
	</Toggle>
</Story>

<Story name="Sizes">
	<div class="flex items-center gap-2">
		<Toggle size="sm" aria-label="Toggle italic sm">
			<ItalicIcon />
		</Toggle>
		<Toggle size="default" aria-label="Toggle italic default">
			<ItalicIcon />
		</Toggle>
		<Toggle size="lg" aria-label="Toggle italic lg">
			<ItalicIcon />
		</Toggle>
	</div>
</Story>

<Story name="Pressed">
	<div class="flex items-center gap-2">
		<p class="text-sm text-muted-foreground">Bold: {bold ? 'on' : 'off'}</p>
		<Toggle bind:pressed={bold} aria-label="Toggle bold">
			<BoldIcon />
			Bold
		</Toggle>
	</div>
</Story>

<Story name="Controlled">
	<div class="flex items-center gap-2">
		<p class="text-sm text-muted-foreground">{pressed ? 'On' : 'Off'}</p>
		<Toggle bind:pressed variant="outline" aria-label="Toggle underline">
			<UnderlineIcon />
		</Toggle>
	</div>
</Story>

<Story name="Disabled">
	<div class="flex items-center gap-2">
		<Toggle disabled aria-label="Toggle underline disabled">
			<UnderlineIcon />
		</Toggle>
		<Toggle pressed disabled aria-label="Toggle underline disabled pressed">
			<UnderlineIcon />
		</Toggle>
	</div>
</Story>
