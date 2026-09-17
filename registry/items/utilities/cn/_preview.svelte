<script lang="ts">
  import { cn } from "$lib/utils";

  let active = $state(true);
</script>

<div class="flex flex-col items-center gap-3">
  <button
    type="button"
    class={cn(
      "rounded-md border px-4 py-2 text-sm",
      active && "border-primary bg-primary text-primary-foreground",
    )}
    onclick={() => (active = !active)}
  >
    {active ? "Active" : "Inactive"}
  </button>
  <p class="text-xs text-muted-foreground">Click to toggle the merged class list.</p>
</div>
