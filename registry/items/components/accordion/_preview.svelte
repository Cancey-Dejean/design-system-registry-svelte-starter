<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion";
</script>

<Accordion.Root type="single" class="w-full max-w-md">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>Yes. It follows the WAI-ARIA design pattern.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Is it styled?</Accordion.Trigger>
    <Accordion.Content>Yes. It comes with default styles that match the rest of the system.</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
