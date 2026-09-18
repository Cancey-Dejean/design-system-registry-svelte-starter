<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LogoGallery from '../logo-gallery.svelte';

	const { Story } = defineMeta({
		title: 'Components/Logos'
	});
</script>

<Story name="Logos">
	<div class="mx-auto w-full max-w-6xl p-8">
		<LogoGallery />
	</div>
</Story>
