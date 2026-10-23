<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import CircleAlertIcon from "@lucide/svelte/icons/circle-alert";
  import { buttonVariants } from "$registry/items/components/button";

  import * as AlertDialog from "../index.js";

  const { Story } = defineMeta({
    title: "Components/Alert Dialog",
    parameters: { centered: true },
  });
</script>

<Story name="Default">
  <AlertDialog.Root>
    <AlertDialog.Trigger class={buttonVariants({ variant: "outline" })}>
      Show Dialog
    </AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        <AlertDialog.Action>Continue</AlertDialog.Action>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
</Story>

<Story name="Small">
  <AlertDialog.Root>
    <AlertDialog.Trigger class={buttonVariants({ variant: "outline" })}>
      Show Small Dialog
    </AlertDialog.Trigger>
    <AlertDialog.Content size="sm">
      <AlertDialog.Header>
        <AlertDialog.Title>Discard draft?</AlertDialog.Title>
        <AlertDialog.Description>
          Your unsaved changes will be lost if you discard this draft.
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Keep editing</AlertDialog.Cancel>
        <AlertDialog.Action>Discard</AlertDialog.Action>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
</Story>

<Story name="Destructive">
  <AlertDialog.Root>
    <AlertDialog.Trigger class={buttonVariants({ variant: "destructive" })}>
      Delete Account
    </AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>Delete this account?</AlertDialog.Title>
        <AlertDialog.Description>
          This permanently removes the account and associated data. You cannot
          reverse this action.
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        <AlertDialog.Action variant="destructive">Delete</AlertDialog.Action>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
</Story>

<Story name="With Media">
  <AlertDialog.Root>
    <AlertDialog.Trigger class={buttonVariants({ variant: "outline" })}>
      Show With Media
    </AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Media>
          <CircleAlertIcon />
        </AlertDialog.Media>
        <AlertDialog.Title>Review permissions</AlertDialog.Title>
        <AlertDialog.Description>
          Continue only if you trust this integration with the requested account
          access.
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Not now</AlertDialog.Cancel>
        <AlertDialog.Action>Grant access</AlertDialog.Action>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
</Story>
