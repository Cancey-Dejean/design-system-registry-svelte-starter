<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import * as Tabs from "$lib/components/ui/tabs";
  import { Root as TabsRoot } from "$lib/components/ui/tabs";

  const { Story } = defineMeta({
    title: "Components/Tabs",
    component: TabsRoot,
    tags: ["autodocs"],
  });
</script>

<Story name="Default">
  <Tabs.Root value="account" class="w-full max-w-sm">
    <Tabs.List>
      <Tabs.Trigger value="account">Account</Tabs.Trigger>
      <Tabs.Trigger value="password">Password</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="account">Account settings.</Tabs.Content>
    <Tabs.Content value="password">Password settings.</Tabs.Content>
  </Tabs.Root>
</Story>
