<script lang="ts">
	import LinkSpread from './link-spread.svelte';
</script>

<article class="relative rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
	<h3 class="font-medium">Fully clickable card</h3>
	<p class="mt-1 text-sm text-muted-foreground">The whole surface links to the details page.</p>
	<LinkSpread href="#" aria-label="Open details" />
</article>
