<script lang="ts">
  import { Button } from "$registry/items/components/button/index.js";
  import { registryConfig } from "$registry/config";
  import StorybookIcon from "$registry/items/components/logos/logo-set/storybook-icon.svelte";
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
  <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">{registryConfig.name}</h1>
  <p class="max-w-xl text-lg text-muted-foreground">
    A shadcn-svelte based design system, with components, blocks, and utilities documented and
    ready to install.
  </p>
  <div class="flex gap-3">
    <Button href="/components">Browse</Button>
    <Button href={registryConfig.storybookUrl} variant="outline" target="_blank">
      <StorybookIcon data-icon="inline-start" class="size-4" />
      Storybook
    </Button>
  </div>
</div>
