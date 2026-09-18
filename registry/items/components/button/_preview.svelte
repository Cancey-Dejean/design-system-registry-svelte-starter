<script lang="ts">
  import Button from "./button.svelte";
  import { BUTTON_VARIANTS } from "./button.variants";
</script>

<div class="flex flex-wrap items-center gap-2">
  {#each BUTTON_VARIANTS as variant (variant)}
    <Button {variant} class="capitalize">{variant}</Button>
  {/each}
</div>
