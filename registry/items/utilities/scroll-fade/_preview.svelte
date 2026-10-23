<script lang="ts">
 import { scrollFadeClass, scrollFadeXClass } from "./scroll-fade.js";
 const items = Array.from({length: 12}, (_, i) => `Item ${i + 1}`);
 const tags = ["Design", "Engineering", "Marketing", "Product", "Research", "Sales", "Support", "Operations"];
</script>

<div class="flex w-full max-w-md flex-col gap-6">
 <div class="overflow-hidden rounded-xl border">
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div class={`${scrollFadeClass} max-h-40 px-4 py-2`} tabindex="0" role="region" aria-label="Scrollable items">
   <ul class="divide-y">{#each items as item (item)}<li class="py-2 text-sm">{item}</li>{/each}</ul>
  </div>
 </div>
 <div class="overflow-hidden rounded-xl border">
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div class={`${scrollFadeXClass} flex gap-2 px-3 py-3`} tabindex="0" role="region" aria-label="Scrollable teams">
   {#each tags as tag (tag)}<span class="shrink-0 rounded-full border bg-muted px-3 py-1 text-xs font-medium">{tag}</span>{/each}
  </div>
 </div>
</div>
