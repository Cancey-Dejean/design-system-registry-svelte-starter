<script module lang="ts">
 import { defineMeta } from "@storybook/addon-svelte-csf";
 import { expect, within, waitFor } from "storybook/test";
 import { scrollFadeClass, scrollFadeXClass, scrollFadeYClass, scrollFadeEdgeClasses, scrollFadeSizeClasses, scrollFadeNoneClass } from "../scroll-fade.js";
 const items = Array.from({length: 14}, (_, i) => `Item ${i + 1}`);
 const tags = ["Design", "Engineering", "Marketing", "Product", "Research", "Sales", "Support", "Operations"];
 const { Story } = defineMeta({title: "Utilities/Scroll Fade", tags: ["autodocs"], parameters: {centered: true}});
</script>

{#snippet vertical(classes: string, rows: string[] = items)}
 <div class="w-full max-w-xs overflow-hidden rounded-xl border bg-background">
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div class={`${classes} h-44 px-4 py-1`} tabindex="0" role="region" aria-label="Scrollable items">
   <ul class="divide-y">{#each rows as item (item)}<li class="py-2.5 text-sm">{item}</li>{/each}</ul>
  </div>
 </div>
{/snippet}
{#snippet horizontal(classes: string)}
 <div class="w-full max-w-sm overflow-hidden rounded-xl border bg-background">
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div class={`${classes} flex gap-2 p-3`} tabindex="0" role="region" aria-label="Scrollable teams">
   {#each tags as tag (tag)}<span class="shrink-0 rounded-full border bg-muted px-3 py-1 text-xs">{tag}</span>{/each}
  </div>
 </div>
{/snippet}

<Story name="Default" play={async ({canvasElement}) => {
 const scroller = within(canvasElement).getByRole("region", {name: "Scrollable items"});
 await expect(scroller.scrollHeight).toBeGreaterThan(scroller.clientHeight);
 await expect(getComputedStyle(scroller).overflowY).toBe("auto");
 await expect(getComputedStyle(scroller).maskImage).not.toBe("none");
 scroller.scrollTop = scroller.scrollHeight;
 await waitFor(() => expect(scroller.scrollTop).toBeGreaterThan(0));
}}>{@render vertical(scrollFadeClass)}</Story>
<Story name="No Overflow">{@render vertical(scrollFadeClass, items.slice(0, 3))}</Story>
<Story name="Vertical Alias">{@render vertical(scrollFadeYClass)}</Story>
<Story name="Horizontal">{@render horizontal(scrollFadeXClass)}</Story>
<Story name="Edge Fades">
 <div class="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
  {#each Object.entries(scrollFadeEdgeClasses) as [edge, classes] (edge)}
   <div class="flex min-w-0 flex-col gap-2"><p class="font-mono text-xs text-muted-foreground">{edge}</p>
    {#if edge === "top" || edge === "bottom"}{@render vertical(classes)}{:else}{@render horizontal(classes)}{/if}
   </div>
  {/each}
 </div>
</Story>
<Story name="Fade Size">
 <div class="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
  {#each Object.entries(scrollFadeSizeClasses) as [size, classes] (size)}
   <div class="flex min-w-0 flex-col gap-2"><p class="font-mono text-xs text-muted-foreground">scroll-fade-{size}</p>{@render vertical(`${scrollFadeClass} ${classes}`)}</div>
  {/each}
 </div>
</Story>
<Story name="Disabled" play={async ({canvasElement}) => {
 const scroller = within(canvasElement).getByRole("region", {name: "Scrollable items"});
 await expect(getComputedStyle(scroller).maskImage).toBe("none");
 await expect(getComputedStyle(scroller).overflowY).toBe("auto");
}}>{@render vertical(`${scrollFadeClass} ${scrollFadeNoneClass}`)}</Story>
<Story name="RTL"><div dir="rtl" class="w-full max-w-sm">{@render horizontal(scrollFadeXClass)}</div></Story>
