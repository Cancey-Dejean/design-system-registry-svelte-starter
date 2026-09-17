<script lang="ts">
  import { registryConfig } from "$registry/config";
</script>

<footer class="border-t px-4 py-6 text-sm text-muted-foreground">
  <p>
    Built with shadcn-svelte. See the
    <a href={registryConfig.storybookUrl} class="underline hover:text-foreground" target="_blank"
      >Storybook</a
    >
    or the
    <a href={registryConfig.repositoryUrl} class="underline hover:text-foreground" target="_blank"
      >source</a
    >.
  </p>
</footer>
