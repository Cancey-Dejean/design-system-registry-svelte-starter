<script lang="ts">
  import { Button, type ButtonVariant } from "$lib/components/ui/button";

  const variants: ButtonVariant[] = ["default", "outline", "secondary", "ghost", "destructive", "link"];
</script>

<div class="flex flex-wrap items-center gap-2">
  {#each variants as variant (variant)}
    <Button {variant} class="capitalize">{variant}</Button>
  {/each}
</div>
