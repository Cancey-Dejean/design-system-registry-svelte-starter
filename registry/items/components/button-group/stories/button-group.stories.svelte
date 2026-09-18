<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import MinusIcon from "@lucide/svelte/icons/minus";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
  import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
  import * as ButtonGroup from "../index.js";
  import Button from "$registry/items/components/button/button.svelte";
  import StoryWrapper from "$lib/components/utility/story-wrapper.svelte";

  const { Story } = defineMeta({
    title: "Components/Button Group",
    decorators: [() => StoryWrapper],
  });
</script>

<Story name="Default">
  <ButtonGroup.Root aria-label="Actions">
    <Button variant="outline">Archive</Button>
    <Button variant="outline">Report</Button>
    <Button variant="outline">Snooze</Button>
  </ButtonGroup.Root>
</Story>

<Story name="Orientation">
  <ButtonGroup.Root
    orientation="vertical"
    aria-label="Media controls"
    class="h-fit"
  >
    <Button variant="outline" size="icon">
      <PlusIcon />
    </Button>
    <Button variant="outline" size="icon">
      <MinusIcon />
    </Button>
  </ButtonGroup.Root>
</Story>

<Story name="Sizes">
  <div class="flex flex-col items-start gap-6">
    <ButtonGroup.Root>
      <Button variant="outline" size="sm">Small</Button>
      <Button variant="outline" size="sm">Button</Button>
      <Button variant="outline" size="sm">Group</Button>
      <Button variant="outline" size="icon-sm">
        <PlusIcon />
      </Button>
    </ButtonGroup.Root>
    <ButtonGroup.Root>
      <Button variant="outline">Default</Button>
      <Button variant="outline">Button</Button>
      <Button variant="outline">Group</Button>
      <Button variant="outline" size="icon">
        <PlusIcon />
      </Button>
    </ButtonGroup.Root>
    <ButtonGroup.Root>
      <Button variant="outline" size="lg">Large</Button>
      <Button variant="outline" size="lg">Button</Button>
      <Button variant="outline" size="lg">Group</Button>
      <Button variant="outline" size="icon-lg">
        <PlusIcon />
      </Button>
    </ButtonGroup.Root>
  </div>
</Story>

<Story name="Nested">
  <ButtonGroup.Root>
    <ButtonGroup.Root>
      <Button variant="outline" size="sm">1</Button>
      <Button variant="outline" size="sm">2</Button>
      <Button variant="outline" size="sm">3</Button>
      <Button variant="outline" size="sm">4</Button>
      <Button variant="outline" size="sm">5</Button>
    </ButtonGroup.Root>
    <ButtonGroup.Root>
      <Button variant="outline" size="icon-sm" aria-label="Previous">
        <ArrowLeftIcon />
      </Button>
      <Button variant="outline" size="icon-sm" aria-label="Next">
        <ArrowRightIcon />
      </Button>
    </ButtonGroup.Root>
  </ButtonGroup.Root>
</Story>

<Story name="Separator">
  <ButtonGroup.Root>
    <Button variant="secondary" size="sm">Copy</Button>
    <ButtonGroup.Separator />
    <Button variant="secondary" size="sm">Paste</Button>
  </ButtonGroup.Root>
</Story>

<Story name="Split">
  <ButtonGroup.Root>
    <Button variant="secondary">Button</Button>
    <ButtonGroup.Separator />
    <Button variant="secondary" size="icon">
      <PlusIcon />
    </Button>
  </ButtonGroup.Root>
</Story>

<Story name="With Text">
  <ButtonGroup.Root>
    <ButtonGroup.Text>https://</ButtonGroup.Text>
    <Button variant="outline">example.com</Button>
  </ButtonGroup.Root>
</Story>
