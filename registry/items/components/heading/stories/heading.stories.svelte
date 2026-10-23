<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Heading from "../heading.svelte";
  import {
    HEADING_LEVELS,
    HEADING_SIZES,
    HEADING_TONES,
    HEADING_WEIGHTS,
  } from "../heading.variants";


  const { Story } = defineMeta({
    title: "Components/Heading",
    component: Heading,
    parameters: { centered: true },
    argTypes: {
      level: {
        description: "The semantic heading level (h1–h6)",
        control: "select",
        options: HEADING_LEVELS,
      },
      size: {
        description: "Override the visual size independently from level",
        control: "select",
        options: HEADING_SIZES,
      },
      weight: {
        description: "The font weight of the heading",
        control: "select",
        options: HEADING_WEIGHTS,
      },
      tone: {
        description: "The color tone of the heading",
        control: "select",
        options: HEADING_TONES,
      },
      class: { control: false },
    },
    args: {
      level: "2",
      weight: "semibold",
      tone: "default",
      size: "xl",
    },
  });
</script>

<Story name="Default">

    Heading

</Story>

<Story
  name="Sizes"
  argTypes={{
    level: { table: { disable: true } },
    size: { table: { disable: true } },
  }}
>
  <div class="flex flex-col gap-4">
    {#each HEADING_SIZES as size (size)}
      <Heading level={2} {size}>Size: {size}</Heading>
    {/each}
  </div>
</Story>

<Story name="Weights" argTypes={{ weight: { table: { disable: true } } }}>
  <div class="flex flex-col gap-4">
    {#each HEADING_WEIGHTS as weight (weight)}
      <Heading {weight}>Weight: {weight}</Heading>
    {/each}
  </div>
</Story>

<Story name="Tones" argTypes={{ tone: { table: { disable: true } } }}>
  <div class="flex flex-col gap-4">
    {#each HEADING_TONES as tone (tone)}
      <Heading {tone}>Tone: {tone}</Heading>
    {/each}
  </div>
</Story>
