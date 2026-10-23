<script lang="ts">
 import { shimmerClass, shimmerColorClasses, shimmerDurationClasses } from "./shimmer.js";
</script>

<div class="flex flex-col items-center gap-4 text-sm text-muted-foreground">
 <p class={shimmerClass}>Generating response…</p>
 <p class={`${shimmerClass} ${shimmerColorClasses.brand}`}>Thinking through the details…</p>
 <p class={`${shimmerClass} ${shimmerDurationClasses[1000]}`}>Preparing your workspace…</p>
</div>
