<script lang="ts">
  import CheckIcon from "@lucide/svelte/icons/check";
  import CopyIcon from "@lucide/svelte/icons/copy";

  let { text }: { text: string } = $props();

  let copied = $state(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    copied = true;
    setTimeout(() => (copied = false), 1500);
  }
</script>

<button
  type="button"
  onclick={copy}
  class="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
>
  {#if copied}
    <CheckIcon class="size-3.5" />
    Copied
  {:else}
    <CopyIcon class="size-3.5" />
    Copy Page
  {/if}
</button>
