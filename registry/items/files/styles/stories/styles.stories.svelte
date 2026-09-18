<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  const { Story } = defineMeta({
    title: "Utilities/Styles",
    tags: ["autodocs"],
  });

  const presets = [
    { name: "Default", swatch: "oklch(0.205 0 0)" },
    { name: "Secondary", swatch: "oklch(0.72 0.19 50)" },
    { name: "Tertiary", swatch: "oklch(0.55 0.24 295)" },
  ];
</script>

<Story name="Default">
  <div class="flex flex-wrap items-center justify-center gap-6">
    {#each presets as preset (preset.name)}
      <div class="flex flex-col items-center gap-2">
        <span
          class="size-10 rounded-full border"
          style={`background-color: ${preset.swatch}`}
          aria-hidden="true"
        ></span>
        <span class="text-xs text-muted-foreground">{preset.name}</span>
      </div>
    {/each}
  </div>
</Story>
