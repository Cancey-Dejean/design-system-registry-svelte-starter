<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import * as Card from "$lib/components/ui/card";
  import { Root as CardRoot } from "$lib/components/ui/card";

  const { Story } = defineMeta({
    title: "Components/Card",
    component: CardRoot,
    tags: ["autodocs"],
  });
</script>

<Story name="Default">
  <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title>Card title</Card.Title>
      <Card.Description>Card description.</Card.Description>
    </Card.Header>
    <Card.Content>Card content.</Card.Content>
  </Card.Root>
</Story>
