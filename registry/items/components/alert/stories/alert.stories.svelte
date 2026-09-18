<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import CheckCircle2Icon from "@lucide/svelte/icons/check-circle-2";
  import CircleAlertIcon from "@lucide/svelte/icons/circle-alert";
  import PopcornIcon from "@lucide/svelte/icons/popcorn";
  import StoryWrapper from "$lib/components/utility/story-wrapper.svelte";
  import * as Alert from "../index.js";

  const { Story } = defineMeta({
    title: "Components/Alert",
    decorators: [() => StoryWrapper],
  });
</script>

<Story name="Default">
  <div class="mx-auto w-full max-w-xl">
    <Alert.Root>
      <CheckCircle2Icon />
      <Alert.Title>Success! Your changes have been saved</Alert.Title>
      <Alert.Description
        >This is an alert with icon, title and description.</Alert.Description
      >
    </Alert.Root>
  </div>
</Story>

<Story name="Title Only">
  <div class="mx-auto w-full max-w-xl">
    <Alert.Root>
      <PopcornIcon />
      <Alert.Title
        >This Alert has a title and an icon. No description.</Alert.Title
      >
    </Alert.Root>
  </div>
</Story>

<Story name="Destructive">
  <div class="mx-auto w-full max-w-xl">
    <Alert.Root variant="destructive">
      <CircleAlertIcon />
      <Alert.Title>Unable to process your payment.</Alert.Title>
      <Alert.Description>
        <p>Please verify your billing information and try again.</p>
        <ul class="list-inside list-disc text-sm">
          <li>Check your card details</li>
          <li>Ensure sufficient funds</li>
          <li>Verify billing address</li>
        </ul>
      </Alert.Description>
    </Alert.Root>
  </div>
</Story>

<Story name="With Action">
  <div class="mx-auto w-full max-w-xl">
    <Alert.Root>
      <CheckCircle2Icon />
      <Alert.Title>Your session is about to expire</Alert.Title>
      <Alert.Description
        >Stay signed in to keep working without interruption.</Alert.Description
      >
      <Alert.Action>
        <button
          type="button"
          class="rounded-md border bg-background px-2 py-1 text-xs font-medium hover:bg-muted"
        >
          Stay signed in
        </button>
      </Alert.Action>
    </Alert.Root>
  </div>
</Story>

<Story name="Variants">
  <div class="mx-auto grid w-full max-w-xl items-start gap-4">
    <Alert.Root>
      <CheckCircle2Icon />
      <Alert.Title>Default</Alert.Title>
      <Alert.Description
        >Used for general status and confirmation messages.</Alert.Description
      >
    </Alert.Root>
    <Alert.Root variant="destructive">
      <CircleAlertIcon />
      <Alert.Title>Destructive</Alert.Title>
      <Alert.Description
        >Used for errors and destructive feedback.</Alert.Description
      >
    </Alert.Root>
  </div>
</Story>
