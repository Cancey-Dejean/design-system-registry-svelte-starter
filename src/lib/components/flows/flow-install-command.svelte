<script lang="ts">
  import InstallCommand from "$lib/components/registry/install-command.svelte";
  import { registryConfig } from "$registry/config";

  let { name, class: className }: { name: string; class?: string } = $props();
</script>

<InstallCommand
  kind="exec"
  args="shadcn-svelte@latest add {registryConfig.homepage}/r/{name}.json"
  class={className}
/>
