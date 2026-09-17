<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs";
</script>

<Tabs.Root value="account" class="w-full max-w-sm">
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">Account settings.</Tabs.Content>
  <Tabs.Content value="password">Password settings.</Tabs.Content>
</Tabs.Root>
