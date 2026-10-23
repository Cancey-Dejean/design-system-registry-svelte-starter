<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import DotCanvas from "../dot-canvas.svelte";
  import { DOT_CANVAS_SIZES, type DotCanvasProps } from "../dot-canvas.types.js";

  const { Story } = defineMeta({
    title: "Utilities/Dot Canvas",
    component: DotCanvas,
    tags: ["autodocs"],
    parameters: { centered: true },
    args: { size: 24 },
    argTypes: {
      size: { control: "select", options: DOT_CANVAS_SIZES },
      class: { control: "text" },
    },
  });
</script>

{#snippet template(args: DotCanvasProps)}
  <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl border">
    <DotCanvas {...args} />
    <p class="relative z-10 p-6 text-sm text-muted-foreground">Content sits above the dots.</p>
  </div>
{/snippet}

<Story name="Default" {template} />
<Story name="Dense" args={{ size: 12 }} {template} />
<Story name="Medium" args={{ size: 20 }} {template} />
<Story name="Radial fade" args={{ class: "mask-[radial-gradient(ellipse_at_center,transparent_20%,black_85%)]" }} {template} />
