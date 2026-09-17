<script lang="ts">
  import CheckIcon from "@lucide/svelte/icons/check";
  import CopyIcon from "@lucide/svelte/icons/copy";
  import { cn } from "$lib/utils";

  let { command, class: className }: { command: string; class?: string } = $props();

  let copied = $state(false);

  async function copy() {
    await navigator.clipboard.writeText(command);
    copied = true;
    setTimeout(() => (copied = false), 1500);
  }
</script>

<div
  class={cn(
    "flex items-center justify-between gap-2 rounded-md border bg-muted px-3 py-2 font-mono text-sm",
    className,
  )}
>
  <code class="overflow-x-auto whitespace-pre">{command}</code>
  <button
    type="button"
    onclick={copy}
    aria-label="Copy command"
    class="inline-flex size-6 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground"
  >
    {#if copied}
      <CheckIcon class="size-3.5" />
    {:else}
      <CopyIcon class="size-3.5" />
    {/if}
  </button>
</div>
