<script lang="ts">
  import * as Accordion from "$registry/items/components/accordion/index.js";

  let value = $state("item-1");
</script>

<div class="w-full max-w-md">
  <Accordion.Root type="single" bind:value>
    <Accordion.Item value="item-1">
      <Accordion.Trigger>Product Information</Accordion.Trigger>
      <Accordion.Content>
        <p>
          Our flagship product combines cutting-edge technology with sleek
          design. Built with premium materials, it offers unparalleled
          performance and reliability.
        </p>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item-2">
      <Accordion.Trigger>Shipping Details</Accordion.Trigger>
      <Accordion.Content>
        <p>
          We offer worldwide shipping through trusted courier partners. Standard
          delivery takes 3–5 business days.
        </p>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item-3">
      <Accordion.Trigger>Return Policy</Accordion.Trigger>
      <Accordion.Content>
        <p>
          We stand behind our products with a comprehensive 30-day return
          policy. Return the item in its original condition for a full refund.
        </p>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</div>
