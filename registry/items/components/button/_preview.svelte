<script lang="ts">
  import { Button, BUTTON_VARIANTS } from "$registry/items/components/button";
</script>

<div class="flex flex-wrap items-center gap-2">
  {#each BUTTON_VARIANTS as variant (variant)}
    <Button {variant} class="capitalize">{variant}</Button>
  {/each}
</div>
