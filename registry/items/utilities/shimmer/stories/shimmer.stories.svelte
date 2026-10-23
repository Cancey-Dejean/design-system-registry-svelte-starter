<script module lang="ts">
 import { defineMeta } from "@storybook/addon-svelte-csf";
 import { expect, within } from "storybook/test";
 import { shimmerClass, shimmerOnceClass, shimmerReverseClass, shimmerNoneClass, shimmerDurationClasses, shimmerSpreadClasses, shimmerAngleClasses, shimmerColorClasses } from "../shimmer.js";
 import { Button } from "../../../components/button/index.js";
 const { Story } = defineMeta({title: "Utilities/Shimmer", tags: ["autodocs"], parameters: {centered: true}});
</script>
<script lang="ts">
 let replay = $state(0);
</script>

<Story name="Default" play={async ({canvasElement}) => {
 const text = within(canvasElement).getByText("Generating response…");
 const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 await expect(getComputedStyle(text).animationName).toBe(reduced ? "none" : "tw-shimmer");
}}><p class={`${shimmerClass} text-sm text-muted-foreground`}>Generating response…</p></Story>
<Story name="Color">
 <div class="flex flex-col gap-4 text-sm text-muted-foreground">
  {#each Object.entries(shimmerColorClasses) as [name, classes] (name)}<p class={`${shimmerClass} ${classes}`}>Generating response… ({name})</p>{/each}
 </div>
</Story>
<Story name="Duration">
 <div class="flex flex-col gap-4 text-sm text-muted-foreground">
  {#each Object.entries(shimmerDurationClasses) as [duration, classes] (duration)}<p class={`${shimmerClass} ${classes}`}>Generating response… ({duration} ms)</p>{/each}
 </div>
</Story>
<Story name="Spread">
 <div class="flex flex-col gap-4 text-sm text-muted-foreground">
  {#each Object.entries(shimmerSpreadClasses) as [spread, classes] (spread)}<p class={`${shimmerClass} ${classes}`}>Generating response… (spread {spread})</p>{/each}
 </div>
</Story>
<Story name="Angle">
 <div class="flex flex-col gap-4 text-sm text-muted-foreground">
  {#each Object.entries(shimmerAngleClasses) as [angle, classes] (angle)}<p class={`${shimmerClass} ${classes}`}>Generating response… ({angle}°)</p>{/each}
 </div>
</Story>
<Story name="Reverse"><p class={`${shimmerReverseClass} text-sm text-muted-foreground`}>Generating response…</p></Story>
<Story name="Play Once">
 <div class="flex flex-col items-center gap-4 text-sm">
  {#key replay}<p class={`${shimmerOnceClass} ${shimmerDurationClasses[1100]}`}>Response generated.</p>{/key}
  <Button variant="outline" size="sm" onclick={() => replay += 1}>Replay</Button>
 </div>
</Story>
<Story name="Disabled" play={async ({canvasElement}) => {
 const text = within(canvasElement).getByText("Response generated.");
 await expect(getComputedStyle(text).backgroundImage).toBe("none");
 await expect(getComputedStyle(text).webkitTextFillColor).not.toBe("rgba(0, 0, 0, 0)");
}}><p class={`${shimmerClass} ${shimmerNoneClass} text-sm text-muted-foreground`}>Response generated.</p></Story>
<Story name="RTL"><p dir="rtl" class={`${shimmerClass} text-sm text-muted-foreground`}>جارٍ إنشاء الرد…</p></Story>
