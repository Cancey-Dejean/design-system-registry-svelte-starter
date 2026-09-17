<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import * as Accordion from "$lib/components/ui/accordion";
  import { Root as AccordionRoot } from "$lib/components/ui/accordion";

  const { Story } = defineMeta({
    title: "Components/Accordion",
    component: AccordionRoot,
    tags: ["autodocs"],
  });
</script>

<Story name="Single">
  <Accordion.Root type="single" class="w-full max-w-md">
    <Accordion.Item value="item-1">
      <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
      <Accordion.Content>Yes. It follows the WAI-ARIA design pattern.</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item-2">
      <Accordion.Trigger>Is it styled?</Accordion.Trigger>
      <Accordion.Content>Yes. It comes with default styles.</Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</Story>
