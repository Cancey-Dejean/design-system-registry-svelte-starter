<script lang="ts">
  import XIcon from "@lucide/svelte/icons/x";
  import { cn } from "$lib/utils";

  let {
    message,
    href,
    linkLabel = "Learn more",
    dismissible = true,
    class: className,
  }: {
    message: string;
    href?: string;
    linkLabel?: string;
    dismissible?: boolean;
    class?: string;
  } = $props();

  let visible = $state(true);
</script>

{#if visible}
  <div
    class={cn(
      "flex items-center justify-center gap-2 bg-primary px-4 py-2 text-sm text-primary-foreground",
      className,
    )}
  >
    <p>
      {message}
      {#if href}
        <a {href} class="ms-1 underline underline-offset-4">{linkLabel}</a>
      {/if}
    </p>
    {#if dismissible}
      <button
        type="button"
        aria-label="Dismiss"
        onclick={() => (visible = false)}
        class="ms-auto inline-flex size-5 items-center justify-center rounded hover:bg-primary-foreground/10"
      >
        <XIcon class="size-3.5" />
      </button>
    {/if}
  </div>
{/if}
