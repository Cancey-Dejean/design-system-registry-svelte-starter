<script lang="ts">
	import LinkText from './link-text.svelte';
</script>

<div class="flex items-center gap-4">
	<LinkText href="#">Internal link</LinkText>
	<LinkText href="https://example.com" external tone="muted">External link</LinkText>
</div>
