<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import * as Accordion from "../index.js";


  const { Story } = defineMeta({
    title: "Components/Accordion",
    parameters: { centered: true },
  });
</script>

<script lang="ts">
  let singleValue = $state("item-1");
  let multipleValue = $state(["item-1", "item-3"]);
  let disabledValue = $state("item-1");

  const faqItems = [
    {
      value: "item-1",
      trigger: "Product Information",
      content:
        "Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.",
    },
    {
      value: "item-2",
      trigger: "Shipping Details",
      content:
        "We offer worldwide shipping through trusted courier partners. Standard delivery takes 3–5 business days, while express shipping ensures delivery within 1–2 business days.",
    },
    {
      value: "item-3",
      trigger: "Return Policy",
      content:
        "We stand behind our products with a comprehensive 30-day return policy. Return the item in its original condition for a full refund processed within 48 hours.",
    },
  ];
</script>

{#snippet faqData()}
  {#each faqItems as item (item.value)}
    <Accordion.Item value={item.value}>
      <Accordion.Trigger>{item.trigger}</Accordion.Trigger>
      <Accordion.Content>{item.content}</Accordion.Content>
    </Accordion.Item>
  {/each}
{/snippet}

<Story name="Default">
  <div class="mx-auto w-full max-w-md">
    <Accordion.Root type="single" bind:value={singleValue}>
      {@render faqData()}
    </Accordion.Root>
  </div>
</Story>

<Story name="Multiple">
  <div class="mx-auto w-full max-w-md">
    <Accordion.Root type="multiple" bind:value={multipleValue}>
      {@render faqData()}
    </Accordion.Root>
  </div>
</Story>

<Story name="Disabled Item">
  <div class="mx-auto w-full max-w-md">
    <Accordion.Root type="single" bind:value={disabledValue}>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Available section</Accordion.Trigger>
        <Accordion.Content>
          <p>This panel can be opened and closed.</p>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2" disabled>
        <Accordion.Trigger>Disabled section</Accordion.Trigger>
        <Accordion.Content>
          <p>This content is not reachable while the item is disabled.</p>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Another section</Accordion.Trigger>
        <Accordion.Content>
          <p>Use disabled items for incomplete or restricted sections.</p>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  </div>
</Story>
