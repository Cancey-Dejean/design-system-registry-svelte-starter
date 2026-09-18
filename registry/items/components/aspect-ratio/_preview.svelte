<script lang="ts">
	import { AspectRatio } from './index.js';
</script>

<div class="w-full max-w-md">
	<AspectRatio ratio={16 / 9} class="overflow-hidden rounded-lg bg-muted">
		<img
			src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
			alt="Gray by Drew Beamer"
			class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
		/>
	</AspectRatio>
</div>
